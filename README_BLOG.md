# 📚 ApartHouse Blog Sistemi

Bu proje Django REST Framework backend'i ile entegre edilmiş modern bir blog sistemidir.

## 🚀 Kurulum

### 1. Environment Variables

`.env.local` dosyanızda aşağıdaki değişkenleri tanımlayın:

```env
# Blog API URL (Django Backend)
NEXT_PUBLIC_BLOG_API_URL=http://localhost:8000/blog/api

# Site URL for SEO and social sharing
NEXT_PUBLIC_SITE_URL=https://aparthouse.com.tr
```

### 2. Django Backend Hazırlığı

Backend'inizde aşağıdaki endpoint'lerin hazır olduğundan emin olun:

```
Base URL: http://localhost:8000/blog/api
```

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/posts/` | Blog yazıları listesi |
| GET | `/posts/{slug}/` | Blog yazısı detayı |
| GET | `/posts/featured/` | Öne çıkan yazılar |
| GET | `/posts/recent/` | Son yazılar |
| GET | `/posts/{slug}/related/` | İlgili yazılar |
| POST | `/posts/{slug}/add_comment/` | Yorum ekle |
| GET | `/categories/` | Kategori listesi |
| GET | `/categories/{slug}/` | Kategori detayı |
| GET | `/tags/` | Tag listesi |
| GET | `/tags/{slug}/` | Tag detayı |
| GET | `/stats/` | Blog istatistikleri |

## 📄 API Response Formatları

### Blog Posts List (`GET /posts/`)
```json
{
  "count": 25,
  "next": "http://localhost:8000/blog/api/posts/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Blog Başlığı",
      "slug": "blog-basligi",
      "excerpt": "Blog özeti...",
      "featured_image": "http://localhost:8000/media/blog/images/2024/01/image.jpg",
      "author": {
        "id": 1,
        "username": "admin",
        "first_name": "John",
        "last_name": "Doe"
      },
      "category": {
        "id": 1,
        "name": "Teknoloji",
        "slug": "teknoloji"
      },
      "tags": [
        {
          "id": 1,
          "name": "Django",
          "slug": "django"
        }
      ],
      "published_at": "2024-01-20T14:30:00Z",
      "reading_time": 5,
      "view_count": 245,
      "comment_count": 8,
      "meta_title": "SEO Başlık",
      "meta_description": "SEO açıklama"
    }
  ]
}
```

### Blog Post Detail (`GET /posts/{slug}/`)
```json
{
  "id": 1,
  "title": "Blog Başlığı",
  "slug": "blog-basligi",
  "content": "<p>HTML içerik...</p>",
  "excerpt": "Blog özeti...",
  "featured_image": "http://localhost:8000/media/blog/images/2024/01/image.jpg",
  "author": {
    "id": 1,
    "username": "admin",
    "first_name": "John",
    "last_name": "Doe"
  },
  "category": {
    "id": 1,
    "name": "Teknoloji",
    "slug": "teknoloji"
  },
  "tags": [
    {
      "id": 1,
      "name": "Django",
      "slug": "django"
    }
  ],
  "published_at": "2024-01-20T14:30:00Z",
  "created_at": "2024-01-20T14:30:00Z",
  "updated_at": "2024-01-21T09:15:00Z",
  "reading_time": 5,
  "view_count": 246,
  "comment_count": 8,
  "comments": [
    {
      "id": 1,
      "author_name": "Jane Smith",
      "author_email": "jane@example.com",
      "content": "Yorum içeriği...",
      "is_approved": true,
      "created_at": "2024-01-21T16:45:00Z"
    }
  ],
  "meta_title": "SEO Başlık",
  "meta_description": "SEO açıklama"
}
```

## 🎯 Özellikler

### Frontend
- ✅ Responsive blog tasarımı
- ✅ Blog yazı listesi (pagination, filtreleme, arama)
- ✅ Blog yazı detayı (yorum sistemi, sosyal paylaşım)
- ✅ Kategori ve etiket sayfaları
- ✅ İlgili yazılar önerisi
- ✅ SEO optimizasyonu (metadata, structured data)
- ✅ Sitemap entegrasyonu
- ✅ Loading states ve error handling

### SEO
- ✅ Dynamic metadata (title, description, keywords)
- ✅ OpenGraph tags (sosyal medya paylaşımları)
- ✅ Twitter Cards
- ✅ JSON-LD Structured Data (Article, Blog)
- ✅ Otomatik sitemap güncellemesi

### API Entegrasyonu
- ✅ DRF API endpoint'leri
- ✅ Error handling ve retry logic
- ✅ Type-safe API çağrıları
- ✅ Pagination desteği
- ✅ Search ve filtering

## 📂 Dosya Yapısı

```
app/
├── blog/
│   ├── page.tsx                    # Blog ana sayfası
│   ├── [slug]/
│   │   └── page.tsx               # Blog yazı detayı
│   ├── kategori/[slug]/
│   │   └── page.tsx               # Kategori sayfası
│   └── etiket/[slug]/
│       └── page.tsx               # Etiket sayfası
├── sitemap.ts                     # SEO sitemap (blog dahil)

