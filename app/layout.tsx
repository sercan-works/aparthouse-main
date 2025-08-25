import type { Metadata } from "next";
import Script from "next/script";
import "../styles/globals.css";
import ClientLayout from "./ClientLayout";
import { AuthProvider } from "./nextAuth";
import ReduxProvider from "./StoreProvider"
import { BASE_METADATA, BASE_SOCIAL_METADATA } from "./utils/metadata";
import { LanguageProvider } from "../i18n/context";

export const metadata: Metadata = {
  ...BASE_METADATA,
  openGraph: BASE_SOCIAL_METADATA.openGraph,
  twitter: BASE_SOCIAL_METADATA.twitter,
  alternates: {
    canonical: 'https://aparthouse.com.tr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Server component
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TVHGH4K6');`}
        </Script>
      </head>
      <body className="font-gilroy antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-TVHGH4K6"
            height="0" 
            width="0" 
            style={{display:'none', visibility:'hidden'}}
          />
        </noscript>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N8XHCSGGSM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N8XHCSGGSM');
            gtag('config', 'AW-17437128307');
          `}
        </Script>
       
        
        <ReduxProvider>
          <AuthProvider>
            <LanguageProvider>
              <ClientLayout>{children}</ClientLayout>
            </LanguageProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
