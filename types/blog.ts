export interface Author {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  post_count?: number;
  created_at: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  post_count?: number;
  created_at: string;
}

export interface Comment {
  id: number;
  author_name: string;
  author_email: string;
  content: string;
  is_approved: boolean;
  created_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt: string;
  featured_image: string;
  author: Author;
  category: Category;
  tags: Tag[];
  published_at: string;
  created_at: string;
  updated_at: string;
  reading_time: number;
  view_count: number;
  comment_count: number;
  comments?: Comment[];
  meta_title: string;
  meta_description: string;
}

export interface BlogStats {
  total_posts: number;
  total_categories: number;
  total_tags: number;
  total_comments: number;
  most_viewed_posts: BlogPost[];
  recent_posts: BlogPost[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CommentCreateRequest {
  author_name: string;
  author_email: string;
  content: string;
} 