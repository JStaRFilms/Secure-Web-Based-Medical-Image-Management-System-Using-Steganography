'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function logEvent(operation: string, details: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const userId = session?.user?.id || 'anonymous';

    await prisma.encryptionEvent.create({
        data: {
            userId,
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
