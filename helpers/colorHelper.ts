import { Rating } from '@prisma/client'

export function ratingColors(rating: Rating) {
  switch (rating) {
    case 'MYTHIC':
      return '#FFD700'
    case 'RARE':
      return '#0000FF'
    case 'UNCOMMON':
      return '#C0C0C0'
    default:
      return '#696969'
  }
}
