import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Aparthouse',
  description: 'Aparthouse gizlilik politikası ve kişisel verilerin korunması hakkında bilgiler.',
}

const GizlilikPolitikasi = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Gizlilik Politikası</h1>
      
      <div className="space-y-6 text-gray-700">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-primary">1. Veri Toplama</h2>
          <p className="text-base leading-relaxed">
            Aparthouse.com.tr olarak, web sitemizin kullanımı sırasında, internet servis sağlayıcının adı, sitemizi ziyaret ederken kullandığınız site, IP adresleri ve istenen dosyaların adları gibi, doğrudan kişisel referans içermeyen erişim verilerini toplayacağız. Verilerinizle ilgili yetkili kurum Aparthouse şirketinin kendisidir ve iletişim bilgileri sitemizin iletişim sayfasında bulunmaktadır. Eğer bize kişisel bilgilerinizi gönderiyorsanız (örneğin iletişim formunu, rezervasyon sistemini veya geri bildirim fonksiyonunu kullanırken), bu verilerin toplanması, işlenmesi, kullanımı ve iletimi yalnızca talep ya da hizmetin yerine getirilmesi için gerekli olacak ölçüde gerçekleşecektir. Kişisel bilgilerinizi, yasal zorunluluklar dışında, reklam veya başka amaçlarla üçüncü şahıslara iletmeyeceğiz.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-primary">2. Çerezler</h2>
          <p className="text-base leading-relaxed">
            Aparthouse.com.tr web sitesini kullanırken, sitedeki geziniminizi kolaylaştırmak ve hizmetlerimizi iyileştirmek amacıyla bilgisayarınıza çerezler (küçük boyutlu dosyalar) yerleştirilecektir. Bilgisayarınızı, depolanmadan önce sizin onayınızı isteyecek şekilde ayarlayarak bilgisayarınızda çerezlerin depolanmasını engelleyebilirsiniz. Ayrıca depolanan çerezleri istediğiniz zaman silebilirsiniz. Tarayıcınızın kullanma kılavuzunda daha fazla bilgi bulabilirsiniz. Çerezlerin yerleştirilmesini kabul etmezseniz ya da silerseniz, sitemizin bazı özelliklerinin düzgün çalışmayabileceğini ve tam kullanıcı deneyimini yaşayamayabileceğinizi lütfen unutmayınız.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-primary">3. Google Analytics</h2>
          <p className="text-base leading-relaxed">
            Aparthouse.com.tr web sitesi, Google Inc. (&quot;Google&quot;) tarafından sağlanan bir web analiz hizmeti olan Google Analytics kullanmaktadır. Google Analytics, web sitemizin kullanıcıların siteyi nasıl kullandıklarını analiz etmemize yardımcı olmak amacıyla bilgisayarınıza yerleştirilen metin dosyaları şeklinde &quot;çerezler&quot; kullanmaktadır. Web sitemizi kullanımınızla ilgili çerezler tarafından üretilen bilgiler (IP adresiniz de dahil olmak üzere) Amerika Birleşik Devletleri&apos;nde bulunan sunucular üzerinde Google&apos;a iletilecek ve Google tarafından depolanacaktır. Google bu bilgileri web sitemizi kullanımınızı değerlendirmek, Aparthouse için web sitesi aktivitesi hakkında raporlar oluşturmak ve web sitesi aktivitesi ve internet kullanımı ile ilgili başka hizmetler sağlamak amacıyla kullanacaktır. Google kanunen bunu yapması gerektiği ya da söz konusu üçüncü şahıslar bu bilgileri Google adına işledikleri durumlarda bu bilgileri üçüncü şahıslara iletebilir. Google IP adresinizi Google tarafından saklanan hiçbir başka veri ile ilişkilendirmeyecektir. Tarayıcınız üzerinde uygun ayarları seçerek çerezlerin kullanılmasını reddedebilirsiniz, fakat bunu yaptığınız takdirde web sitemizi tam işlevli bir biçimde kullanamayabileceğinizi lütfen unutmayınız. Web sitemizi kullanarak sizin hakkınızdaki bilgilerin yukarıda belirtilen şekilde ve amaçlar doğrultusunda Google tarafından işlenmesine onay vermiş olursunuz.
          </p>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-primary">4. Veri Güvenliği</h2>
          <p className="text-base leading-relaxed">
            Aparthouse olarak, kişisel verilerinizin güvenliğini sağlamak için gerekli teknik ve idari önlemleri alıyoruz. Verileriniz yetkisiz erişime, değiştirilmeye, ifşa edilmeye veya imha edilmeye karşı korunmaktadır. Ancak internet üzerinden yapılan hiçbir veri iletiminin %100 güvenli olamayacağını lütfen unutmayınız. Bu nedenle, ödeme işlemleri sırasında SSL şifreleme teknolojisini kullanmaktayız.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-primary">5. İletişim ve Haklarınız</h2>
          <p className="text-base leading-relaxed">
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, kişisel verilerinizle ilgili bilgi alma, düzeltme, silme veya işlemeyi durdurma haklarınızı kullanmak için bizimle iletişime geçebilirsiniz. Bu gizlilik politikası hakkında sorularınız veya endişeleriniz varsa, lütfen info@aparthouse.com.tr adresine e-posta gönderin.
          </p>
        </div>

      
      </div>
    </div>
  )
}

export default GizlilikPolitikasi;
