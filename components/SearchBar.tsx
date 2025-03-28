import { Input } from '@heroui/react'
import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import SearchIcon from '@/public/assets/icons/SearchIcon.svg'

import {  useGetSearchResultsQuery } from '@/store/api/filterApi'
import { useRouter } from 'next/navigation'
import debounce from 'lodash/debounce'
import { ApiApart } from '@/store/api/apartsApi'
import { FaXmark } from 'react-icons/fa6'

const SearchBar = ({placeholder}: {placeholder: string}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  
  // Debounced search query
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setDebouncedQuery(query);
    }, 1000),
    []
  );

  const { data: searchResults, isLoading } = useGetSearchResultsQuery(debouncedQuery, {
    skip: !debouncedQuery || debouncedQuery.length < 3
  });

  // Show dropdown when typing 3+ characters or when results are loading
  useEffect(() => {
    if (searchQuery.length >= 3 || isLoading) {
      setShowResults(true);
    }
  }, [searchQuery, isLoading]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length >= 3) {
      debouncedSearch(query);
      setShowResults(true);
    } else {
      setDebouncedQuery("");
      if (query.length === 0) {
        setShowResults(false);
      }
    }
  };

  const handleSelectApart = (slug: string) => {
    router.push(`/${slug}`);
    setShowResults(false);
  };

  // Function to handle clear and close
  const handleClearAndClose = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setShowResults(false);
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Debugging: log when search data changes
  useEffect(() => {
    if (searchResults) {
      console.log('Search results available:', searchResults.length);
    }
  }, [searchResults]);

  return (
    <div className="relative search-container w-full">
      <div className="flex items-center w-full">
        <Input
          className="w-full md:w-[538px] rounded-full"
          labelPlacement="outside"
          placeholder={placeholder}
          value={searchQuery}
          endContent={
            searchQuery ? (
              <FaXmark 
                className="cursor-pointer text-gray-500 hover:text-gray-700" 
                onClick={handleClearAndClose} 
                size={16}
              />
            ) : (
              <Image src={SearchIcon} alt="Search" width={20} height={20} />
            )
          }
          type="text"
          onChange={handleSearch}
          onFocus={() => {
            if (searchQuery.length >= 3 || searchQuery.length > 0) {
              setShowResults(true);
            }
          }}
        />
      </div>

      {/* Search Results - Mobile Optimized */}
      {showResults && searchResults && searchResults.length > 0 && (
        <div className="fixed md:absolute left-0 right-0 md:right-auto md:w-full top-[120px] md:top-auto md:mt-1 mx-4 md:mx-0 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-[60vh] md:max-h-[400px] overflow-y-auto z-[99999]">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="bg-colorFirst">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-white">Apart Adı</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-white">Şehir</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-white">Numara</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result: ApiApart) => (
                  <tr 
                    key={result.id}
                    className="hover:bg-colorFirst hover:bg-opacity-50 cursor-pointer"
                    onClick={() => handleSelectApart(result.slug)}
                  >
                    <td className="px-4 py-2 text-sm text-gray-900">{result.apart_name}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {result?.city_name || '-'}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">{result.phone || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden">
            <div className="sticky top-0 bg-colorFirst px-4 py-3 text-sm font-semibold text-white flex justify-between items-center">
              <span>Arama Sonuçları</span>
              <span className="text-xs">{searchResults.length} sonuç</span>
              <FaXmark className="cursor-pointer" onClick={handleClearAndClose} />
            </div>
            <div className="py-1">
              {searchResults.map((result: ApiApart) => (
                <div 
                  key={result.id}
                  className="px-4 py-3 border-b last:border-0 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectApart(result.slug)}
                >
                  <div className="font-medium text-gray-900">{result.apart_name}</div>
                  <div className="flex justify-between mt-1 text-sm text-gray-700">
                    <span>{result.town?.name || '-'}</span>
                    <span>{result.phone || '-'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {showResults && isLoading && (
        <div className="fixed md:absolute left-0 right-0 md:right-auto md:w-full top-[120px] md:top-auto md:mt-1 mx-4 md:mx-0 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 text-center text-gray-500 z-[99999]">
          <div className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-colorFirst" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Aranıyor...</span>
          </div>
        </div>
      )}

      {/* Minimum Character Notice */}
      {showResults && searchQuery.length > 0 && searchQuery.length < 3 && (
        <div className="fixed md:absolute left-0 right-0 md:right-auto md:w-full top-[120px] md:top-auto md:mt-1 mx-4 md:mx-0 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 text-center text-gray-500 z-[99999]">
          En az 3 karakter giriniz...
        </div>
      )}
    </div>
  )
}

export default SearchBar
