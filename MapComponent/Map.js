"use client";

// Import Components
import React, { useRef, useEffect, useState, useCallback } from "react";
import MapboxDraw from '@mapbox/mapbox-gl-draw'

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
  const [polygon, setPolygon] = useState({});

  // Create Map
  const _createMap = useCallback(() => {
    mapRef.current = new window.bkoigl.Map({
      container: mapContainerRef.current,
      style: `https://map.barikoi.com/styles/osm-liberty/style.json`,
      center: [lng, lat],
      zoom: zoom,
      accessToken: `${API_KEY}`,
    });

    // Add Draw Feature
    const Draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    })

    // Add Controls
    mapRef.current.addControl(Draw, 'top-right') // Draw Control
    mapRef.current.addControl(new window.bkoigl.NavigationControl(), 'bottom-right')
    mapRef.current.addControl(new window.bkoigl.FullscreenControl())

    // Disable Double Click Zoom Feature
    mapRef.current.doubleClickZoom.disable()

    // Create Polygon
    mapRef.current.on('draw.create', () => {
      const data = Draw.getAll()
      setPolygon(data)
    })


    // Update Polygon
    mapRef.current.on('draw.update', () => {
      const data = Draw.getAll()
      setPolygon(data)
    })

    // Delete Polygon
    mapRef.current.on('draw.delete', () => {
      setTimeout(() => {
        Draw.deleteAll()
        setPolygon({})
      }, 0)
    })

  }, [lng, lat, zoom, API_KEY])

  // Destroy Map
  const _destroyMap = useCallback(() => {
    // Remove Map Instance
    mapRef.current.remove()
  }, [])


  // On Load Render Intial Map
  useEffect(() => {
    _createMap();
    return () => {
      _destroyMap();
    }
  }, [API_KEY, lng, lat, zoom, _createMap, _destroyMap]);

  return (
    <div className="map-wrap">
      <div ref={mapContainerRef} className="map" />
    </div>
  );
}
export default MapGL