"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css';
const MAP_KEY = process.env.NEXT_PUBLIC_MAP_API_ACCESS_TOKEN;
import Map, {GeolocateControl,GeolocateResultEvent} from 'react-map-gl/maplibre';

export default function Home() {
  const mapRef = useRef(null)
  const map = mapRef.current
  const [centerPoint,setCenterPoint] = useState([]);
  const geoControlRef = useRef();

  useEffect(() => {
    if (map !== null && centerPoint?.length > 0) {
      // Fly to Center Point
      map?.flyTo({
        center: centerPoint,
        essential: true,
        zoom: 13
      })
    }
  }, [centerPoint, map])


  
  useEffect(() => {
    // Add Barikoi marker on map load
    if (map) {
      const marker = new bkoigl.Marker({ draggable: true })
        .setLngLat([90.3938010872331, 23.821600277500405])
        .addTo(map);
    }
  }, [map]);

  const clickToFly = ()=>{
    setCenterPoint([90.36402004477634, 23.823730671721]);
  }

  useEffect(() => {
    console.log('clicked')
    geoControlRef.current?.trigger();
  }, [centerPoint]);

  const clickedLocation = ()=>{
    console.log('clicked')
  }
  return (
    <main>
      <Map
      // ref={ mapRef }
      initialViewState={{
        longitude: 90,
        latitude: 23,
        zoom: 6
      }}
      style={{width: '98vw', height: '98vh'}}
      mapStyle="https://map.barikoi.com/styles/osm-liberty/style.json?key=NDE2NzpVNzkyTE5UMUoy"
    >
      <GeolocateControl style={{fontSize:"48px"}}/>
      </Map>   
    <button onClick={clickToFly}>Click</button>
    </main>
  )
}
