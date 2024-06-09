'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RestaurantType, restaurantSchema } from '../_types/restaurantTypes'
import { useForm, useFormState } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import AutoCompleteMap from '@/components/google/autocompleteMap'
import { useEffect, useState } from 'react'
import { useDeckStateContext } from '@/components/deckgl/_deckcontext'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { addRestaurant, editRestaurant } from '../_actions/restaurantActions'
import { useRouter } from 'next/navigation'

export function RestaurantForm({
  restaurant,
}: {
  restaurant?: RestaurantType
}) {
  const { state: deckState } = useDeckStateContext()
  const form = useForm<RestaurantType>({
    resolver: zodResolver(restaurantSchema),
    reValidateMode: 'onChange',
    defaultValues: restaurant || {
      name: '',
      address: '',
      googleURL: '',
      latitude: '' as unknown as number,
      longtitude: '' as unknown as number,
      website: '',
      phoneNumber: '',
      tags: [],
      leonNotes: '',
    },
  })
  const [formTags, setFormTags] = useState<string[]>(
    form.getValues('tags') || []
  )
  const router = useRouter()

  useEffect(() => {
    if (
      !!deckState &&
      !!deckState.googlePlaceDetails &&
      !!deckState.googlePlaceDetails.place_id
    ) {
      const details = deckState.googlePlaceDetails
      form.setValue('name', details.name!)
      form.setValue('address', details.formatted_address!)
      form.setValue('latitude', details.geometry!.location.lat)
      form.setValue('longtitude', details.geometry!.location.lng)
      form.setValue('googleURL', details.url || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckState.googlePlaceDetails])

  const {
    mutate: addEntry,
    error: addError,
    isPending: isAdding,
  } = useMutation({
    mutationFn: async (values: RestaurantType) =>
      addRestaurant({ ...values, tags: formTags }),
    onSuccess: () => {
      router.push('/admin/restaurant')
    },
  })

  const {
    mutate: editEntry,
    error: editError,
    isPending: isEditing,
  } = useMutation({
    mutationFn: async (values: RestaurantType) =>
      editRestaurant({ ...values, tags: formTags }),
    onSuccess: () => {
      router.push('/admin/restaurant')
    },
  })

  function onSubmit(values: RestaurantType) {
    !!restaurant ? editEntry(values) : addEntry(values)
  }

  const error = addError || editError

  return (
    <div className="mt-10 max-w-5xl p-5">
      {error && <div className="text-red-500">{error.message}</div>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Restaurant Name" {...field} />
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
                    <Input
                      placeholder="latitude"
                      {...field}
                      type="number"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longtitude"
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
          <FormField
            control={form.control}
            name="leonNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Leon Notes</FormLabel>
                <FormControl>
                  <Input placeholder="Leon Notes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Input
            placeholder="Tags"
            defaultValue={form.getValues('tags')?.join('; ')}
            onBlur={(event) =>
              setFormTags(
                event.currentTarget.value
                  .split(';')
                  .map((entry) => entry.trim())
              )
            }
          />

          <Button
            type="submit"
            className="mt-5"
            disabled={isAdding || isEditing}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export function RestaurantFormWithSearch({
  restaurant,
}: {
  restaurant?: RestaurantType
}) {
  return (
    <AutoCompleteMap>
      <RestaurantForm restaurant={restaurant} />
    </AutoCompleteMap>
  )
}
