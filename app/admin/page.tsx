import { adminAuth } from './_actions/serverAuth'

async function AdminPage() {
  const session = await adminAuth()

  return <h1>AdminPage</h1>
}

export default AdminPage
