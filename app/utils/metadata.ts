import { Metadata } from 'next';

// SEO için temel metadata şablonu
export const BASE_METADATA = {
  title: 'Eskişehir Apart ve Yurt Rehberi | Aparthouse',
  description: 'Eskişehir Apart ve Yurt Rehberi | Aparthouse',
  keywords: 'eskisehir apart, eskisehir yurt, eskisehir apart ve yurt rehberi, eskisehir apart ve yurt rehberi',
  applicationName: 'Aparthouse',
  authors: [{ name: 'Aparthouse', url: 'https://aparthouse.com.tr' }],
  creator: 'Aparthouse',
  publisher: 'Aparthouse',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

// Sosyal medya için kullanılan OpenGraph ve Twitter card değerleri
export const BASE_SOCIAL_METADATA = {
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://aparthouse.com.tr',
    siteName: 'Aparthouse',
    title: 'Eskişehir Apart ve Yurt Rehberi | Aparthouse',
    description: 'Eskişehir Apart ve Yurt Rehberi | Aparthouse',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aparthouse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eskişehir Apart ve Yurt Rehberi | Aparthouse',
    description: 'Eskişehir Apart ve Yurt Rehberi | Aparthouse',
    images: ['/images/twitter-image.jpg'],
    creator: '@aparthouse',
  },
};

// Dinamik olarak metadata oluşturmak için kullanılan fonksiyon
export function createMetadata({
  title,
  description,
  keywords,
  path = '',
  image = '/images/og-image.jpg',
  type = 'website',
}: {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = `https://aparthouse.com.tr${path}`;
  
  return {
    ...BASE_METADATA,
    title: title ? `${title} | Aparthouse` : BASE_METADATA.title,
    description: description || BASE_METADATA.description,
    keywords: keywords || BASE_METADATA.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...BASE_SOCIAL_METADATA.openGraph,
      title: title ? `${title} | Aparthouse` : BASE_SOCIAL_METADATA.openGraph.title,
      description: description || BASE_SOCIAL_METADATA.openGraph.description,
      url,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || 'Aparthouse',
        },
      ],
    },
    twitter: {
      ...BASE_SOCIAL_METADATA.twitter,
      title: title ? `${title} | Aparthouse` : BASE_SOCIAL_METADATA.twitter.title,
      description: description || BASE_SOCIAL_METADATA.twitter.description,
      images: [image],
    },
  };
} 