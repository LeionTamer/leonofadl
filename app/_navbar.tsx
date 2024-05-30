import { Button } from '@/components/ui/button'
import AuthButton from './_authButton'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className=" bg-[#ffc971] p-2">
      <div className="flex justify-between max-w-7xl mx-auto">
        <div className="self-center p-2">
          <Link href="/" legacyBehavior passHref>
            Home
          </Link>
        </div>
        <div className="flex justify-between gap-5">
          <Link
            href="/who-is"
            legacyBehavior
            passHref
            className="p-5 content-center"
          >
            who-is
          </Link>
          <AuthButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
