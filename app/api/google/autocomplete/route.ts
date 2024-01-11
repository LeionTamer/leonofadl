import { NextRequest } from "next/server";
import { gMapClient } from "@/lib/google-api";

const apiKey = process.env.GOOGLEAPIKEY || ''

export async function GET(req: NextRequest) {
  const searchText = req.nextUrl.searchParams.get('search') || ''

  const autocomplete = await gMapClient.placeAutocomplete({
    params: {
      key: apiKey,
      input: searchText,
      location: '34.921230,0138.599503',
      radius: 10
    }
  })

  return Response.json({ data: autocomplete.data })
}