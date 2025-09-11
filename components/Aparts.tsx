// Client Component - SSR kaldırıldı
import React from "react";
import ClientAparts from "./ClientAparts";

export default function Aparts({ 
  initialCategory, 
  initialCity, 
  initialUniversity 
}: { 
  initialCategory?: string, 
  initialCity?: string, 
  initialUniversity?: string 
}) {
  
  // Client taraflı component'e parametreleri geçir
  return (
    <ClientAparts 
      initialCategory={initialCategory}
      initialCity={initialCity}
      initialUniversity={initialUniversity}
    />
  );
}
