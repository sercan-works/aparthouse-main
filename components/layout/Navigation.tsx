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

export default function Navigation() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  
  // Redux store kullanıcı durumunu al
  const authState = useSelector((state: any) => state.auth);
  const reduxUser = authState?.user;
  const reduxIsAuthenticated = authState?.isAuthenticated;
  
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
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
