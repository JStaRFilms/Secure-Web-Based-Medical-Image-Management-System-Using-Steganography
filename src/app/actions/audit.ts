'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function logAudit(operation: string, details?: string) {
    try {
        await prisma.encryptionEvent.create({
            data: {
                operation,
                details,
                // userId: session?.user?.id // Todo: Get from auth
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

export async function getAuditStats() {
    try {
        const totalEncryptions = await prisma.encryptionEvent.count({
            where: { operation: 'ENCRYPT_OP' }
        })
        const totalDecryptions = await prisma.encryptionEvent.count({
            where: { operation: 'DECRYPT_OP' }
        })

        // Calculate weekly growth (Mock logic for now or real DB query)
        const weeklyGrowth = 12 // Placeholder

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
