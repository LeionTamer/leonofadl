import { NextRequest } from "next/server";
import { Client } from "@googlemaps/google-maps-services-js";

const gmapsClient = new Client()

const apiKey = process.env.GOOGLEAPIKEY || ''

export async function GET(req: NextRequest) {
  const searchText = req.nextUrl.searchParams.get('search') || ''

  const response = gmapsClient.placeAutocomplete({
    params: {
      key: apiKey,
      input: searchText,
      location: '34.921230,0138.599503',
      radius: 500
    }
  })

  // const fullReq = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&key=${apiKey}
  // &location=34.921230%2C138.599503&radius=500&types=establishment`

  // const response = await fetch(fullReq)
  const data = (await response).data
  console.table(data.predictions[0])


  return Response.json({ message: searchText })
}