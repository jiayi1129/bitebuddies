import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Id } from '../../../convex/_generated/dataModel'
import { useMutation } from '../../../convex/_generated/react'
import { Place } from '../../GoogleMap'

export default function restaurantCard({
  restaurant,
  userId,
}: {
  restaurant: Place
  userId: Id<'users'> | null
}) {
  const createGroup = useMutation('createGroup')

  async function createAndJoinGroup() {
    if (!userId) {
      return
    }
    await createGroup(
      {
        name: restaurant.name,
        price: restaurant.price,
        url: restaurant.url,
        location: restaurant.location,
        address: restaurant.address,
      },
      userId
    )
  }

  // function isUserInGroup() {
  //   console.log(group, userId)
  //   if (!userId) {
  //     return false
  //   }
  //   return group.users.map((user) => user.id).includes(userId.id)
  // }

  return (
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardMedia
        component="img"
        alt={restaurant.name}
        height="200"
        image={
          restaurant.url
            ? restaurant.url
            : 'https://lh3.googleusercontent.com/p/AF1QipNSPrDtTzLpWKsjWyQyqdCplTMxDuPmDZhE96Cg=s1360-w1360-h1020'
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {restaurant.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'$'.repeat(restaurant.price + 1)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {restaurant.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={createAndJoinGroup}>Create Party</Button>
      </CardActions>
    </Card>
  )
}
