export const restaurantVenueType = ['', 'bar', 'restaurant', 'bistro'] as const

export type RestaurantVenueType = (typeof restaurantVenueType)[number]
