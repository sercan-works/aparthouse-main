import React from 'react'
import DesktopDetail from './DesktopDetail';
import MobileDetail from './MobileDetail';

const Detail = () => {
  return (
<>
      <div className="block md:hidden">
        <MobileDetail />
      </div>
      <div className="hidden md:block">
        <DesktopDetail />
      </div>
    </>
  )
}

export default Detail;
