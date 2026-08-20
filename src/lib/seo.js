import aboutGashawPortrait from '../assets/dr-gashaw-adugna-about-optimized.jpg'
import { FACEBOOK_URL, INSTAGRAM_URL } from '../constants/links'
import { SITE_ADDRESS, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from '../constants/site'

const SITE_PHONE_NUMBER = '+14107746678'
const SHARED_OG_IMAGE = `${SITE_ORIGIN}/images/clinic/building-exterior-optimized.jpg`
const LOGO_URL = `${SITE_ORIGIN}/images/healtopia-logo.webp`
const CLINIC_IMAGE_URL = SHARED_OG_IMAGE
const CLINIC_ID = `${SITE_ORIGIN}/#medicalclinic`
const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`
const WEBSITE_ID = `${SITE_ORIGIN}/#website`
const ABOUT_GASHAW_ID = `${SITE_ORIGIN}/about#gashaw-adugna`
const ABOUT_MALEFIYA_ID = `${SITE_ORIGIN}/about#malefiya-kenea`
const GAMBRILLS_PAGE_ID = `${SITE_ORIGIN}/gambrills`

const SERVICE_AREAS = ['Gambrills, MD', 'Odenton, MD', 'Crofton, MD', 'Bowie, MD', 'Millersville, MD', 'Anne Arundel County, MD']

const SOCIAL_PREVIEW_IMAGES = {
  '/': {
    image: '/images/clinic/reception.jpg',
    alt: 'Healtopia reception and clinic interior in Gambrills, Maryland',
  },
  '/about': {
    image: '/images/clinic/building-exterior-optimized.jpg',
    alt: 'Healtopia clinic exterior in Gambrills, Maryland',
  },
  '/services': {
    image: '/images/clinic/building-exterior-optimized.jpg',
    alt: 'Healtopia clinic exterior and services branding in Gambrills, Maryland',
  },
  '/direct-primary-care': {
    image: '/images/clinic/direct-primary-care-patient-consultation-optimized.jpg',
    alt: 'Healtopia physician and patient consultation for Direct Primary Care',
  },
  '/insurance-based-primary-care': {
    image: '/images/clinic/examination-room-optimized.jpg',
    alt: 'Healtopia examination room for insurance-based primary care',
  },
  '/medical-weight-loss': {
    image: '/images/clinic/weight-loss-waist-measurement-optimized.jpg',
    alt: 'Healtopia medical weight loss waist measurement and plan',
  },
  '/concierge-care': {
    image: '/images/clinic/patient-care-optimized.jpg',
    alt: 'Healtopia patient care consultation for concierge medicine',
  },
  '/pricing': {
    image: '/images/clinic/reception.jpg',
    alt: 'Healtopia clinic reception and pricing overview',
  },
  '/insurance': {
    image: '/images/clinic/examination-room-optimized.jpg',
    alt: 'Healtopia accepted insurance and examination room',
  },
  '/contact': {
    image: '/images/clinic/building-exterior-optimized.jpg',
    alt: 'Healtopia clinic exterior in Gambrills, Maryland',
  },
  '/gambrills': {
    image: '/images/clinic/building-exterior-optimized.jpg',
    alt: 'Healtopia clinic exterior in Gambrills, Maryland',
  },
}

const ROUTE_SEO = {
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
    title: 'Direct Primary Care in Gambrills, MD | Healtopia',
    description:
      "Healtopia's Direct Primary Care model in Gambrills, Maryland offers more time, direct access, and transparent membership-based care.",
  },
  '/insurance-based-primary-care': {
    title: 'Insurance-Based Primary Care in Gambrills, MD | Healtopia',
    description:
      "Learn about Healtopia's insurance-based primary care in Gambrills, Maryland for preventive care, chronic care, and ongoing support.",
  },
  '/concierge-care': {
    title: 'Concierge Medicine in Gambrills, MD | Healtopia',
    description:
      'Discover Healtopia concierge medicine in Gambrills, Maryland for premium, highly personalized care with added access and continuity.',
  },
  '/medical-weight-loss': {
    title: 'Medical Weight Loss in Gambrills, MD | Healtopia',
    description:
      'Healtopia offers physician-guided medical weight loss in Gambrills, Maryland focused on safe, sustainable progress and personalized support.',
  },
  '/pricing': {
    title: 'Pricing in Gambrills, MD | Healtopia',
    description:
      'Review Healtopia pricing in Gambrills, Maryland for Direct Primary Care, concierge medicine, medical weight loss, and insurance-based care.',
  },
  '/services': {
    title: 'Services in Gambrills, MD | Healtopia',
    description:
      "Explore Healtopia's primary care, concierge, insurance-based care, and medical weight loss services in Gambrills, Maryland.",
  },
  '/insurance': {
    title: 'Accepted Insurance in Gambrills, MD | Healtopia',
    description:
      'See insurance plans accepted by Healtopia in Gambrills, Maryland and learn how to verify your coverage before your visit.',
  },
  '/contact': {
    title: 'Contact Healtopia | Gambrills Primary Care',
    description:
      'Contact Healtopia in Gambrills, Maryland for appointments, location details, and care questions.',
  },
  '/gambrills': {
    title: 'Primary Care & Medical Weight Loss in Gambrills, MD | Healtopia',
    description:
      'Personalized primary care, Direct Primary Care, concierge medicine, insurance-based care, and medical weight loss in Gambrills, Maryland at Healtopia.',
  },
}

