'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { BlogAPI } from '@/lib/api/blog';

interface BlogListProps {
  categorySlug?: string;
  tagSlug?: string;
}

export default function BlogList({ categorySlug, tagSlug }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [categorySlug, tagSlug, currentPage]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        page: currentPage,
        page_size: 6,
        category: categorySlug,
        tag: tagSlug,
        ordering: '-published_at'
      };

      const response = await BlogAPI.getPosts(params);
      
      if (response.error) {
        setError(response.error);
        setPosts([]);
        setTotalCount(0);
        setTotalPages(1);
        return;
      }

      if (response.data) {
        // Check if response.data is a paginated response or direct array
        if (response.data.results && Array.isArray(response.data.results)) {
          // Paginated response
          setPosts(response.data.results);
          setTotalCount(response.data.count || 0);
          setTotalPages(Math.ceil((response.data.count || 0) / 6));
        } else if (Array.isArray(response.data)) {
          // Direct array response
          setPosts(response.data);
          setTotalCount(response.data.length);
          setTotalPages(Math.ceil(response.data.length / 6));
        } else {
          setPosts([]);
          setTotalCount(0);
          setTotalPages(1);
        }
      } else {
        setPosts([]);
        setTotalCount(0);
        setTotalPages(1);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      setPosts([]);
      setTotalCount(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Blog yazıları yüklenirken hata oluştu
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={fetchPosts}
                className="bg-red-100 text-red-800 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-200"
              >
                Tekrar Dene
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Blog yazısı bulunamadı</h3>
        <p className="mt-1 text-sm text-gray-500">
          {categorySlug ? 'Bu kategoride henüz yazı yok.' : 
           tagSlug ? 'Bu etiketle henüz yazı yok.' : 
           'Henüz blog yazısı eklenmemiş.'}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {posts && posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <Link href={`/blog/${post.slug}`}>
              <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                <Image
                  src={post.featured_image || '/assets/images/dummy.jpg'}
                  alt={post.title || 'Blog post'}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>
            
            <div className="p-6">
              {/* Category and Date */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                {post.category && (
                  <Link 
                    href={`/blog/kategori/${post.category.slug}`}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                  >
                    {post.category.name}
                  </Link>
                )}
                <span>{formatDate(post.published_at)}</span>
              </div>

              {/* Title */}
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title || 'Başlıksız Yazı'}
                </h2>
              </Link>

              {/* Excerpt */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {post.excerpt || 'Bu yazı için özet bulunmuyor.'}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {post.view_count || 0}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.comment_count || 0}
                  </span>
                  <span>{post.reading_time || 0} dk</span>
                </div>
                <span>
                  {post.author && `${post.author.first_name} ${post.author.last_name}`}
                </span>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog/etiket/${tag.slug}`}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Önceki
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                currentPage === page
                  ? 'text-white bg-blue-600 border border-blue-600'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sonraki
          </button>
        </div>
      )}

      {/* Total Count */}
      <div className="text-center text-sm text-gray-500 mt-4">
        Toplam {totalCount} yazı
      </div>
    </div>
  );
} 