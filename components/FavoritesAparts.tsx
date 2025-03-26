"use client";
import React, { useEffect } from "react";
import Card from "./card/Card";
import { Button } from "@heroui/react";
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetApartsByIdsQuery } from "@/store/api/favoriteApi";
import { setFavoriteAparts, setLoading, setError } from "@/store/features/FavoriteSlice";
import CardPlaceholder from "./ui/CardPlaceholder";

const FavoritesAparts = () => {
  const dispatch = useDispatch();
  const { favoriteApartIds, favoriteAparts, loading, error } = useSelector((state: RootState) => state.favorite);

  // Kullanıcı giriş yapmışsa veya yapmamışsa, her durumda localStorage'daki ID'lere göre apartları çek
  const { data: anonFavorites, isLoading: isLoadingAnonFavorites, error: anonFavoritesError } = useGetApartsByIdsQuery(
    favoriteApartIds, 
    { skip: favoriteApartIds.length === 0 }
  );

  // API'den favori apartları çekmeyi devre dışı bırak
  // const { data: userFavorites, isLoading: isLoadingUserFavorites, error: userFavoritesError } = useGetFavoriteApartsQuery(
  //   undefined, 
  //   { skip: true } // Her zaman atla
  // );

  useEffect(() => {
    // Kullanıcı giriş yapmış olsa da olmasa da, localStorage'daki ID'lere göre apartları kullan
    dispatch(setLoading(isLoadingAnonFavorites));
    if (anonFavoritesError) {
      dispatch(setError("Favori apartlar yüklenirken bir hata oluştu."));
    } else if (anonFavorites) {
      dispatch(setFavoriteAparts(anonFavorites));
    }
  }, [
    dispatch, 
    favoriteApartIds, 
    anonFavorites, 
    isLoadingAnonFavorites, 
    anonFavoritesError
  ]);

  // Yükleme durumunda
  if (loading) {
    return (
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <CardPlaceholder key={index} />
        ))}
      </div>
    );
  }

  // Hata durumunda
  if (error) {
    return (
      <div className="w-full bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5">
        <p className="font-bold">Hata!</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {favoriteAparts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Henüz hiç favori apartınız bulunmuyor.</p>
          <Button className="border-colorFirst border-2 my-4 mx-auto text-colorFirst justify-center items-center bg-opacity-0">
            <p className="font-bold">Apartları Keşfedin</p>
            <MdArrowForwardIos className="w-4 h-4 text-colorFirst" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 justify-center items-center mb-20">
            {favoriteAparts.map((apart) => (
              <Card key={apart.id} apart={apart} />
            ))}
          </div>
          {/* <div className="flex flex-row gap-4">
            <Button className="hidden w-48 md:flex border-colorFirst border-2 my-4 mx-auto text-colorFirst justify-center items-center bg-opacity-0">
              <MdCompareArrows className="md:w-5 md:h-5 text-colorFirst" />
              <p className="font-bold">Karşılaştır</p>
            </Button>
            <Button className="hidden w-48 md:flex border-colorFirst border-2 my-4 mx-auto text-colorFirst justify-center items-center bg-opacity-0">
              <p className="font-bold">Daha Fazlasını Gör</p>
              <MdArrowForwardIos className="w-4 h-4 text-colorFirst" />
            </Button>
          </div> */}
          {/* SAYFA SONUNA ULAŞTINIZ */}
          <div className="flex md:hidden justify-center items-center">
            <Button className="border-colorFirst border-2 mt-4 mb-20 mx-auto text-colorFirst justify-center items-center bg-opacity-0">
              <p className="font-bold">Sayfa sonuna ulaştınız...</p>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesAparts;
