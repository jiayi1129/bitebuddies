import { Marker } from '@react-google-maps/api'

export type PlaceService = google.maps.places.PlacesService
export type PlaceDetailsRequest = google.maps.places.PlaceDetailsRequest
export type PlaceSearchRequest = google.maps.places.PlaceSearchRequest
export type PlaceResult = google.maps.places.PlaceResult
export type Map = google.maps.Map
export type SearchBox = google.maps.places.Autocomplete
export type PlaceGeometry = google.maps.places.PlaceGeometry
export type Location = google.maps.LatLng

export function getPlaceById(map: Map, id: string) {
  const service: PlaceService = new window.google.maps.places.PlacesService(map)
  const request: PlaceDetailsRequest = {
    placeId: id,
    fields: [
      'name',
      'rating',
      'price_level',
      'geometry',
      'vicinity',
      'photos',
      'url',
    ],
  }
  return new Promise<PlaceResult>((resolve, reject) => {
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        resolve(place)
      } else {
        reject(new Error(`Failed to get place details for ID ${id}`))
      }
    })
  })
}

export function getPlacesByProximity(map: Map, location: Location) {
  const service: PlaceService = new window.google.maps.places.PlacesService(map)
  const request: PlaceSearchRequest = {
    location: location,
    radius: 30000,
    type: 'restaurant',
  }

  return new Promise<PlaceResult[]>((resolve, reject) => {
    service.nearbySearch(request, (places, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && places) {
        resolve(places)
      } else {
        reject(new Error(`Failed to get nearby place for location ${location}`))
      }
    })
  })
}
