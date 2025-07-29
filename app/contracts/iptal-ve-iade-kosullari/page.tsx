import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İptal ve İade Koşulları | Aparthouse',
  description: 'Aparthouse daire kiralama hizmetleri için iptal ve iade koşulları.',
}

const IpatalVeIadeKosullari = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">İptal ve İade Koşulları</h1>
      
      <div className="space-y-6 text-gray-700">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-primary">1. Genel Bilgilendirme</h2>
          <p className="text-base leading-relaxed">
            Aparthouse.com.tr konum bazlı sistem üzerinde dairelerin ve kiralık mülklerin yayınlanması yöntemiyle gelir elde eder ve listeleme hizmetleri senelik, aylık, haftalık periyotlar üzerinden ücretlendirilir. Konaklama hizmeti talep eden kullanıcılardan herhangi bir ücret talep edilmez.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-primary">2. Hizmet Koşulları</h2>
          <p className="text-base leading-relaxed">
            Aparthouse.com.tr üzerinde yayınlanan ve konaklama hizmeti veren mülk sahipleri ve işletmeciler, konaklama talep eden kullanıcının ihtiyacına yönelik seçenekler sunarlar. Aparthouse.com.tr, Kullanım Sözleşmesi maddelerinden herhangi birinde belirtilen kuralın/kuralların ihlal edildiğini tespit etmesi durumunda, ilgili kullanıcı veya işletme hesabını askıya alabilir veya tamamen sonlandırabilir.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-primary">3. İptal ve İade Süreci</h2>
          <p className="text-base leading-relaxed">
            Aparthouse.com.tr platformunda konaklama hizmeti veren mülk sahipleri ve işletmeciler, üyelik sözleşmesi tarihinden itibaren 3 (üç) gün içerisinde senelik üyelik ücretlerinin iadesi ve üyelik iptalini talep edebilirler. Bu talepler, e-posta yoluyla info@aparthouse.com.tr adresine iletilmeli ve telefon ile iletişime geçilerek e-postanın ulaşıp ulaşmadığı teyit edilmelidir. Bu yolla yapılan üyelik iptallerinin ödemeleri iade edilir. Belirtilen 3 günlük süre dışında kalan dönemler için ücret iadesi yapılmaz.
          </p>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-primary">4. Mükerrer Ödemeler</h2>
          <p className="text-base leading-relaxed">
            İstem dışı mükerrer ödemeler olduğunda, kullanıcı durumu en kısa sürede info@aparthouse.com.tr adresine bildirmelidir. Mükerrer ödemenin tespiti halinde, fazladan yapılan ödemenin iadesi sağlanacaktır. İade işlemi için gerekli belgeler talep edilebilir.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-primary">5. Kiralama İptalleri</h2>
          <p className="text-base leading-relaxed">
            Aparthouse.com.tr üzerinden yapılan konaklama rezervasyonlarının iptali ve iade koşulları, her mülk sahibi veya işletmeci tarafından belirlenen koşullara tabidir. Kullanıcılar, rezervasyon yapmadan önce ilgili mülkün iptal ve iade politikasını incelemelidir. Aparthouse.com.tr, mülk sahipleri ve kiracılar arasındaki anlaşmazlıklarda aracı rolü üstlenmekte olup, her türlü iptal ve iade işlemi ilgili tarafların kendi aralarındaki anlaşma çerçevesinde yürütülür.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-primary">6. İletişim</h2>
          <p className="text-base leading-relaxed">
            İptal ve iade işlemleriyle ilgili tüm sorularınız için info@aparthouse.com.tr e-posta adresi üzerinden bizimle iletişime geçebilirsiniz. Talepleriniz en kısa sürede değerlendirilecek ve tarafınıza geri dönüş sağlanacaktır.
          </p>
        </div>
      </div>
    </div>
  )
}

export default IpatalVeIadeKosullari;
