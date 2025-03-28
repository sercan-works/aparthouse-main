// Server Component
import React from "react";
import ClientAparts from "./ClientAparts";

// Sayfa yüklendiğinde çalışacak SSR fonksiyonu
export default async function Aparts({ 
  initialCategory, 
  initialCity, 
  initialUniversity 
}: { 
  initialCategory?: string, 
  initialCity?: string, 
  initialUniversity?: string 
}) {
  // Parametreler için boş bir nesne oluştur
  const queryParams = new URLSearchParams();
  
  // Başlangıç parametreleri varsa ekle
  if (initialCategory) queryParams.append("category", initialCategory);
  if (initialCity) queryParams.append("city", initialCity);
  if (initialUniversity) queryParams.append("university", initialUniversity);
  
  // Server-side fetch ile veriyi al
  let apartsData = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const response = await fetch(`${apiUrl}/api/aparts?${queryParams.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // SSR için önbelleği devre dışı bırak
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    apartsData = await response.json();
  } catch (error) {
    console.error("Failed to fetch aparts data: ", error);
  }

  // Client taraflı component'e veriyi geçir
  return (
    <ClientAparts 
      initialAparts={apartsData} 
      initialCategory={initialCategory}
      initialCity={initialCity}
      initialUniversity={initialUniversity}
    />
  );
}