components/blog/
├── BlogList.tsx                   # Blog yazı listesi
├── BlogSidebar.tsx               # Yan panel (kategoriler, etiketler)
├── BlogPostDetail.tsx            # Yazı detayı ve yorum sistemi
└── RelatedPosts.tsx              # İlgili yazılar

lib/api/
└── blog.ts                       # API client ve utility fonksiyonlar

types/
└── blog.ts                       # TypeScript tip tanımları
```

## 🔧 Kullanım

### 1. Blog Yazıları Listeleme
```typescript
import { BlogAPI } from '@/lib/api/blog';

const response = await BlogAPI.getPosts({
  page: 1,
  page_size: 10,
  category: 'teknoloji',
  tag: 'django',
  search: 'django',
  ordering: '-published_at'
});
```

### 2. Yorum Ekleme
```typescript
const response = await BlogAPI.addComment('blog-slug', {
  author_name: 'Kullanıcı Adı',
  author_email: 'user@example.com',
  content: 'Yorum içeriği...'
});
```

### 3. Error Handling
```typescript
const response = await BlogAPI.getPosts();

if (response.error) {
  console.error('API Error:', response.error);
  return;
}

// Success
const posts = response.data.results;
```

## 🔗 URL Yapısı

- `/blog` - Blog ana sayfası
- `/blog/blog-yazisi-slug` - Blog yazı detayı
- `/blog/kategori/kategori-slug` - Kategori sayfası
- `/blog/etiket/etiket-slug` - Etiket sayfası

## 🚦 CORS Ayarları

Django backend'inizde CORS ayarlarını blog frontend'i için yapılandırmayı unutmayın:

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://aparthouse.com.tr",
]
```

## 🐛 Sorun Giderme

### 1. API Bağlantı Sorunu
- `NEXT_PUBLIC_BLOG_API_URL` environment variable'ının doğru ayarlandığından emin olun
- Django backend'in çalıştığından emin olun
- CORS ayarlarını kontrol edin

### 2. SEO Sorunları
- `NEXT_PUBLIC_SITE_URL` environment variable'ının production URL'i ile eşleştiğinden emin olun
- Sitemap'in `/sitemap.xml` adresinden erişilebilir olduğunu kontrol edin

### 3. Performance
- Blog API'lerinde sayfalama kullanın
- İhtiyaç duyulmayan alanları exclude edin
- Cache stratejileri uygulayın

## 📞 Destek

Sorunlarınız için:
1. Environment variables'ları kontrol edin
2. Django backend loglarını inceleyin
3. Browser developer tools'ta network sekmesini kontrol edin
4. Console error'larını inceleyin

Bu dokümana göre blog sisteminiz tamamen çalışır durumda! 