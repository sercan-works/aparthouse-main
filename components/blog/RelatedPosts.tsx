'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { BlogAPI } from '@/lib/api/blog';

interface RelatedPostsProps {
  currentSlug: string;
}

export default function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedPosts();
  }, [currentSlug]);

  const fetchRelatedPosts = async () => {
    try {
      const response = await BlogAPI.getRelatedPosts(currentSlug);
      
      if (response.error) {
        console.error('Error fetching related posts:', response.error);
        setRelatedPosts([]);
      } else if (response.data) {
        setRelatedPosts(response.data);
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
      setRelatedPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short'
    });
  };

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">İlgili Yazılar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">İlgili Yazılar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <Link href={`/blog/${post.slug}`}>
              <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>
            
            <div className="p-4">
              {/* Category and Date */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <Link 
                  href={`/blog/kategori/${post.category.slug}`}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                >
                  {post.category.name}
                </Link>
                <span>{formatDate(post.published_at)}</span>
              </div>

              {/* Title */}
              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>

              {/* Excerpt */}
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {post.view_count}
                  </span>
                  <span>{post.reading_time} dk</span>
                </div>
                <span>
                  {post.author.first_name} {post.author.last_name}
                </span>
              </div>
              
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog/etiket/${tag.slug}`}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
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
    </div>
  );
} 