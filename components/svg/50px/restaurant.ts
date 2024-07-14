import { RestaurantVenueType } from '@/app/admin/restaurant/_types/restaurantOptionTypes'

export function restaurantSVG(venue: RestaurantVenueType) {
  const fillColor = `gray`
  return `
    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" >
        <rect width="930" height="930" x="15" y="-945" rx="100" ry="100" stroke="${fillColor}"  stroke-width="50" fill="orange"  />
        ${venuePath(venue, fillColor)}
    </svg>
    `
}

function venuePath(venue: RestaurantVenueType, fillColor: string): string {
  switch (venue) {
    case 'bar':
      return `<path fill="${fillColor}" d="M310-180h300v-430h-90q-28 0-47 15.5T430-552q-26 29-57 51t-63 30v291Zm-60 60v-352q-52-14-91-53t-39-95q0-53 30.5-94.5T229-772q23-48 68.5-78T400-880q35 0 65.5 12t55.5 33q10-2 19-3.5t20-1.5q66 0 113 47t47 113q0 22-9 44t-23 36h92q25 0 42.5 17.5T840-540v280q0 25-17.5 42.5T780-200H670v80H250Zm-70-500q0 38 31 64t69 26q32 0 58-17.5t53-50.5q23-28 55-50t74-22h140q0-45-26.5-77.5T560-780q-18 0-35.5 5.5L507-769l-19-16q-18-16-41-25.5t-47-9.5q-35 0-67 18t-47 50l-14 30-32 11q-26 9-43 36t-17 55Zm490 360h110v-280H670v280Zm-360 80h300-300Z"/>`
    default:
      return `<path fill="${fillColor}" d="M282.37-77.37v-367.52q-53.2-10.76-91.85-54.06-38.65-43.29-38.65-103.68v-280h65.5v280h65v-280h65.26v280h65v-280h65.74v280q0 60.39-38.77 103.68-38.77 43.3-91.97 54.03v367.55h-65.26Zm423.13 0v-320h-115V-705q0-80.52 49.67-129.07 49.68-48.56 130.83-48.56v805.26h-65.5Z"/>`
  }
}
