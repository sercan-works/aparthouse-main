import type { Metadata } from "next";
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
        <ReduxProvider>
          <AuthProvider>
            <ClientLayout>{children}</ClientLayout>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
