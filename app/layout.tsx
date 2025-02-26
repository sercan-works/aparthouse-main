"use client";
import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";
import ToastProviders from "./toast_provider";
import { usePathname } from "next/navigation";
import ContactBanner from "@/components/ContactBanner";
import HomeInfoBanner from "@/components/HomeInfoBanner";
import Highlights from "@/components/Highlights";
import CentralAparts from "@/components/CentralAparts";

// export const metadata: Metadata = {
//   title: "Aparthouse || Hadi Yeni Evini Bul",
//   description: "Öğrenciler için tasarlanmış ev arama platformu",
// };

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Header ve Footer'ın görünmeyeceği sayfalar
  const noHeaderFooterPaths = ["/login", "/register", "/admin"]; // Bu array'e istediğiniz path'leri ekleyebilirsiniz
  const shouldShowHeaderFooter = !noHeaderFooterPaths.includes(pathname);

  return (
    <html lang="tr">
      <body className="font-gilroy antialiased">
        {shouldShowHeaderFooter && <Header />}
        <ToastProviders>
          {pathname === "/" && <Highlights />}

          {children}

          {pathname === "/" && <CentralAparts />}
          <MobileNavBar />
        </ToastProviders>
        {pathname === "/" && <HomeInfoBanner />}
        {pathname === "/" && <ContactBanner />}
        {shouldShowHeaderFooter && <Footer />}
      </body>
    </html>
  );
}
