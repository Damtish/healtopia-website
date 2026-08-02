import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Users, X } from 'lucide-react'
import Button from './Button'
import { getCardHover, getEntranceProps, getRevealProps } from '../lib/motion'

const providers = [
  {
    id: 'gashaw-adugna',
    eyebrow: 'PHYSICIAN',
    name: 'Gashaw Adugna, MD',
    title: 'Internal Medicine & Obesity Medicine',
    description:
      'Dual board-certified in Internal Medicine and Obesity Medicine, Dr. Adugna provides compassionate, evidence-based care with a focus on prevention, weight management, and long-term wellness.',
    badges: ['Internal Medicine', 'Obesity Medicine', 'Preventive Care'],
    imageSrc: '/images/clinic/dr-gashaw-adugna-white-coat.png',
    imageAlt: 'Gashaw Adugna, MD in a white coat portrait',
    imageClassName: 'object-[center_12%]',
    compactHint: 'Hover to learn more',
    modalBio: [
      'Gashaw Adugna, MD, is a dual board-certified physician in Internal Medicine and Obesity Medicine, known not just for his clinical excellence but for the deep compassion and personal connection he brings to every patient encounter.',
      "Dr. Adugna completed his Internal Medicine residency in New York City, honing his expertise in one of the nation’s most diverse and demanding healthcare settings. Subsequently, he served as a Hospitalist at Anne Arundel Medical Center, where he established a reputation for effectively managing intricate medical cases with exceptional precision and compassion. With over a decade of clinical experience, Dr. Adugna is now implementing a personalized approach to patient care, providing evidence-based, tailored treatments with a strong emphasis on obesity management, preventive health initiatives, and long-term wellness.",
      'Whether patients are looking to take control of their weight, prevent chronic illness, or simply feel their best, Dr. Adugna is committed to walking the journey with them every step of the way.',
    ],
  },
  {
    id: 'malefiya-kenea',
    eyebrow: 'NURSE PRACTITIONER',
    name: 'Malefiya Kenea, FNP-C',
    title: 'Family Nurse Practitioner',
    description:
      'With more than 10 years of nursing experience, Malefiya provides patient-centered primary care focused on acute and chronic conditions, prevention, and patient education.',
    badges: ['Primary Care', 'Chronic Care', 'Patient Education'],
    placeholderText: 'Portrait coming soon',
    compactHint: 'Tap to learn more',
    modalBio: [
      'Malefiya Kenea, FNP-C, is a dedicated Family Nurse Practitioner with over 10 years of nursing experience across different clinical settings, including medical-surgical, ICU, dialysis, and urgent care. In her current role in primary care, she provides comprehensive care for acute and chronic conditions.',
      'She also emphasizes health promotion, disease prevention, and patient education to support long-term wellness. Malefiya is certified by the American Academy of Nurse Practitioners Certification Board (AANPCB) and is passionate about delivering holistic, patient-centered healthcare that empowers individuals to take an active role in their health.',
    ],
  },
]

