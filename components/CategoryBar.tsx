import React from 'react'
import Image from 'next/image'
import { useGetCategoriesQuery } from '@/store/api/filterApi'
import CategoryPlaceHolder from './ui/CategoryPlaceHolder'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '@/store/features/FilterSlice';
import { RootState } from '@/store';

const CategoryBar = () => {
  const dispatch = useDispatch();
  const { data: categories, isLoading } = useGetCategoriesQuery();
  // Seçili kategoriyi Redux store'dan al
  const selectedCategory = useSelector((state: RootState) => state.filter.selectedCategory);
  
  // Kategori seçildiğinde ApartsApi'yi kullanarak verileri getir
  const handleCategoryClick = (categoryId: number, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    // Eğer zaten seçili olan kategoriye tıklandıysa, seçimi kaldır
    if (selectedCategory === categoryId) {
      dispatch(setSelectedCategory(null));
    } else {
      // Redux state'ine kategori değerini kaydet
      dispatch(setSelectedCategory(categoryId));
    }
    
    // URL parametresi olarak kategori eklemiyoruz, Redux state üzerinden veri çekilecek
    // ApartsProvider bileşeni bu değişikliği izleyerek apartsApi ile verileri çekecek
    // console.log(`Kategori ${selectedCategory === categoryId ? 'kaldırıldı' : 'seçildi'}: ${categoryId}`);
  };

  // Kategori seçimini temizle
  const handleClearCategory = (e: React.MouseEvent<HTMLDivElement>, categoryId: number | null) => {
    e.stopPropagation(); // Üst elemente tıklama olayının yayılmasını engelle
    dispatch(setSelectedCategory(null));
    console.log(`Kategori temizlendi: ${categoryId}`);
  };

  if (isLoading) {
    return <div className='flex gap-4 container mx-auto justify-center overflow-x-auto whitespace-nowrap pb-4 mt-4  md:justify-center md:gap-8 z-50 '>
       <CategoryPlaceHolder />
       <CategoryPlaceHolder />
       <CategoryPlaceHolder />
       <CategoryPlaceHolder />
       </div>;
  }

  return (
    <div className='flex gap-4 container mx-auto justify-start md:justify-center overflow-x-auto whitespace-nowrap pb-4 mt-4  md:gap-8 z-50 ' >
      {categories && categories.map((category) => (
        <div 
          key={category.name} 
          className={`mt-3 relative flex-shrink-0  cursor-pointer ${selectedCategory === category.id ? 'ring-2 ring-colorFirst rounded-lg bg-colorFirst/75 text-gray-50 font-bold' : ''}`} 
          onClick={(e) => handleCategoryClick(category.id, e)}
        >
          {selectedCategory === category.id && (
            <div 
              className='absolute -top-2 -right-2 z-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-600'
              onClick={(e) => handleClearCategory(e, category.id)}
            >
              ×
            </div>
          )}
          <Image 
            src={category.image} 
            alt={category.name} 
            className={`w-24 h-24 md:w-40 md:h-40 object-cover rounded-lg ${selectedCategory === category.id ? '' : 'hover:scale-105'} transition-all duration-300`}
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
