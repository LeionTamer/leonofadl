'use client'

import AutoCompleteMap from '@/components/google/autocompleteMap'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useDeckStateContext } from '@/components/deckgl/_deckcontext'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { addPlace } from '../../_actions/places'
import { useFormState } from 'react-dom'
import { PlaceFormType } from '../../_types/place'

const PlaceForm = ({ place }: { place?: PlaceFormType }) => {
  const { state: deckState } = useDeckStateContext()
  const [state, action] = useFormState(addPlace, null)

  useEffect(() => {
    if (deckState.googlePlaceDetails) {
      console.table(deckState.googlePlaceDetails)
    }
  }, [deckState.googlePlaceDetails])

  return (
    <div className="mt-10">
      <form action={action}>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default PlaceForm
