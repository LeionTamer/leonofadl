export const restaurantVenueType = [
  '',
  'bar',
  'bistro',
  'bbq',
  'skewers',
  'cafe',
  'pub',
  'restaurant',
  'vegan',
] as const

export type RestaurantVenueType = (typeof restaurantVenueType)[number]
