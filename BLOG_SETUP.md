# 🚀 Blog Sistemi Hızlı Kurulum

Django DRF backend'iniz hazır olduğuna göre, blog sisteminizi aktif etmek için sadece birkaç adım kaldı!

## ✅ 1. Environment Variables

`.env.local` dosyanızı oluşturun ve aşağıdaki değerleri ekleyin:

```env
# Django DRF Backend URL
NEXT_PUBLIC_BLOG_API_URL=http://localhost:8000/blog/api

# Site URL (production URL'inizi kullanın)
NEXT_PUBLIC_SITE_URL=https://aparthouse.com.tr
```

## ✅ 2. Django Backend Kontrolü

Backend'inizin aşağıdaki endpoint'lerde çalıştığından emin olun:

```bash
# Health check
curl http://localhost:8000/blog/api/stats/

# Blog posts
curl http://localhost:8000/blog/api/posts/

# Categories
curl http://localhost:8000/blog/api/categories/

# Tags
curl http://localhost:8000/blog/api/tags/
```

## ✅ 3. CORS Ayarları

Django `settings.py` dosyanızda CORS ayarlarını kontrol edin:

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",     # Development
    "https://aparthouse.com.tr", # Production
]

# Veya development için tüm originlere izin:
CORS_ALLOW_ALL_ORIGINS = True  # Sadece development için!
```

## ✅ 4. Test Etme

1. Next.js uygulamanızı başlatın:
   ```bash
   npm run dev
   ```

2. `http://localhost:3000/blog` adresine gidin

3. Sayfanın üst kısmında "Blog API Test" panelini göreceksiniz (sadece development modunda)

4. "Test API" butonuna tıklayarak backend bağlantısını test edin

## 🎯 Beklenen Sonuçlar

### ✅ Başarılı Kurulum
- API test paneli: "✅ API Connection Successful!"
- Blog yazıları listeleniyor
- Kategoriler ve etiketler yan panelde görünüyor
- Arama ve filtreleme çalışıyor

### ❌ Sorun Varsa

**API Error:** Backend'iniz çalışmıyor veya CORS sorunu
- Django server'ın çalıştığını kontrol edin
- CORS ayarlarını kontrol edin
- Browser console'da network tab'ına bakın

**Network Error:** URL yanlış veya backend ulaşılabilir değil
- `NEXT_PUBLIC_BLOG_API_URL` değerini kontrol edin
- Django server'ın doğru portta çalıştığını kontrol edin

## 🔗 URL'ler

Backend hazır olduktan sonra şu URL'ler çalışacak:

- `http://localhost:3000/blog` - Blog ana sayfası
- `http://localhost:3000/blog/kategori/teknoloji` - Kategori sayfası  
- `http://localhost:3000/blog/etiket/django` - Etiket sayfası
- `http://localhost:3000/blog/blog-yazisi-slug` - Blog yazı detayı

## 📝 Test Data

Backend'inizde test verisi yoksa, Django admin panelinden birkaç blog yazısı, kategori ve etiket oluşturun.

## 🎉 Tamamlandı!

Blog sisteminiz artık tamamen çalışır durumda! Production'a alırken:

1. `NEXT_PUBLIC_SITE_URL`'i production URL'iniz ile güncelleyin
2. API URL'ini production backend URL'iniz ile güncelleyin  
3. CORS ayarlarını production domain'iniz ile güncelleyin

**Başarılar! 🚀** 