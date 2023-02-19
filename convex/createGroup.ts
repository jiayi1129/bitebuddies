import { mutation } from './_generated/server'
import { Id } from './_generated/dataModel'

interface Place {
  name: string
  location: string
  price: number
  url: string
  address: string
}

const defaultRestaurant: Place = {
  name: 'Sushiritto',
  location: 'ChIJ4XGi8Wyjj4ARiD83x1GRHys',
  price: 1,
  url: 'https://lh3.googleusercontent.com/p/AF1QipNSPrDtTzLpWKsjWyQyqdCplTMxDuPmDZhE96Cg=s1360-w1360-h1020',
  address: '448 University Avenue, Palo Alto, CA 94301',
}

export default mutation(
  async (
    { db },
    restaurant: Place = defaultRestaurant,
    userId: Id<'users'>
  ) => {
    return db.insert('groups', {
      users: [userId],
      timestamp: BigInt(1676768869),
      capacity: BigInt(5),
      restaurant: {
        ...restaurant,
        price: BigInt(restaurant.price),
      },
    })
  }
)
