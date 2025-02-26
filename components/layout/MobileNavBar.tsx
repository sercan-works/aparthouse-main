import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HomeIcon from '@/public/assets/icons/HomeIcon.svg'
import SearchIcon from '@/public/assets/icons/SearchIcon.svg'
import FavoritesIcon from '@/public/assets/icons/FavoritesIcon.svg'
import UserIcon from '@/public/assets/icons/UserIcon.svg'

const MobileNavBar = () => {
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white shadow-lg lg:hidden'>
      <div className='px-4 py-2 flex justify-between items-center'>
        <Link href="/">
          <Image src={HomeIcon} alt="Home" />
        </Link>
        <Link href="/search">
          <Image src={SearchIcon} alt="Search" />
        </Link>
        <Link href="/favorites">
          <Image src={FavoritesIcon} alt="Favorites" />
        </Link>
        <Link href="/profile">
          <Image src={UserIcon} alt="User" />
        </Link>
      </div>
    </div>
  )
}

export default MobileNavBar
