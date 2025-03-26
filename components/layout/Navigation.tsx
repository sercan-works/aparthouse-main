"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import UserIcon from "@/public/assets/icons/UserIcon.svg"; 
import { useLogoutMutation } from "@/store/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "@/store/features/AuthSlice";
import FavoritesIcon from "@/public/assets/icons/FavoritesIcon.svg";
import { RootState } from "@/store";
import { MdCompareArrows } from "react-icons/md";
import { Chip } from "@heroui/react";

export default function Navigation() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [compareAparts, setCompareAparts] = useState<any[]>([]);
  // Redux store kullanıcı durumunu al
  const authState = useSelector((state: any) => state.auth);
  const reduxUser = authState?.user;
  const reduxIsAuthenticated = authState?.isAuthenticated;
  
  // Favori apartları Redux store'dan al
  const { favoriteApartIds } = useSelector((state: RootState) => state.favorite);
  // Karşılaştırma apartlarını Redux store'dan al
  const { compareApartIds } = useSelector((state: RootState) => state.compare);
  
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

  // localStorage'dan favori apartları yükle
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteAparts') || '[]');
    const storedCompareAparts = JSON.parse(localStorage.getItem('compareAparts') || '[]');
    setFavorites(storedFavorites);
    setCompareAparts(storedCompareAparts);
  }, []);
  
  // Redux favoriteApartIds değiştiğinde favori sayısını güncelle
  useEffect(() => {
    setFavorites(favoriteApartIds);
  }, [favoriteApartIds]);
  
  // Redux compareApartIds değiştiğinde karşılaştırma sayısını güncelle
  useEffect(() => {
    setCompareAparts(compareApartIds);
  }, [compareApartIds]);
  
  // localStorage değişikliklerini dinle
  useEffect(() => {
    const handleStorageChange = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteAparts') || '[]');
      const storedCompareAparts = JSON.parse(localStorage.getItem('compareAparts') || '[]');
      setFavorites(storedFavorites);
      setCompareAparts(storedCompareAparts);
    };
    
    // Storage event'ini dinle (farklı sekmelerde güncellemeler için)
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Dropdown dışına tıklandığında menüyü kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      // 1. Backend'den logout isteği yap
      await logout().unwrap();
      
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
    <nav className="flex items-center gap-5">
      <Link href="/" className="text-gray-700 hover:text-gray-900">
        Yardım
      </Link>
      <Link href="/favorites" className="text-gray-700 hover:text-gray-900">
        <Image src={FavoritesIcon} alt="Favorites" width={20} height={20} />
        {/* Favori sayısını gösteren chip */}
        {favorites.length > 0 && (
        <div className="relative">
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-rose-400 text-white text-xs rounded-full flex items-center justify-center">
              {(() => {
                // Client-side rendering kontrolü
                if (typeof window !== 'undefined') {
                  try {
                   
                    return Array.isArray(favorites) ? favorites.length : 0;
                  } catch (e) {
                    console.error('Favori apartlar parse edilemedi:', e);
                    return 0;
                  }
                }
                return 0;
              })()}
            </div>
        </div>
        )}
      </Link>
      
      {/* User Icon ve Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div 
          className="cursor-pointer flex items-center" 
          onClick={toggleDropdown}
        >
          {userImage ? (
            <Image 
              src={userImage} 
              alt="User" 
              width={32} 
              height={32} 
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              {userEmail ? (
                <span className="text-sm font-medium text-gray-600">
                  {userEmail.charAt(0).toUpperCase()}
                </span>
              ) : (
                <Image src={UserIcon} alt="User" width={24} height={24} />
              )}
            </div>
          )}
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg py-1 z-50">
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
                  href="/compare" 
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <MdCompareArrows className="w-4 h-4" />
                  Karşılaştırma
                  <Chip color="primary" size="sm">{compareAparts.length}</Chip>
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
                >
                  Giriş Yap
                </Link>
                <Link 
                  href="/register" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Kayıt Ol
                </Link>
                <Link 
                  href="/compare" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <MdCompareArrows className="w-4 h-4" />
                  Karşılaştırma
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
