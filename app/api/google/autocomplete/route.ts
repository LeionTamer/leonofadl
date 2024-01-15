import { NextRequest } from "next/server";
import { gMapClient } from "@/lib/google-api";

const apiKey = process.env.GOOGLE_API_KEY || ''

export async function GET(req: NextRequest) {
  const searchText = req.nextUrl.searchParams.get('input') || ''
  const location = req.nextUrl.searchParams.get('location') || '34.921230,0138.599503'

  const autocomplete = await gMapClient.placeAutocomplete({
    params: {
      key: apiKey,
      input: searchText,
      location: location,
      radius: 10
    }
  })

  return Response.json({ data: autocomplete.data })
}