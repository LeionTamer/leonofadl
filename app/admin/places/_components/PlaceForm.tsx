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
import { PlaceFormType } from '../../_actions/places'
import { Input } from '@/components/ui/input'
import { useDeckStateContext } from '@/components/deckgl/_deckcontext'
import { useEffect } from 'react'

const PlaceForm = () => {
  const form = useForm<PlaceFormType>()

  const { state } = useDeckStateContext()

  useEffect(() => {
    if (state.googlePlaceDetails) {
      console.table(state.googlePlaceDetails)
    }
  }, [state.googlePlaceDetails])

  return (
    // <AutoCompleteMap>
    <Form {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Place Name" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
    // </AutoCompleteMap>
  )
}

export default PlaceForm
