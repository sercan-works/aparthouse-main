import type { Metadata } from "next";
import Script from "next/script";
import "../styles/globals.css";
import ClientLayout from "./ClientLayout";
import { AuthProvider } from "./nextAuth";
import ReduxProvider from "./StoreProvider"
import { BASE_METADATA, BASE_SOCIAL_METADATA } from "./utils/metadata";

export const metadata: Metadata = {
  ...BASE_METADATA,
  openGraph: BASE_SOCIAL_METADATA.openGraph,
  twitter: BASE_SOCIAL_METADATA.twitter,
  alternates: {
    canonical: 'https://aparthouse.com',
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
    <html lang="tr">
      <body className="font-gilroy antialiased">
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
          `}
        </Script>
        
        <ReduxProvider>
          <AuthProvider>
            <ClientLayout>{children}</ClientLayout>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
