import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogList from '@/components/blog/BlogList';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { getCategoryBySlug } from '@/lib/api/blog';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    return {
      title: 'Kategori Bulunamadı | ApartHouse Blog',
    };
  }

  return {
    title: `${category.name} | ApartHouse Blog`,
    description: category.description || `${category.name} kategorisindeki blog yazıları`,
    openGraph: {
      title: `${category.name} | ApartHouse Blog`,
      description: category.description || `${category.name} kategorisindeki blog yazıları`,
      type: 'website',
      url: `https://aparthouse.com.tr/blog/kategori/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            {category.post_count} yazı
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <BlogList categorySlug={params.slug} />
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