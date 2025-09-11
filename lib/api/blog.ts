import { BlogPost, Category, Tag, BlogStats, PaginatedResponse, CommentCreateRequest, Comment } from '@/types/blog';

const BLOG_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const url = `${BLOG_API_BASE_URL}/blog/api${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        // DRF error formats
        if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }
      } catch {
        // JSON parse hatası varsa orijinal mesajı kullan
      }
      
      return {
        error: errorMessage,
        status: response.status,
      };
    }

    const data = await response.json();
    
    return {
      data,
      status: response.status,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Network error';
    
    return {
      error: `Network error: ${errorMessage}`,
      status: 0,
    };
  }
}

export class BlogAPI {
  // Blog Posts
  static async getPosts(params?: {
    page?: number;
    page_size?: number;
    category?: string;
    tag?: string;
    search?: string;
    ordering?: string;
  }): Promise<ApiResponse<PaginatedResponse<BlogPost>>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.page_size) searchParams.append('page_size', params.page_size.toString());
    if (params?.category) searchParams.append('category', params.category);
    if (params?.tag) searchParams.append('tag', params.tag);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.ordering) searchParams.append('ordering', params.ordering);

    const queryString = searchParams.toString();
    const endpoint = `/posts/${queryString ? `?${queryString}` : ''}`;
    
    return fetchApi<PaginatedResponse<BlogPost>>(endpoint);
  }

  static async getPostBySlug(slug: string): Promise<ApiResponse<BlogPost>> {
    return fetchApi<BlogPost>(`/posts/${slug}/`);
  }

  static async getFeaturedPosts(): Promise<ApiResponse<BlogPost[]>> {
    return fetchApi<BlogPost[]>('/posts/featured/');
  }

  static async getRecentPosts(): Promise<ApiResponse<BlogPost[]>> {
    return fetchApi<BlogPost[]>('/posts/recent/');
  }

  static async getRelatedPosts(slug: string): Promise<ApiResponse<BlogPost[]>> {
    return fetchApi<BlogPost[]>(`/posts/${slug}/related/`);
  }

  static async addComment(slug: string, comment: CommentCreateRequest): Promise<ApiResponse<Comment>> {
    return fetchApi<Comment>(`/posts/${slug}/add_comment/`, {
      method: 'POST',
      body: JSON.stringify(comment),
    });
  }

  // Categories
  static async getCategories(): Promise<ApiResponse<Category[]>> {
    return fetchApi<Category[]>('/categories/');
  }

  static async getCategoryBySlug(slug: string): Promise<ApiResponse<Category & { posts: BlogPost[] }>> {
    return fetchApi<Category & { posts: BlogPost[] }>(`/categories/${slug}/`);
  }

  // Tags
  static async getTags(): Promise<ApiResponse<Tag[]>> {
    return fetchApi<Tag[]>('/tags/');
  }

  static async getTagBySlug(slug: string): Promise<ApiResponse<Tag & { posts: BlogPost[] }>> {
    return fetchApi<Tag & { posts: BlogPost[] }>(`/tags/${slug}/`);
  }

  // Stats
  static async getStats(): Promise<ApiResponse<BlogStats>> {
    return fetchApi<BlogStats>('/stats/');
  }

  // Health check for testing API connection
  static async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    return fetchApi<{ status: string }>('/stats/'); // Using stats as health check
  }
}

// Utility functions for backward compatibility and error handling
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await BlogAPI.getPostBySlug(slug);
  if (response.error) {
    console.error('Error fetching blog post:', response.error);
    return null;
  }
  return response.data || null;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const response = await BlogAPI.getCategoryBySlug(slug);
  if (response.error) {
    console.error('Error fetching category:', response.error);
    return null;
  }
  return response.data || null;
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const response = await BlogAPI.getTagBySlug(slug);
  if (response.error) {
    console.error('Error fetching tag:', response.error);
    return null;
  }
  return response.data || null;
} 