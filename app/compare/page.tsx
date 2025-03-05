import React from 'react'
import MobileCompare from './MobileCompare'
import DesktopCompare from './DesktopCompare'

const Compare = () => {
  return (
    <>
    <div className="block md:hidden">
        <MobileCompare />
    </div>
    <div className="hidden md:block">
      <DesktopCompare />
    </div>
  </>
  )
}

  export default Compare
