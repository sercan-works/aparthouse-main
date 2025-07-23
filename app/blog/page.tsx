import { Metadata } from 'next';
import BlogList from '@/components/blog/BlogList';
import BlogSidebar from '@/components/blog/BlogSidebar';

export const metadata: Metadata = {
  title: 'Blog | ApartHouse - Öğrenci Yaşamı ve Apart Rehberi',
  description: 'ApartHouse blog sayfasında öğrenci yaşamı, apart seçimi ve şehir rehberleri hakkında faydalı içerikler bulabilirsiniz.',
  keywords: 'blog, öğrenci yaşamı, apart seçimi, üniversite, konaklama, öğrenci apartları',
  openGraph: {
    title: 'Blog | ApartHouse',
    description: 'Öğrenci yaşamı ve apart seçimi hakkında faydalı blog yazıları',
    type: 'website',
    url: 'https://aparthouse.com.tr/blog',
  }
};

export default function BlogPage() {
  // Structured Data for Blog
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ApartHouse Blog',
    description: 'Öğrenci yaşamı, apart seçimi ve şehir rehberleri hakkında faydalı içerikler',
    url: 'https://aparthouse.com.tr/blog',
    publisher: {
      '@type': 'Organization',
      name: 'ApartHouse',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aparthouse.com.tr/logo.png',
      },
    },
    inLanguage: 'tr-TR',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ApartHouse Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Öğrenci yaşamı, apart seçimi ve şehir rehberleri hakkında faydalı içerikler
          </p>
        </div>



        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <BlogList />
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