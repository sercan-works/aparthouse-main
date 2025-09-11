'use client';

interface CookieConsentProps {
  onAccept: () => void;
  onReject: () => void;
}

const CookieConsent = ({ onAccept, onReject }: CookieConsentProps) => {
  return (
    <div className="fixed bottom-20 md:bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-lg border-t border-gray-200">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">Çerez Bildirimi</h3>
            <p className="text-sm text-gray-600">
              Size daha iyi bir deneyim sunmak için web sitemizde çerezleri kullanıyoruz. Web sitemizi kullanmaya devam ederek çerez politikamızı kabul etmiş olursunuz.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onReject}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              Reddet
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-colorFirst rounded-md hover:bg-colorFirst/80 transition"
            >
              Kabul Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 