function ProviderBioModal({ provider, onClose, reduceMotion, closeButtonRef }) {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus?.()
    })

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
    }
  }, [closeButtonRef])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
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
            <h3 id={`provider-bio-${provider.id}`} className="mt-3">
              {provider.name}
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-ht-cyan-700">{provider.title}</p>
          </div>

          <button
            ref={closeButtonRef}
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
                        <Users size={24} aria-hidden="true" />
                      </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-ht-navy-700">
                        {provider.placeholderText || 'Portrait coming soon'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {provider.badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex rounded-full border border-cyan-100 bg-ht-soft-blue/40 px-3 py-1 text-xs font-semibold text-ht-navy-700"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <div className="space-y-4 text-sm leading-relaxed text-ht-gray sm:text-base">
              {provider.modalBio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProviderPanel({ provider, reduceMotion, onOpenBio }) {
  const entranceMotion = getEntranceProps(reduceMotion, { y: 18, duration: 0.45 })
  const hoverMotion = getCardHover(reduceMotion)
  const whileHover = hoverMotion.whileHover
    ? { ...hoverMotion.whileHover, transition: hoverMotion.transition }
    : undefined

  return (
    <motion.article
      className="provider-card provider-profile-card relative h-[31rem] overflow-hidden rounded-[1.75rem] border border-cyan-100 bg-white/96 shadow-[0_20px_46px_-34px_rgba(5,42,74,0.45)] md:h-[33rem] lg:h-[34rem]"
      {...entranceMotion}
      whileHover={whileHover}
    >
      <div className="provider-card__media absolute inset-0">
        {provider.imageSrc ? (
          <img
            src={provider.imageSrc}
            alt={provider.imageAlt}
            className={`provider-profile-card__image absolute inset-0 h-full w-full object-cover object-top ${provider.imageClassName || ''}`}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(22,182,212,0.2),transparent_30%),linear-gradient(135deg,#dff7fb_0%,#f4fbfe_45%,#ffffff_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_72%,rgba(22,182,212,0.12),transparent_24%)]" />
            <div className="flex h-full items-center justify-center p-5">
              <div className="relative w-full max-w-[84%] overflow-hidden rounded-[1.15rem] border border-cyan-100 bg-white/35 p-5 shadow-[0_16px_32px_-24px_rgba(5,42,74,0.45)] backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.8),transparent_34%)]" />
                <div className="relative flex min-h-[150px] items-center justify-center text-center">
                  <div>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100">
                      <Users size={22} aria-hidden="true" />
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-ht-navy-700">
                      {provider.placeholderText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ht-navy/72 via-ht-navy/18 to-transparent" />
      </div>

      <div className="provider-card__content provider-profile-card__details">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="ht-eyebrow bg-cyan-100 text-ht-navy-700">
              {provider.eyebrow}
            </p>
            <h3 className="mt-3">
              {provider.name}
            </h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-ht-cyan-700">{provider.title}</p>
          </div>
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-100 bg-white text-ht-cyan-700 shadow-sm">
            <ArrowRight size={15} />
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {provider.badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex rounded-full border border-cyan-100 bg-white/80 px-3 py-1 text-xs font-semibold text-ht-navy-700"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="provider-profile-card__details-extra">
          <p className="provider-card__bio mt-4 text-sm leading-relaxed text-ht-gray md:text-base">{provider.description}</p>
          <div className="mt-5">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={(event) => {
                event.stopPropagation()
                onOpenBio(provider)
              }}
              className="ht-motion-smooth group whitespace-nowrap"
            >
              View Full Bio
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function HomeProviderShowcase({
  reduceMotion = false,
  eyebrow = 'MEET YOUR PROVIDERS',
  title = 'Care led by the Healtopia clinical team',
  description = 'Our clinicians combine experience, compassion, and a calm, patient-first approach to care.',
  className = 'mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14',
}) {
  const [modalProviderId, setModalProviderId] = useState(null)
  const closeButtonRef = useRef(null)
  const modalProvider = providers.find((provider) => provider.id === modalProviderId) ?? null

  return (
    <>
      <motion.section
        id="providers"
        className={className}
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.16 })}
      >
        <div className="max-w-[48rem]">
          <p className="ht-eyebrow bg-cyan-100 text-ht-navy-700">
            {eyebrow}
          </p>
          <h2 className="ht-heading-2 mt-4">
            {title}
          </h2>
          <p className="ht-body ht-text-width-section mt-4 text-ht-gray">
            {description}
          </p>
        </div>

        <div className="provider-grid mt-8">
          {providers.map((provider) => (
            <ProviderPanel
              key={provider.id}
              provider={provider}
              reduceMotion={reduceMotion}
              onOpenBio={(item) => setModalProviderId(item.id)}
            />
          ))}
        </div>
      </motion.section>

      <AnimatePresence>
        {modalProvider ? (
          <ProviderBioModal
            provider={modalProvider}
            onClose={() => setModalProviderId(null)}
            reduceMotion={reduceMotion}
            closeButtonRef={closeButtonRef}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default HomeProviderShowcase
