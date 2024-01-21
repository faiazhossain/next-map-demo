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

    // On Load
    mapRef.current.on("load", () => {
      // Add marker
      const marker = new window.bkoigl.Marker({
        draggable: true, // if you want to drag the marker
        color: "green",
      })
        .setLngLat([lng, lat])
        .setRotation(10) // if you want to rotate the marker
        .addTo(mapRef.current);
    });
  }, [API_KEY, lat, lng, zoom])

  // Destroy Map
  const _destroyMap = () => {
    // Remove Map Instance
    mapRef.current.remove()
  }

  useEffect(() => {
    _createMap();
    return () => {
      _destroyMap();
    }
  }, [API_KEY, lng, lat, zoom, _createMap]);

  return (
    <div className="map-wrap">
      <div ref={mapContainerRef} className="map" />
    </div>
  );
}
export default MapGL