'use client';
import React, { useEffect } from 'react';
import MobileCompare from './MobileCompare';
import DesktopCompare from './DesktopCompare';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetApartsByIdsQuery } from '@/store/api/compareApi';
import { setCompareAparts } from '@/store/features/CompareSlice';
import Loading from '@/components/ui/Loading';

const Compare = () => {
  const dispatch = useDispatch();
  const { compareApartIds, compareAparts } = useSelector((state: RootState) => state.compare);
  
  // API ile karşılaştırma listesindeki apartları getir
  const { data: fetchedAparts, isLoading, isError } = useGetApartsByIdsQuery(compareApartIds, {
    skip: compareApartIds.length === 0, // Eğer ID listesi boşsa API çağrısı yapma
  });

  // Eğer API'den veriler gelirse state'e kaydet
  useEffect(() => {
    if (fetchedAparts) {
      dispatch(setCompareAparts(fetchedAparts));
    }
  }, [fetchedAparts, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Apartlar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.</p>
      </div>
    );
  }

  // Karşılaştırma listesi boşsa bilgi mesajı göster
  if (compareApartIds.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Karşılaştırma Listeniz Boş</h2>
        <p className="text-gray-600">Karşılaştırmak istediğiniz apartları ekleyin.</p>
      </div>
    );
  }

  return (
    <>
      <div className="block md:hidden">
        <MobileCompare aparts={compareAparts} />
      </div>
      <div className="hidden md:block">
        <DesktopCompare aparts={compareAparts} />
      </div>
    </>
  );
};

export default Compare;
