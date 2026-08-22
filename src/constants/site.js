export const SITE_NAME = 'Healtopia'

// Fallback origin for metadata and sitemap generation. If a deployment-specific
// origin is available later, it can override this via Vite env.
export const SITE_ORIGIN = import.meta.env.VITE_SITE_URL || 'https://healtopiamed.com'

export const SITE_DESCRIPTION =
  'Healtopia provides compassionate primary care, insurance-based care, and concierge medicine in Gambrills, Maryland.'

export const SITE_PHONE_DISPLAY = '410-774-6678'
export const SITE_PHONE_TEL = 'tel:+14107746678'
export const SITE_SECONDARY_PHONE_DISPLAY = '410-847-7890'
export const SITE_SECONDARY_PHONE_TEL = 'tel:+14108477890'

export const SITE_ADDRESS = {
  streetAddress: '2614 Chapel Lake Dr',
  addressLocality: 'Gambrills',
  addressRegion: 'MD',
  postalCode: '21054',
  addressCountry: 'US',
}
