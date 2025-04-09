/**
 * Utility functions for handling contact links and messages
 */

/**
 * Generates a WhatsApp message with information about the apart
 * @param phone Phone number to send the WhatsApp message to
 * @param apartName Name of the apart
 * @param apartUrl Full URL to the apart listing
 * @returns A formatted WhatsApp URL with the message
 */
export const getWhatsAppLink = (phone: string, apartName?: string, apartUrl?: string): string => {
  const baseUrl = 'https://wa.me/';
  
  // Create the message text
  let message = 'Merhaba ilanınızı aparthouse.com.tr\'de gördüm. Konaklamanız hakkında bilgi almak istiyorum.';
  
  // Add the apartment URL if provided
  if (apartUrl) {
    message += ` ${apartUrl}`;
  } else if (apartName) {
    // If URL not provided but name is, include just the name
    message += ` (${apartName})`;
  }
  
  // Return the complete WhatsApp URL with encoded message
  if (phone) {
    return `${baseUrl}${phone}?text=${encodeURIComponent(message)}`;
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
  return phone ? `tel:+${phone}` : '#';
}; 