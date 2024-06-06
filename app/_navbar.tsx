import { Button } from '@/components/ui/button'
import AuthButton from './_authButton'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-[#ffc971] p-2">
      <div className="mx-auto flex max-w-7xl justify-between">
        <div className="self-center p-2">
          <Link href="/" legacyBehavior passHref>
            Home
          </Link>
        </div>
        <div className="flex justify-between gap-5">
          <div className="self-center p-2">
            <Link
              href="/who-is"
              legacyBehavior
              passHref
              className="content-center p-5"
            >
              who-is
            </Link>
          </div>
          <AuthButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
