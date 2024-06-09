import { UserRole } from '@prisma/client'
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    email: string
    role: UserRole
  }
  interface User {
    email: string
    userRole: UserRole
  }
}
