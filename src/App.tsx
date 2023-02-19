import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import NavBar from './components/navBar'
import ResponsiveDateTimePickers from './components/dateTimePicker'
import SearchBar from './components/searchBar'
import Container from '@mui/material/Container'
import { Grid, InputBase } from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import PriceDropdown from './components/priceDropdown'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <NavBar></NavBar>
      <h1>Welcome!</h1>
      <div className='App'>
      <Grid container direction="row" justifyContent="space-between">
        <Toolbar>
          <SearchBar></SearchBar>
        </Toolbar>
        <Toolbar>
          <ResponsiveDateTimePickers></ResponsiveDateTimePickers>
        </Toolbar>
        <Toolbar>
          <PriceDropdown></PriceDropdown>
        </Toolbar>
      </Grid>
      </div>
    </div>
  )
}

export default App