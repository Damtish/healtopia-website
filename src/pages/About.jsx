import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Heart,
  MapPin,
  MessageSquareHeart,
  Scale,
  ShieldCheck,
  Users,
  Activity,
  Users2,
  X,
} from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer } from '../lib/motion'
import {
  PAGE_CONTAINER,
  PAGE_SECTION,
  PAGE_SECTION_SOFT,
} from '../lib/pageStyles'
import aboutGashawPortrait from "../assets/Dr. Gashaw's.PNG"

const storyExpectations = [
  {
    title: 'Time to listen',
    description: 'We take time to understand your concerns, answer questions, and explain your options clearly.',
    icon: Clock3,
  },
  {
    title: 'Personalized care plans',
    description: 'Your care plan is guided by your health history, goals, lifestyle, and ongoing needs.',
    icon: ShieldCheck,
  },
  {
    title: 'Prevention-focused care',
    description: 'We help patients stay proactive through wellness visits, screenings, chronic care support, and education.',
    icon: Activity,
  },
  {
    title: 'Support beyond the visit',
    description: 'Our team focuses on follow-up, care coordination, and helping patients feel informed every step of the way.',
    icon: Users,
  },
]

const clinicGalleryItems = [
  {
    key: 'reception',
    label: 'Reception',
    title: 'Welcoming arrival',
    src: '/images/clinic/reception.jpg',
    alt: 'Healtopia reception area',
    objectPosition: 'object-center',
  },
  {
    key: 'examination-room',
    label: 'Examination Room',
    title: 'Private care space',
    src: '/images/clinic/examination-room.png',
    alt: 'Healtopia examination room',
    objectPosition: 'object-center',
  },
  {
    key: 'clinic-exterior',
    label: 'Clinic Exterior',
    title: 'Gambrills location',
    src: '/images/clinic/building-exterior.jpg',
    alt: 'Healtopia clinic exterior',
    objectPosition: 'object-center',
  },
  {
    key: 'hallway',
    label: 'Hallway',
    title: 'Calm circulation',
    src: '/images/clinic/hallway.jpg',
    alt: 'Healtopia hallway',
    objectPosition: 'object-center',
  },
]

const technologyMetrics = [
  { label: 'Body Fat Percentage', icon: Scale },
  { label: 'Muscle Mass', icon: Heart },
  { label: 'Visceral Fat', icon: ShieldCheck },
  { label: 'Metabolic Health', icon: MessageSquareHeart },
]

const trustCards = [
  {
    title: 'More time and attention',
    text: 'We focus on thoughtful conversations, practical answers, and a pace that feels less rushed.',
    icon: Clock3,
  },
  {
    title: 'Coordinated long-term support',
    text: 'Our team helps patients stay connected to follow-up care, prevention, and the next step in their plan.',
    icon: Users,
  },
  {
    title: 'Preventive, personalized care',
    text: 'Every visit is shaped around your history, your goals, and the details that matter most to your health.',
    icon: BadgeCheck,
  },
]

const providerCards = [
  {
    id: 'gashaw-adugna',
    eyebrow: 'PHYSICIAN',
    name: 'Gashaw Adugna, MD',
    title: 'INTERNAL MEDICINE & OBESITY MEDICINE',
    summary:
      'Dual board-certified in Internal Medicine and Obesity Medicine, Dr. Adugna provides compassionate, evidence-based care with a focus on prevention, weight management, and long-term wellness.',
    badges: ['Internal Medicine', 'Obesity Medicine', 'Preventive Care', 'Medical Weight Loss'],
    imageSrc: aboutGashawPortrait,
    imageAlt: 'Gashaw Adugna, MD in a blue suit portrait',
    imageClassName: 'object-[center_top]',
    bio: [
      'Gashaw Adugna, MD, is a dual board-certified physician in Internal Medicine and Obesity Medicine, known not just for his clinical excellence but for the deep compassion and personal connection he brings to every patient encounter.',
      'Dr. Adugna completed his Internal Medicine residency in New York City, honing his expertise in one of the nation\'s most diverse and demanding healthcare settings. Subsequently, he served as a Hospitalist at Anne Arundel Medical Center, where he established a reputation for effectively managing intricate medical cases with exceptional precision and compassion. With over a decade of clinical experience, Dr. Adugna is now implementing a personalized approach to patient care, providing evidence-based, tailored treatments with a strong emphasis on obesity management, preventive health initiatives, and long-term wellness.',
      'Whether patients are looking to take control of their weight, prevent chronic illness, or simply feel their best, Dr. Adugna is committed to walking the journey with them every step of the way.',
    ],
  },
  {
    id: 'malefiya-kenea',
    eyebrow: 'NURSE PRACTITIONER',
    name: 'Malefiya Kenea, FNP-C',
    title: 'FAMILY NURSE PRACTITIONER',
    summary:
      'With more than 10 years of nursing experience, Malefiya provides patient-centered primary care focused on acute and chronic conditions, prevention, and patient education.',
    badges: ['Primary Care', 'Chronic Care', 'Patient Education'],
    placeholderText: 'Portrait coming soon',
    bio: [
      'Malefiya Kenea, FNP-C, is a dedicated Family Nurse Practitioner with over 10 years of nursing experience across different clinical settings, including medical-surgical, ICU, dialysis, and urgent care. In her current role in primary care, she provides comprehensive care for acute and chronic conditions.',
      'She also emphasizes health promotion, disease prevention, and patient education to support long-term wellness. Malefiya is certified by the American Academy of Nurse Practitioners Certification Board (AANPCB) and is passionate about delivering holistic, patient-centered healthcare that empowers individuals to take an active role in their health.',
    ],
  },
]

