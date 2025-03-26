import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetApartsQuery } from '@/store/api/apartsApi';

// Bu bileşen seçilen kategoriyi takip eder ve apartsApi ile verileri getirir
const ApartsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Redux store'dan seçilen kategoriyi al
  const selectedCategory = useSelector((state: RootState) => state.filter.selectedCategory);
  
  // Kategori seçildiğinde apartsApi ile verileri getir
  const { data } = useGetApartsQuery(
    selectedCategory ? { category: selectedCategory.toString() } : {},
    { 
      refetchOnMountOrArgChange: true
    }
  );

  useEffect(() => {
    if (data && selectedCategory) {
      console.log('Kategoriye göre filtrelenmiş apartlar:', data);
      sessionStorage.setItem('selectedCategory', selectedCategory.toString());
    }
  }, [data, selectedCategory]);

  // Bu bileşen sadece veri getirmek için kullanılıyor, 
  // herhangi bir UI görüntülemiyoruz
  return <>{children}</>;
};

export default ApartsProvider; 