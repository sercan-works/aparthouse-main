import React from 'react'
import Image from 'next/image'
import Dummy from '@/public/assets/images/dummy.jpg'
export const categories = [
  {
    name: "Kız Apart",
    icon: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fgraduating-student_2940652&psig=AOvVaw0cehujQgZlqVRfk0Bcx9Y4&ust=1740588055484000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLial_uh34sDFQAAAAAdAAAAABAE",
  },
  {
    name: "Erkek Apart",
    icon: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fgraduating-student_2940652&psig=AOvVaw0cehujQgZlqVRfk0Bcx9Y4&ust=1740588055484000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLial_uh34sDFQAAAAAdAAAAABAE",
  },
  {
    name: "Karma",
    icon: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fgraduating-student_2940652&psig=AOvVaw0cehujQgZlqVRfk0Bcx9Y4&ust=1740588055484000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLial_uh34sDFQAAAAAdAAAAABAE",
  },
  {
    name: "Evcil Hayvan Dostu",
    icon: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fgraduating-student_2940652&psig=AOvVaw0cehujQgZlqVRfk0Bcx9Y4&ust=1740588055484000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLial_uh34sDFQAAAAAdAAAAABAE",
  },
  {
    name: "Ofis3",
    icon: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fgraduating-student_2940652&psig=AOvVaw0cehujQgZlqVRfk0Bcx9Y4&ust=1740588055484000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLial_uh34sDFQAAAAAdAAAAABAE",
  },
  {
    name: "Ofis4",
    icon: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fgraduating-student_2940652&psig=AOvVaw0cehujQgZlqVRfk0Bcx9Y4&ust=1740588055484000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLial_uh34sDFQAAAAAdAAAAABAE",
  },
  
]

const CategoryBar = () => {
  return (
    <div className='flex gap-4 overflow-x-auto whitespace-nowrap pb-4 mt-4 justify-start md:justify-center md:gap-8 '>
      {categories.map((category) => (
        <div key={category.name} className='flex-shrink-0 cursor-pointer'>
          <Image 
            src={Dummy} 
            alt={category.name} 
            className='w-24 h-24 md:w-40 md:h-40 object-cover rounded-lg'
          />
          <p className='text-center text-lg md:text-sm'>{category.name}</p>
        </div>
      ))}
    </div>
  )
}

export default CategoryBar