function absUrl(pathname) {
  return new URL(pathname, SITE_ORIGIN).toString()
}

function normalizeSeoPathname(pathname = '/') {
  if (!pathname || pathname === '/') return '/'

  const normalized = pathname.replace(/\/+$/, '')
  return normalized || '/'
}

export function createOrganizationEntity() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    logo: LOGO_URL,
    image: CLINIC_IMAGE_URL,
    sameAs: [FACEBOOK_URL, INSTAGRAM_URL],
  }
}

export function createClinicEntity() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': CLINIC_ID,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    logo: LOGO_URL,
    image: CLINIC_IMAGE_URL,
    telephone: SITE_PHONE_NUMBER,
    address: {
      '@type': 'PostalAddress',
      ...SITE_ADDRESS,
    },
    medicalSpecialty: ['InternalMedicine', 'ObesityMedicine'],
    areaServed: SERVICE_AREAS,
    parentOrganization: {
      '@id': ORGANIZATION_ID,
    },
  }
}

export function createWebsiteEntity() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    publisher: {
      '@id': ORGANIZATION_ID,
    },
  }
}

function createBreadcrumbList(pathname) {
  const breadcrumbMap = {
    '/about': 'About Healtopia',
    '/services': 'Services',
    '/direct-primary-care': 'Direct Primary Care',
    '/insurance-based-primary-care': 'Insurance-Based Primary Care',
    '/medical-weight-loss': 'Medical Weight Loss',
    '/concierge-care': 'Concierge Medicine',
    '/pricing': 'Pricing',
    '/insurance': 'Accepted Insurance',
    '/contact': 'Contact',
    '/gambrills': 'Gambrills',
  }

  const currentLabel = breadcrumbMap[pathname]
  if (!currentLabel) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${absUrl(pathname)}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_ORIGIN,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: currentLabel,
        item: absUrl(pathname),
      },
    ],
  }
}

function createServiceEntity(pathname) {
  const serviceMap = {
    '/direct-primary-care': {
      name: 'Direct Primary Care',
      description: "Healtopia's Direct Primary Care model in Gambrills, Maryland offers more time, direct access, and transparent membership-based care.",
    },
    '/insurance-based-primary-care': {
      name: 'Insurance-Based Primary Care',
      description: "Healtopia's insurance-based primary care in Gambrills, Maryland supports preventive care, chronic care, and ongoing support.",
    },
    '/medical-weight-loss': {
      name: 'Medical Weight Loss',
      description: 'Healtopia offers physician-guided medical weight loss in Gambrills, Maryland focused on safe, sustainable progress and personalized support.',
    },
    '/concierge-care': {
      name: 'Concierge Medicine',
      description: 'Healtopia concierge medicine in Gambrills, Maryland offers premium, highly personalized care with added access and continuity.',
    },
    '/gambrills': {
      name: 'Primary Care & Medical Weight Loss in Gambrills, MD',
      description:
        'Healtopia provides personalized primary care, Direct Primary Care, concierge medicine, insurance-based care, and medical weight loss in Gambrills, Maryland.',
    },
  }

  const service = serviceMap[pathname]
  if (!service) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absUrl(pathname)}#service`,
    name: service.name,
    url: absUrl(pathname),
    description: service.description,
    provider: {
      '@id': CLINIC_ID,
    },
    areaServed: SERVICE_AREAS,
  }
}

