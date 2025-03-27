import React, { useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// API anahtarı
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// Türkiye'nin merkezi (varsayılan konum olarak)
const defaultCenter = {
  lat: 39.9334,
  lng: 32.8597
};

// Harita konteyner stili
const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '0.5rem'
};

interface LocationViewerProps {
  location: { lat: number; lng: number } | null;
  height?: string;
  zoom?: number;
}

const LocationViewer: React.FC<LocationViewerProps> = ({ 
  location, 
  height = '300px',
  zoom = 15 
}) => {
  // Google Maps API yükleme durumu
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  // Harita stili (custom yükseklik için)
  const mapStyle = {
    ...containerStyle,
    height
  };

  // Map yüklendiğinde ve unmount olduğunda (boş işlevler)
  const onLoad = useCallback((map: google.maps.Map) => {}, []);
  const onUnmount = useCallback(() => {}, []);

  if (!isLoaded) {
    return <div className="flex items-center justify-center bg-gray-100 rounded-lg" style={{ height }}>Harita yükleniyor...</div>;
  }

  // Konum yoksa varsayılanı kullan ve uyarı göster
  const center = location || defaultCenter;

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={mapStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: true,
          clickableIcons: false,
          draggable: true,
          scrollwheel: false
        }}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
      {!location && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-lg">
          Konum bilgisi bulunmuyor
        </div>
      )}
      <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-600">
        {location ? `Lat: ${location.lat.toFixed(6)}, Lng: ${location.lng.toFixed(6)}` : 'Konum belirlenmemiş'}
      </div>
    </div>
  );
};

export default LocationViewer; 