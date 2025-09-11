import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogList from '@/components/blog/BlogList';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { getTagBySlug } from '@/lib/api/blog';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await getTagBySlug(params.slug);
  
  if (!tag) {
    return {
      title: 'Etiket Bulunamadı | ApartHouse Blog',
    };
  }

  return {
    title: `${tag.name} | ApartHouse Blog`,
    description: `${tag.name} etiketiyle ilgili blog yazıları`,
    openGraph: {
      title: `${tag.name} | ApartHouse Blog`,
      description: `${tag.name} etiketiyle ilgili blog yazıları`,
      type: 'website',
      url: `https://aparthouse.com.tr/blog/etiket/${tag.slug}`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const tag = await getTagBySlug(params.slug);
  
  if (!tag) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
            #{tag.name}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {tag.name} Yazıları
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {tag.post_count} yazı
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <BlogList tagSlug={params.slug} />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
} 