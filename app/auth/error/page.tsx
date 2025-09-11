"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/logo.png";
import Loading from "@/components/ui/Loading";

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthErrorContent />
    </Suspense>
  );
}

const AuthErrorContent = () => {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorType, setErrorType] = useState<string>("");

  useEffect(() => {
    // URL'den hata bilgilerini al
    const error = searchParams.get("error");
    
    // Hata türünü belirle
    if (error) {
      setErrorType(error);
      
      // Türkçe hata mesajı için hata kodunu kontrol et
      switch (error) {
        case "Configuration":
          setErrorMessage("Sunucu yapılandırma hatası. Lütfen site yöneticisiyle iletişime geçin.");
          break;
        case "AccessDenied":
          setErrorMessage("Erişim reddedildi. Bu hesap için giriş yapmaya yetkiniz yok.");
          break;
        case "Verification":
          setErrorMessage("Doğrulama bağlantısı geçersiz veya süresi dolmuş.");
          break;
        case "OAuthSignin":
          setErrorMessage("OAuth sağlayıcısı ile oturum açılırken hata oluştu.");
          break;
        case "OAuthCallback":
          setErrorMessage("OAuth sağlayıcısından gelen yanıtta hata oluştu.");
          break;
        case "OAuthCreateAccount":
          setErrorMessage("OAuth hesabı oluşturulurken hata oluştu.");
          break;
        case "EmailCreateAccount":
          setErrorMessage("E-posta hesabı oluşturulurken hata oluştu.");
          break;
        case "Callback":
          setErrorMessage("OAuth geri arama işleminde hata oluştu.");
          break;
        case "OAuthAccountNotLinked":
          setErrorMessage("E-posta zaten farklı bir hesaba bağlı. Lütfen başka bir yöntem deneyin.");
          break;
        case "SessionRequired":
          setErrorMessage("Bu sayfaya erişmek için oturum açmanız gerekiyor.");
          break;
        case "Default":
        default:
          setErrorMessage("Bilinmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
          break;
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-colorFirst flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image src={Logo} alt="Aparthouse Logo" width={180} height={40} />
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold text-red-600 mb-4 text-center">
          Oturum Açma Hatası
        </h1>
        
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-gray-700 text-center">{errorMessage}</p>
          {errorType && (
            <p className="text-gray-500 text-sm mt-2 text-center">
              Hata kodu: {errorType}
            </p>
          )}
        </div>
        
        <div className="flex flex-col gap-4">
          <Link 
            href="/login" 
            className="bg-colorFirst text-white py-2 px-4 rounded-md text-center hover:bg-opacity-90 transition-all"
          >
            Giriş Sayfasına Dön
          </Link>
          
          <Link 
            href="/" 
            className="border border-colorFirst text-colorFirst py-2 px-4 rounded-md text-center hover:bg-gray-50 transition-all"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}; 