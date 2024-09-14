'use client'

import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'

export const AuthButton = () => {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <Button className="self-center" onClick={() => signOut()}>
        Sign Out
      </Button>
    )
  }

  return null
}

export default AuthButton
