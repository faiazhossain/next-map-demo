"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
const MAP_KEY = process.env.NEXT_PUBLIC_MAP_API_ACCESS_TOKEN;
import Map, { GeolocateControl } from "react-map-gl/maplibre";

export default function Home() {
  const mapRef = useRef(null);
  const map = mapRef.current;
  const [centerPoint, setCenterPoint] = useState([]);
  const geoControlRef = useRef();

  useEffect(() => {
    if (map !== null && centerPoint?.length > 0) {
      // Fly to Center Point
      map?.flyTo({
        center: centerPoint,
        essential: true,
        zoom: 13,
      });
    }
  }, [centerPoint, map]);

  const clickToFly = () => {
    setCenterPoint([90.36402004477634, 23.823730671721]);
  };

  useEffect(() => {
    console.log("clicked");
    geoControlRef.current?.trigger();
  }, [centerPoint]);

  return (
    <main style={{ position: "relative" }}>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 90,
          latitude: 23,
          zoom: 6,
        }}
        style={{ width: "98vw", height: "94vh" }}
        mapStyle={`https://map.barikoi.com/styles/osm-liberty/style.json?key=${MAP_KEY}`}
      >
        <GeolocateControl style={{ fontSize: "48px" }} />
      </Map>
      <button
        style={{ position: "absolute", top: "20px" }}
        onClick={clickToFly}
      >
        Click to fly
      </button>
    </main>
  );
}
