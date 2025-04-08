import React, { useCallback, useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer, Libraries } from '@react-google-maps/api';
import { FaExternalLinkAlt } from 'react-icons/fa';

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

interface University {
  id: number;
  name: string;
  lat: number;
  lon: number;
}

interface Distance {
  id: number;
  university: University;
  yurume: number;
  otobus: number;
  tramvay: number;
}

interface Apart {
  id?: number;
  name?: string;
  lat: number;
  lon: number;
  distances?: Distance[];
}

interface LocationViewerProps {
  apart: Apart;
  height?: string;
  zoom?: number;
}

// Singleton pattern to ensure only one loader is created
const libraries: Libraries = ['places'];
const LOADER_OPTIONS = {
  id: 'google-map-script',
  googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  libraries
};

const LocationViewer: React.FC<LocationViewerProps> = ({ 
  apart, 
  height = '300px',
  zoom = 15 
}) => {
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  // console.log("detay directions:",directions);
  // Google Maps API yükleme durumu
  const { isLoaded } = useJsApiLoader(LOADER_OPTIONS);

  // Harita stili (custom yükseklik için)
  const mapStyle = {
    ...containerStyle,
    height
  };

  // Apartın koordinatları
  const apartLocation = apart?.lat && apart?.lon ? { lat: apart.lat, lng: apart.lon } : null;

  // Google Haritalar'ı aç
  const openInGoogleMaps = () => {
    if (apartLocation) {
      // Mobil cihazlarda çalışması için
      const url = `https://www.google.com/maps/search/?api=1&query=${apartLocation.lat},${apartLocation.lng}`;
      window.open(url, '_blank');
    }
  };

  // Haritanın sınırlarını ayarla ve her iki konumu da ortala
  useEffect(() => {
    if (isLoaded && mapRef.current && apartLocation && selectedUniversity) {
      try {
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(apartLocation.lat, apartLocation.lng));
        bounds.extend(new google.maps.LatLng(selectedUniversity.lat, selectedUniversity.lon));
        
        mapRef.current.fitBounds(bounds);
        
        // Çok yakın lokasyonlar için minimum zoom seviyesini ayarla
        const listener = google.maps.event.addListener(mapRef.current, 'idle', () => {
          try {
            const currentMap = mapRef.current;
            if (currentMap) {
              const zoom = currentMap.getZoom();
              if (zoom !== undefined && zoom > 16) {
                currentMap.setZoom(16);
              }
            }
          } catch (error) {
            console.error('Error setting zoom:', error);
          }
          google.maps.event.removeListener(listener);
        });
      } catch (error) {
        console.error('Error fitting bounds:', error);
      }
    }
  }, [selectedUniversity, apartLocation, isLoaded]);

  // Rota hesaplama
  useEffect(() => {
    if (isLoaded && selectedUniversity && apart && apart.lat && apart.lon) {
      try {
        const directionsService = new google.maps.DirectionsService();
        
        directionsService.route(
          {
            origin: { lat: apart.lat, lng: apart.lon },
            destination: { lat: selectedUniversity.lat, lng: selectedUniversity.lon },
            travelMode: google.maps.TravelMode.WALKING
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              console.error(`Directions request failed: ${status}`);
              setDirections(null);
            }
          }
        );
      } catch (error) {
        console.error('Error calculating directions:', error);
        setDirections(null);
      }
    } else {
      setDirections(null);
    }
  }, [selectedUniversity, apart, isLoaded]);

  // Map yüklendiğinde ve unmount olduğunda
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  
  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Üniversite seçildiğinde
  const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const uniId = parseInt(e.target.value);
    
    if (uniId && apart && apart.distances) {
      const selected = apart.distances.find(d => d.university.id === uniId)?.university || null;
      setSelectedUniversity(selected);
    } else {
      setSelectedUniversity(null);
    }
  };

  if (!isLoaded) {
    return <div className="flex items-center justify-center bg-gray-100 rounded-lg" style={{ height }}>Harita yükleniyor...</div>;
  }

  // Konum yoksa varsayılanı kullan ve uyarı göster
  const center = apartLocation || defaultCenter;

  return (
    <div className="flex flex-col gap-2 mt-2">
      {apart && apart.distances && apart.distances.length > 0 && (
        <div className="mb-2">
          <select 
            className="w-full p-2 rounded-md text-sm bg-gray-100 py-3"
            onChange={handleUniversityChange}
            defaultValue=""
          >
            <option value="">Üniversite seçiniz</option>
            {apart.distances.map(distance => (
              <option key={distance.university.id} value={distance.university.id}>
                {distance.university.name} ({distance.yurume} dk yürüme)
              </option>
            ))}
          </select>
        </div>
      )}
      
      
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
          {/* Apart konumu */}
          {apartLocation && (
            <Marker 
              position={apartLocation} 
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new google.maps.Size(32, 32)
              }}
              label={{
                text: "Apart",
                className: "text-xs font-bold"
              }}
            />
          )}
          
          {/* Seçili üniversite konumu */}
          {selectedUniversity && (
            <Marker 
              position={{ lat: selectedUniversity.lat, lng: selectedUniversity.lon }}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new google.maps.Size(32, 32)
              }}
              label={{
                text: "Üni",
                className: "text-xs font-bold"
              }}
            />
          )}
          
          {/* Yürüme rotası */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: '#4a90e2',
                  strokeWeight: 5
                }
              }}
            />
          )}
        </GoogleMap>
        
        {!apartLocation && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-lg">
            Konum bilgisi bulunmuyor
          </div>
        )}
        
        <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-600">
          {apartLocation ? `Lat: ${apartLocation.lat.toFixed(6)}, Lng: ${apartLocation.lng.toFixed(6)}` : 'Konum belirlenmemiş'}
        </div>
        
        {/* Google Haritalar'da Aç Butonu */}
        {apartLocation && (
          <button 
            onClick={openInGoogleMaps}
            className="absolute top-2 right-2 bg-white p-2 rounded-md shadow-md hover:bg-gray-100 transition-colors flex items-center gap-1"
            title="Google Haritalar'da Aç"
          >
            <FaExternalLinkAlt className="text-gray-700" />
            <span className="text-xs font-medium">Google Maps</span>
          </button>
        )}
      </div>
      
      {selectedUniversity && directions?.routes[0]?.legs[0] && (
        <div className="mt-2 text-xs bg-blue-50 p-2 rounded-md">
          <p className="font-bold">Yürüme Mesafesi: {directions.routes[0].legs[0].distance?.text || ''}</p>
          <p>Tahmini Süre: {directions.routes[0].legs[0].duration?.text || ''}</p>
        </div>
      )}
    </div>
  );
};

export default LocationViewer; 