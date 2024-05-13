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
        <div>
          <AuthButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
