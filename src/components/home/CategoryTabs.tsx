import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import GroupCardsContainer from './GroupCardsContainer'
import RestaurantCardsContainer from './RestaurantCardsContainer'
import { Document, Id } from '../../../convex/_generated/dataModel'
import { Place } from '../../GoogleMap'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function CategoryTabs({
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
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Groups" {...a11yProps(0)} />
          <Tab label="Restaurants" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <GroupCardsContainer
          startTimestamp={startTimestamp}
          endTimestamp={endTimestamp}
          price={price}
          userId={userId}
        ></GroupCardsContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RestaurantCardsContainer
          startTimestamp={BigInt(1676768868)}
          endTimestamp={BigInt(1676768870)}
          price={BigInt(2)}
          userId={userId}
          restaurants={restaurants}
        ></RestaurantCardsContainer>
      </TabPanel>
    </Box>
  )
}
