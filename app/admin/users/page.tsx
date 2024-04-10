import { authOptions } from '@/helpers/auth'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

async function Users() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  } else {
    if (session.user.email !== 'leoncarbonell@gmail.com') {
      redirect('/')
    }
  }

  const users = await prisma.user.findMany()
  return <>{users.map((user) => user.name)}</>
}

export default Users
