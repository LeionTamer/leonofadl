import AutoCompleteMap from '@/components/google/autocompleteMap'
import PlaceForm from '../_components/PlaceForm'

export default async function NewPlacePage() {
  return (
    <>
      <AutoCompleteMap>
        <PlaceForm />
      </AutoCompleteMap>
    </>
  )
}
