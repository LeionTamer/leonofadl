import AutoCompleteMap from '@/components/google/autocompleteMap'
import PlaceForm from '../_components/PlaceForm'

export default async function NewPlacePage() {
  return (
    <>
      <div className="max-w-7xl px-10 mx-auto">
        <AutoCompleteMap>
          <PlaceForm />
        </AutoCompleteMap>
      </div>
    </>
  )
}
