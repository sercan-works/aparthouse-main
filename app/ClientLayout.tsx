'use client';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";
import ToastProviders from "./toast_provider";
import ContactBanner from "@/components/ContactBanner";
import HomeInfoBanner from "@/components/HomeInfoBanner";
import Highlights from "@/components/Highlights";
import StoreProvider from "./StoreProvider";
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';
import CookieConsent from "@/components/modals/CookieConsent";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  
  // Header ve Footer'ın görünmeyeceği sayfalar
  const noHeaderFooterPaths = ["/login", "/register", "/admin"];
  const shouldShowHeaderFooter = !noHeaderFooterPaths.includes(pathname);

  useEffect(() => {
    // Local storage'dan cookie consent durumunu kontrol et
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (cookieConsent !== 'true') {
      setShowCookieConsent(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowCookieConsent(false);
  };

  const handleRejectCookies = () => {
    // Reddetme durumunda local storage'a bir şey kaydetmiyoruz
    // Böylece bir sonraki ziyarette tekrar gösterilecek
    setShowCookieConsent(false);
  };

  return (
    <StoreProvider>
      {shouldShowHeaderFooter && <Header />}
      <ToastProviders>
          {pathname === "/" && <Highlights />}
          {children}
        <MobileNavBar />
      </ToastProviders>
      {pathname === "/" && <HomeInfoBanner />}
      {pathname === "/" && <ContactBanner />}
      {shouldShowHeaderFooter && <Footer />}
      {showCookieConsent && (
        <CookieConsent 
          onAccept={handleAcceptCookies}
          onReject={handleRejectCookies}
        />
      )}
    </StoreProvider>
  );
} 