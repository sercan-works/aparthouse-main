"use client";

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { clearCredentials } from "@/store/features/AuthSlice";
import { useLogoutMutation } from "@/store/api/authApi";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import HomeIcon from '@/public/assets/icons/HomeIcon.svg'
import UserIcon from '@/public/assets/icons/UserIcon.svg'
import { MdCompareArrows } from "react-icons/md";
import { RootState } from "@/store";
import { BsHeart } from 'react-icons/bs';

// Kullanıcı tipi için arayüz
interface User {
  email?: string;
  displayName?: string;
  username?: string;
  image?: string;
}

const MobileNavBar = () => {
  const { data: session } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [compareAparts, setCompareAparts] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // Redux store kullanıcı durumunu al
  const authState = useSelector((state: { auth: { user: User | null; isAuthenticated: boolean } }) => state.auth);
  const reduxUser = authState?.user;
  const reduxIsAuthenticated = authState?.isAuthenticated;
  
  // Karşılaştırma apartlarını Redux store'dan al
  const { compareApartIds } = useSelector((state: RootState) => state.compare);
  
  // Favori apartları Redux store'dan al
  const { favoriteApartIds } = useSelector((state: RootState) => state.favorite);
  
  // Google kimlik bilgilerini backend'e göndermek için hook
  useGoogleAuth();
  
  // Backend logout
  const [logout] = useLogoutMutation();

  // İçerik oluşturma için kullanıcı bilgilerini belirle
  // Next Auth session varsa veya Redux'ta kullanıcı varsa giriş yapmış kabul et
  const isLoggedIn = !!session || reduxIsAuthenticated;
  
  // Kullanıcı bilgilerini belirle - Next Auth veya Redux'tan
  const userEmail = session?.user?.email || reduxUser?.email || "";
  const userName = session?.user?.name || reduxUser?.displayName || reduxUser?.username || reduxUser?.email || "Kullanıcı";
  const userImage = session?.user?.image || null;

  // localStorage'dan karşılaştırma apartlarını yükle
  useEffect(() => {
    const storedCompareAparts = JSON.parse(localStorage.getItem('compareAparts') || '[]');
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteAparts') || '[]');
    setCompareAparts(storedCompareAparts);
    setFavorites(storedFavorites);
  }, []);
  
  // Redux compareApartIds değiştiğinde karşılaştırma sayısını güncelle
  useEffect(() => {
    setCompareAparts(compareApartIds);
  }, [compareApartIds]);
  
  // Redux favoriteApartIds değiştiğinde favori sayısını güncelle
  useEffect(() => {
    setFavorites(favoriteApartIds);
  }, [favoriteApartIds]);
  
  // localStorage değişikliklerini dinle
  useEffect(() => {
    const handleStorageChange = () => {
      const storedCompareAparts = JSON.parse(localStorage.getItem('compareAparts') || '[]');
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteAparts') || '[]');
      setCompareAparts(storedCompareAparts);
      setFavorites(storedFavorites);
    };
    
    // Storage event'ini dinle (farklı sekmelerde güncellemeler için)
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // User menü dışına tıklandığında menüyü kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    try {
      // 1. Backend'den logout isteği yap
      await logout({}).unwrap();
      
      // 2. Redux store'u temizle
      dispatch(clearCredentials());
      
      // 3. NextAuth ile çıkış yap
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error("Backend logout error:", error);
      
      // Hata olsa da Redux store'u temizle ve oturumu kapat
      dispatch(clearCredentials());
      await signOut({ callbackUrl: '/' });
    }
  };

  return (
    <div className='md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-[1000] border-t border-gray-200 w-full' style={{ touchAction: 'none', transform: 'translateZ(0)' }}>
      <div className='px-4 py-2 flex justify-between items-center h-16'>
        <Link href="/" className='flex flex-col justify-center items-center'>
          <Image src={HomeIcon} alt="Home" />
          <p>Anasayfa</p>
        </Link>
        <Link href="/favorites" className='flex flex-col justify-center items-center relative'>
          <BsHeart className="w-6 h-6" />
          <p>Favoriler</p>
          {favorites.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-rose-400 text-white text-xs rounded-full flex items-center justify-center">
              {favorites.length}
            </div>
          )}
        </Link>
        
        <Link href="/compare" className='flex flex-col justify-center items-center relative'>
          <MdCompareArrows className="w-6 h-6" />
          <p>Karşılaştır</p>
          {compareAparts.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
              {compareAparts.length}
            </div>
          )}
        </Link>
        
        {/* Kullanıcı profili bölümü */}
        <div className="flex flex-col justify-center items-center relative" ref={userMenuRef}>
          <div 
            className="cursor-pointer flex flex-col items-center" 
            onClick={toggleUserMenu}
          >
            {isLoggedIn && userImage ? (
              <>
                <Image 
                  src={userImage} 
                  alt="User" 
                  width={24} 
                  height={24} 
                  className="rounded-full"
                />
                <p className='max-w-20 truncate'>{userName}</p>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center">
                  {isLoggedIn ? (
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {userEmail.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  ) : (
                    <Image src={UserIcon} alt="User" width={24} height={24} />
                  )}
                </div>
                <p>{isLoggedIn ? "Profil" : "Giriş Yap"}</p>
              </>
            )}
          </div>

          {/* Kullanıcı Menü */}
          {isUserMenuOpen && (
            <div className="absolute bottom-16 right-0 w-60 bg-white rounded-md shadow-lg py-1 z-50">
              {isLoggedIn ? (
                <>
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {userName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {userEmail}
                    </p>
                  </div>
                  <Link 
                    href="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Giriş Yap
                  </Link>
                  <Link 
                    href="/register" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileNavBar
