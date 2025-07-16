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
    if (searchResults?.results) {
      console.log('Search results available:', searchResults.results.length);
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

      {/* Modern Search Results */}
      {showResults && searchResults?.results && searchResults.results.length > 0 && (
        <div className="fixed md:absolute left-0 right-0 md:right-auto md:w-full top-[120px] md:top-auto md:mt-2 mx-4 md:mx-0 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[70vh] md:max-h-[450px] overflow-hidden z-[99999] backdrop-blur-sm">
          {/* Modern Header */}
          <div className="bg-gradient-to-r from-colorFirst to-pink-500 px-6 py-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="font-semibold text-sm">Arama Sonuçları</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                {searchResults.results.length} sonuç
              </span>
              <FaXmark 
                className="cursor-pointer hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-all duration-200" 
                onClick={handleClearAndClose} 
                size={20}
              />
            </div>
          </div>

          {/* Modern Results List */}
          <div className="overflow-y-auto max-h-[calc(70vh-80px)] md:max-h-[370px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {searchResults.results.map((result: ApiApart) => (
              <div 
                key={result.id}
                className="group px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gradient-to-r hover:from-colorFirst hover:from-opacity-5 hover:to-pink-50 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
                onClick={() => handleSelectApart(result.slug)}
              >
                <div className="flex items-center gap-4">
                  {/* Apart Image/Avatar */}
                  <div className="relative">
                    {result.cover_image ? (
                      <img 
                        src={result.cover_image} 
                        alt={String(result.apart_name)}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-gray-100 group-hover:border-colorFirst transition-all duration-300"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-colorFirst to-pink-400 flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                        <span className="text-white font-bold text-lg">
                          {String(result.apart_name || '').charAt(0)}
                        </span>
                      </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-white">✓</span>
                    </div>
                  </div>

                  {/* Apart Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-colorFirst transition-colors duration-300 truncate">
                        {String(result.apart_name || '')}
                      </h3>
                      {result.category && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {result.category.name}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {/* Location */}
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{result.town?.name || result.city_name}</span>
                      </div>

                      {/* Phone */}
                      {result.phone && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{result.phone}</span>
                        </div>
                      )}

                      {/* Price */}
                      {result.price && (
                        <div className="flex items-center gap-1 ml-auto">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span className="font-semibold text-green-600">{result.price}₺</span>
                          <span className="text-xs text-gray-500">/{result.price_type}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-colorFirst" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
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
