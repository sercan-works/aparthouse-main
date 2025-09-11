import React from 'react'
import MobileFavorites from './MobileFavorites'
import DesktopFavorites from './DesktopFavorites'

const Favorites = () => {
  return (
    <>
    <div className="block md:hidden">
        <MobileFavorites />
    </div>
    <div className="hidden md:block">
      <DesktopFavorites />
    </div>
  </>
  )
}

export default Favorites
