/**
 * Utility functions for handling contact links and messages
 */

/**
 * Detects if the user is on iOS Safari
 * @returns True if iOS Safari, false otherwise
 */
export const isIOSSafari = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome|CriOS|FxiOS|EdgiOS/.test(userAgent);
  
  return isIOS && isSafari;
};

/**
 * Formats a phone number to the Turkish WhatsApp format
 * @param phone Phone number in any format
 * @returns Formatted phone number starting with "+905"
 */
export const formatTurkishPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if the number already starts with 90 or just 0
  if (digitsOnly.startsWith('90')) {
    return `+${digitsOnly}`;
  } else if (digitsOnly.startsWith('0')) {
    return `+9${digitsOnly}`;
  } else {
    // Assume it's just the digits after the country code
    return `+905${digitsOnly.substring(digitsOnly.length > 8 ? digitsOnly.length - 8 : 0)}`;
  }
};

/**
 * Generates a WhatsApp message with information about the apart
 * @param phone Phone number to send the WhatsApp message to
 * @param apartName Name of the apart
 * @param apartUrl Full URL to the apart listing
 * @returns A formatted WhatsApp URL with the message
 */
export const getWhatsAppLink = (phone: string, apartName?: string, apartUrl?: string): string => {
  const baseUrl = 'https://wa.me/';
  
  // Format the phone number
  const formattedPhone = formatTurkishPhoneNumber(phone).replace('+', '');
  
  // Create the message text
  let message = 'Merhaba ilanınızı aparthouse.com.tr\'de gördüm. Konaklamanız hakkında fiyat ve bilgi almak istiyorum.';
  
  // Add the apartment URL if provided
  if (apartUrl) {
    message += ` ${apartUrl}`;
  } else if (apartName) {
    // If URL not provided but name is, include just the name
    message += ` (${apartName})`;
  }
  
  // Return the complete WhatsApp URL with encoded message
  if (phone) {
    return `${baseUrl}${formattedPhone}?text=${encodeURIComponent(message)}`;
  }
  
  // Fallback if no phone number
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
};

/**
 * Creates a direct telephone call link
 * @param phone Phone number to call
 * @returns A formatted telephone URL
 */
export const getPhoneLink = (phone: string): string => {
  const formattedPhone = formatTurkishPhoneNumber(phone);
  return phone ? `tel:${formattedPhone}` : '#';
};

/**
 * Opens WhatsApp link in a way that works across all browsers including iOS Safari
 * @param phone Phone number to send the WhatsApp message to
 * @param apartName Name of the apart
 * @param apartUrl Full URL to the apart listing
 */
export const openWhatsAppLink = (phone?: string, apartName?: string, apartUrl?: string): void => {
  const whatsappUrl = getWhatsAppLink(phone || '', apartName, apartUrl);
  
  if (isIOSSafari()) {
    // iOS Safari'de popup blocker'ı bypass etmek için window.location.href kullan
    window.location.href = whatsappUrl;
  } else {
    // Diğer tarayıcılarda normal window.open kullan
    window.open(whatsappUrl, '_blank');
  }
}; 