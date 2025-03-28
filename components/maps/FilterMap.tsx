import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer, Libraries } from '@react-google-maps/api';
import { FaExternalLinkAlt, FaUniversity } from 'react-icons/fa';
import { ApiApart } from '@/store/api/apartsApi';
import { useRouter } from 'next/navigation';
import { useGetUniversitiesQuery } from '@/store/api/filterApi';
import Loading from '../ui/Loading';

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
  height: '100%',
  borderRadius: '0.5rem'
};

// ApiApart içindeki university tipi için özel bir interface
interface ApiUniversity {
  id: number;
  name: string;
}

// Harita üzerinde gösterilecek üniversite
interface MapUniversity extends ApiUniversity {
  lat: number;
  lon: number;
}

interface FilterMapProps {
  aparts?: ApiApart[];
  height?: string;
  selectedApart?: ApiApart | null;
  onApartSelect?: (apart: ApiApart) => void;
}

// Singleton pattern to ensure only one loader is created
const libraries: Libraries = ['places'];
const LOADER_OPTIONS = {
  id: 'google-map-script',
  googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  libraries
};

const FilterMap: React.FC<FilterMapProps> = ({ 
  aparts = [], 
  height = '100%',
  selectedApart = null,
  onApartSelect
}) => {
  const router = useRouter();
  const [selectedUniversity, setSelectedUniversity] = useState<MapUniversity | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [activeApart, setActiveApart] = useState<ApiApart | null>(selectedApart);
  const mapRef = useRef<google.maps.Map | null>(null);
  const { data: universities } = useGetUniversitiesQuery();


  // Geliştirme için konsola verileri kaydet
  useEffect(() => {
    console.log('FilterMap received aparts:', aparts);
    if (aparts.length > 0) {
      console.log('First apart location:', 
        aparts[0].lat ? { lat: aparts[0].lat, lng: aparts[0].lon } : 'No location data');
    }
  }, [aparts]);

  // Geçerli koordinatları olan apartları filtrele
  const validAparts = useMemo(() => {
    return aparts.filter(apart => {
      // Koordinat değerlerinin geçerli olup olmadığını kontrol et
      const isValidLat = apart.lat && typeof apart.lat === 'number' && 
                         apart.lat > -90 && apart.lat < 90;
      const isValidLon = apart.lon && typeof apart.lon === 'number' && 
                         apart.lon > -180 && apart.lon < 180;
      
      return isValidLat && isValidLon;
    });
  }, [aparts]);

  // Google Maps API yükleme durumu
  const { isLoaded } = useJsApiLoader(LOADER_OPTIONS);

  // Harita stili (custom yükseklik için)
  const mapStyle = {
    ...containerStyle,
    height
  };

  // Fitrelenmiş apartların sınırlarını hesapla
  useEffect(() => {
    if (isLoaded && mapRef.current && validAparts && validAparts.length > 0) {
      try {
        const bounds = new google.maps.LatLngBounds();
        let validLocationsCount = 0;
        
        validAparts.forEach(apart => {
          if (apart.lat && apart.lon) {
            bounds.extend(new google.maps.LatLng(apart.lat, apart.lon));
            validLocationsCount++;
          }
        });
        
        if (validLocationsCount > 0) {
          // Eğer sadece bir konum varsa, daha yakın zoom yapalım
          if (validLocationsCount === 1) {
            mapRef.current.setCenter(bounds.getCenter());
            mapRef.current.setZoom(14); // Tek konum için daha uygun zoom
          } else {
            // Daha fazla padding ekle
            const padRatio = 0.4; // Yüzde 40 padding
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            const latDiff = Math.abs(ne.lat() - sw.lat()) * padRatio;
            const lngDiff = Math.abs(ne.lng() - sw.lng()) * padRatio;
            
            bounds.extend(new google.maps.LatLng(ne.lat() + latDiff, ne.lng() + lngDiff));
            bounds.extend(new google.maps.LatLng(sw.lat() - latDiff, sw.lng() - lngDiff));
            
            // Yeni bounds'u uygula
            mapRef.current.fitBounds(bounds);
            
            // Zoom sınırlaması (daha düşük maksimum zoom = daha geniş görünüm)
            google.maps.event.addListenerOnce(mapRef.current, 'bounds_changed', () => {
              const currentZoom = mapRef.current?.getZoom();
              // Maksimum zoom'u 11 olarak sınırla (daha geniş görünüm için)
              if (currentZoom !== undefined && currentZoom > 14) {
                mapRef.current?.setZoom(14);
              }
            });
          }
        }
      } catch (error) {
        console.error('Error fitting bounds:', error);
      }
    } else if (isLoaded && mapRef.current) {
      // Hiç apart yoksa Türkiye'yi göster
      mapRef.current.setCenter(defaultCenter);
      mapRef.current.setZoom(6); // Türkiye genel görünümü
    }
  }, [validAparts, isLoaded]);

  // Apartın seçilmesi durumunda güncelle ve haritayı ortala
  useEffect(() => {
    setActiveApart(selectedApart);
    
    // Seçilen apart değiştiğinde haritayı o aparta odakla
    if (isLoaded && mapRef.current && selectedApart && selectedApart.lat && selectedApart.lon) {
      const position = new google.maps.LatLng(selectedApart.lat, selectedApart.lon);
      mapRef.current.panTo(position);
      mapRef.current.setZoom(15);
    }
  }, [selectedApart, isLoaded]);

  // Apart marker'ın animasyonunu kontrol etmek için state ve useEffect
  const [showAnimation, setShowAnimation] = useState(false);
  
  useEffect(() => {
    if (activeApart) {
      setShowAnimation(true);
      // 2 saniye sonra animasyonu durdur
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeApart]);

  // Üniversite ve apart seçildiğinde rota hesaplama
  useEffect(() => {
    if (isLoaded && selectedUniversity && activeApart && activeApart.lat && activeApart.lon) {
      try {
        const directionsService = new google.maps.DirectionsService();
        
        directionsService.route(
          {
            origin: { lat: activeApart.lat, lng: activeApart.lon },
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
  }, [selectedUniversity, activeApart, isLoaded]);

  // Harita yüklendikten sonra çalışacak
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    
    // Harita yüklendikten sonra da bounds ayarla
    if (validAparts && validAparts.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      let hasValidLocations = false;
      
      validAparts.forEach(apart => {
        if (apart.lat && apart.lon) {
          bounds.extend(new google.maps.LatLng(apart.lat, apart.lon));
          hasValidLocations = true;
        }
      });
      
      if (hasValidLocations) {
        setTimeout(() => {
          map.fitBounds(bounds, 100); // 100px padding
          
          // Zoom sınırlaması (daha düşük maksimum zoom = daha geniş görünüm)
          const currentZoom = map.getZoom();
          if (currentZoom !== undefined && currentZoom > 11) {
            map.setZoom(11);
          }
        }, 200); // Haritanın yüklenmesi için kısa bir gecikme
      }
    }
  }, [validAparts]);
  
  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Üniversite seçildiğinde
  const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const uniId = parseInt(e.target.value);
    
    if (uniId && activeApart && activeApart.distances) {
      const apiUniversity = activeApart.distances.find(d => d.university.id === uniId)?.university || null;
      
      if (apiUniversity) {
        // Gerçek konum bilgisi olmadığı için varsayılan konumu kullanıyoruz
        // Normalde API'den gelen üniversite verisinde lat ve lon olması gerekir
        setSelectedUniversity({
          ...apiUniversity,
          lat: defaultCenter.lat, 
          lon: defaultCenter.lng
        });
      } else {
        setSelectedUniversity(null);
      }
    } else {
      setSelectedUniversity(null);
    }
  };

  // Google Haritalar'ı aç
  const openInGoogleMaps = () => {
    if (activeApart?.lat && activeApart?.lon) {
      // Mobil cihazlarda çalışması için
      const url = `https://www.google.com/maps/search/?api=1&query=${activeApart.lat},${activeApart.lon}`;
      window.open(url, '_blank');
    }
  };

  // Detay sayfasına yönlendiren fonksiyon
  const goToApartDetail = (apart: ApiApart) => {
    if (apart.id) {
      router.push(`/${apart.slug}`);
    }
  };

  if (!isLoaded) {
    return <div className="flex items-center justify-center bg-gray-100 rounded-lg" style={{ height }}><Loading/></div>;
  }

  // Varsayılan merkez veya ilk apartın konumu
  const center = (validAparts && validAparts.length > 0 && validAparts[0].lat && validAparts[0].lon) 
    ? { lat: validAparts[0].lat, lng: validAparts[0].lon } 
    : defaultCenter;

  return (
    <div className="flex flex-col gap-2 h-full">

      
      
      <div className="relative flex-grow mt-2 p-2">
        <GoogleMap
          mapContainerStyle={mapStyle}
          center={center}
          zoom={8} // Başlangıçta daha geniş bir görünüm için sabit değer
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            zoomControl: true,
            clickableIcons: false,
            draggable: true,
            scrollwheel: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
              }
            ]
          }}
        >
          {/* Tüm apartların konumları */}
          {validAparts && validAparts.map((apart, index) => {
            if (!apart.lat || !apart.lon) return null;
            
            const isActive = activeApart && activeApart.id === apart.id;
            
            return (
              <Marker 
                key={apart.id || index}
                position={{ lat: apart.lat, lng: apart.lon }} 
                icon={{
                  url: isActive 
                    ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                    : 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
                  scaledSize: new google.maps.Size(isActive ? 48 : 32, isActive ? 48 : 32),
                  labelOrigin: new google.maps.Point(isActive ? 24 : 16, -10)
                }}
                onClick={() => goToApartDetail(apart)}
                label={{
                  text: (apart.apart_name || apart.name || `${index + 1}`).toString(),
                  className: `text-xs font-bold ${isActive ? 'text-green-700' : 'text-gray-700'}`
                }}
                animation={isActive && showAnimation ? google.maps.Animation.BOUNCE : undefined}
                zIndex={isActive ? 1000 : 1}
              />
            );
          })}
          
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

          {/* Tüm üniversitelerin konumları */}
          {universities?.map((university) => {
            // API'den gelen üniversite verisini University tipine dönüştür
            const universityWithLocation = university as unknown as University;
            console.log("Üniversite:", university.name, "Konum:", universityWithLocation.lat, universityWithLocation.lon);
            return (
              <Marker
                key={university.id}
                icon={{
                  url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                  scaledSize: new google.maps.Size(32, 32)
                }}
                label={{
                  text: university.name.substring(0, 10),
                  className: "text-xs font-bold"
                }}
                position={{ lat: universityWithLocation.lat, lng: universityWithLocation.lon }}
              />
            );
            
          })}
          
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
        
        {validAparts.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-lg font-medium">Filtrelenmiş apart bulunamadı</p>
            <p className="text-sm mt-1">Lütfen arama kriterlerinizi değiştirin</p>
          </div>
        )}
        
        {/* Google Haritalar'da Aç Butonu */}
        {activeApart && activeApart.lat && activeApart.lon && (
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
        <div className="mx-4 mb-4 text-xs bg-blue-50 p-2 rounded-md">
          <p className="font-bold">Yürüme Mesafesi: {directions.routes[0].legs[0].distance?.text || ''}</p>
          <p>Tahmini Süre: {directions.routes[0].legs[0].duration?.text || ''}</p>
        </div>
      )}
    </div>
  );
};

export default FilterMap; 