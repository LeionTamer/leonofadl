import { authOptions } from '@/helpers/auth'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { adminAuth } from './_actions/serverAuth'

async function AdminPage() {
  const session = await adminAuth()

  return <h1>AdminPage</h1>
}

export default AdminPage
