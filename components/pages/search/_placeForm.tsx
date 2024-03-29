import { useForm } from 'react-hook-form'
import { PlaceFormType, placeFormSchema } from './_placeFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDeckStateContext } from '@/components/deckgl/_deckcontext'
import { useEffect } from 'react'

export const PlaceForm = () => {
  const form = useForm<PlaceFormType>({
    resolver: zodResolver(placeFormSchema),
    defaultValues: {
      name: '',
      address: '',
      latitude: -34.92123,
      longtitude: 138.599503,
    },
  })

  const { state } = useDeckStateContext()

  function onSubmit(values: PlaceFormType) {
    console.table(values)
  }

  useEffect(() => {
    if (!!state.googlePlaceDetails) {
      console.table(state.googlePlaceDetails)
      form.setValue('placeId', state.googlePlaceDetails.place_id!)
      form.setValue('name', state.googlePlaceDetails.name!)
      form.setValue('address', state.googlePlaceDetails.formatted_address!)
      form.setValue('latitude', state.googlePlaceDetails.geometry!.location.lat)
      form.setValue(
        'longtitude',
        state.googlePlaceDetails.geometry!.location.lng
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.googlePlaceDetails])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-10 mt-10 flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} className="mt-10" />
              </FormControl>
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
                <Input placeholder="Address" {...field} className="mt-10" />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Latitude"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longtitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longtitude</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Longtitude"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-5">
          Submit
        </Button>
      </form>
    </Form>
  )
}
