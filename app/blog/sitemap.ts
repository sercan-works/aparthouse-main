import { MetadataRoute } from 'next';
import { BlogAPI } from '@/lib/api/blog';

export default async function blogSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aparthouse.com.tr';
  
  // Blog ana sayfası
  const staticBlogPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  let blogPosts: MetadataRoute.Sitemap = [];
  let blogCategories: MetadataRoute.Sitemap = [];
  let blogTags: MetadataRoute.Sitemap = [];

  try {
    // Blog yazıları - tüm yazıları çek
    const postsResponse = await BlogAPI.getPosts({ page_size: 1000 });
    if (postsResponse.data) {
      const posts = postsResponse.data.results || postsResponse.data;
      if (Array.isArray(posts)) {
        blogPosts = posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at || post.created_at || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }));
      }
    }

    // Blog kategorileri
    const categoriesResponse = await BlogAPI.getCategories();
    if (categoriesResponse.data && Array.isArray(categoriesResponse.data)) {
      blogCategories = categoriesResponse.data.map((category) => ({
        url: `${baseUrl}/blog/kategori/${category.slug}`,
        lastModified: new Date(category.created_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }

    // Blog etiketleri
    const tagsResponse = await BlogAPI.getTags();
    if (tagsResponse.data && Array.isArray(tagsResponse.data)) {
      blogTags = tagsResponse.data.map((tag) => ({
        url: `${baseUrl}/blog/etiket/${tag.slug}`,
        lastModified: new Date(tag.created_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }));
    }
  } catch (error) {
    console.error('Error fetching blog data for sitemap:', error);
  }

  return [...staticBlogPages, ...blogPosts, ...blogCategories, ...blogTags];
} 