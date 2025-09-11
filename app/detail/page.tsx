import { redirect } from 'next/navigation';
import { mockAparts } from '@/data/apart';

// Varsayılan olarak bir sluga yönlendirme yapıyoruz, artık URL'den /detail bölümünü kaldırdık
export default function DetailRedirect() {
  // mockAparts'ta ilk apartın slug'ı varsa ona yönlendir, yoksa varsayılan slug'a yönlendir
  const firstApartSlug = mockAparts.length > 0 ? mockAparts[0].slug : 'merkezi-konumda-3-1-daire';
  
  // Yeni URL yapısını kullanarak yönlendirme yapıyoruz
  redirect(`/${firstApartSlug}`);
}
