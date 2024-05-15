'use server'

import { authOptions } from '@/helpers/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export async function adminAuth() {
  // This function is called when the user tries to access an admin page
  // It should return true if the user is allowed to access the page, and false if not

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  } else {
    // console.table(session)
    if (session.user.email !== 'leoncarbonell@gmail.com') {
      redirect('/')
      return false
    }
  }

  return true
}
