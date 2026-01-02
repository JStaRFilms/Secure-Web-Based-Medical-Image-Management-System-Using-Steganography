'use server'

import { auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function logEvent(operation: string, details: string) {
    const { userId } = await auth()

    await prisma.encryptionEvent.create({
        data: {
            userId: userId || 'anonymous',
            operation,
            details,
        }
    })
}

export async function getRecentActivity() {
    return await prisma.encryptionEvent.findMany({
        take: 5,
        orderBy: {
            timestamp: 'desc'
        }
    })
}

export async function getStats() {
    const encryptionCount = await prisma.encryptionEvent.count({
        where: { operation: 'ENCRYPT' }
    });
    const decryptionCount = await prisma.encryptionEvent.count({
        where: { operation: 'DECRYPT' }
    });

    return { encryptionCount, decryptionCount }
}
