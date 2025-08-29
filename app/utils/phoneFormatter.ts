/**
 * Telefon numarasını "0 555 555 55 55" formatına dönüştürür
 * @param phone - Formatlanacak telefon numarası
 * @returns Formatlanmış telefon numarası
 */
export const formatPhoneNumber = (phone: string = ""): string => {
  // Başında 0 yoksa ekle
  let formattedPhone = phone.startsWith("0") ? phone : `0${phone}`;

  // Sadece rakamları al
  formattedPhone = formattedPhone.replace(/\D/g, "");

  // İstenen formata dönüştür: "0 555 555 55 55"
  if (formattedPhone.length === 11) {
    return `${formattedPhone.slice(0, 1)} ${formattedPhone.slice(
      1,
      4
    )} ${formattedPhone.slice(4, 7)} ${formattedPhone.slice(
      7,
      9
    )} ${formattedPhone.slice(9, 11)}`;
  }

  return formattedPhone; // Format uygulanamadıysa olduğu gibi döndür
};
