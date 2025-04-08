
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Need to fix the icon paths issue with Leaflet in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const HeatMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    
    // Initialize the map
    const map = L.map(mapRef.current).setView([20, 0], 2);
    mapInstanceRef.current = map;
    
    // Add the base map layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Sample data points (would be replaced with actual ACLED data in production)
    const heatData = [
      // Africa
      [0.3476, 32.5825, 0.9],   // Uganda
      [9.145, 40.4897, 0.8],     // Ethiopia
      [9.0820, 8.6753, 0.7],     // Nigeria
      [-1.9403, 29.8739, 0.6],   // Rwanda
      [6.4281, 3.4219, 0.7],     // Lagos
      
      // Middle East
      [33.8547, 35.8623, 0.9],   // Lebanon
      [33.3128, 44.3615, 0.8],   // Baghdad
      [36.2021, 37.1343, 0.9],   // Aleppo
      [15.3694, 44.1910, 0.8],   // Yemen
      
      // Asia
      [34.5553, 69.2075, 0.8],   // Kabul
      [23.8103, 90.4125, 0.5],   // Bangladesh
      [33.6844, 73.0479, 0.6],   // Pakistan
      [21.0285, 105.8542, 0.3],  // Vietnam
      
      // Europe
      [50.4501, 30.5234, 0.8],   // Ukraine
      [44.4268, 26.1025, 0.3],   // Romania
      [41.0082, 28.9784, 0.4],   // Istanbul
      
      // Americas
      [4.5709, -74.2973, 0.7],   // Colombia
      [19.4326, -99.1332, 0.6],  // Mexico
      [-16.2902, -63.5887, 0.5], // Bolivia
      
      // Additional points with varying intensities
      [34.0522, -118.2437, 0.4], // Los Angeles
      [40.7128, -74.0060, 0.5],  // New York
      [51.5074, -0.1278, 0.3],   // London
      [48.8566, 2.3522, 0.2],    // Paris
      [55.7558, 37.6173, 0.4],   // Moscow
      [39.9042, 116.4074, 0.6],  // Beijing
      [35.6762, 139.6503, 0.5],  // Tokyo
    ];
    
    // Create the heatmap layer
    L.heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 10,
      minOpacity: 0.4,
      gradient: {
        0.4: 'blue',
        0.6: 'cyan',
        0.7: 'lime',
        0.8: 'yellow',
        1.0: 'red'
      }
    }).addTo(map);
    
    // Add zoom controls
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);
    
    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);
  
  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px]">
      <div ref={mapRef} className="w-full h-full z-10" />
      
      <div className="title-box absolute top-5 left-5 sm:top-12 sm:left-12 w-64 sm:w-80 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md border border-gray-200 z-20">
        <h3 className="text-lg font-bold text-gray-800 m-0">Global Violence Events Heatmap</h3>
        <p className="text-sm text-gray-600 mt-2 mb-0">Period: November 2024</p>
        <p className="text-sm text-gray-600 mt-1 mb-0">Data Source: ACLED</p>
      </div>
      
      <div className="legend absolute bottom-5 right-5 sm:bottom-12 sm:right-12 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md border border-gray-200 z-20">
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-blue-600 rounded mr-3"></div>
            <span className="text-sm text-gray-700">Low Intensity</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-green-500 rounded mr-3"></div>
            <span className="text-sm text-gray-700">Medium Intensity</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-yellow-400 rounded mr-3"></div>
            <span className="text-sm text-gray-700">High Intensity</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-red-500 rounded mr-3"></div>
            <span className="text-sm text-gray-700">Very High Intensity</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
