// Test file for formatPhoneNumber function
const formatPhoneNumber = (phone = "") => {
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

// Test cases
console.log('Test 1 - Normal number:', formatPhoneNumber('5551234567'));
console.log('Test 2 - With leading 0:', formatPhoneNumber('05551234567'));
console.log('Test 3 - With country code:', formatPhoneNumber('+905551234567'));
console.log('Test 4 - With spaces:', formatPhoneNumber('555 123 45 67'));
console.log('Test 5 - With dashes:', formatPhoneNumber('555-123-45-67'));
console.log('Test 6 - Empty string:', formatPhoneNumber(''));
console.log('Test 7 - Short number:', formatPhoneNumber('123456'));
