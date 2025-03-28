"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/public/assets/logo.png";
import Building from "@/public/assets/images/building.png";
import GoogleLogo from "@/public/assets/images/google.png";
import Girl from "@/public/assets/images/register_girl.png";
import { Button, Input, Link, addToast } from "@heroui/react";
import { useRegisterMutation, useLoginMutation } from "@/store/api/authApi";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setCredentials } from "@/store/features/AuthSlice";
import ReCAPTCHA from "react-google-recaptcha";

// DRF hata yanıtı için tip tanımlama
interface DRFErrorResponse {
  non_field_errors?: string[];
  [key: string]: unknown;
}

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  // Register ve login mutation hook'larını kullan
  const [register, { isLoading }] = useRegisterMutation();
  const [login] = useLoginMutation();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  // reCAPTCHA değişiklik handler'ı
  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token || "");
  };

  // Form doğrulama fonksiyonu
  const validateForm = () => {
    if (!username.trim()) {
      addToast({
        title: "Hata",
        description: "Kullanıcı adı gereklidir",
        color: "danger",
      });
      return false;
    }

    if (!email.trim()) {
      addToast({
        title: "Hata",
        description: "E-posta adresi gereklidir",
        color: "danger",
      });
      return false;
    }

    // Basit email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addToast({
        title: "Hata",
        description: "Geçerli bir e-posta adresi giriniz",
        color: "danger",
      });
      return false;
    }

    if (!password1) {
      addToast({
        title: "Hata",
        description: "Şifre gereklidir",
        color: "danger",
      });
      return false;
    }

    if (password1 !== password2) {
      addToast({
        title: "Hata",
        description: "Şifreler eşleşmiyor",
        color: "danger",
      });
      return false;
    }

    if (password1.length < 8) {
      addToast({
        title: "Hata",
        description: "Şifre en az 8 karakter olmalıdır",
        color: "danger",
      });
      return false;
    }

    if (!captchaToken) {
      addToast({
        title: "Hata",
        description: "Lütfen robot olmadığınızı doğrulayın",
        color: "danger",
      });
      return false;
    }

    return true;
  };

  // Kayıt işlemi
  const handleRegister = async () => {
    // Form validasyonu
    if (!validateForm()) return;

    try {
      // DRF'ye kayıt isteği gönder
      await register({ 
        username, 
        email, 
        password1, 
        password2,
        recaptcha: captchaToken 
      }).unwrap();

      // Başarılı kayıt
      addToast({
        title: "Kayıt Başarılı",
        description: "Hesabınız başarıyla oluşturuldu. Giriş yapılıyor...",
        color: "success",
      });

      try {
        // Otomatik olarak giriş yap
        const loginResult = await login({
          email: email,
          password: password1
        }).unwrap();

        // Kullanıcı adını güzelleştir
        let displayName = loginResult.user.username;
        if (displayName.includes('@')) {
          displayName = displayName.split('@')[0];
        }
        
        // Display name'i büyük harfle başlatalım
        if (displayName && displayName.length > 0) {
          displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        }
        
        // Kullanıcı objesini güzelleştirelim
        const enhancedUser = {
          ...loginResult.user,
          displayName: displayName || loginResult.user.username
        };
        
        // Redux store'a kullanıcı bilgilerini ve token'ları kaydet
        dispatch(setCredentials({
          user: enhancedUser,
          access: loginResult.access,
          refresh: loginResult.refresh
        }));

        // Ana sayfaya yönlendir
        router.push('/');
      } catch (loginError) {
        console.error("Otomatik giriş hatası:", loginError);
        
        // Otomatik giriş başarısız olursa login sayfasına yönlendir
        router.push('/login');
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
      
      // Hata mesajını göster
      let errorMessage = "Kayıt sırasında bir hata oluştu.";
      
      // Hata response kontrol
      if (error && typeof error === 'object' && 'data' in error) {
        const errorData = error.data as DRFErrorResponse;
        
        // Non-field errors kontrolü
        if (errorData?.non_field_errors && Array.isArray(errorData.non_field_errors)) {
          errorMessage = errorData.non_field_errors.join(", ");
        }
        // Diğer alan hataları
        else if (errorData && typeof errorData === 'object') {
          const allErrors = Object.entries(errorData)
            .map(([field, msgs]) => {
              if (Array.isArray(msgs)) {
                return `${field}: ${msgs.join(', ')}`;
              }
              return `${field}: ${String(msgs)}`;
            })
            .filter(Boolean)
            .join('\n');
          
          if (allErrors) {
            errorMessage = allErrors;
          }
        }
      }
      
      addToast({
        title: "Kayıt Hatası",
        description: errorMessage,
        color: "danger",
      });
    }
  };

  // Google ile giriş
  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google SignIn error:", error);
      addToast({
        title: "Giriş Hatası",
        description: "Google ile giriş yapılırken bir hata oluştu.",
        color: "danger",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="bg-colorFirst min-h-screen md:h-screen lg:grid lg:grid-cols-3">
      {/* ÜST KISIM */}
      <div className="flex flex-col p-10 justify-start lg:justify-center items-start lg:items-center gap-3 lg:gap-10  lg:col-span-1">
        <Link href="/">
        <Image
          src={Logo}
          alt="aparthouse_logo"
          className="w-[244px] h-[44px]"
        />
        </Link>
        <p className="lg:text-center text-gray-50 text-lg font-light max-w-[300px] lg:max-w-[1000px]">
          Öğrencilere en iyi ve en güvenilir apart lokasyonlarını bulmaları için
          burdayız...
        </p>
        <div className="hidden lg:block">
              <Image
                src={Building}
                alt="building"
                width={356}
                height={360}
              />
            </div>
            
           
      </div>

      <div className="flex justify-center h-full lg:col-span-2 lg:w-full lg:bg-white lg:rounded-[38px] lg:rounded-tr-none lg:rounded-br-none">
        <div className="bg-white rounded-[38px] w-full md:w-2/3 lg:w-1/2 mx-auto">
          <div className="relative">
          <div className="absolute top-36 -left-96">
              <Image
                src={Girl}
                alt="girl"
                width={259}
                height={487}
              />
            </div>
            <div className="absolute -top-16 -right-0 lg:hidden">
              <Image
                src={Building}
                alt="building"
                width={100}
                height={100}
                className="scale-x-[-1]"
              />
            </div>
          </div>
          <div className="flex flex-col p-10 gap-3">
            <h2 className="text-2xl">Kayıt Ol</h2>
            <p className="text-gray-500">
              Lütfen aşağıdaki bilgileri doldurunuz.
            </p>

            <Input 
              label="Kullanıcı Adı"
              type="text"
              variant="underlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            
            <Input 
              label="Email" 
              type="email" 
              variant="underlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400" />
                  )}
                </button>
              }
              label="Şifre"
              placeholder="Şifrenizi giriniz"
              type={isVisible ? "text" : "password"}
              variant="underlined"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <Input
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility2}
                >
                  {isVisible2 ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400" />
                  )}
                </button>
              }
              label="Şifre Tekrar"
              placeholder="Şifrenizi tekrar giriniz"
              type={isVisible2 ? "text" : "password"}
              variant="underlined"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />

            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Lds1KMnAAAAAForux7vzs6OfM23C-a-XxUk_Vkq"}
              onChange={onCaptchaChange}
              className="my-4 flex justify-center"
            />

            <Button 
              className="bg-colorFirst text-white font-bold mt-0"
              onPress={handleRegister}
              isLoading={isLoading}
            >
              Hesap Oluştur
            </Button>

            <p className="text-gray-500 text-center mt-0">
              Zaten bir hesabınız var mı?{" "}
              <Link href="/login" className="text-colorFirst font-bold">
                Giriş Yap
              </Link>
            </p>

            <p className="text-gray-500 text-center mt-0">
              - veya -
            </p>

            
            <Button 
              className="flex justify-center items-center mx-auto bg-white text-colorFirst font-bold mt-0 w-full md:w-1/2 border border-colorFirst"
              onPress={handleGoogleSignIn}
              isLoading={isGoogleLoading}
            >
              {!isGoogleLoading && <Image src={GoogleLogo} alt="google" width={20} height={20} />}
              Google ile Giriş Yap
            </Button>

            {/* <RegisterSuccess /> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

export const EyeSlashFilledIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
        fill="currentColor"
      />
      <path
        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
        fill="currentColor"
      />
      <path
        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
        fill="currentColor"
      />
      <path
        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
        fill="currentColor"
      />
      <path
        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EyeFilledIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
        fill="currentColor"
      />
      <path
        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
        fill="currentColor"
      />
    </svg>
  );
};
