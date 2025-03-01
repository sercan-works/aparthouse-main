import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HomeIcon from '@/public/assets/icons/HomeIcon.svg'
import SearchIcon from '@/public/assets/icons/SearchIcon.svg'
import FavoritesIcon from '@/public/assets/icons/FavoritesIcon.svg'
import UserIcon from '@/public/assets/icons/UserIcon.svg'

const MobileNavBar = () => {
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white shadow-lg lg:hidden z-50'>
      <div className='px-4 py-2 flex justify-between items-center'>
        <Link href="/" className='flex flex-col justify-center items-center'>
          <Image src={HomeIcon} alt="Home" />
          <p>Anasayfa</p>
        </Link>
        <Link href="/search" className='flex flex-col justify-center items-center'>
          <Image src={SearchIcon} alt="Search" />
          <p>Arama Yap</p>
        </Link>
        <Link href="/favorites" className='flex flex-col justify-center items-center'>
          <Image src={FavoritesIcon} alt="Favorites" />
          <p>Favoriler</p>
        </Link>
        <Link href="/profile" className='flex flex-col justify-center items-center'>
          <Image src={UserIcon} alt="User" />
          <p>Giriş Yap</p>
        </Link>
      </div>
    </div>
  )
}

export default MobileNavBar
