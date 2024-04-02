import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

async function AdminPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/api/auth/signin')
  } else {
    console.table(session)
  }

  return <h1>AdminPage</h1>
}

export default AdminPage