function createFaqEntity(pathname) {
  const faqMap = {
    '/direct-primary-care': [
      {
        question: 'Do you accept insurance?',
        answer:
          'We do not bill insurance for membership primary care services under Direct Primary Care. However, many patients use DPC alongside a high-deductible insurance plan for specialist visits, hospitalizations, or emergencies.',
      },
      {
        question: 'Can I use my HSA or FSA?',
        answer:
          'In many cases, patients may use HSA or FSA funds for qualified medical expenses. Please check with your plan administrator for eligibility details.',
      },
      {
        question: 'Is Direct Primary Care the same as Concierge Medicine?',
        answer:
          'No. Direct Primary Care focuses on affordable, accessible primary care with transparent monthly pricing and no insurance billing. Concierge Medicine is a separate membership option designed for patients seeking a premium healthcare experience.',
      },
    ],
    '/insurance-based-primary-care': [
      {
        question: 'Which insurance plans does Healtopia accept?',
        answer:
          'Healtopia accepts many major insurance plans for traditional primary care. Because coverage can vary, patients should contact the office and confirm their plan details before their visit.',
      },
      {
        question: 'Do I need to verify my coverage before my visit?',
        answer:
          'Yes. It is a good idea to verify benefits with your insurance plan and confirm with the office so you understand what may be covered and what out-of-pocket costs may apply.',
      },
      {
        question: 'What services may be covered by insurance?',
        answer:
          'Coverage can vary by plan, but many patients use insurance for routine visits, preventive care, chronic disease management, and follow-up support. Please confirm details with your insurer.',
      },
      {
        question: 'Are copays or deductibles required?',
        answer:
          'Copays, deductibles, and other cost-sharing amounts depend on your specific plan and the service provided. The office can help you understand the general process, but your insurer is the best source for exact benefit details.',
      },
      {
        question: 'Can I still be seen if my insurance is not accepted?',
        answer:
          'In many cases, yes. Healtopia also offers self-pay options. Please contact the office so the team can help you understand your visit options.',
      },
      {
        question: 'How is insurance-based care different from Direct Primary Care?',
        answer:
          'Insurance-based care uses accepted insurance plans for traditional primary care services. Direct Primary Care is a separate membership model with a different pricing structure and approach to billing.',
      },
    ],
    '/concierge-care': [
      {
        question: 'What is Concierge Medicine?',
        answer:
          'Concierge Medicine is a membership-based care model designed for patients who want enhanced physician access, longer visits, preventive wellness planning, and coordinated follow-up.',
      },
      {
        question: 'How is Concierge Medicine different from Direct Primary Care?',
        answer:
          'Both approaches prioritize a more personal relationship with your care team, but Concierge Medicine is a separate membership program with its own care structure, access model, and pricing.',
      },
      {
        question: 'Does Concierge Medicine replace health insurance?',
        answer:
          'No. Concierge Medicine does not replace health insurance. Patients should keep appropriate insurance coverage for specialist care, hospitalizations, emergencies, and services outside the concierge membership.',
      },
      {
        question: 'What does the membership include?',
        answer:
          'Membership details vary, but concierge care may include enhanced access, longer visits, preventive planning, chronic care support, care coordination, and follow-up guidance. Please contact the office to confirm current details.',
      },
      {
        question: 'How do appointments and physician access work?',
        answer:
          'Patients can expect a more connected experience with direct communication options and scheduling support when available. The office can provide the current communication and appointment process.',
      },
      {
        question: 'Is Concierge Medicine right for patients with chronic conditions?',
        answer:
          'Many patients with chronic or complex health needs appreciate concierge care because it can offer more time, closer follow-up, and more coordinated support. The office can help determine whether it is a good fit for you.',
      },
      {
        question: 'How can I learn about pricing?',
        answer:
          'You can review the pricing information on the website or contact the office for the latest membership details.',
      },
    ],
    '/medical-weight-loss': [
      {
        question: 'What is medical weight loss?',
        answer:
          'Medical weight loss is a physician-guided approach to weight management that looks at your medical history, metabolism, lifestyle, and overall health. At Healtopia, the program is designed to support safe, sustainable, and long-term results through evaluation, personalized planning, follow-up care, and ongoing support.',
      },
      {
        question: 'Do you prescribe weight-loss medications?',
        answer:
          'For some patients, prescription weight-loss medications may be appropriate as part of a medically supervised plan. Medication decisions are made after a medical evaluation and are combined with lifestyle guidance, monitoring, and physician support.',
      },
      {
        question: 'Will I receive a personalized plan?',
        answer:
          'Yes. Each patient receives a plan based on their health history, goals, body composition, metabolic factors, and any weight-related conditions. The plan may include nutrition guidance, lifestyle counseling, medication support when appropriate, and follow-up monitoring.',
      },
      {
        question: 'How often will I have appointments?',
        answer:
          'Follow-up frequency depends on your individual plan and progress. Some patients may need more frequent visits at the beginning of the program, while others may transition to less frequent maintenance visits over time.',
      },
      {
        question: 'How is this program different from other weight-loss options?',
        answer:
          'Healtopia’s program is medically supervised and focuses on the underlying factors that can affect weight, metabolism, and overall health. The program combines medical evaluation, lifestyle support, treatment options when appropriate, and ongoing monitoring rather than using a one-size-fits-all approach.',
      },
      {
        question: 'What can I expect during my first appointment?',
        answer:
          'Your first appointment may include a detailed medical history review, discussion of your weight and wellness goals, evaluation of obesity-related health conditions, body composition assessment, metabolic testing when appropriate, and a personalized care plan.',
      },
      {
        question: 'Is support available between visits?',
        answer:
          'Support may be available between visits depending on your care plan and membership or visit type. The care team will explain communication options and follow-up expectations during your appointment.',
      },
      {
        question: 'Is the program covered by insurance?',
        answer:
          'Coverage can vary by insurance plan and by service. Some visits, labs, medications, or tests may be covered, while others may not be. Patients should contact the office and their insurance plan to confirm coverage and out-of-pocket costs.',
      },
    ],
  }

  const items = faqMap[pathname]
  if (!items) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absUrl(pathname)}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

