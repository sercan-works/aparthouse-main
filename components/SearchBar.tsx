import { Input } from '@heroui/react'
import React from 'react'
import Image from 'next/image'
import SearchIcon from '@/public/assets/icons/SearchIcon.svg'


const SearchBar = ({placeholder}: {placeholder: string}) => {
  return (
 <div className="flex items-center">
 <Input
 className="w-full md:w-[538px] rounded-full"
 labelPlacement="outside"
 placeholder={placeholder}
 endContent={
   <Image src={SearchIcon} alt="Search" width={20} height={20} />
 }
 type="text"
/>
 </div>

  )
}

export default SearchBar
