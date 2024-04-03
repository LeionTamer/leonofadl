import { Button } from '@/components/ui/button'
import { useSession, signIn, signOut } from 'next-auth/react'
import AuthButton from './_authButton'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between max-w-7xl mx-auto">
        <div>
          <Link href="/" legacyBehavior passHref>
            Home
          </Link>
        </div>
        <div>
          <AuthButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
