import { Grid } from '@mui/material'
import { Id } from '../../../convex/_generated/dataModel'
import { Place } from '../../GoogleMap'
import RestaurantCard from './RestaurantCard'

export default function RestaurantCardsContainer({
  startTimestamp,
  endTimestamp,
  price,
  userId,
  restaurants,
}: {
  startTimestamp: bigint
  endTimestamp: bigint
  price: bigint
  userId: Id<'users'> | null
  restaurants: Place[]
}) {
  return (
    <Grid container spacing={1}>
      {restaurants.map((restaurant) => (
        <Grid item xs={12} sm={6} md={4}>
          <RestaurantCard
            restaurant={restaurant}
            userId={userId}
          ></RestaurantCard>
        </Grid>
      ))}
    </Grid>
  )
}
