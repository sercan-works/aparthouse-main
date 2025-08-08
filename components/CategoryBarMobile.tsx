import React from 'react'
import Image from 'next/image'
import { useGetCategoriesQuery } from '@/store/api/filterApi'
import CategoryPlaceHolder from './ui/CategoryPlaceHolder'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '@/store/features/FilterSlice';
import { RootState } from '@/store';

const CategoryBarMobile = () => {
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
  };

  // Kategori seçimini temizle
  const handleClearCategory = (e: React.MouseEvent<HTMLDivElement>, categoryId: number | null) => {
    e.stopPropagation(); // Üst elemente tıklama olayının yayılmasını engelle
    dispatch(setSelectedCategory(null));
    console.log(`Kategori temizlendi: ${categoryId}`);
  };

  if (isLoading) {
    return (
      <div className='container mx-auto mt-4 z-50'>
        <h2 className='text-xs font-semibold text-gray-700 mb-4 px-2'>KATEGORİLER</h2> 
        <div className='grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 p-2 pb-4'>
          <CategoryPlaceHolder />
          <CategoryPlaceHolder />
          <CategoryPlaceHolder />
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto mt-4 z-50'>
      <h2 className='text-xs font-semibold text-gray-700 mb-1 px-2'>KATEGORİLER</h2>
      <div className='grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 pb-4' >
      {categories && categories.map((category, index) => {
        const isLastCard = index === categories.length - 1;
        return (
        <div 
          key={category.name} 
          className={`mt-3 relative cursor-pointer transition-all duration-300 ${
            selectedCategory === category.id 
              ? 'ring-2 ring-colorFirst rounded-lg bg-colorFirst/75 text-gray-50 font-bold' 
              : 'rounded-lg'
          } ${
            isLastCard 
              ? 'ring-2 ring-gradient-to-r from-purple-500 to-pink-500 bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg shadow-purple-500/25 transform hover:scale-110' 
              : 'hover:scale-105 rounded-lg'
          }`} 
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
            className={`w-full aspect-square object-cover rounded-lg transition-all duration-300 ${
              isLastCard 
                ? 'filter brightness-110 contrast-110' 
                : selectedCategory === category.id ? '' : 'hover:scale-105'
            }`}
            width={80}
            height={80}
            priority
          />
          <div className={`absolute bottom-0 left-0 right-0 flex items-center justify-center p-1 rounded-b-lg min-h-[10px] ${
            isLastCard 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-opacity-50' 
              : 'bg-black/70'
          }`}>
            <p className={`text-center text-xs max-w-full break-words ${
              isLastCard 
                ? 'text-white font-bold' 
                : 'text-gray-50'
            }`}>{category.name}</p>
          </div>
                </div>
       )})}
      </div>
    </div>
  )
}

export default CategoryBarMobile
