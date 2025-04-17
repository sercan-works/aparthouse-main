import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mesafeli Satış Sözleşmesi | Aparthouse',
  description: 'Aparthouse mesafeli satış sözleşmesi ve mesafeli satış hakkında bilgiler.',
}

const MesafeliSatisSozlesmesi = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Mesafeli Satış Sözleşmesi</h1>
      
      <div className="space-y-6 text-gray-700">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-primary">MADDE 1- TARAFLAR</h2>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">SATICIYA İLİŞKİN BİLGİLER</h3>
            <p className="leading-relaxed">
              <strong>Ticari Ünvan:</strong> KİO GRUP OTELCİLİK VE TURİZM LTD. ŞTİ.<br />
              
              <strong>Adres:</strong> Büyükdere Mah. Altınçağ Sok. No:17 Odunpazarı/ESKİŞEHİR<br />
              <strong>Web adresi:</strong> aparthouse.com.tr<br />
              <strong>E-posta adresi:</strong> info@aparthouse.com.tr<br />
              <strong>Telefon:</strong> +90 532 626 70 59
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">ALICIYA İLİŞKİN BİLGİLER</h3>
            <p className="leading-relaxed">
              <strong>Adı Soyadı / Ünvanı:</strong> .............<br />
              <strong>Teslimat Adresi:</strong> ...................<br />
              <strong>Telefon:</strong> ..............................<br />
              <strong>E-posta:</strong> .............................
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-primary">MADDE 2- KONU</h2>
          <p className="leading-relaxed">
            İşbu sözleşmenin konusu ALICI&apos;nın SATICI&apos;ya ait aparthouse.com.tr internet sitesinden elektronik ortamda sipariş verdiği, aşağıda nitelik ve satış fiyatı belirtilen ürün ya da ürünlerin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicilerin Korunması Hakkında Kanun ve 6 Mart 2011 tarihli ve 27866 sayılı Resmi Gazetede yayınlanan Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-primary">MADDE 3- SÖZLEŞME KONUSU ÜRÜN</h2>
          
          <h3 className="text-lg font-medium mb-2">3.1. Üyelik Paketlerinin Cinsi ve türü, Miktarı, Birim Fiyat ve Vergiler aşağıda belirtildiği gibidir.</h3>
          
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Adı</th>
                  <th className="py-2 px-4 border">Fiyatı</th>
                  <th className="py-2 px-4 border">Miktar</th>
                  <th className="py-2 px-4 border">Toplam</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border">...</td>
                  <td className="py-2 px-4 border">XXX ₺</td>
                  <td className="py-2 px-4 border">X</td>
                  <td className="py-2 px-4 border">XXX ₺</td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="py-2 px-4 border text-right font-medium">Ara Toplam:</td>
                  <td className="py-2 px-4 border">XXX ₺</td>
                </tr>
    
                <tr className="bg-gray-50">
                  <td colSpan={3} className="py-2 px-4 border text-right font-medium">KDV %20:</td>
                  <td className="py-2 px-4 border">XXX ₺</td>
                </tr>
                <tr className="bg-gray-100">
                  <td colSpan={3} className="py-2 px-4 border text-right font-medium">Sipariş Toplamı:</td>
                  <td className="py-2 px-4 border font-bold">XXX ₺</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h3 className="text-lg font-medium mb-2">3.2. Ödeme Şekli:</h3>
          <p className="leading-relaxed mb-4">
            Yukarıdaki bankanıza iletilecek sipariş toplamının kaç taksitle ödeneceği bilgisi bulunmaktadır.
          </p>
          <p className="leading-relaxed mb-4">
            Bankanız kampanyalar düzenleyerek sizin seçtiğiniz taksit adedinin daha üstünde bir taksit adedi uygulayabilir, taksit öteleme gibi hizmetler sunulabilir. Bu tür kampanyalar bankanızın inisiyatifindedir ve şirketimizin bilgisi dâhilinde olması durumunda sayfalarımızda kampanyalar hakkında bilgi verilmektedir.
          </p>
          <p className="leading-relaxed mb-4">
            Kredi kartınızın hesap kesim tarihinden itibaren sipariş toplamı taksit adedine bölünerek kredi kartı özetinize bankanız tarafından yansıtılacaktır. Banka taksit tutarlarını küsurat farklarını dikkate alarak aylara eşit olarak dağıtmayabilir. Detaylı ödeme planınızın oluşturulması bankanız inisiyatifindedir.
          </p>
          
          <h3 className="text-lg font-medium mb-2">3.3-</h3>
          <p className="leading-relaxed mb-4">
            Diğer yandan vadeli satışların sadece Bankalara ait kredi kartları ile yapılması nedeniyle, alıcı, ilgili faiz oranlarını ve temerrüt faizi ile ilgili bilgileri bankasından ayrıca teyit edeceğini, yürürlükte bulunan mevzuat hükümleri gereğince faiz ve temerrüt faizi ile ilgili hükümlerin Banka ve alıcı arasındaki kredi kartı sözleşmesi kapsamında uygulanacağını kabul, beyan ve taahhüt eder.
          </p>
          
          <h3 className="text-lg font-medium mb-2">3.4-</h3>
          <p className="leading-relaxed">
            Müşteri (son kullanıcı), ödeme yöntemine, üyeliğine ve siparişine ilişkin bilgilerin, ödemenin gerçekleştirilebilmesi ve ödeme usulsüzlüklerinin önlenmesi, araştırılması ve tespit edilmesini temin amacıyla iyzico Ödeme Hizmetleri A.Ş.&apos;ye aktarılmasına ve iyzico tarafından adresindeki Gizlilik Politikası&apos;nın en güncel halinde açıklandığı şekilde işlenmesine ve saklanmasına rıza göstermektedir.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-primary">MADDE 4- MAL VE HİZMETİN TÜM VERGİLER DAHİL TESLİM FİYATI</h2>
          <p className="leading-relaxed">
            Madde 3&apos;te &quot;Sipariş Toplamı&quot; olarak verilen tutardır.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-primary">MADDE 5 - CAYMA HAKKI</h2>
          <p className="leading-relaxed mb-4">
            ALICI, Sözleşme konusu ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa tesliminden itibaren 3 gün içinde hiçbir sebep göstermek zorunda olmaksızın cayma hakkına sahiptir.
          </p>
          <p className="leading-relaxed mb-4">
            Cayma hakkının kullanılması için 3 günlük süre içinde SATICI&apos;ya faks, telefon veya elektronik posta ile bildirimde bulunulması ve ürünün 6. madde hükümleri çerçevesinde ve işbu Sözleşmenin ayrılmaz parçası olan ve aparthouse.com.tr internet sitesinde yayınlanmış olan önbilgiler gereğince verilen hizmetler SATICI tarafından tekrar satışa arz edilebilir nitelikte olması şarttır. Bu hakkın kullanılması halinde,
          </p>
          <p className="leading-relaxed mb-4">
            a) 3. kişiye veya ALICI&apos;ya teslim edilen ürünün faturası, (İade edilmek istenen ürünün faturası kurumsal ise, iade ederken kurumun düzenlemiş olduğu iade faturası ile birlikte gönderilmesi gerekmektedir. Faturası kurumlar adına düzenlenen sipariş iadeleri İADE FATURASI kesilmediği takdirde tamamlanamayacaktır)
          </p>
          <p className="leading-relaxed mb-4">
            b) aparthouse.com.tr internet sitesi iletişim sayfası üzerinden İade Talebi oluşturulması,
          </p>
          <p className="leading-relaxed mb-4">
            c) Bu belgelerin SATICI&apos;ya ulaşmasını takip eden 30 gün içinde ürün bedeli ALICI&apos;ya iade edilir.
          </p>
          <p className="leading-relaxed">
            Ürün SATICI&apos;ya iade edilirken, ürünün teslimi sırasında ALICI&apos;ya ibraz edilmiş olan orijinal faturanın da iade edilmesi gerekmekte olup faturanın ürünle birlikte SATICI&apos;ya gönderilmemesi durumunda ALICI&apos;ya KDV ve varsa diğer yasal yükümlülükler iade edilemez. Ürünle beraber iade edilecek olan faturanın üzerine de &quot;iade faturasıdır&quot; ibaresi yazılıp ALICI tarafından imzalanacaktır.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-primary">MADDE 6 - GENEL HÜKÜMLER</h2>
          
          <h3 className="text-lg font-medium mb-2">6.1</h3>
          <p className="leading-relaxed mb-4">
            ALICI, aparthouse.com.tr internet sitesinde Sözleşme konusu ürünün temel nitelikleri, tüm vergiler dahil satış fiyatı ve ödeme şekli ile teslimata ve bunun masraflarının ALICI tarafından karşılanacağına, teslimatın gerçekleştirileceği süreye ve SATICI&apos;nın tam ticari unvanı, açık adresi ve iletişim bilgilerine ilişkin ön bilgileri okuyup doğru ve eksiksiz bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini beyan eder. Aparthouse.com.tr İnternet Sitesinde ödeme sayfasında yer alan ön bilgilendirme formu ve satışa ilişkin fatura işbu Sözleşmenin ayrılmaz parçalarıdır.
          </p>
          
          <h3 className="text-lg font-medium mb-2">6.2</h3>
          <p className="leading-relaxed mb-4">
            SATICI tarafından daha önce imzalanmış bulunan iş bu iki nüsha Sözleşme ALICI tarafından elektronik ortamda okunup onaylanarak kabul edilmiş ve bir nüshası alıcının e-posta adresine gönderilecektir.
          </p>
          
          <h3 className="text-lg font-medium mb-2">6.3</h3>
          <p className="leading-relaxed mb-4">
            Sözleşme konusu ürün, 3 günlük süreyi aşmamak koşulu ile her bir ürün için ALICI&apos;ya hizmet esası olan reklam çalışmaları yapılarak aparthouse.com.tr üzerinden teslim edilir.
          </p>
          
          <h3 className="text-lg font-medium mb-2">6.4</h3>
          <p className="leading-relaxed mb-4">
            Madde 3&apos;te gösterilen teslimata ilişkin her türlü kargo ücreti ALICI tarafından karşılanacaktır. SATICI, web sitesinde, ilan ettiği rakamın üzerinde alışveriş yapanların veya kimi kampanyalarında teslimat ücretinin kendisince karşılanacağını beyan etmişse, teslimat masrafı SATICI tarafından karşılanır. Teslimat; stokun müsait olması ve mal bedelinin SATICI&apos;nın hesabına geçmesinden sonra en kısa sürede yapılır.
          </p>
          
          <h3 className="text-lg font-medium mb-2">6.5</h3>
          <p className="leading-relaxed mb-4">
            Sözleşme konusu ürün, ALICI&apos;dan başka bir kişi/kuruluşa teslim edilecek ise, teslim edilecek kişi/kuruluşun teslimatı kabul etmemesinden SATICI sorumlu tutulamaz.
          </p>
          
          <h3 className="text-lg font-medium mb-2">6.6</h3>
          <p className="leading-relaxed mb-4">
            Kargo firmasının, hizmet karşılığı verilecek evrak veya dökümanların ALICI&apos;ya teslimi aşamasında karşılaşacağı her türlü sorun nedeniyle, siparişi verilen ürünün ALICI&apos;ya teslim edilememesinden dolayı SATICI sorumlu tutulamaz.
          </p>
          
          <h3 className="text-lg font-medium mb-2">6.7</h3>
          <p className="leading-relaxed mb-4">
            SATICI&apos;NIN verilecek hizmet için yaptığı çalışmalar yayına verilir, ek istek ve özellikleri vermekle yükümlülük zorunluluğu bulunmamaktadır.
          </p>
          
          <h3 className="text-lg font-medium mb-2">6.8</h3>
          <p className="leading-relaxed mb-4">
            SATICI, Sözleşme konusu hizmetin alıcı ile yapılan hizmet sözleşmesinde yer aldığı gibi sağlam, eksiksiz, siparişte belirtilen niteliklere uygun ve varsa garanti belgeleri ve kullanım kılavuzları ile teslim edilmesinden sorumludur.
          </p>
          
          <h3 className="text-lg font-medium mb-2">6.9</h3>
          <p className="leading-relaxed mb-4">
            SATICI, haklı bir sebebe dayanmak şartıyla, Sözleşmeden doğan ifa yükümlülüğünün süresi dolmadan ALICI&apos;ya eşit kalite ve fiyatta farklı bir ürün tedarik edebilir.
          </p>
          
          <h3 className="text-lg font-medium mb-2">6.10</h3>
          <p className="leading-relaxed mb-4">
            SATICI, sipariş konusu ürün veya hizmetin yerine getirilmesinin imkânsızlaşması halinde Sözleşme konusu yükümlülüklerini yerine getiremezse, bu durumu, Sözleşmeden doğan ifa yükümlülüğünün süresi dolmadan tüketiciye bildirir ve ALICI&apos;ya eşit kalite ve fiyatta farklı bir ürün tedarik edebilir.
          </p>
          
          <h3 className="text-lg font-medium mb-2">6.11</h3>
          <p className="leading-relaxed mb-4">
            Sözleşme konusu ürünün teslimatı için işbu Sözleşmenin imzalı nüshasının SATICI&apos;ya ulaştırılmış olması ve bedelinin ALICI&apos;nın tercih ettiği ödeme şekli ile ödenmiş olması şarttır. Herhangi bir nedenle ürün bedeli ödenmez veya banka kayıtlarında iptal edilir ise, SATICI ürünün teslimi yükümlülüğünden kurtulmuş kabul edilir.
          </p>
          
          <h3 className="text-lg font-medium mb-2">6.12</h3>
          <p className="leading-relaxed mb-4">
            Ürünün tesliminden sonra ALICI&apos;ya ait kredi kartının ALICI&apos;nın kusurundan kaynaklanmayan bir şekilde yetkisiz kişilerce haksız veya hukuka aykırı olarak kullanılması nedeni ile ilgili banka veya finans kuruluşun ürün bedelini SATICI&apos;ya ödememesi halinde, ALICI&apos;nın kendisine teslim edilmiş olması kaydıyla ürünün 3 gün içinde SATICI&apos;ya gönderilmesi zorunludur. Bu takdirde nakliye giderleri ALICI&apos;ya aittir.
          </p>
          
          <h3 className="text-lg font-medium mb-2">6.13</h3>
          <p className="leading-relaxed">
            SATICI mücbir sebepler veya nakliyeyi engelleyen hava muhalefeti, ulaşımın kesilmesi gibi olağanüstü durumlar nedeni ile Sözleşme konusu ürünü süresi içinde teslim edemez ise, durumu ALICI&apos;ya bildirmekle yükümlüdür. Bu takdirde ALICI siparişin iptal edilmesini, Sözleşme konusu ürünün varsa emsali ile değiştirilmesini, ve/veya teslimat süresinin engelleyici durumun ortadan kalkmasına kadar ertelenmesi haklarından birini kullanabilir. ALICI&apos;nın siparişi iptal etmesi halinde ödediği tutar 20 gün içinde kendisine nakden ve defaten ödenir. ALICI&apos;nın kredi kartı ile yaptığı ödemelerde ise, ürün tutarı, siparişin ALICI tarafından iptal edilmesinden sonra 30 gün içerisinde ilgili bankaya iade edilir. Bu tutarın bankaya iadesinden sonra ALICI hesaplarına yansıması tamamen banka işlem süreci ile ilgili olup, SATICI&apos;nın bu hususa ilişkin herhangi bir şekilde müdahalede bulunması mümkün olamamaktadır.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-primary">MADDE 7 - CAYMA HAKKI KULLANILAMAYACAK HİZMETLER</h2>
          <p className="leading-relaxed mb-4">
            Niteliği itibarıyla; REKLAM VE TANITIM HİZMETLERİ belli bir dönemi kapsar, konaklama hizmeti veren yerler için KAYIT DÖNEMİNİNDEN sonra yada web sayfası hizmeti ise sayfa yayına verildikten sonra, tüketicinin istekleri veya açıkça onun özel ihtiyaçları doğrultusunda hazırlanan ürünler için cayma hakkı kullanılamaz.
          </p>
          <p className="leading-relaxed mb-4">
            Aşağıdaki ürünler için cayma hakkının kullanılabilmesi, hizmetin teslim edilmemiş ve yayına verilmemiş olması gerekir:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Her türlü yazılım ve programlar</li>
            <li>Web sayfası hizmetleri</li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-primary">MADDE 8 - BORÇLUNUN TEMERRÜDÜ</h2>
          <p className="leading-relaxed">
            ALICI&apos;nın temerrüde düşmesi halinde, ALICI, borcun gecikmeli ifasından dolayı SATICI&apos;nın oluşan zarar ve ziyanını ödemeyi kabul eder. ALICI&apos;nın temerrüdünün SATICI&apos;nın kusurundan kaynaklandığı hallerde ALICI herhangi bir zarar ve ziyan talebini karşılamak mecburiyetinde olmayacaktır.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-primary">MADDE 9 - YETKİLİ MAHKEME</h2>
          <p className="leading-relaxed mb-4">
            İşbu sözleşmenin uygulanmasında, Sanayi ve Ticaret Bakanlığı&apos;nca ilan edilen değere kadar ESKİŞEHİR&apos;de bulunan Tüketici Hakem Heyetleri ile Tüketici Mahkemeleri yetkilidir.
          </p>
          <p className="leading-relaxed mb-4">
            Siparişin gerçekleşmesi durumunda ALICI işbu sözleşmenin tüm koşullarını kabul etmiş sayılır.
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold mb-2">SATICI</p>
              <p>Aparthouse.com.tr (KİO GRUP OTELCİLİK VE TURİZM LTD. ŞTİ.)</p>
            </div>
            <div>
              <p className="font-semibold mb-2">ALICI</p>
              <p>..........................</p>
            </div>
            <div className="md:col-span-2">
              <p className="font-semibold mb-2">TARİH</p>
              <p>..........................</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MesafeliSatisSozlesmesi;
