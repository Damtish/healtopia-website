import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_ADDRESS, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from '../constants/site'

const SITE_PHONE_NUMBER = '+14107746678'

const ROUTE_META = {
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

function ensureTag(selector, createTag) {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = createTag()
    document.head.appendChild(tag)
  }
  return tag
}

function setMetaProperty(property, content) {
  const tag = ensureTag(`meta[property="${property}"]`, () => {
    const el = document.createElement('meta')
    el.setAttribute('property', property)
    return el
  })
  tag.setAttribute('content', content)
}

function setMetaName(name, content) {
  const tag = ensureTag(`meta[name="${name}"]`, () => {
    const el = document.createElement('meta')
    el.setAttribute('name', name)
    return el
  })
  tag.setAttribute('content', content)
}

function setCanonical(href) {
  const tag = ensureTag('link[rel="canonical"]', () => {
    const el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    return el
  })
  tag.setAttribute('href', href)
}

function setStructuredData(pathname) {
  const id = 'healtopia-jsonld'
  document.getElementById(id)?.remove()

  const baseJsonLd = {
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

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_ORIGIN,
  }

  const script = document.createElement('script')
  script.id = id
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(pathname === '/' ? [baseJsonLd, websiteJsonLd] : baseJsonLd)
  document.head.appendChild(script)
}

function SeoManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = ROUTE_META[pathname] || ROUTE_META['/']
    const canonical = `${SITE_ORIGIN}${pathname === '/' ? '' : pathname}`

    document.title = meta.title
    setCanonical(canonical)
    setMetaName('description', meta.description)
    setMetaProperty('og:type', 'website')
    setMetaProperty('og:title', meta.title)
    setMetaProperty('og:description', meta.description)
    setMetaProperty('og:url', canonical)
    setMetaProperty('og:image', `${SITE_ORIGIN}/images/clinic/building-exterior-optimized.jpg`)
    setMetaName('twitter:card', 'summary_large_image')
    setMetaName('twitter:title', meta.title)
    setMetaName('twitter:description', meta.description)
    setMetaName('twitter:image', `${SITE_ORIGIN}/images/clinic/building-exterior-optimized.jpg`)
    setStructuredData(pathname)
  }, [pathname])

  return null
}

export default SeoManager
