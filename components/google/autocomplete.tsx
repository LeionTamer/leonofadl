import { useDebouncedState } from '@mantine/hooks'
import { Command, CommandInput } from '../ui/command'
import { useEffect } from 'react'

function GoogleAutocomplete() {
  const [search, setSearch] = useDebouncedState('', 300)

  useEffect(() => {
    console.log('Value was changed to: ', search)
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
