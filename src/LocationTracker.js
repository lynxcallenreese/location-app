// src/LocationTracker.js

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const LocationTracker = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (err) => {
        setError(err.message);
        console.error(err);
      },
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!position) {
    return <p>Loading...</p>;
  }

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationTracker;
