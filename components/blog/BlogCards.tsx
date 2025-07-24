'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { BlogAPI } from '@/lib/api/blog';

export default function BlogCards() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      const response = await BlogAPI.getRecentPosts();
      if (response.data && Array.isArray(response.data)) {
        setPosts(response.data.slice(0, 3)); // Sadece 3 yazı göster
      }
    } catch (error) {
      console.error('Error fetching recent posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Son Blog Yazıları</h2>
        <Link 
          href="/blog" 
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Tümünü Gör →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
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
            
            <div className="p-4">
              {/* Category */}
              {post.category && (
                <Link 
                  href={`/blog/kategori/${post.category.slug}`}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors mb-2"
                >
                  {post.category.name}
                </Link>
              )}

              {/* Title */}
              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title || 'Başlıksız Yazı'}
                </h3>
              </Link>

              {/* Excerpt */}
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {post.excerpt || 'Bu yazı için özet bulunmuyor.'}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{formatDate(post.published_at)}</span>
                <span>{post.reading_time || 0} dk okuma</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 