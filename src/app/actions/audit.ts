'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function logAudit(operation: string, details?: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        await prisma.encryptionEvent.create({
            data: {
                operation,
                details,
                userId: session?.user?.id || 'anonymous'
            }
        })
        revalidatePath('/dashboard')
    } catch (error) {
        console.error('Failed to log audit:', error)
    }
}

export async function getRecentAudits() {
    try {
        return await prisma.encryptionEvent.findMany({
            take: 5,
            orderBy: { timestamp: 'desc' }
        })
    } catch (error) {
        return []
    }
}

export async function getAllAudits() {
    try {
        return await prisma.encryptionEvent.findMany({
            orderBy: { timestamp: 'desc' }
        })
    } catch (error) {
        return []
    }
}

export async function getAuditStats() {
    try {
        const totalEncryptions = await prisma.encryptionEvent.count({
            where: { operation: 'ENCRYPT_OP' }
        })
        const totalDecryptions = await prisma.encryptionEvent.count({
            where: { operation: 'DECRYPT_OP' }
        })

        // Calculate weekly growth
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        const recentEncryptions = await prisma.encryptionEvent.count({
            where: {
                operation: 'ENCRYPT_OP',
                timestamp: { gte: sevenDaysAgo }
            }
        })

        // Simple growth logic: Just showing recent count for now as "growth" context
        // Or if we want percentage: (recent / total) * 100? 
        // Let's just return the raw number of new encryptions this week.
        const weeklyGrowth = recentEncryptions

        return {
            totalEncryptions,
            totalDecryptions,
            weeklyGrowth
        }
    } catch (error) {
        return {
            totalEncryptions: 0,
            totalDecryptions: 0,
            weeklyGrowth: 0
        }
    }
}
