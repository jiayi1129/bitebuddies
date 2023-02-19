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
import { Box, Modal, TextField } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function restaurantCard({
  restaurant,
  userId,
}: {
  restaurant: Place
  userId: Id<'users'> | null
}) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const createGroup = useMutation('createGroup')

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [date, setDate] = React.useState<Dayjs>(
    dayjs('2023-02-19T00:00:00.000Z'),
  );

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
      userId,
      date.unix(),
    )
    handleClose();
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
        <Button onClick={handleOpen}>Create Party</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDateTimePicker
                    label="When do you want to eat?"
                    value={date}
                    onChange={(newValue) => {
                      if (!newValue) {
                        return;
                      }
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Typography>
              <Button onClick={createAndJoinGroup}>Confirm</Button>
            </Box>
          </Modal>
      </CardActions>
    </Card>
  )
}
