import { SITE_ADDRESS, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from '../constants/site'

const SITE_PHONE_NUMBER = '+14107746678'
const SHARED_OG_IMAGE = `${SITE_ORIGIN}/images/clinic/building-exterior-optimized.jpg`

export const ROUTE_SEO = {
  '/': {
    title: 'Healtopia | Primary Care & Medical Weight Loss',
    description: SITE_DESCRIPTION,
  },
  '/about': {
    title: 'About Healtopia | Personalized Primary Care in Gambrills',
    description:
      'Meet the Healtopia team and learn how our patient-first approach supports trust, prevention, and long-term wellness.',
  },
  '/direct-primary-care': {
    title: 'Direct Primary Care | Healtopia',
    description:
      "Explore Healtopia's Direct Primary Care model with more time, direct access, and transparent membership-based care.",
  },
  '/insurance-based-primary-care': {
    title: 'Insurance-Based Primary Care | Healtopia',
    description:
      "Learn about Healtopia's insurance-based primary care services for preventive care, chronic care, and ongoing support.",
  },
  '/concierge-care': {
    title: 'Concierge Care | Healtopia',
    description:
      'Discover Healtopia concierge medicine for premium, highly personalized care with added access and continuity.',
  },
  '/medical-weight-loss': {
    title: 'Medical Weight Loss | Healtopia',
    description:
      'Healtopia offers physician-guided medical weight loss focused on safe, sustainable progress and personalized support.',
  },
  '/pricing': {
    title: 'Pricing | Healtopia',
    description:
      'Review Healtopia pricing for Direct Primary Care, concierge medicine, medical weight loss, and insurance-based care.',
  },
  '/services': {
    title: 'Services | Healtopia',
    description:
      "Explore Healtopia's primary care, concierge, insurance-based care, and medical weight loss services.",
  },
  '/insurance': {
    title: 'Accepted Insurance | Healtopia',
    description:
      'See insurance plans accepted by Healtopia and learn how to verify your coverage before your visit.',
  },
  '/contact': {
    title: 'Contact Healtopia | Gambrills Primary Care',
    description:
      'Contact Healtopia in Gambrills, Maryland for appointments, location details, and care questions.',
  },
}

export function getSeoMeta(pathname = '/') {
  const routeMeta = ROUTE_SEO[pathname]

  if (!routeMeta) {
    const title = '404 | Healtopia'
    const description = 'Page not found.'

    return {
      title,
      description,
      canonical: null,
      robots: 'noindex,follow',
      ogType: 'website',
      ogTitle: title,
      ogDescription: description,
      ogUrl: `${SITE_ORIGIN}${pathname === '/' ? '' : pathname}`,
      ogImage: SHARED_OG_IMAGE,
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: SHARED_OG_IMAGE,
      jsonLd: null,
    }
  }

  const canonical = `${SITE_ORIGIN}${pathname === '/' ? '' : pathname}`

  return {
    title: routeMeta.title,
    description: routeMeta.description,
    canonical,
    robots: 'index,follow',
    ogType: 'website',
    ogTitle: routeMeta.title,
    ogDescription: routeMeta.description,
    ogUrl: canonical,
    ogImage: SHARED_OG_IMAGE,
    twitterCard: 'summary_large_image',
    twitterTitle: routeMeta.title,
    twitterDescription: routeMeta.description,
    twitterImage: SHARED_OG_IMAGE,
    jsonLd: pathname === '/' ? [createClinicJsonLd(), createWebsiteJsonLd()] : createClinicJsonLd(),
  }
}

export function createClinicJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    telephone: SITE_PHONE_NUMBER,
    email: 'info@healtopiamed.com',
    address: {
      '@type': 'PostalAddress',
      ...SITE_ADDRESS,
    },
  }
}

export function createWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_ORIGIN,
  }
}
