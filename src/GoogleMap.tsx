import { useState, memo, useEffect } from 'react'
import {
  GoogleMap,
  MarkerF,
  Autocomplete,
  useJsApiLoader,
} from '@react-google-maps/api'
import {
  getPlaceById,
  PlaceGeometry,
  Map,
  SearchBox,
  getPlacesByProximity,
} from './services/mapService'
import { debounce } from 'lodash'

type Libraries = (
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'places'
  | 'visualization'
)[]
export interface Place {
  location: string
  name: string
  price: number
  geometry: PlaceGeometry
  address: string
  url: string
}

const containerStyle = {
  width: '100%',
  height: '100vh',
}

const defaultZoom = 13

const GOOGLE_MAPS_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const LIBRARIES: Libraries = ['places']

function SimpleMap({
  setData,
  locationIds,
}: {
  setData: React.Dispatch<React.SetStateAction<Place[]>>
  locationIds: string[]
}) {
  console.log({ GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_MAP_ID, LIBRARIES })
  const { isLoaded } = useJsApiLoader({
    id: GOOGLE_MAPS_MAP_ID,
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  })

  const [map, setMap] = useState<Map | null>(null)
  const [searchBox, setSearchBox] = useState<SearchBox | null>(null)
  const [places, setPlaces] = useState<Place[]>([])
  const [inputValue, setInputValue] = useState('')
  const [selectedRestaurant, setSelectedRestaurant] = useState<Place | null>(
    null
  )
  const [center, setCenter] = useState({
    lat: 37.442443,
    lng: -122.143363,
  })
  // Create a bounding box with sides ~10km away from the center point
  const [defaultBounds, setDefaultBounds] = useState({
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  })

  // Marker Stuff
  // TODO: Query DB for placeIds
  const [placeIds, setPlaceIds] = useState(locationIds)

  const fetchRestaurants = async (currentMap: Map) => {
    if (!currentMap) {
      return
    }
    const restaurants = await Promise.all<Place>(
      placeIds.map(async (placeId) => {
        const restaurant = await getPlaceById(currentMap, placeId)
        return {
          location: placeId,
          name: restaurant.name || '',
          price: restaurant.price_level || 0,
          geometry: restaurant.geometry!!,
          address: restaurant.vicinity || '',
          url: restaurant.photos
            ? restaurant.photos.length
              ? restaurant.photos[0].getUrl()
              : ''
            : '',
        }
      })
    )
    return restaurants
  }

  const getAllRestaurants = async (initialMap: Map) => {
    const currentLocation = initialMap.getCenter()
    if (!currentLocation) {
      return
    }
    const nearbyRestaurants = await getPlacesByProximity(
      initialMap,
      currentLocation
    )
    console.log('initial restaurant', { ...nearbyRestaurants })

    const parsedRestaurants = nearbyRestaurants.map<Place>((restaurant) => {
      return {
        location: restaurant.place_id || '',
        name: restaurant.name || '',
        price: restaurant.price_level || 0,
        geometry: restaurant.geometry!!,
        address: restaurant.vicinity || '',
        url: restaurant.photos
          ? restaurant.photos.length
            ? restaurant.photos[0].getUrl()
            : ''
          : '',
      }
    })
    const existingRestaurants = (await fetchRestaurants(initialMap)) || []
    return [...parsedRestaurants, ...existingRestaurants]
  }

  // Google Map Stuff
  const onLoad = async (initialMap: Map) => {
    setMap(initialMap)
    if (!map) {
      const allRestaurants = (await getAllRestaurants(initialMap)) || []
      console.log({ ...allRestaurants })
      setPlaces(allRestaurants)
      setData(allRestaurants)
    }
  }
  // TODO: P2: Set search radius
  // const onBoundsChanged = debounce(() => {
  //   console.log('Bound changed', map)
  //   if (!map || !searchBox) {
  //     return
  //   }
  //   const currentCenter = map.getCenter()
  //   if (!currentCenter) {
  //     return
  //   }
  //   searchBox.setBounds({
  //     north: currentCenter.lat() + 0.1,
  //     south: currentCenter.lat() - 0.1,
  //     east: currentCenter.lng() + 0.1,
  //     west: currentCenter.lng() - 0.1,
  //   })
  // }, 500)
  const onDragEnd = debounce(async () => {
    if (!map) {
      return
    }
    const currentLocation = map.getCenter()
    if (!currentLocation) {
      return
    }
    const allRestaurants = (await getAllRestaurants(map)) || []
    console.log('DragEnd:', { ...allRestaurants })

    setPlaces(allRestaurants)
    setData(allRestaurants)
  }, 1000)

  // Search Box Stuff
  const onLoadSearchBox = (initialSearchBox: SearchBox) => {
    setSearchBox(initialSearchBox)
  }
  const onPlaceChanged = () => {
    if (!searchBox) {
      return
    }
    const restaurant = searchBox.getPlace()
    console.log({ ...restaurant })

    // Center map on target restaurant
    map?.setCenter(restaurant.geometry?.location!!)
    setSelectedRestaurant({
      location: restaurant.place_id || '',
      name: restaurant.name || '',
      price: restaurant.price_level || 0,
      geometry: restaurant.geometry!!,
      address: restaurant.vicinity || '',
      url: restaurant.photos
        ? restaurant.photos.length
          ? restaurant.photos[0].getUrl()
          : ''
        : '',
    })

    // Clear input value
    setInputValue('')
  }

  const onUnmount = (map: Map) => {
    setMap(null)
    setSearchBox(null)
  }

  useEffect(() => {
    if (map) {
      console.log('use effect')
      const restaurants = fetchRestaurants(map)
      console.log({ ...restaurants })
    }
  }, [placeIds])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={defaultZoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ scrollwheel: true, mapId: 'fc87e1217f0a713a' }}
      onDragEnd={onDragEnd}
      // onBoundsChanged={onBoundsChanged}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {map &&
        places.map((place, index) => (
          <MarkerF
            key={index}
            position={place.geometry.location!!}
            icon={'https://maps.google.com/mapfiles/kml/pal2/icon13.png'}
            onClick={() => {
              alert(`Marker clicked: ${place.name}`)
            }}
          ></MarkerF>
        ))}
      {selectedRestaurant && (
        <MarkerF
          position={selectedRestaurant.geometry.location!!}
          icon={'https://maps.google.com/mapfiles/kml/pal2/icon11.png'}
          onClick={() => {
            alert(`Marker clicked: ${selectedRestaurant.name}`)
          }}
        ></MarkerF>
      )}
    </GoogleMap>
  ) : (
    // TODO: Add a nice loader here
    <div>Loading...</div>
  )
}

export default memo(SimpleMap)
