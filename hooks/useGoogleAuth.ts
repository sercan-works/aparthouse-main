import { useSocialLoginMutation } from '@/store/api/authApi';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { addToast } from '@heroui/react';

export function useGoogleAuth() {
  const { data: session } = useSession();
  const [socialLogin, { isLoading, isSuccess, error }] = useSocialLoginMutation();

  useEffect(() => {
    // Google ile giriş yaptıktan sonra session verisi varsa
    if (session?.user) {
      // Google kimlik bilgilerini DRF'ye gönderin
      socialLogin({
        provider: 'google',
        access_token: session.accessToken, // NextAuth tarafından sağlanan token
        id_token: session.idToken, // Eğer NextAuth session'ında ID token varsa
        userData: {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        }
      }).unwrap()
        .then(response => {
          addToast({
            title: "Başarılı",
            description: "Google hesabınızla başarıyla giriş yaptınız",
            color: "success",
          });
        })
        .catch(err => {
          addToast({
            title: "Hata",
            description: "Google ile giriş yapılırken bir hata oluştu",
            color: "danger",
          });
          console.error('Google auth error:', err);
        });
    }
  }, [session, socialLogin]);

  return { isLoading, isSuccess, error };
} 