function createProviderEntities() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Physician',
      '@id': ABOUT_GASHAW_ID,
      name: 'Gashaw Adugna, MD',
      url: absUrl('/about#gashaw-adugna'),
      image: new URL(aboutGashawPortrait, SITE_ORIGIN).toString(),
      worksFor: {
        '@id': CLINIC_ID,
      },
      medicalSpecialty: ['InternalMedicine', 'ObesityMedicine'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': ABOUT_MALEFIYA_ID,
      name: 'Malefiya Kenea',
      url: absUrl('/about#malefiya-kenea'),
      honorificSuffix: 'FNP-C',
      jobTitle: 'Nurse Practitioner',
      worksFor: {
        '@id': CLINIC_ID,
      },
      affiliation: {
        '@id': CLINIC_ID,
      },
    },
  ]
}

function createGambrillsEntities() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${GAMBRILLS_PAGE_ID}#webpage`,
      name: 'Primary Care & Medical Weight Loss in Gambrills, MD | Healtopia',
      url: GAMBRILLS_PAGE_ID,
      description:
        'Personalized primary care, Direct Primary Care, concierge medicine, insurance-based care, and medical weight loss in Gambrills, Maryland at Healtopia.',
      isPartOf: {
        '@id': WEBSITE_ID,
      },
      about: {
        '@id': CLINIC_ID,
      },
      breadcrumb: {
        '@id': `${GAMBRILLS_PAGE_ID}#breadcrumb`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${GAMBRILLS_PAGE_ID}#primary-care`,
      name: 'Primary Care in Gambrills',
      description:
        'Preventive care, chronic disease management, acute visits, wellness visits, and care coordination in Gambrills, Maryland.',
      provider: {
        '@id': CLINIC_ID,
      },
      areaServed: SERVICE_AREAS,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${GAMBRILLS_PAGE_ID}#direct-primary-care`,
      name: 'Direct Primary Care in Gambrills',
      description:
        'Membership-based primary care with longer visits, direct access, and transparent pricing in Gambrills, Maryland.',
      provider: {
        '@id': CLINIC_ID,
      },
      areaServed: SERVICE_AREAS,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${GAMBRILLS_PAGE_ID}#medical-weight-loss`,
      name: 'Medical Weight Loss in Gambrills',
      description:
        'Physician-guided weight management with evaluation, monitoring, and personalized support in Gambrills, Maryland.',
      provider: {
        '@id': CLINIC_ID,
      },
      areaServed: SERVICE_AREAS,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${GAMBRILLS_PAGE_ID}#concierge-care`,
      name: 'Concierge Medicine in Gambrills',
      description:
        'Premium, personalized care with enhanced access, longer visits, and proactive wellness planning in Gambrills, Maryland.',
      provider: {
        '@id': CLINIC_ID,
      },
      areaServed: SERVICE_AREAS,
    },
  ]
}

