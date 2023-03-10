import { useEffect, useState } from 'react'
import './App.css'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery } from '../convex/_generated/react'
import { Id } from '../convex/_generated/dataModel'
import NavBar from './components/navBar'
import GoogleMap, { Place } from './GoogleMap'
import CategoryTabs from './components/home/CategoryTabs'
import { Box, Container, Grid, Typography } from '@mui/material'
import Logo from './assets/Logo.png'

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0()

  const createGroup = useMutation('createGroup')

  const [userId, setUserId] = useState<Id<'users'> | null>(null)
  const storeUser = useMutation('storeUser')
  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const id = await storeUser()
      setUserId(id)
    }
    createUser()
    return () => setUserId(null)
  }, [storeUser])

  const [restaurants, setRestaurants] = useState<Place[]>([])
  const startTimestamp = BigInt(1676768868)
  const endTimestamp = BigInt(1676768870)
  const price = BigInt(6)
  const groups =
    useQuery('getAllGroups', startTimestamp, endTimestamp, price) || []
  const restaurantLocationId = groups.map(({ restaurant }) => {
    return restaurant.location
  })

  return (
    <div className="App">
      <Box sx={{ pb: 3 }}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={6} md={4} container direction="row">
            <img src={Logo} alt="logo" width={60} height={60} />
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'nunito-sans',
                fontSize: 24,
                fontWeight: 700,
                color: '#ad89f7',
                verticalAlign: 'center',
                lineHeight: '50px',
              }}
            >
              ChewCrew
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} direction="row" justifyContent="end">
            {isAuthenticated ? (
              <LogoutButton></LogoutButton>
            ) : (
              <LoginButton></LoginButton>
            )}
          </Grid>
        </Grid>
      </Box>
      <Grid container>
        <Grid item md={8}>
          <CategoryTabs
            userId={userId}
            restaurants={restaurants}
            startTimestamp={startTimestamp}
            endTimestamp={endTimestamp}
            price={price}
          ></CategoryTabs>
        </Grid>
        <Grid item xs={0} md={4}>
          <Container>
            <GoogleMap
              setData={setRestaurants}
              locationIds={restaurantLocationId}
            ></GoogleMap>
          </Container>
        </Grid>
      </Grid>
    </div>
  )
}

export default App
