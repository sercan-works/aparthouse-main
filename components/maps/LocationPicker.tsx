import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Input, Button } from '@heroui/react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

// API anahtarı
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// Merkez konum (varsayılan: Türkiye)
const defaultCenter = {
  lat: 39.9334,
  lng: 32.8597
};

// Harita konteyner stili
const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem'
};

interface LocationPickerProps {
  initialLocation?: { lat: number; lng: number } | null;
  onLocationChange: (location: { lat: number; lng: number }) => void;
  address?: string;
  onAddressChange?: (address: string) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ 
  initialLocation, 
  onLocationChange,
  address = '',
  onAddressChange
}) => {
  // Google Maps API yükleme durumu
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  // State tanımları
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
    initialLocation || defaultCenter
  );
  const [searchAddress, setSearchAddress] = useState<string>(address || '');

  // Geocoder referansı
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  // Map yüklendiğinde
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    if (!geocoderRef.current && window.google) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, []);

  // Map unmount olduğunda
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Haritada tıklama olayı
  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPosition = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setMarkerPosition(newPosition);
      onLocationChange(newPosition);

      // Tıklanan konumun adresini bul
      if (geocoderRef.current) {
        geocoderRef.current.geocode({ location: newPosition }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const newAddress = results[0].formatted_address;
            setSearchAddress(newAddress);
            if (onAddressChange) {
              onAddressChange(newAddress);
            }
          }
        });
      }
    }
  }, [onLocationChange, onAddressChange]);

  // Adrese göre konum arama
  const searchLocation = useCallback(() => {
    if (!geocoderRef.current || !searchAddress) return;

    geocoderRef.current.geocode({ address: searchAddress }, (results, status) => {
      if (status === 'OK' && results && results[0] && results[0].geometry && results[0].geometry.location) {
        const newPosition = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        };
        
        setMarkerPosition(newPosition);
        onLocationChange(newPosition);
        
        // Haritayı yeni konuma kaydır
        if (map) {
          map.panTo(newPosition);
          map.setZoom(15);
        }
      }
    });
  }, [map, searchAddress, onLocationChange]);

  // İlk yükleme ve initialLocation değiştiğinde marker pozisyonunu güncelle
  useEffect(() => {
    if (initialLocation) {
      setMarkerPosition(initialLocation);
    }
  }, [initialLocation]);

  // Enter tuşuna basıldığında arama yap
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchLocation();
    }
  };

  // Adres değiştiğinde güncelle
  useEffect(() => {
    if (address !== searchAddress && address) {
      setSearchAddress(address);
    }
  }, [address]);

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">Harita yükleniyor...</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          type="text"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Adres girin ve arayın"
          startContent={<FaMapMarkerAlt className="text-default-400" />}
          className="flex-grow"
        />
        <Button
          color="primary"
          startContent={<FaSearch />}
          onPress={searchLocation}
        >
          Ara
        </Button>
      </div>
      <div className="relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition || defaultCenter}
          zoom={13}
          onClick={handleMapClick}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {markerPosition && <Marker position={markerPosition} draggable={true} onDragEnd={(e) => {
            if (e.latLng) {
              const newPosition = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
              };
              setMarkerPosition(newPosition);
              onLocationChange(newPosition);
            }
          }} />}
        </GoogleMap>
        <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-600">
          {markerPosition ? `Lat: ${markerPosition.lat.toFixed(6)}, Lng: ${markerPosition.lng.toFixed(6)}` : 'Konum seçilmedi'}
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Konum seçmek için haritada bir noktaya tıklayın veya adres arayın. Marker&apos;ı sürükleyerek daha hassas konumlandırma yapabilirsiniz.
      </p>
    </div>
  );
};

export default LocationPicker; 