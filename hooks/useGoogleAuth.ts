import { useSocialLoginMutation } from '@/store/api/authApi';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { addToast } from '@heroui/react';

export function useGoogleAuth() {
  const { data: session, status } = useSession();
  const [socialLogin, { isLoading, isSuccess, error }] = useSocialLoginMutation();
  const hasProcessedSession = useRef(false);
  
  // Bir önceki oturumun ID'sini saklamak için localStorage anahtarı
  const SESSION_ID_KEY = 'last_processed_session_id';

  useEffect(() => {
    // Sadece oturum varsa ve authenticated durumdaysa işlem yap
    if (status === 'authenticated' && session?.user) {
      // Mevcut oturum için benzersiz bir tanımlayıcı oluştur
      // Bu, oturum verilerini ve timestamp'i birleştiren bir string olabilir
      const sessionIdentifier = `${session.user.email}-${Date.now()}`;
      
      // Son işlenen oturum kimliğini al
      const lastProcessedSessionId = localStorage.getItem(SESSION_ID_KEY);
      
      // Eğer bu oturum daha önce işlenmediyse ve component mount edildikten sonra
      // bir oturum değişikliği olduysa
      if (!hasProcessedSession.current) {
        // Google kimlik bilgilerini DRF'ye gönderin
        socialLogin({
          email: session.user.email,
          name: session.user.name,
          // provider: 'google',
          // access_token: session.accessToken, // NextAuth tarafından sağlanan token
          // id_token: session.idToken, // Eğer NextAuth session'ında ID token varsa
          // userData: {
          //   email: session.user.email,
          //   name: session.user.name,
          //   image: session.user.image,
          // }
        }).unwrap()
          .then(() => {
            // Sayfa doğrudan yüklendiğinde gösterme, sadece aktif giriş sonrası göster
            // URL'de callbackUrl varsa bu bir aktif giriş sonrasıdır
            const isCallbackNavigation = window.location.href.includes('callbackUrl');
            
            // Sayfa geçmişinde login sayfası varsa bu bir aktif giriş sonrasıdır
            const cameFromLoginPage = document.referrer.includes('/login');
            
            // Daha önce işlenmemiş oturumsa veya aktif bir login yapıldıysa toast göster
            if (sessionIdentifier !== lastProcessedSessionId && (isCallbackNavigation || cameFromLoginPage)) {
              addToast({
                title: "Başarılı",
                description: "Google hesabınızla başarıyla giriş yaptınız",
                color: "success",
              });
              
              // Bu oturumu işlenmiş olarak işaretle
              localStorage.setItem(SESSION_ID_KEY, sessionIdentifier);
            }
          })
          .catch(err => {
            addToast({
              title: "Hata",
              description: "Google ile giriş yapılırken bir hata oluştu",
              color: "danger",
            });
            console.error('Google auth error:', err);
          });
          
        // Bu oturumu işlenmiş olarak işaretle
        hasProcessedSession.current = true;
      }
    }
  }, [session, status, socialLogin]);

  return { isLoading, isSuccess, error };
} 