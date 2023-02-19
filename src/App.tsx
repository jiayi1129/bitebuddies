import { useEffect, useState } from 'react'
import './App.css'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "../convex/_generated/react";
import { Id } from '../convex/_generated/dataModel'

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

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

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="App">
      <h1>Chew Crew</h1>
      <h3>{user?.nickname}</h3>
      {
        isAuthenticated 
        ? <LogoutButton></LogoutButton>
        : <LoginButton></LoginButton>
      }
    </div>
  )
}

export default App
