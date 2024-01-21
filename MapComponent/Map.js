"use client";

// Import Components
import React, { useRef, useEffect, useState, useCallback } from "react";

// Import Styles
import "./Map.css";

// Provide the api key to your .env.local file
const MAP_KEY = process.env.NEXT_PUBLIC_MAP_API_ACCESS_TOKEN;

const MapGL = () => {
  // States
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [lng] = useState(90.36402);
  const [lat] = useState(23.823731);
  const [zoom] = useState(13);
  const [API_KEY] = useState(MAP_KEY);
  const [markerData, setMarkerData] = useState([
    {
      longitude: 90.36408032377143,
      latitude: 23.82374446922343,
      type: 'default'
    },
    {
      longitude: 90.36521608172615,
      latitude: 23.818266581635168,
      type: 'food'
    }
  ])

  // Create Marker Instance
  const _createMarker = useCallback((data) => {
    if (!data) {
      return null
    }

    if (!data.longitude || !data.latitude) {
      return null
    }

    const lngLat = [data.longitude, data.latitude]

    // Create Marker Element
    const markerElement = _createMarkerElement(data)

    // Add Marker
    const marker = new window.bkoigl.Marker(markerElement)
      .setLngLat(lngLat)

    return { marker, data }
  }, [])


  // Render Markers
  const _renderMarkers = useCallback((markerData) => {
    if (!markerData || markerData.length <= 0) {
      return
    }

    // Create Markers
    markerData.forEach((m) => {
      const marker = _createMarker(m)
      if (marker && marker.marker) {
        marker.marker.addTo(mapRef.current)
      }
    })
  }, [_createMarker])


  // Create Marker Element
  const _createMarkerElement = (data) => {
    let iconFile = 'default.png'
    const type = data && data.type ? data.type.split(',')[0].toLowerCase() : ''

    if (!iconFile) {
      return null
    }

    if (type) {
      iconFile = `${type}.png`
    }


    // Create a DOM element for marker
    const icon = document.createElement('img')
    icon.className = 'maplibregl-marker'
    icon.src = `/icons/${iconFile}`
    icon.style.width = iconFile === 'default.png' ? '45px' : '22px'
    icon.style.height = iconFile === 'default.png' ? '45px' : '30px'
    icon.style.cursor = 'pointer'

    return icon
  }

  // Create Map
  const _createMap = useCallback(() => {
    mapRef.current = new window.bkoigl.Map({
      container: mapContainerRef.current,
      style: `https://map.barikoi.com/styles/osm-liberty/style.json`,
      center: [lng, lat],
      zoom: zoom,
      accessToken: `${API_KEY}`,
    });

    // Add Controls
    mapRef.current.addControl(new window.bkoigl.NavigationControl(), 'bottom-right')
    mapRef.current.addControl(new window.bkoigl.FullscreenControl())

    _renderMarkers(markerData)

  }, [lng, lat, zoom, API_KEY, markerData, _renderMarkers])


  // On Load Render Intial Map
  useEffect(() => {
    _createMap();
    return () => {
      _destroyMap();
    }
  }, [API_KEY, lng, lat, zoom, _createMap]);

  // Destroy Map
  const _destroyMap = () => {
    // Remove Map Instance
    mapRef.current.remove()
  }

  return (
    <div className="map-wrap">
      <div ref={mapContainerRef} className="map" />
    </div>
  );
}
export default MapGL