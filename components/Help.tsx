'use client'
import React from 'react';
import { Accordion, AccordionItem, Card, Button } from "@heroui/react";
import { MdQuestionAnswer, MdInfo, MdHome, MdEmail } from "react-icons/md";
import { useRouter } from 'next/navigation';    
const Help = () => {
    const router = useRouter();
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 mb-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-colorFirst to-blue-500 rounded-2xl p-8 mb-10 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">ApartHouse Yardım Merkezi</h1>
        <p className="text-lg md:text-xl mb-6">
          Size en iyi ev deneyimini sunmak için buradayız. Sorularınızı yanıtlamak ve emlak yolculuğunuzda size yardımcı olmak için her zaman hazırız.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Button color="primary" size="lg" variant="solid" className="flex items-center gap-2 bg-white text-blue-500" onClick={() => router.push('/')}>
            <MdHome className="w-5 h-5" />
            Ana Sayfaya Dön
          </Button>
          <Button color="primary" size="lg" variant="bordered" className="flex items-center gap-2 border-white text-white" onClick={() => router.push('mailto:info@aparthouse.com')}>
            <MdEmail className="w-5 h-5" />
            Bize Ulaşın
          </Button>
        </div>
      </div>

      {/* Site Purpose Section */}
      <Card className="mb-10 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-colorFirst text-white p-3 rounded-full">
            <MdInfo className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">Öğrenci yolculuğunu anlıyoruz, çünkü biz de bu süreci yaşadık...</h2>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Aparthouse.com.tr</strong>,  uluslararası veya yerel öğrenci konutları için yardımcı olur. 2024 yılında kurulduğundan beri, tecrübeli ekibimiz ile binlerce öğrencinin evini bulmasına yardımcı olmaktayız.
          </p>
          
          <h3 className="font-bold text-lg">Misyonumuz...</h3>
          <p>
          Öğrenciler için özel olarak inşa edilmiş ve yönetilen en geniş ve özenle seçilmiş apart yelpazesine sahibiz. Bu, farklı üniversite yakınlarında çeşitli apartları keşfetmenizi ve karşılaştırmanızı sağlar, böylece doğru seçimi yapabilirsiniz.

Doğru apartı seçmek, güvenli ve ilham verici bir temel sağlar. Büyümenize ve yolculuğunuzdan en iyi şekilde yararlanmanıza yardımcı olur.
          </p>
          
          <h3 className="font-bold text-lg">Sizin İçin Sunduklarımız</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Detaylı ev arama ve filtreleme seçenekleri</li>
            <li>Favori ilanları kaydetme ve karşılaştırma imkanı</li>
            <li>Konum bazlı arama ve harita görünümü</li>
            <li>Ev sahipleriyle güvenli iletişim</li>
            <li>Kapsamlı fotoğraf ve video galerisi</li>
            <li>Kullanıcı yorumları ve değerlendirmeleri</li>
          </ul>
        </div>
      </Card>

      {/* FAQs Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-colorFirst text-white p-3 rounded-full">
            <MdQuestionAnswer className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">Sıkça Sorulan Sorular</h2>
        </div>

        <Accordion variant="bordered" className="space-y-4">
          <AccordionItem key="1" title="ApartHouse'da nasıl üye olabilirim?">
            <p>
              ApartHouse&apos;a üye olmak oldukça kolay! Sağ üst köşedeki &ldquo;Kayıt Ol&rdquo; butonuna tıklayarak e-posta adresinizle 
              ya da Google hesabınızla hemen üye olabilirsiniz. Üyelik tamamen ücretsizdir ve sadece bir kaç dakikanızı alır.
            </p>
          </AccordionItem>

          <AccordionItem key="2" title="Favori ilanları nasıl kaydedebilirim?">
            <p>
              Beğendiğiniz ilanları favorilerinize eklemek için ilgili ilanın sağ üst köşesindeki kalp ikonuna tıklamanız yeterli. 
              Favorilerinize eklediğiniz tüm ilanları, üst menüdeki &ldquo;Favorilerim&rdquo; bölümünden görüntüleyebilirsiniz.
            </p>
          </AccordionItem>

          <AccordionItem key="3" title="İlanları nasıl karşılaştırabilirim?">
            <p>
              İlanları karşılaştırmak için, karşılaştırmak istediğiniz ilanların detay sayfasında veya kart görünümünde bulunan 
              &ldquo;Karşılaştır&rdquo; butonuna tıklayın. En fazla 4 ilanı aynı anda karşılaştırabilirsiniz. Karşılaştırma sayfasına 
              profilinizden veya üst menüdeki karşılaştırma simgesinden ulaşabilirsiniz.
            </p>
          </AccordionItem>

          <AccordionItem key="4" title="Filtreleme seçeneklerini nasıl kullanabilirim?">
            <p>
              Ana sayfada veya arama sonuçları sayfasında bulunan filtre bölümünü kullanarak aramanızı daraltabilirsiniz. 
              Fiyat aralığı, oda sayısı, konum, metrekare ve daha birçok özelliğe göre filtreleme yapabilirsiniz. 
              Mobil görünümde filtre simgesine tıklayarak filtre menüsünü açabilirsiniz.
            </p>
          </AccordionItem>

          <AccordionItem key="5" title="Ev sahipleriyle nasıl iletişime geçebilirim?">
            <p>
              İlan detay sayfasında &ldquo;İletişime Geç&rdquo; veya &ldquo;Mesaj Gönder&rdquo; butonlarını kullanarak ev sahipleriyle iletişime geçebilirsiniz. 
              İlgilendiğiniz ilanla ilgili sorunuzu ya da görüşme talebinizi iletebilirsiniz. Güvenliğiniz için tüm iletişim platform 
              üzerinden sağlanmaktadır.
            </p>
          </AccordionItem>

          <AccordionItem key="6" title="Harita üzerinden nasıl arama yapabilirim?">
            <p>
              Ana sayfada veya arama sonuçları sayfasında &ldquo;Harita Görünümü&rdquo; seçeneğini kullanarak, ilanları harita üzerinde görebilirsiniz. 
              Harita üzerinde istediğiniz bölgeye yakınlaştırabilir, uzaklaştırabilir ve o bölgedeki mevcut ilanları görüntüleyebilirsiniz.
            </p>
          </AccordionItem>

          <AccordionItem key="7" title="Şifremi unuttum, ne yapmalıyım?">
            <p>
              Şifrenizi unuttuysanız, giriş sayfasındaki &ldquo;Şifremi Unuttum&rdquo; bağlantısına tıklayarak şifre sıfırlama işlemini başlatabilirsiniz. 
              Kayıtlı e-posta adresinize bir sıfırlama bağlantısı gönderilecektir. Bu bağlantıyı kullanarak yeni bir şifre oluşturabilirsiniz.
            </p>
          </AccordionItem>

          <AccordionItem key="8" title="İlan sahibiyim, nasıl ilan ekleyebilirim?">
            <p>
              İlan eklemek için öncelikle üye olmanız ve ev sahibi hesabı oluşturmanız gerekmektedir. Profilinizden &ldquo;İlan Ekle&rdquo; 
              butonuna tıklayarak yeni ilan oluşturabilirsiniz. İlanınızın onaylanması için gerekli bilgileri doldurmanız ve 
              fotoğrafları yüklemeniz gerekmektedir.
            </p>
          </AccordionItem>

          <AccordionItem key="9" title="ApartHouse'u mobil cihazımda kullanabilir miyim?">
            <p>
              Evet, ApartHouse tamamen mobil uyumlu olarak tasarlanmıştır. İster akıllı telefonunuzdan ister tabletinizden 
              web tarayıcınız aracılığıyla sitemize erişebilir ve tüm özellikleri kullanabilirsiniz.
            </p>
          </AccordionItem>

          <AccordionItem key="10" title="Bir sorun veya öneri için nasıl iletişime geçebilirim?">
            <p>
              Her türlü sorun, öneri veya geri bildiriminiz için sayfanın altında bulunan &ldquo;Bize Ulaşın&rdquo; bölümünden veya 
              info@aparthouse.com e-posta adresi üzerinden bizimle iletişime geçebilirsiniz. En kısa sürede size dönüş yapacağız.
            </p>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Contact Section */}
      <Card className="bg-gray-50 p-6">
        <h2 className="text-xl font-bold mb-4">Hala sorularınız mı var?</h2>
        <p className="mb-4">Müşteri destek ekibimiz size yardımcı olmak için hazır.</p>
        <Button color="primary" size="lg" className="flex items-center gap-2">
          <MdEmail className="w-5 h-5" />
          Destek Ekibine Ulaşın
        </Button>
      </Card>
    </div>
  );
};

export default Help;