function SectionEyebrow({ children, className = '' }) {
  return (
    <p className={`ht-eyebrow bg-cyan-100 text-ht-navy-700 ${className}`}>
      {children}
    </p>
  )
}

function ProviderBioModal({ provider, onClose, reduceMotion }) {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 px-4 py-4 backdrop-blur-sm sm:items-center sm:py-8"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
      role="presentation"
    >
      <motion.div
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-cyan-100 bg-white shadow-[0_30px_80px_-38px_rgba(5,42,74,0.55)]"
        initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`provider-bio-${provider.id}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-ht-silver px-5 py-4 sm:px-6">
          <div>
            <p className="ht-eyebrow bg-cyan-100 text-ht-navy-700">
              Provider Bio
            </p>
            <h3 id={`provider-bio-${provider.id}`} className="mt-3 text-2xl font-extrabold tracking-tight text-ht-navy">
              {provider.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-ht-cyan-700">{provider.title}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ht-silver bg-white text-ht-navy transition hover:border-cyan-300 hover:bg-ht-soft-blue hover:text-ht-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ht-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-label="Close biography"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-0 overflow-y-auto px-5 py-5 sm:grid-cols-[36%_64%] sm:px-6">
          <div className="pb-4 sm:pb-0 sm:pr-5">
            <div className="overflow-hidden rounded-[1.4rem] border border-cyan-100 bg-ht-soft-blue/15 shadow-[0_18px_36px_-28px_rgba(5,42,74,0.45)]">
              {provider.imageSrc ? (
                <div className="relative aspect-[4/5]">
                  <img
                    src={provider.imageSrc}
                    alt={provider.imageAlt}
                    className={`h-full w-full object-cover object-top ${provider.imageClassName || ''}`}
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ht-navy/30 to-transparent" />
                </div>
              ) : (
                <div className="relative aspect-[4/5] overflow-hidden bg-[radial-gradient(circle_at_30%_25%,rgba(22,182,212,0.22),transparent_28%),linear-gradient(135deg,#dff7fb_0%,#f2fbfe_45%,#ffffff_100%)] p-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_72%,rgba(22,182,212,0.14),transparent_26%)]" />
                  <div className="relative flex h-full items-center justify-center text-center">
                    <div>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100">
                        <Users2 size={24} aria-hidden="true" />
                      </div>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-ht-navy-700">
                        {provider.placeholderText || 'Portrait coming soon'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <div className="space-y-4 text-sm leading-relaxed text-ht-gray sm:text-base">
              {provider.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function AboutProvidersSection({ reduceMotion }) {
  const [activeProvider, setActiveProvider] = useState(null)
  const gashawProvider = providerCards[0]
  const malefiyaProvider = providerCards[1]

  return (
    <>
      <section className="about-providers-section scroll-mt-28 border-b border-ht-silver">
        <div className="about-providers__container">
          <motion.header
            className="about-providers__header"
            {...getRevealProps(reduceMotion, { y: 18, duration: 0.5, amount: 0.18 })}
          >
            <div className="max-w-4xl">
              <SectionEyebrow className="eyebrow">PROVIDERS</SectionEyebrow>
              <h2>Meet Our Providers</h2>
              <p>
                Experienced, compassionate clinicians focused on building lasting relationships and supporting your
                long-term health.
              </p>
            </div>
          </motion.header>

          <motion.div
            className="about-providers__panel"
            {...getRevealProps(reduceMotion, { y: 18, duration: 0.52, amount: 0.15 })}
          >
            <motion.article
              className="provider-profile provider-profile--gashaw"
              {...getEntranceProps(reduceMotion, { y: 16, duration: 0.5, delay: 0.04 })}
            >
              <div className="provider-profile__portrait">
                <img
                  src={gashawProvider.imageSrc}
                  alt={gashawProvider.imageAlt}
                  className={`provider-profile__portrait-image ${gashawProvider.imageClassName || ''}`}
                  loading="lazy"
                />
              </div>

              <div className="provider-profile__content">
                <p className="provider-type">{gashawProvider.eyebrow}</p>
                <h3>{gashawProvider.name}</h3>
                <p className="provider-role">{gashawProvider.title}</p>
                <p className="provider-description">{gashawProvider.summary}</p>

                <div className="provider-tags">
                  {gashawProvider.badges.map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setActiveProvider(gashawProvider)}
                  className="provider-link group mt-auto w-full justify-center whitespace-nowrap sm:w-auto"
                >
                  View Full Bio
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </div>
            </motion.article>

            <motion.article
              className="provider-profile provider-profile--malefiya"
              {...getEntranceProps(reduceMotion, { y: 16, duration: 0.5, delay: 0.1 })}
            >
              <div className="provider-profile__placeholder">
                <div className="provider-placeholder-icon">
                  <Users2 size={24} aria-hidden="true" />
                </div>
                <span>{malefiyaProvider.placeholderText || 'PORTRAIT COMING SOON'}</span>
              </div>

              <div className="provider-profile__content">
                <p className="provider-type">{malefiyaProvider.eyebrow}</p>
                <h3>{malefiyaProvider.name}</h3>
                <p className="provider-role">{malefiyaProvider.title}</p>
                <p className="provider-description">{malefiyaProvider.summary}</p>

                <div className="provider-tags">
                  {malefiyaProvider.badges.map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setActiveProvider(malefiyaProvider)}
                  className="provider-link group mt-auto w-full justify-center whitespace-nowrap sm:w-auto"
                >
                  View Full Bio
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeProvider ? (
          <ProviderBioModal provider={activeProvider} onClose={() => setActiveProvider(null)} reduceMotion={reduceMotion} />
        ) : null}
      </AnimatePresence>
    </>
  )
}

function GalleryCard({ item, reduceMotion, className = '' }) {
  return (
    <motion.article
      className={`group relative h-full min-h-0 overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white shadow-[0_18px_40px_-32px_rgba(5,42,74,0.42)] ${item.className || ''} ${className}`}
      {...getCardHover(reduceMotion)}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={item.src}
          alt={item.alt}
          className={`ht-motion-smooth h-full w-full object-cover ${item.objectPosition || 'object-center'} filter-none opacity-100 group-hover:scale-[1.03]`}
          loading="lazy"
          initial={reduceMotion ? false : { scale: 1 }}
          animate={reduceMotion ? { scale: 1 } : { scale: 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(8,29,58,0.78)_0%,rgba(8,29,58,0.32)_35%,rgba(8,29,58,0)_65%)]" />
      <div className="clinic-gallery-label pointer-events-none">
        <small>{item.label}</small>
        <strong>{item.title}</strong>
      </div>
    </motion.article>
  )
}

function AboutClinicGallery({ reduceMotion }) {
  return (
    <section className="clinic-section border-y border-ht-silver">
      <div className="clinic-container">
        <motion.div className="flex min-h-0 flex-col" {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.16 })}>
          <div className="clinic-header">
            <SectionEyebrow>INSIDE OUR CLINIC</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.95rem,2.55vw,3.05rem)] font-extrabold leading-[1.06] tracking-tight text-ht-navy">
              Care that begins in a <span className="text-ht-cyan-700">calm, welcoming space</span>
            </h2>
            <p className="mt-4 max-w-[780px] text-[clamp(0.98rem,1.1vw,1.16rem)] leading-[1.5] text-ht-gray">
              Bright, modern spaces designed to make every visit feel calm, comfortable, and welcoming.
            </p>
          </div>

          <div className="clinic-gallery mt-[clamp(16px,1.5vw,22px)] hidden min-[1024px]:grid">
            <GalleryCard
              item={clinicGalleryItems[0]}
              reduceMotion={reduceMotion}
              className="clinic-gallery-main"
            />
            <div className="clinic-gallery-right">
              <GalleryCard item={clinicGalleryItems[1]} reduceMotion={reduceMotion} className="clinic-gallery-item clinic-gallery-right-top" />
              <GalleryCard item={clinicGalleryItems[2]} reduceMotion={reduceMotion} className="clinic-gallery-item clinic-gallery-right-top" />
              <GalleryCard item={clinicGalleryItems[3]} reduceMotion={reduceMotion} className="clinic-gallery-item clinic-gallery-right-bottom" />
            </div>
          </div>

          <div className="clinic-gallery-tablet mt-[clamp(16px,1.5vw,22px)] hidden grid-cols-1 gap-3 min-[1024px]:hidden md:grid lg:hidden" aria-label="Inside our clinic gallery">
            <GalleryCard item={clinicGalleryItems[0]} reduceMotion={reduceMotion} className="clinic-gallery-tablet-main aspect-[16/9]" />
            <div className="clinic-gallery-tablet-grid grid grid-cols-2 gap-3">
              <GalleryCard item={clinicGalleryItems[1]} reduceMotion={reduceMotion} className="clinic-gallery-item clinic-gallery-tablet-item" />
              <GalleryCard item={clinicGalleryItems[2]} reduceMotion={reduceMotion} className="clinic-gallery-item clinic-gallery-tablet-item" />
              <GalleryCard item={clinicGalleryItems[3]} reduceMotion={reduceMotion} className="clinic-gallery-item clinic-gallery-tablet-hallway col-span-2" />
            </div>
          </div>

          <div className="clinic-gallery-mobile mt-[clamp(16px,1.5vw,22px)] grid grid-cols-1 gap-3 md:hidden" aria-label="Inside our clinic gallery">
            <GalleryCard item={clinicGalleryItems[0]} reduceMotion={reduceMotion} className="clinic-gallery-main-mobile aspect-[4/3]" />
            <GalleryCard item={clinicGalleryItems[1]} reduceMotion={reduceMotion} className="clinic-gallery-item-mobile aspect-[4/3]" />
            <GalleryCard item={clinicGalleryItems[2]} reduceMotion={reduceMotion} className="clinic-gallery-item-mobile aspect-[4/3]" />
            <GalleryCard item={clinicGalleryItems[3]} reduceMotion={reduceMotion} className="clinic-gallery-item-mobile aspect-[4/3]" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function About() {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    const root = document.documentElement
    const header = document.querySelector('header')

    const updateHeaderHeight = () => {
      const measuredHeight = header?.getBoundingClientRect?.().height || 75
      root.style.setProperty('--header-height', `${Math.round(measuredHeight)}px`)
    }

    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
      root.style.removeProperty('--header-height')
    }
  }, [])

  return (
    <div className="about-page">
      <style>{`
        .about-hero-shell {
          --header-height: 75px;
          --hero-height: calc(100vh - var(--header-height) - 2px);
        }

        @supports (height: 100svh) {
          .about-hero-shell {
            --hero-height: calc(100svh - var(--header-height) - 2px);
          }
        }

        .about-page {
          width: 100%;
          max-width: 100%;
          overflow-x: clip;
        }

        .about-hero {
          width: 100%;
        }

        .about-hero-inner {
          min-width: 0;
        }

        .about-hero-copy,
        .about-hero-media {
          min-width: 0;
        }

        .about-hero-media img {
          display: block;
          width: 100%;
          max-width: 100%;
          height: auto;
          object-fit: cover;
        }

        @media (max-height: 800px) and (min-width: 900px) {
          .about-hero-shell {
            padding-block: 18px !important;
          }

          .about-hero-shell .about-hero-panel {
            padding: 24px !important;
          }

          .about-hero-shell .about-hero-title {
            font-size: clamp(2.35rem, 3.3vw, 3.85rem) !important;
          }

          .about-hero-shell .about-hero-image {
            height: min(62vh, 580px) !important;
          }
        }

        @media (max-width: 767px) {
          .about-hero-shell {
            padding: 2rem 0 2.5rem;
            min-height: auto;
            height: auto;
            overflow: visible;
          }

          .about-hero-inner {
            width: min(100% - 32px, 520px);
            margin-inline: auto;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            align-items: stretch;
          }

          .about-hero-copy {
            order: 1;
            width: 100%;
            max-width: none;
            min-width: 0;
            padding: 1.5rem;
            border-radius: 1.5rem;
          }

          .about-hero-media {
            order: 2;
            position: relative !important;
            inset: auto !important;
            transform: none !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            aspect-ratio: 4 / 3;
            overflow: hidden;
            border-radius: 1.5rem;
          }

          .about-hero-media img {
            position: static !important;
            inset: auto !important;
            transform: none !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            object-fit: cover;
            object-position: center;
            border-radius: inherit;
          }

          .about-hero-shell .about-hero-panel {
            padding: 1.5rem !important;
            width: 100%;
            max-width: none;
            min-width: 0;
          }

          .about-hero-shell .about-hero-title {
            font-size: clamp(2.25rem, 11vw, 3.25rem);
            line-height: 0.98;
            letter-spacing: -0.045em;
            overflow-wrap: normal;
            word-break: normal;
            max-width: 100%;
          }

          .about-hero-shell .about-hero-panel > p {
            font-size: 1rem;
            line-height: 1.6;
            max-width: 100%;
          }

          .about-hero-actions {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
            width: 100%;
          }

          .about-hero-actions a,
          .about-hero-actions button {
            width: 100%;
            min-height: 54px;
            justify-content: center;
          }

          .about-hero-trust {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            width: 100%;
          }
        }

        .about-providers-section {
          background:
            radial-gradient(circle at 84% 16%, rgba(84, 211, 229, 0.1), transparent 28%),
            linear-gradient(180deg, #f6fcfe 0%, #eef8fc 100%);
          border-top: 1px solid rgba(20, 78, 112, 0.08);
          border-bottom: 1px solid rgba(20, 78, 112, 0.1);
        }

        .about-providers__container {
          width: min(1600px, calc(100% - 8vw));
          margin: 0 auto;
          padding: clamp(42px, 5.5vh, 70px) 0;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .about-providers__header {
          flex: 0 0 auto;
          max-width: 900px;
          margin-bottom: clamp(26px, 3vh, 40px);
        }

        .about-providers__header .eyebrow {
          margin-bottom: 10px;
        }

        .about-providers__header h2 {
          margin: 12px 0 12px;
          color: #102b50;
          font-size: clamp(2.35rem, 3vw, 3.8rem);
          line-height: 1.02;
          letter-spacing: -0.04em;
        }

        .about-providers__header p {
          margin: 0;
          max-width: 850px;
          color: #617a97;
          font-size: clamp(1rem, 1.15vw, 1.25rem);
          line-height: 1.5;
        }

        .about-providers__panel {
          flex: 1;
          min-height: 0;
          display: grid;
          grid-template-columns: 1.15fr 0.9fr;
          gap: clamp(22px, 2vw, 32px);
          align-items: stretch;
        }

        .provider-profile {
          min-width: 0;
          min-height: 0;
          border: 1px solid rgba(45, 159, 196, 0.2);
          border-radius: 30px;
          overflow: visible;
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 22px 48px rgba(25, 68, 103, 0.09);
        }

        .provider-profile--gashaw {
          display: grid;
          grid-template-columns: minmax(210px, 0.38fr) minmax(0, 0.62fr);
          overflow: hidden;
        }

        .provider-profile--malefiya {
          display: grid;
          grid-template-columns: minmax(210px, 0.39fr) minmax(0, 0.61fr);
          overflow: hidden;
        }

        .provider-profile--malefiya .provider-description {
          max-width: none;
        }

        .provider-profile--malefiya .provider-profile__content {
          justify-content: flex-start;
        }

        .provider-profile__portrait {
          position: relative;
          min-height: 320px;
          background: #d9e2e8;
          overflow: hidden;
        }

        .provider-profile__portrait-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center top;
        }

        .provider-profile__placeholder {
          margin: 0;
          width: 100%;
          height: 100%;
          min-height: 0;
          border-radius: 22px;
          border: 1px solid rgba(45, 196, 220, 0.24);
          background:
            radial-gradient(circle at 50% 20%, rgba(83, 211, 230, 0.18), transparent 38%),
            linear-gradient(135deg, #edfafd, #e7f3f8);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #204765;
          min-height: 0;
        }

        .provider-placeholder-icon {
          width: 56px;
          height: 56px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(31, 171, 204, 0.25);
          color: #1492b2;
        }

        .provider-profile__placeholder span {
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .provider-profile__content {
          padding: clamp(22px, 2vw, 32px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          min-height: 0;
        }

        .provider-type {
          align-self: flex-start;
          padding: 7px 14px;
          border-radius: 999px;
          background: #d7f7fb;
          color: #164967;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
        }

        .provider-profile h3 {
          margin: 16px 0 8px;
          color: #102b50;
          font-size: clamp(1.55rem, 1.9vw, 2.25rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
        }

        .provider-role {
          margin: 0;
          color: #1595b5;
          font-size: 0.86rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .provider-description {
          margin: 16px 0 0;
          color: #607995;
          font-size: 0.96rem;
          line-height: 1.55;
          max-width: 42ch;
        }

        .provider-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 16px;
        }

        .provider-tags span {
          padding: 6px 12px;
          border: 1px solid rgba(38, 184, 214, 0.25);
          border-radius: 999px;
          background: #f3fbfd;
          color: #214567;
          font-size: 0.78rem;
        }

        .provider-link {
          align-self: flex-start;
          margin-top: 16px;
          padding: 12px 18px;
          border: 1px solid rgba(30, 78, 112, 0.18);
          border-radius: 999px;
          color: #102b50;
          background: #ffffff;
          box-shadow: 0 8px 18px rgba(25, 69, 102, 0.08);
          font-weight: 600;
          text-decoration: none;
        }

        .provider-link:hover {
          border-color: #49cce1;
          transform: translateY(-2px);
        }

        @media (min-width: 900px) and (max-width: 1100px) {
          .about-providers__container {
            padding-block: 22px 28px;
          }

          .about-providers__header {
            margin-bottom: 18px;
          }

          .about-providers__header h2 {
            font-size: 2.15rem;
          }

          .about-providers__header p {
            font-size: 0.96rem;
            line-height: 1.45;
          }

          .about-providers__panel {
            gap: 18px;
          }

          .provider-profile--malefiya {
            grid-template-columns: minmax(180px, 0.39fr) minmax(0, 0.61fr);
          }

          .provider-profile__portrait {
            min-height: 260px;
          }

          .provider-profile__content {
            padding: 18px 20px;
          }

          .provider-type {
            padding: 6px 12px;
            font-size: 0.68rem;
          }

          .provider-profile h3 {
            margin-top: 12px;
            font-size: 1.5rem;
          }

          .provider-role {
            font-size: 0.8rem;
          }

          .provider-description {
            margin-top: 12px;
            font-size: 0.88rem;
            line-height: 1.42;
          }

          .provider-tags {
            margin-top: 12px;
            gap: 7px;
          }

          .provider-tags span {
            padding: 5px 10px;
            font-size: 0.72rem;
          }

          .provider-link {
            margin-top: 12px;
            padding: 11px 16px;
          }
        }

        .clinic-section {
          background:
            radial-gradient(circle at 85% 12%, rgba(53, 194, 218, 0.08), transparent 32%),
            #ffffff;
          border-bottom: 1px solid rgba(18, 72, 104, 0.1);
        }

        .clinic-container {
          width: min(1660px, calc(100% - 9vw));
          margin: 0 auto;
          padding: clamp(24px, 2.5vw, 38px) 0;
        }

        .clinic-header {
          max-width: 1120px;
          margin-bottom: clamp(18px, 1.8vw, 26px);
        }

        .clinic-header h2 {
          margin: 10px 0 10px;
          color: #102b50;
          font-size: clamp(1.95rem, 2.55vw, 3.05rem);
          line-height: 1.06;
          letter-spacing: -0.035em;
        }

        .clinic-header p {
          margin: 0;
          color: #607894;
          font-size: clamp(0.98rem, 1.1vw, 1.16rem);
          line-height: 1.45;
        }

        .clinic-gallery {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
          gap: 18px;
          height: clamp(340px, 38vw, 404px);
        }

        .clinic-gallery-main,
        .clinic-gallery-item {
          position: relative;
          min-width: 0;
          overflow: hidden;
          border: 1px solid rgba(39, 183, 212, 0.25);
          border-radius: 28px;
          background: #edf7fa;
          box-shadow: 0 18px 36px rgba(26, 72, 104, 0.09);
        }

        .clinic-gallery-main {
          height: 100%;
        }

        .clinic-gallery-main .ht-motion-smooth,
        .clinic-gallery-item .ht-motion-smooth {
          transition:
            transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .clinic-gallery-main img,
        .clinic-gallery-item img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .clinic-gallery-main img {
          object-position: center 52%;
        }

        .clinic-gallery-right {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: repeat(2, minmax(0, 1fr));
          gap: 18px;
          min-height: 0;
        }

        .clinic-gallery-right-bottom {
          grid-column: 1 / -1;
        }

        .clinic-gallery-label {
          position: absolute;
          inset: auto 0 0;
          z-index: 2;
          padding: 48px 26px 22px;
          color: white;
          background: linear-gradient(to top, rgba(8, 29, 58, 0.28) 0%, rgba(8, 29, 58, 0.1) 36%, rgba(8, 29, 58, 0) 68%);
          text-shadow: 0 1px 2px rgba(4, 15, 29, 0.42);
        }

        .clinic-gallery-label small {
          display: block;
          margin-bottom: 5px;
          color: rgba(255, 255, 255, 0.82);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .clinic-gallery-label strong {
          display: block;
          font-size: clamp(1.05rem, 1.35vw, 1.45rem);
          line-height: 1.1;
        }

        .clinic-gallery-mobile {
          display: none;
        }

        @media (min-width: 1100px) and (max-height: 900px) {
          .clinic-container {
            padding-block: 24px 30px;
          }

          .clinic-header {
            margin-bottom: 20px;
          }

          .clinic-header h2 {
            font-size: 3rem;
          }

          .clinic-header p {
            font-size: 1.05rem;
          }

          .clinic-gallery {
            height: 365px;
          }

          .clinic-gallery-label {
            padding: 38px 20px 17px;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .clinic-container {
            width: min(100% - 34px, 850px);
          }

          .clinic-gallery {
            display: none;
          }

          .clinic-gallery-tablet {
            display: grid;
            height: auto;
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .clinic-gallery-tablet-main {
            aspect-ratio: 16 / 9;
          }

          .clinic-gallery-tablet-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .clinic-gallery-tablet-item {
            aspect-ratio: 4 / 3;
          }

          .clinic-gallery-tablet-hallway {
            grid-column: 1 / -1;
            aspect-ratio: 16 / 10;
          }

          .clinic-gallery-label {
            padding: 40px 18px 16px;
          }
        }

        @media (max-width: 767px) {
          .clinic-container {
            width: min(100% - 24px, 580px);
            padding-block: 30px;
          }

          .clinic-header {
            margin-bottom: 18px;
          }

          .clinic-gallery-tablet {
            display: none;
          }

          .clinic-gallery-mobile {
            gap: 12px;
          }

          .clinic-gallery-main-mobile,
          .clinic-gallery-item-mobile {
            aspect-ratio: 4 / 3;
          }

          .clinic-gallery-label {
            padding: 38px 18px 16px;
          }
        }

        @media (min-width: 1150px) and (max-height: 850px) {
          .about-providers__container {
            padding-block: 22px 28px;
          }

          .about-providers__header {
            margin-bottom: 18px;
          }

          .about-providers__header h2 {
            font-size: 2.35rem;
          }

          .about-providers__header p {
            font-size: 1rem;
          }

          .provider-profile__portrait {
            min-height: 300px;
          }

          .provider-profile__content {
            padding: 20px 24px;
          }

          .provider-profile h3 {
            margin-top: 12px;
            font-size: 1.7rem;
          }

          .provider-description {
            margin-top: 12px;
            font-size: 0.9rem;
            line-height: 1.42;
          }

          .provider-tags {
            margin-top: 12px;
          }

          .provider-link {
            margin-top: 12px;
          }

          .provider-profile--malefiya {
            grid-template-columns: minmax(190px, 0.39fr) minmax(0, 0.61fr);
          }
        }

        @media (max-width: 899px) {
          .about-providers-section {
            overflow: visible;
          }

          .about-providers__container {
            width: min(1740px, calc(100% - 8vw));
            height: auto;
            padding: 18px 0 22px;
          }

          .about-providers__panel {
            grid-template-columns: 1fr;
          }

          .provider-profile {
            display: block;
          }

          .provider-profile--gashaw,
          .provider-profile--malefiya {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
          }

          .provider-profile__portrait {
            min-height: 340px;
          }

          .provider-profile__portrait-image {
            object-position: center 12%;
          }

          .provider-profile__placeholder {
            min-height: 160px;
            margin: 0;
            height: auto;
          }

          .provider-profile__content {
            padding: 20px 18px 18px;
          }
        }

        @media (max-width: 720px) {
          .about-providers__container {
            width: min(100% - 30px, 650px);
            padding-block: 30px;
          }

          .about-providers__header h2 {
            font-size: 1.95rem;
          }

          .provider-profile--gashaw,
          .provider-profile--malefiya {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
          }

          .provider-profile__portrait {
            min-height: 0;
            aspect-ratio: 4 / 3;
          }

          .provider-profile__portrait-image {
            object-position: center top;
          }

          .provider-profile__placeholder {
            min-height: 0;
            aspect-ratio: 4 / 3;
            margin: 0;
            height: auto;
          }

          .provider-profile__content {
            padding: 18px 18px 20px;
          }
        }
      `}</style>

      <section className="about-hero-shell relative isolate overflow-visible border-b border-ht-silver bg-[radial-gradient(circle_at_18%_20%,rgba(22,182,212,0.14),transparent_28%),radial-gradient(circle_at_84%_24%,rgba(22,182,212,0.08),transparent_24%),linear-gradient(180deg,#f7fcff_0%,#eef8fd_100%)] md:flex md:h-[var(--hero-height)] md:min-h-[var(--hero-height)] md:items-center md:overflow-hidden">
        <div className="absolute inset-0 hidden md:block">
          <div className="absolute inset-y-0 right-0 w-[52%] bg-[radial-gradient(circle_at_72%_20%,rgba(22,182,212,0.08),transparent_28%)]" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1360px] flex-col items-stretch px-4 py-12 sm:px-6 sm:py-14 md:flex-1 md:px-8 md:py-[clamp(14px,2.5vh,28px)] lg:py-[clamp(14px,2.5vh,28px)]">
          <div className="about-hero-inner flex w-full flex-col gap-6 md:grid md:grid-cols-[46%_54%] md:items-center lg:gap-[clamp(32px,4vw,56px)]">
            <motion.div
              className="about-hero-copy about-hero-panel relative rounded-[28px] border border-cyan-100/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(239,248,253,0.9)_100%)] px-[clamp(22px,2.5vw,36px)] pt-[clamp(22px,2.5vw,36px)] pb-[clamp(18px,2.1vw,28px)] shadow-[0_18px_48px_-38px_rgba(5,42,74,0.34)] backdrop-blur-md"
              {...getEntranceProps(reduceMotion, { y: 16, duration: 0.52, delay: 0.03 })}
            >
              <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_24%_20%,rgba(22,182,212,0.12),transparent_42%)] blur-2xl" />
              <div className="absolute left-5 top-5 h-12 w-1 rounded-full bg-cyan-300/80 opacity-80" />
              <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700">
                ABOUT HEALTOPIA
              </p>
              <h1 className="about-hero-title mt-3 max-w-[560px] text-[clamp(2.75rem,3.8vw,4.15rem)] font-extrabold leading-[0.99] tracking-[-0.025em] text-ht-navy">
                Healthcare built on <span className="font-semibold tracking-[-0.01em] text-ht-cyan-700">trust and lasting</span> relationships
              </h1>
              <p className="mt-3 max-w-[580px] text-[0.98rem] leading-[1.56] text-ht-gray md:text-[1rem]">
                Compassionate, personalized healthcare focused on giving every patient the time, attention, and
                trusted support they deserve.
              </p>

              <motion.div
                className="about-hero-actions mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08, amount: 0.2 })}
              >
                <Button
                  href={BOOK_APPOINTMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group min-h-12 w-full whitespace-nowrap sm:w-auto"
                >
                  Book Appointment
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
                <Button href="#providers" variant="secondary" className="group min-h-12 w-full whitespace-nowrap sm:w-auto">
                  Meet Our Providers
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="about-hero-media relative hidden md:block"
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut', delay: 0.05 }}
            >
              <div className="absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_42%,rgba(22,182,212,0.12),transparent_38%)] blur-2xl" />
              <div className="group relative overflow-hidden rounded-[30px] border border-cyan-100/90 bg-white shadow-[0_24px_64px_-34px_rgba(5,42,74,0.45)]">
                <div className="pointer-events-none absolute inset-0 rounded-[30px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]" />
                <div className="about-hero-image relative h-[min(58vh,560px)] max-h-[calc(100svh-var(--header-height)-82px)] overflow-hidden">
                  <motion.img
                    src="/images/clinic/building-exterior.jpg"
                    alt="Healtopia clinic building exterior"
                    className="h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    initial={reduceMotion ? false : { scale: 1 }}
                    animate={reduceMotion ? { scale: 1 } : { scale: 1.025 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 12, ease: 'easeOut' }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(22,182,212,0.06),transparent_24%)]" />
                </div>

                <motion.div
                  className="absolute bottom-6 left-6 max-w-[16rem] rounded-[1.15rem] border border-white/70 border-t-cyan-200 bg-white/78 px-3.5 py-3 shadow-[0_16px_34px_-28px_rgba(5,42,74,0.38)] backdrop-blur-lg"
                  {...getEntranceProps(reduceMotion, { y: 12, duration: 0.45, delay: 0.18 })}
                >
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
                    <MapPin size={11} className="text-ht-cyan-700" aria-hidden="true" />
                    OUR GAMBRILLS CLINIC
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ht-gray">
                    A welcoming local practice designed around personalized care.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="about-hero-media mt-2 overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white shadow-[0_18px_42px_-34px_rgba(5,42,74,0.38)] md:hidden"
            {...getEntranceProps(reduceMotion, { y: 16, duration: 0.45, delay: 0.18 })}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-white sm:aspect-[4/3]">
              <img
                src="/images/clinic/building-exterior.jpg"
                alt="Healtopia clinic building exterior"
                className="h-full w-full object-cover object-center transition-transform duration-300 ease-out"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(22,182,212,0.05),transparent_24%)]" />
              <div className="pointer-events-none absolute bottom-4 left-4 max-w-[15rem] rounded-[1rem] border border-white/70 border-t-cyan-200 bg-white/78 px-3 py-2 shadow-[0_14px_28px_-24px_rgba(5,42,74,0.35)] backdrop-blur-lg">
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
                  <MapPin size={11} className="text-ht-cyan-700" aria-hidden="true" />
                  OUR GAMBRILLS CLINIC
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        className="border-b border-ht-silver bg-white py-16 lg:py-20"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.18 })}
      >
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.article
              className="rounded-[2rem] border border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue/35 to-cyan-50 p-6 shadow-[0_20px_46px_-34px_rgba(5,42,74,0.45)] md:p-8"
              {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.03 })}
            >
              <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
                Our Story
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
                Care built on <span className="text-ht-cyan-700">time and trust</span>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ht-gray md:text-lg">
                After years of caring for patients in traditional healthcare settings, we envisioned a practice where
                appointments were not rushed, prevention was prioritized, and patients could build lasting
                relationships with their healthcare team. Healtopia was created to make that vision a reality.
              </p>
              <div className="mt-6 rounded-[1.5rem] border border-cyan-100 bg-white p-5 shadow-[0_16px_34px_-30px_rgba(5,42,74,0.45)]">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ht-navy-700">Our Philosophy</p>
                <p className="mt-3 text-sm leading-relaxed text-ht-gray">
                  We believe the best care feels personal, clear, and connected. That means time to listen, a plan
                  patients can understand, prevention that stays front and center, and support that continues beyond a
                  single visit.
                </p>
              </div>
            </motion.article>

            <motion.article
              className="rounded-[2rem] border border-ht-silver bg-ht-soft-blue/20 p-6 shadow-[0_20px_46px_-34px_rgba(5,42,74,0.45)] md:p-8"
              {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.08 })}
            >
              <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
                What patients can expect
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {storyExpectations.map((item) => (
                  <motion.article
                    key={item.title}
                    className="group flex h-full flex-col rounded-2xl border border-ht-silver bg-white p-5 shadow-[0_16px_34px_-30px_rgba(5,42,74,0.45)]"
                    {...getCardHover(reduceMotion)}
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100 transition-transform duration-300 group-hover:scale-105">
                      <item.icon size={18} />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-ht-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ht-gray">{item.description}</p>
                  </motion.article>
                ))}
              </div>
            </motion.article>
          </div>
        </div>
      </motion.section>

      <AboutProvidersSection reduceMotion={reduceMotion} />

      <AboutClinicGallery reduceMotion={reduceMotion} />

      <section className={PAGE_SECTION}>
        <div className={PAGE_CONTAINER}>
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.04 })}>
              <SectionEyebrow>TECHNOLOGY</SectionEyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
                Advanced body composition analysis for <span className="text-ht-cyan-700">better insights</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">
                Weight is only part of the picture. Our body composition scanner helps patients understand muscle, fat,
                and metabolic health so care plans can be more informed and personalized.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {technologyMetrics.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl border border-ht-silver bg-white px-4 py-3 text-sm font-semibold text-ht-navy shadow-[0_14px_30px_-28px_rgba(5,42,74,0.4)]"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700">
                      <item.icon size={16} />
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <Button to="/medical-weight-loss" className="whitespace-nowrap">
                  Explore Weight Loss Technology
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              {...getEntranceProps(reduceMotion, { y: 24, delay: 0.08, duration: 0.55 })}
            >
              <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_40%,rgba(22,182,212,0.14),transparent_42%),radial-gradient(circle_at_55%_70%,rgba(22,182,212,0.08),transparent_36%)] blur-2xl" />

              <div className="relative overflow-hidden rounded-[2.25rem] border border-cyan-100 bg-white p-5 shadow-[0_22px_58px_-38px_rgba(5,42,74,0.42)] sm:p-6 lg:p-7">
                <div className="relative overflow-hidden rounded-[1.75rem] bg-white">
                  <img
                    src="/images/clinic/seca-body-composition-clean.png"
                    alt="SECA body composition scanner and dashboard"
                    className="h-[24rem] w-full object-contain object-center sm:h-[28rem] lg:h-[34rem]"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION_SOFT}>
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {trustCards.map((item) => (
              <motion.article
                key={item.title}
                className="group flex items-start gap-3 rounded-[1.5rem] border border-cyan-100 bg-white p-5 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
                {...getRevealProps(reduceMotion, { y: 18, duration: 0.45, amount: 0.2 })}
                {...getCardHover(reduceMotion)}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ht-soft-blue text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100 transition-transform duration-300 group-hover:bg-ht-cyan-700 group-hover:text-white">
                  <item.icon size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold leading-snug text-ht-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ht-gray">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ht-soft-blue/20 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <AppointmentCTA
            title="Ready to experience personalized primary care?"
            description="Meet a care team focused on time, trust, and long-term support."
            secondaryLabel="Call Our Office"
            secondaryHref="tel:4107746678"
            benefits={[
              {
                title: 'Time to listen',
                description: 'Thoughtful conversations with room for questions.',
              },
              {
                title: 'Personalized planning',
                description: 'Care plans shaped around your history and goals.',
              },
              {
                title: 'Ongoing support',
                description: 'Follow-up that keeps your care moving forward.',
              },
            ]}
          />
        </div>
      </section>
    </div>
  )
}

export default About
