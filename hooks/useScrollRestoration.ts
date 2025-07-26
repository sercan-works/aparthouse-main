import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface ScrollPosition {
  x: number;
  y: number;
}

export const useScrollRestoration = (key: string) => {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);
  const scrollPositions = useRef<Map<string, ScrollPosition>>(new Map());
  const isRestoringRef = useRef(false);

  // Scroll pozisyonunu kaydet
  const saveScrollPosition = () => {
    if (typeof window !== 'undefined' && !isRestoringRef.current) {
      const position: ScrollPosition = {
        x: window.scrollX,
        y: window.scrollY
      };
      scrollPositions.current.set(key, position);
      
      // SessionStorage'a da kaydet (sayfa yenilenmesi durumunda)
      sessionStorage.setItem(`scroll_${key}`, JSON.stringify(position));
    }
  };

  // Scroll pozisyonunu geri yükle - daha güvenilir versiyon
  const restoreScrollPosition = () => {
    if (typeof window !== 'undefined' && pathname === '/') {
      let position: ScrollPosition | null = null;
      
      // Önce sessionStorage'dan al (Card komponentinden kaydedilen)
      const saved = sessionStorage.getItem(`scroll_${key}`);
      if (saved) {
        try {
          position = JSON.parse(saved);
        } catch (e) {
          console.warn('Scroll position parse error:', e);
        }
      }
      
      // Memory'den de kontrol et
      if (!position) {
        const memoryPosition = scrollPositions.current.get(key);
        if (memoryPosition) {
          position = memoryPosition;
        }
      }

      if (position && position.y > 0) {
        isRestoringRef.current = true;
        
        // DOM'un tamamen yüklenmesi için birden fazla deneme yap
        const attemptRestore = (attempts = 0) => {
          if (attempts > 20) { // Maximum 20 deneme (2 saniye)
            isRestoringRef.current = false;
            return;
          }
          
          const maxScroll = Math.max(
            document.body.scrollHeight - window.innerHeight,
            document.documentElement.scrollHeight - window.innerHeight,
            0
          );
          
          // Eğer sayfa yeterince uzun değilse biraz daha bekle
          if (maxScroll < position!.y && attempts < 15) {
            setTimeout(() => attemptRestore(attempts + 1), 100);
            return;
          }
          
          // Scroll pozisyonunu geri yükle
          window.scrollTo({
            left: position!.x,
            top: Math.min(position!.y, maxScroll),
            behavior: 'auto'
          });
          
          // Başarılı olup olmadığını kontrol et
          setTimeout(() => {
            const currentY = window.scrollY;
            const targetY = Math.min(position!.y, maxScroll);
            
            // Eğer hedeflenen pozisyona ulaşamadıysak tekrar dene
            if (Math.abs(currentY - targetY) > 50 && attempts < 10) {
              setTimeout(() => attemptRestore(attempts + 1), 100);
            } else {
              isRestoringRef.current = false;
              // Başarılı restore sonrası sessionStorage'ı temizle
              sessionStorage.removeItem(`scroll_${key}`);
            }
          }, 50);
        };
        
        setTimeout(() => attemptRestore(), 100);
      }
    }
  };

  // Pathname değişikliklerini izle
  useEffect(() => {
    if (previousPathname.current && previousPathname.current !== pathname) {
      // Önceki sayfanın scroll pozisyonunu kaydet
      if (previousPathname.current === '/') {
        saveScrollPosition();
      }
    }
    previousPathname.current = pathname;
  }, [pathname, key]);

  // Component unmount edildiğinde scroll pozisyonunu kaydet
  useEffect(() => {
    return () => {
      if (pathname === '/') {
        saveScrollPosition();
      }
    };
  }, [key, pathname]);

  // Ana sayfaya döndüğünde scroll pozisyonunu geri yükle
  useEffect(() => {
    if (pathname === '/') {
      // Küçük bir gecikme ile başlat
      const timeoutId = setTimeout(() => {
        restoreScrollPosition();
      }, 200);
      
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, key]);

  // Scroll olaylarını dinle ve kaydet
  useEffect(() => {
    if (pathname === '/') {
      const handleScroll = () => {
        if (!isRestoringRef.current) {
          saveScrollPosition();
        }
      };

      // Throttled scroll handler
      let ticking = false;
      const throttledHandler = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', throttledHandler, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', throttledHandler);
      };
    }
  }, [pathname, key]);

  return {
    saveScrollPosition,
    restoreScrollPosition
  };
}; 