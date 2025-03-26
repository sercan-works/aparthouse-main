import { Input } from '@heroui/react'
import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import SearchIcon from '@/public/assets/icons/SearchIcon.svg'

import {  useGetSearchResultsQuery } from '@/store/api/filterApi'
import { useRouter } from 'next/navigation'
import debounce from 'lodash/debounce'
import { ApiApart } from '@/store/api/apartsApi'

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

  return (
    <div className="relative search-container">
      <div className="flex items-center">
        <Input
          className="w-full md:w-[538px] rounded-full"
          labelPlacement="outside"
          placeholder={placeholder}
          value={searchQuery}
          endContent={
            <Image src={SearchIcon} alt="Search" width={20} height={20} />
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

      {/* Results Dropdown */}
      {showResults && searchResults && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
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
                    {result.town?.city_name || '-'}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">{result.phone || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Loading State */}
      {showResults && isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg p-4 text-center text-gray-500">
          Aranıyor...
        </div>
      )}

      {/* Minimum Character Notice */}
      {showResults && searchQuery.length > 0 && searchQuery.length < 3 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg p-4 text-center text-gray-500">
          En az 3 karakter giriniz...
        </div>
      )}
    </div>
  )
}

export default SearchBar
