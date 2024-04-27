import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

let db: PrismaClient | undefined = undefined

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient()
  }
  db = globalForPrisma.prisma
}

export default db as PrismaClient
