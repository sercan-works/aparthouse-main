"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface ApiErrorResponse {
  detail?: string;
  [key: string]: unknown;
}

interface VerifyEmailClientProps {
  verificationKey: string;
}

export default function VerifyEmailClient({ verificationKey }: VerifyEmailClientProps) {
  const router = useRouter();
  const [status, setStatus] = useState('doğrulanıyor...');

  useEffect(() => {
    if (!verificationKey) return;

    const verifyEmail = async () => {
      try {
        // Django REST Framework endpoint'ini çağır
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email/${verificationKey}/`, {});
        // API'den gelen mesajı göster
        setStatus(response.data.detail || 'Email adresi başarıyla doğrulandı.');
        // Başarılı olduğunda ana sayfaya yönlendir
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (error) {
        // Hata türünü kontrol et
        const axiosError = error as AxiosError<ApiErrorResponse>;
        
        // 400 hata kodunu göz ardı et, sadece mesajı göster
        if (axiosError.response?.status !== 400) {
          console.error('Doğrulama hatası:', error);
        }
        
        // API'den gelen hata mesajını al
        let errorMessage = 'Doğrulama sırasında bir hata oluştu. Lütfen tekrar deneyin.';
        
        if (axiosError.response?.data?.detail) {
          errorMessage = axiosError.response.data.detail;
        }
        
        setStatus(errorMessage);
      }
    };

    verifyEmail();
  }, [verificationKey, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-colorFirst">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Email Doğrulama</h1>
        <p className="text-center">{status}</p>
      </div>
    </div>
  );
} 