export function buildStructuredData(pathname = '/') {
  const normalizedPathname = normalizeSeoPathname(pathname)

  if (!ROUTE_SEO[normalizedPathname]) return null

  const entities = [createOrganizationEntity(), createClinicEntity()]

  if (normalizedPathname === '/') {
    entities.push(createWebsiteEntity())
  }

  const breadcrumb = createBreadcrumbList(normalizedPathname)
  if (breadcrumb) entities.push(breadcrumb)

  const service = createServiceEntity(normalizedPathname)
  if (service) entities.push(service)

  const faq = createFaqEntity(normalizedPathname)
  if (faq) entities.push(faq)

  if (normalizedPathname === '/about') {
    entities.push(...createProviderEntities())
  }

  if (normalizedPathname === '/gambrills') {
    entities.push(...createGambrillsEntities())
  }

  return entities
}

export function getSeoMeta(pathname = '/') {
  const normalizedPathname = normalizeSeoPathname(pathname)
  const routeMeta = ROUTE_SEO[normalizedPathname]

  if (!routeMeta) {
    const title = '404 | Healtopia'
    const description = 'Page not found.'

    return {
      title,
      description,
      canonical: null,
      robots: 'noindex,follow',
      ogType: 'website',
      ogSiteName: SITE_NAME,
      ogTitle: title,
      ogDescription: description,
      ogUrl: `${SITE_ORIGIN}${normalizedPathname === '/' ? '' : normalizedPathname}`,
      ogImage: SHARED_OG_IMAGE,
      ogImageAlt: `${SITE_NAME} clinic exterior in Gambrills, Maryland`,
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: SHARED_OG_IMAGE,
      twitterImageAlt: `${SITE_NAME} clinic exterior in Gambrills, Maryland`,
      jsonLd: null,
    }
  }

  const canonical = `${SITE_ORIGIN}${normalizedPathname === '/' ? '' : normalizedPathname}`
  const socialPreview = SOCIAL_PREVIEW_IMAGES[normalizedPathname] ?? {
    image: '/images/clinic/building-exterior-optimized.jpg',
    alt: `${SITE_NAME} in Gambrills, Maryland`,
  }
  const ogImage = absUrl(socialPreview.image)
  const imageAlt = socialPreview.alt

  return {
    title: routeMeta.title,
    description: routeMeta.description,
    canonical,
    robots: 'index,follow',
    ogType: 'website',
    ogSiteName: SITE_NAME,
    ogTitle: routeMeta.title,
    ogDescription: routeMeta.description,
    ogUrl: canonical,
    ogImage,
    ogImageAlt: imageAlt,
    twitterCard: 'summary_large_image',
    twitterTitle: routeMeta.title,
    twitterDescription: routeMeta.description,
    twitterImage: ogImage,
    twitterImageAlt: imageAlt,
    jsonLd: buildStructuredData(normalizedPathname),
  }
}
