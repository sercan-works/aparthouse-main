import type { Metadata } from "next";
import "../styles/globals.css";
import ClientLayout from "./ClientLayout";
import { AuthProvider } from "./nextAuth";
import ReduxProvider from "./StoreProvider"

export const metadata: Metadata = {
  title: "Aparthouse || Hadi Yeni Evini Bul",
  description: "Öğrenciler için tasarlanmış ev arama platformu",
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
