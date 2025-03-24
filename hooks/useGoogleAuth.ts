import { useSocialLoginMutation } from '@/store/api/authApi';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { addToast } from '@heroui/react';

export function useGoogleAuth() {
  const { data: session } = useSession();
  const [socialLogin, { isLoading, isSuccess, error }] = useSocialLoginMutation();
  const hasLoggedInRef = useRef(false);

  useEffect(() => {
    // Google ile giriş yaptıktan sonra session verisi varsa ve daha önce giriş yapmadıysa
    if (session?.user && !hasLoggedInRef.current) {
      // Ref'i true yap ki tekrar istek atmasın
      hasLoggedInRef.current = true;
      
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
          // addToast({
          //   title: "Başarılı",
          //   description: "Google hesabınızla başarıyla giriş yaptınız",
          //   color: "success",
          // });
          console.log("Google auth success");
        })
        .catch(err => {
          addToast({
            title: "Hata",
            description: "Google ile giriş yapılırken bir hata oluştu. Tekrar deneyiniz.",
            color: "danger",
          });
          console.error('Google auth error:', err);
        });
    }
  }, [session, socialLogin]);

  return { isLoading, isSuccess, error };
} 