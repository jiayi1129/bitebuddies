import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Document, Id } from '../../../convex/_generated/dataModel'
import { useMutation } from '../../../convex/_generated/react'

export default function GroupCard({
  group,
  userId,
}: {
  group: Document<'groups'>
  userId: Id<'users'> | null
}) {
  const joinGroup = useMutation('joinGroup')

  async function joinGroupFn() {
    if (!userId) {
      return
    }
    await joinGroup(group._id, userId)
  }

  function isUserInGroup() {
    console.log(group, userId)
    if (!userId) {
      return false
    }
    return group.users.map((user) => user.id).includes(userId.id)
  }

  const dateTime = new Date(Number(group.timestamp))
  const formattedDate = `${dateTime.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  })}, ${dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}`
  const bodyText =
    group.users.length + '/' + group.capacity + ' people attending'
  return (
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardMedia
        component="img"
        alt={group.restaurant.name}
        height="200"
        image={group.restaurant.url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {group.restaurant.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textDecoration: 'underline' }}
        >
          {bodyText}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formattedDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {group.restaurant.address}
        </Typography>
      </CardContent>
      <CardActions>
        {isUserInGroup() ? (
          <Typography variant="button">You're in the party!</Typography>
        ) : (
          <Button onClick={joinGroupFn}>Join Party</Button>
        )}
      </CardActions>
    </Card>
  )
}
