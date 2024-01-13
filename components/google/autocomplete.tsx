'use client'

import { useDebouncedState } from '@mantine/hooks'
import { Command, CommandInput } from '../ui/command'
import { useEffect } from 'react'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ''
const url = `${baseURL}/api/google/autocomplete`

function GoogleAutocomplete() {
  const [search, setSearch] = useDebouncedState('', 300)

  async function searchFn() {
    if (search.length >= 3) {
      var newURL = new URL(url)
      newURL.searchParams.append('input', search)
      const response = await fetch(newURL)
      const data = await response.json()
    }
    // return fetch(newURL)
  }

  useEffect(() => {
    searchFn()
  }, [search])

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        placeholder="Type a command or search..."
        onChangeCapture={(event) => setSearch(event.currentTarget.value)}
      />
    </Command>
  )
}

export default GoogleAutocomplete
