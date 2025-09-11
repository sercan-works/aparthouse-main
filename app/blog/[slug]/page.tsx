import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostDetail from '@/components/blog/BlogPostDetail';
import BlogSidebar from '@/components/blog/BlogSidebar';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { getBlogPostBySlug } from '@/lib/api/blog';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Yazısı Bulunamadı | ApartHouse',
    };
  }

  return {
    title: post.meta_title,
    description: post.meta_description,
    keywords: post.tags.map(tag => tag.name).join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://aparthouse.com.tr/blog/${post.slug}`,
      images: [
        {
          url: post.featured_image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.published_at,
      authors: [`${post.author.first_name} ${post.author.last_name}`],
      tags: post.tags.map(tag => tag.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featured_image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  // Structured Data for Article
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image,
    author: {
      '@type': 'Person',
      name: `${post.author.first_name} ${post.author.last_name}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ApartHouse',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aparthouse.com.tr/logo.png',
      },
    },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    articleSection: post.category.name,
    keywords: post.tags.map(tag => tag.name).join(', '),
    wordCount: post.content?.split(' ').length || 0,
    timeRequired: `PT${post.reading_time}M`,
    url: `https://aparthouse.com.tr/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://aparthouse.com.tr/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <BlogPostDetail post={post} />
            
            {/* Related Posts */}
            <div className="mt-12">
              <RelatedPosts currentSlug={params.slug} />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
    </>
  );
} 