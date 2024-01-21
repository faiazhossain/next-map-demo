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
      type: "default",
    },
    {
      longitude: 90.36521608172615,
      latitude: 23.818266581635168,
      type: "food",
    },
  ]);

  // Create Map
  const _createMap = useCallback(() => {
    mapRef.current = new window.bkoigl.Map({
      container: mapContainerRef.current,
      style: `https://map.barikoi.com/styles/osm-liberty/style.json`,
      center: [lng, lat],
      zoom: zoom,
      accessToken: `${API_KEY}`,
    });
    // Add Popup
    const popup = new window.bkoigl.Popup({ focusAfterOpen: false });
    addPopup(popup, "<h3>Barikoi HQ</h3>", 90.36402, 23.823731);
    // Add Controls
    mapRef.current.addControl(
      new window.bkoigl.NavigationControl(),
      "bottom-right"
    );
    mapRef.current.addControl(new window.bkoigl.FullscreenControl());

    mapRef.current.on("click", (e) => {
      const popup = new window.bkoigl.Popup({ focusAfterOpen: false });
      addPopup(popup, "<h3>Barikoi HQ</h3>", 90.36402, 23.823731);
    });
    //This code block is for map on click POI popup change if you want to see the effect uncomment the code block from 58-71 and comment the code block from 52-55

    // mapRef.current.on("click", (e) => {
    //   const feature = mapRef.current.queryRenderedFeatures(e.point);
    //   console.log(feature);
    //   if (feature.length > 0 && feature[0].properties.name_en) {
    //     const lng = e.lngLat.wrap().lng;
    //     const lat = e.lngLat.wrap().lat;
    //     if (feature) {
    //       const popupContent = `<h3>${
    //         feature[0].properties.name_en || feature[0].properties.name_en
    //       }</h3>`;
    //       addPopup(popup, popupContent, lng, lat);
    //     }
    //   }
    // });
    // Add Popup
    function addPopup(popup, content, lng, lat) {
      popup
        .setLngLat([lng, lat])
        .setHTML(content)
        .addTo(mapRef.current)
        .setMaxWidth("200px");
    }
  }, [lng, lat, zoom, API_KEY, markerData]);

  // On Load Render Intial Map
  useEffect(() => {
    _createMap();
    return () => {
      _destroyMap();
    };
  }, [API_KEY, lng, lat, zoom, _createMap]);

  // Destroy Map
  const _destroyMap = () => {
    // Remove Map Instance
    mapRef.current.remove();
  };

  return (
    <div className="map-wrap">
      <div ref={mapContainerRef} className="map" />
    </div>
  );
};
export default MapGL;
