'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import SearchPageComponent from '@/components/pages/search/searchpage'

function PlaceForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Form</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] overflow-y-auto max-h-[85vh]">
        <SearchPageComponent />
      </DialogContent>
    </Dialog>
  )
}

export default PlaceForm
