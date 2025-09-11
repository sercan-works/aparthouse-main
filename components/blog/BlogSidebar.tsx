'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Category, Tag, BlogPost } from '@/types/blog';
import { BlogAPI } from '@/lib/api/blog';

export default function BlogSidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSidebarData();
  }, []);

  const fetchSidebarData = async () => {
    try {
      console.log('[BlogSidebar] Fetching sidebar data...');
      
      const [categoriesRes, tagsRes, recentRes] = await Promise.all([
        BlogAPI.getCategories(),
        BlogAPI.getTags(),
        BlogAPI.getRecentPosts()
      ]);

      console.log('[BlogSidebar] Categories response:', categoriesRes);
      console.log('[BlogSidebar] Tags response:', tagsRes);
      console.log('[BlogSidebar] Recent posts response:', recentRes);

      if (categoriesRes.data) {
        setCategories(categoriesRes.data);
      }
      
      if (tagsRes.data) {
        setTags(tagsRes.data);
      }
      
      if (recentRes.data) {
        setRecentPosts(recentRes.data);
      }

      // Log errors if any
      if (categoriesRes.error) console.error('[BlogSidebar] Error fetching categories:', categoriesRes.error);
      if (tagsRes.error) console.error('[BlogSidebar] Error fetching tags:', tagsRes.error);
      if (recentRes.error) console.error('[BlogSidebar] Error fetching recent posts:', recentRes.error);
      
    } catch (error) {
      console.error('[BlogSidebar] Error fetching sidebar data:', error);
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
      <div className="space-y-8">
        {/* Categories Loading */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>

        {/* Tags Loading */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="flex flex-wrap gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded w-16"></div>
            ))}
          </div>
        </div>

        {/* Recent Posts Loading */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Arama</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Blog yazılarında ara..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategoriler</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/blog/kategori/${category.slug}`}
                className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition-colors"
              >
                <span>{category.name}</span>
                <span className="text-sm text-gray-400">({category.post_count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popüler Etiketler</h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 10).map((tag) => (
            <Link
              key={tag.id}
              href={`/blog/etiket/${tag.slug}`}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors"
            >
              #{tag.name}
              <span className="ml-1 text-xs text-gray-500">({tag.post_count})</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Yazılar</h3>
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{formatDate(post.published_at)}</span>
                  <span className="mx-2">•</span>
                  <span>{post.view_count} görüntüleme</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-sm p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Blog&apos;dan Haberdar Ol</h3>
        <p className="text-sm text-blue-100 mb-4">
          Yeni yazılarımızdan ilk sen haberdar ol!
        </p>
        <div className="space-y-2">
          <input
            type="email"
            placeholder="E-posta adresin"
            className="w-full px-3 py-2 rounded-md text-gray-900 text-sm"
          />
          <button className="w-full bg-white text-blue-600 font-medium py-2 px-4 rounded-md text-sm hover:bg-gray-100 transition-colors">
            Abone Ol
          </button>
        </div>
      </div>
    </div>
  );
} 