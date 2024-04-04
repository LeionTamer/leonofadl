'use server'

import { PlaceFormType, placeFormSchema } from "@/components/pages/search/_placeFormSchema";

export async function createPlaceAction(place: PlaceFormType) {
  console.table(place)
  placeFormSchema.safeParse(place)
}