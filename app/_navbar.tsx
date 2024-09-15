import { Button } from '@/components/ui/button'
import AuthButton from './_authButton'
import Link from 'next/link'
import { HEADER_HEIGHT } from '@/helpers/consts'

const Navbar = () => {
  return (
    <nav
      className="content-evenly bg-[#ffc971] px-2"
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="mx-auto flex max-w-7xl justify-between">
        <div className="self-center">
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
