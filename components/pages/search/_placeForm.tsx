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

  function onSubmit(values: PlaceFormType) {
    console.table(values)
  }

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
                    // className="flex-grow-1 min-w-full"
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
                    // className="flex-grow-1"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="mt-5"
          disabled={!form.formState.isDirty}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
