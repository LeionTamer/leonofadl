import { NextRequest } from "next/server";
import { gMapClient } from "@/lib/google-api";

const apiKey = process.env.GOOGLE_API_KEY || ''

export async function GET(req: NextRequest) {
  const placeId = req.nextUrl.searchParams.get('placeId') as string

  const response = await gMapClient.placeDetails({
    params: {
      key: apiKey,
      place_id: placeId
    }
  })
  return Response.json({ ...response.data.result })
}