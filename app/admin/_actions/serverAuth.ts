'use server'

import { authOptions } from '@/helpers/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export async function adminAuth() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  } else {
    console.table(session)
    if (
      session.email !== 'leoncarbonell@gmail.com' &&
      session.role !== 'ADMIN'
    ) {
      redirect('/')
    }
  }

  return session
}
