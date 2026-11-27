import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import useReducedMotion from '../lib/useReducedMotionSafe'
import {
  ArrowRight,
  Clock3,
  ShieldCheck,
  Users,
  Activity,
  Users2,
  X,
} from 'lucide-react'
import Button from '../components/Button'
import SectionBadge from '../components/SectionBadge'
import NextStepSection from '../components/NextStepSection'
import WhyHealtopiaSection from '../components/WhyHealtopiaSection'
import WhyTogetherSection from '../components/WhyTogetherSection'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer } from '../lib/motion'
import {
  PAGE_CONTAINER,
  PAGE_SECTION,
} from '../lib/pageStyles'
import aboutGashawPortrait from '../assets/dr-gashaw-adugna-about-optimized.jpg'

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

function ProviderBioModal({ provider, onClose, reduceMotion, returnFocusRef }) {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const triggerElement = returnFocusRef.current

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
      triggerElement?.focus?.()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, returnFocusRef])

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
                    decoding="async"
                    width="540"
                    height="675"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ht-navy/30 to-transparent" />
                </div>
              ) : (
                <div className="provider-portrait-placeholder relative aspect-[4/5] overflow-hidden bg-[radial-gradient(circle_at_30%_25%,rgba(22,182,212,0.22),transparent_28%),linear-gradient(135deg,#dff7fb_0%,#f2fbfe_45%,#ffffff_100%)] p-5">
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

function AboutProvidersSection({ reduceMotion, returnFocusRef, providersRef }) {
  const [activeProvider, setActiveProvider] = useState(null)
  const gashawProvider = providerCards[0]
  const malefiyaProvider = providerCards[1]

  return (
    <>
      <section ref={providersRef} id="providers" className="about-providers-section scroll-mt-24 border-b border-ht-silver">
        <div className="about-providers__container">
          <motion.header
            className="about-providers__header"
            {...getRevealProps(reduceMotion, { y: 18, duration: 0.5, amount: 0.18 })}
          >
            <div className="max-w-4xl">
              <SectionBadge className="eyebrow">PROVIDERS</SectionBadge>
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
              id="gashaw-adugna"
              className="provider-profile provider-profile--gashaw"
              {...getEntranceProps(reduceMotion, { y: 16, duration: 0.5, delay: 0.04 })}
            >
              <div className="provider-profile__portrait">
                <img
                  src={gashawProvider.imageSrc}
                  alt={gashawProvider.imageAlt}
                  className={`provider-profile__portrait-image ${gashawProvider.imageClassName || ''}`}
                  loading="lazy"
                  decoding="async"
                  width="540"
                  height="675"
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
                  onClick={() => {
                    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
                    setActiveProvider(gashawProvider)
                  }}
                  className="provider-link group mt-auto w-full justify-center whitespace-nowrap sm:w-auto"
                >
                  View Full Bio
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </div>
            </motion.article>

            <motion.article
              id="malefiya-kenea"
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
                  onClick={() => {
                    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
                    setActiveProvider(malefiyaProvider)
                  }}
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
          <ProviderBioModal
            provider={activeProvider}
            onClose={() => setActiveProvider(null)}
            reduceMotion={reduceMotion}
            returnFocusRef={returnFocusRef}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

function About() {
  const reduceMotion = useReducedMotion()
  const returnFocusRef = useRef(null)
  const providersRef = useRef(null)

  const scrollToProviders = () => {
    window.requestAnimationFrame(() => {
      providersRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    const root = document.documentElement
    const header = document.querySelector('header')

    // ResizeObserver reports the size after layout, so mounting About never forces a layout.
    const observer = new ResizeObserver(([entry]) => {
      const measuredHeight = entry?.borderBoxSize?.[0]?.blockSize || entry?.contentRect.height || 75
      root.style.setProperty('--header-height', `${Math.round(measuredHeight)}px`)
    })
    if (header) observer.observe(header)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--header-height')
    }
  }, [])

  return (
    <div className="about-page">
      <section className="about-hero-shell relative isolate overflow-hidden border-b border-ht-silver">
        <div className="about-hero-bg">
          <motion.img
            src="/images/clinic/building-exterior-optimized.jpg"
            alt="Healtopia clinic building exterior"
            className="h-full w-full object-cover object-center"
            initial={reduceMotion ? false : { scale: 1.03 }}
            animate={reduceMotion ? { scale: 1 } : { scale: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        <div className="about-hero-overlay" />

        <div className="about-hero-inner relative mx-auto flex w-full max-w-[1360px] items-center px-4 sm:px-6 lg:px-8">
          <motion.div
            className="about-hero-copy py-0"
            {...getEntranceProps(reduceMotion, { y: 16, duration: 0.52, delay: 0.03 })}
          >
            <div className="about-hero-panel">
              <SectionBadge className="border border-cyan-100/25 bg-white/10 text-white drop-shadow-[0_1px_2px_rgba(2,6,23,0.45)] backdrop-blur-sm">
                ABOUT HEALTOPIA
              </SectionBadge>
              <h1 className="about-hero-title mt-4 max-w-[700px] text-[clamp(2.55rem,3.8vw,4.1rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-white">
                Healthcare built on trust and lasting relationships
              </h1>
              <p className="mt-4 max-w-[700px] text-[0.98rem] leading-[1.58] text-white/80 md:text-[1rem]">
                Compassionate, personalized healthcare focused on giving every patient the time, attention, and
                trusted support they deserve.
              </p>

              <motion.div
                className="about-hero-actions mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
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
                <Button
                  type="button"
                  onClick={scrollToProviders}
                  variant="secondary"
                  className="group min-h-12 w-full whitespace-nowrap sm:w-auto"
                >
                  Meet Our Providers
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        className={PAGE_SECTION}
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.18 })}
      >
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.article
              className="rounded-[2rem] border border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue/35 to-cyan-50 p-6 shadow-[0_20px_46px_-34px_rgba(5,42,74,0.45)] md:p-8"
              {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.03 })}
            >
              <SectionBadge>Our Story</SectionBadge>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
                Care built on <span className="text-ht-cyan-700">time and trust</span>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ht-gray md:text-lg">
                After years of caring for patients in traditional healthcare settings, we envisioned a practice where
                appointments were not rushed, prevention was prioritized, and patients could build lasting
                relationships with their healthcare team. At our Gambrills, Maryland practice, Healtopia was created to make that vision a reality. Explore our
                <Link to="/direct-primary-care" className="font-medium text-ht-cyan-700 underline underline-offset-2 hover:text-ht-navy">
                  Direct Primary Care
                </Link>
                options to see how that approach works.
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
              <SectionBadge>What patients can expect</SectionBadge>
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

      <WhyTogetherSection />
      <WhyHealtopiaSection />

          <AboutProvidersSection
            reduceMotion={reduceMotion}
            returnFocusRef={returnFocusRef}
            providersRef={providersRef}
          />

      <NextStepSection
        eyebrow="TAKE THE NEXT STEP"
        title="Experience care built around you"
        description="Meet a care team focused on time, trust, personalized attention, and long-term support."
        secondaryLabel="Call Our Office"
        secondaryHref="tel:+14107746678"
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
  )
}

export default About





