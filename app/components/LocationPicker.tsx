'use client'

import { useState, useCallback, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const defaultCenter = {
  lat: 10.7769,
  lng: 106.7009
}

interface Location {
  lat: number
  lng: number
  address: string
}

interface LocationPickerProps {
  onLocationSelect: (location: Location) => void
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null)

  useEffect(() => {
    // Khởi tạo Mapbox
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [defaultCenter.lng, defaultCenter.lat],
      zoom: 13
    })

    // Thêm controls
    map.addControl(new mapboxgl.NavigationControl())

    // Xử lý click trên map
    map.on('click', async (e) => {
      const { lng, lat } = e.lngLat

      // Xóa marker cũ nếu có
      if (marker) {
        marker.remove()
      }

      // Thêm marker mới
      const newMarker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map)
      setMarker(newMarker)

      // Chuyển đổi tọa độ thành địa chỉ
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
        )
        const data = await response.json()
        
        if (data.features && data.features.length > 0) {
          onLocationSelect({
            lat,
            lng,
            address: data.features[0].place_name
          })
        }
      } catch (error) {
        console.error('Geocoding error:', error)
      }
    })

    // Cleanup
    return () => map.remove()
  }, [onLocationSelect, marker])

  return (
    <div id="map" className="h-[400px] w-full rounded-lg overflow-hidden" />
  )
} 