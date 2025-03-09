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

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Header ve Footer'ın görünmeyeceği sayfalar
  const noHeaderFooterPaths = ["/login", "/register", "/admin"];
  const shouldShowHeaderFooter = !noHeaderFooterPaths.includes(pathname);

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
    </StoreProvider>
  );
} 