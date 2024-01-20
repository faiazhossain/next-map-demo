"use client";
import React, { useRef, useEffect, useState } from "react";
import "./Map.css";

const MAP_KEY = process.env.NEXT_PUBLIC_MAP_API_ACCESS_TOKEN;
export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(90.36402);
  const [lat] = useState(23.823731);
  const [zoom] = useState(13);
  const [API_KEY] = useState(MAP_KEY);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new window.bkoigl.Map({
      container: mapContainer.current,
      style: `https://map.barikoi.com/styles/osm-liberty/style.json`,
      center: [lng, lat],
      zoom: zoom,
      accessToken: `${API_KEY}`,
    });
  }, [API_KEY, lng, lat, zoom]);

  useEffect(() => {
    map.current.on("load", () => {
      const marker = new window.bkoigl.Marker({
        draggable: true,
        color: "green",
      })
        .setLngLat([lng, lat])
        .addTo(map.current);
      // .setRotation(45); // if you want to rotate the marker
    });
  });
  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" id="map" />
    </div>
  );
}
