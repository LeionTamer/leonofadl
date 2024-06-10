import { ReactNode } from 'react'
import Breadcrumbs from './_components/Breadcrumbs'

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Breadcrumbs />
      {children}
    </div>
  )
}

export default AdminLayout
