'use client'

import AutoCompleteMap from '@/components/google/autocompleteMap'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useDeckStateContext } from '@/components/deckgl/_deckcontext'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { addPlace } from '../../_actions/places'
import { useFormState } from 'react-dom'
import { PlaceFormType, placeFormSchema } from '../../_types/place'
import { zodResolver } from '@hookform/resolvers/zod'

const PlaceForm = ({ place }: { place?: PlaceFormType }) => {
  const { state: deckState } = useDeckStateContext()
  const [actionState, action] = useFormState(addPlace, null)

  const form = useForm<PlaceFormType>({
    resolver: zodResolver(placeFormSchema),
    defaultValues: place || {
      placeId: '',
      name: '',
      address: '',
      googleURL: '',
      latitude: '' as unknown as number,
      longitude: '' as unknown as number,
      website: '',
    },
  })

  useEffect(() => {
    if (
      !!deckState.googlePlaceDetails &&
      !!deckState.googlePlaceDetails.place_id
    ) {
      const details = deckState.googlePlaceDetails
      form.setValue('name', details.name!)
      form.setValue('address', details.formatted_address!)
      form.setValue('latitude', details.geometry!.location.lat)
      form.setValue('longitude', details.geometry!.location.lng)
      form.setValue('placeId', details.place_id!)
      form.setValue('googleURL', details.url || '')
    }
  }, [deckState.googlePlaceDetails, form])

  return (
    <div className="mt-10">
      <Form {...form}>
        <form action={action}>
          <FormField
            control={form.control}
            name="placeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google Place ID</FormLabel>
                <FormControl>
                  <Input placeholder="Google Place ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-10">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem className="w-[50%]">
                  <FormLabel>Lat</FormLabel>
                  <FormControl>
                    <Input placeholder="latitude" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem className="w-[50%]">
                  <FormLabel>Lon</FormLabel>
                  <FormControl>
                    <Input placeholder="longitude" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="Website" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="googleURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google URL</FormLabel>
                <FormControl>
                  <Input placeholder="Google URL" {...field} type="url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-10 w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default PlaceForm
