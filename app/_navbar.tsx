import { Button } from '@/components/ui/button'
import { useSession, signIn, signOut } from 'next-auth/react'
import AuthButton from './_authButton'

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between">
        <div>Home</div>
        <AuthButton />
      </div>
    </nav>
  )
}

export default Navbar
