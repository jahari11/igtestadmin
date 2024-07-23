import React, { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 
import iconUrl from '../assets/placeholder.png'; 
import "../styles/demo.css";

const Demo = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');
  const [map, setMap] = useState(null); 
  const [marker, setMarker] = useState(null); 

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/location/getAll');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setError('Failed to fetch locations');
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (locations.length === 0 || map !== null) return; 

    const leafletMap = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    
    }).addTo(leafletMap);

    setMap(leafletMap); 
  }, [locations, map]); 

  const handleCardClick = (latitude, longitude, name) => {
    if (map) {
      map.setView([latitude, longitude], 13); 
      if (marker) {
        map.removeLayer(marker); 
      }
      
      const customIcon = L.icon({
        iconUrl: iconUrl, 
        iconSize: [25, 41], 
        iconAnchor: [12, 41], 
        popupAnchor: [1, -34], 
      });
  
      const newMarker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map)
        .bindPopup(`<b>${name}</b>  `);
      
      setMarker(newMarker); 
    }
  };
  
  

  return (
    <div>
      <h1>Welcome to the Home</h1>
      <h2>List of Locations:</h2>
      {error && <p>{error}</p>}
      <div id="map" className="leaflet-map"></div>
      <ul className='card-box'>
        {locations.map(location => (
          <li key={location._id} onClick={() => handleCardClick(location.latitude, location.longitude, location.name)}>
            <div className="card">
               {location.name}<br />

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Demo;
