import React from 'react'
import Image from 'next/image'
// import Dummy from '@/public/assets/images/dummy.jpg'
import { useGetCategoriesQuery } from '@/store/api/filterApi'
import CategoryPlaceHolder from './ui/CategoryPlaceHolder'
const CategoryBar = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) {
    return <div className='flex gap-4 container mx-auto justify-center overflow-x-auto whitespace-nowrap pb-4 mt-4  md:justify-center md:gap-8 z-50 '>
       <CategoryPlaceHolder />
       <CategoryPlaceHolder />
       <CategoryPlaceHolder />
       <CategoryPlaceHolder />

       </div>;
  }

  return (
    <div className='flex gap-4 container mx-auto justify-center overflow-x-auto whitespace-nowrap pb-4 mt-4  md:justify-center md:gap-8 z-50 '>
      {categories && categories.map((category) => (
        <div key={category.name} className='flex-shrink-0 cursor-pointer'>
          <Image 

            src={category.image} 
            alt={category.name} 
            className='w-24 h-24 md:w-40 md:h-40 object-cover rounded-lg hover:scale-105 transition-all duration-300'
            width={100}
            height={100}
            priority
          />
          <p className='text-center text-lg md:text-sm'>{category.name}</p>
        </div>
      ))}
    </div>
  )
}

export default CategoryBar
