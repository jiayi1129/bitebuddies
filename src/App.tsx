import { useEffect, useState } from 'react'
import './App.css'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "../convex/_generated/react";
import { Id } from '../convex/_generated/dataModel'
import { Box, Container, Grid } from '@mui/material';
import CategoryTabs from './components/home/CategoryTabs';
import GoogleMap from './GoogleMap';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const createGroup = useMutation("createGroup");

  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const storeUser = useMutation("storeUser");
  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const id = await storeUser();
      setUserId(id);
    }
    createUser();
    return () => setUserId(null);
  }, [storeUser]);

  return (
    <div className="App">
      <Box sx={{ mb: 3 }}>
        <Grid container direction="row">

        <h1>Chew Crew</h1>&nbsp;
        <button onClick={() => createGroup()}>Create Group</button>&nbsp;
        {
          isAuthenticated 
          ? <LogoutButton></LogoutButton>
          : <LoginButton></LoginButton>
        }
        <h3>{user?.nickname}</h3>
        </Grid>
      </Box>
      <Grid container>
        <Grid item md={8}>
          <CategoryTabs userId={userId}></CategoryTabs>
        </Grid>
        <Grid item xs={0} md={4}>
          <Container>
            <GoogleMap></GoogleMap>
          </Container>
        </Grid>
      </Grid>
    </div>
  )
}

export default App