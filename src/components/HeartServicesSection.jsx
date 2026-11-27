import { Suspense, lazy, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { ArrowRight, HeartPulse, MoveHorizontal } from 'lucide-react'
import useNearViewport from './effects/useNearViewport'
import EffectBoundary from './effects/EffectBoundary'

const ParticleHeart = lazy(() => import('./effects/ParticleHeart.jsx'))

// Copy is drawn from the existing service pages and src/data/*.js. No new claims.
const heartRegions = [
  {
    id: 'primary-care',
    title: 'Primary care',
    tagline: 'Whole-person checkups',
    description:
      'Comprehensive preventive, acute, and chronic care that keeps you healthy and supported through every stage of life.',
    to: '#service-lines',
    linkLabel: 'See our service lines',
    region: 'Left ventricle',
  },
  {
    id: 'medical-weight-loss',
    title: 'Medical weight loss',
    tagline: 'Physician-guided plans and coaching',
    description:
      'A personalized plan built on your labs and health history, with nutrition guidance, regular progress reviews, and medication options when clinically appropriate.',
    to: '/medical-weight-loss',
    linkLabel: 'Explore medical weight loss',
    region: 'Right ventricle',
  },
  {
    id: 'concierge-care',
    title: 'Concierge care',
    tagline: 'Direct access to your doctor',
    description:
      'Direct phone and text access to your physician, longer visits, and same-day or next-day appointments when available.',
    to: '/concierge-care',
    linkLabel: 'View concierge care',
    region: 'Aorta',
  },
  {
    id: 'insurance-based-care',
    title: 'Insurance-based care',
    tagline: 'Many major plans accepted',
    description:
      'Traditional primary care visits for preventive care and chronic disease management. Contact the office to verify your coverage.',
    to: '/insurance-based-primary-care',
    linkLabel: 'View insurance-based care',
    region: 'Right atrium',
  },
  {
    id: 'direct-primary-care',
    title: 'Direct primary care',
    tagline: 'One predictable monthly fee',
    description:
      'A membership that covers most primary care needs with no hidden costs, plus telehealth or in-person appointments and direct communication with your doctor.',
    to: '/direct-primary-care',
    linkLabel: 'View Direct Primary Care',
    region: 'Left atrium',
  },
]

function HeartPoster() {
  return (
    <div className="flex h-full w-full items-center justify-center text-ht-cyan-700 opacity-40" aria-hidden="true">
      <HeartPulse size={112} strokeWidth={1} />
    </div>
  )
}

function RegionLink({ region, tabIndex }) {
  const className =
    'mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ht-cyan-700 transition-colors hover:text-ht-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ht-cyan focus-visible:ring-offset-2 rounded'
  if (region.to.startsWith('#')) {
    return (
      <a href={region.to} className={className} tabIndex={tabIndex}>
        {region.linkLabel}
        <ArrowRight size={15} aria-hidden="true" />
      </a>
    )
  }
  return (
    <Link to={region.to} className={className} tabIndex={tabIndex}>
      {region.linkLabel}
      <ArrowRight size={15} aria-hidden="true" />
    </Link>
  )
}

function RegionCard({ region, index, active, reduced }) {
  return (
    <motion.article
      className="heart-explorer__card rounded-[1.6rem] border border-cyan-100 bg-white/90 p-5 shadow-[0_24px_54px_-38px_rgba(5,42,74,0.5)] sm:p-6"
      initial={false}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={reduced ? { duration: 0 } : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={active ? undefined : 'true'}
      inert={!active}
    >
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ht-gray">
        <span className="tabular-nums text-ht-cyan-700">{String(index + 1).padStart(2, '0')}</span>
        <span aria-hidden="true"> · </span>
        {region.region}
      </p>
      <h3 className="mt-2 text-ht-navy">{region.title}</h3>
      <p className="mt-1 font-semibold text-ht-navy-700">{region.tagline}</p>
      <p className="mt-2 text-sm leading-relaxed text-ht-gray sm:text-[0.95rem]">{region.description}</p>
      <RegionLink region={region} tabIndex={active ? undefined : -1} />
    </motion.article>
  )
}

export default function HeartServicesSection() {
  const reduceMotion = useReducedMotion()
  const trackRef = useRef(null)
  const near = useNearViewport(trackRef)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(heartRegions.length - 1, Math.max(0, Math.floor(value * heartRegions.length)))
    if (next !== active) setActive(next)
  })

  const goToRegion = (index) => {
    const track = trackRef.current
    if (!track) return
    const top = track.getBoundingClientRect().top + window.scrollY
    const distance = track.offsetHeight - window.innerHeight
    window.scrollTo({
      top: top + ((index + 0.5) / heartRegions.length) * Math.max(0, distance),
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  if (reduceMotion) {
    return (
      <section aria-labelledby="heart-explorer-title" className="heart-explorer border-b border-ht-silver py-14 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="heart-explorer__label">Healtopia · Care · 05 services</p>
            <h2 id="heart-explorer-title" className="mt-3 text-ht-navy">
              One clinic, every part of <span className="text-ht-cyan-700">you</span>
            </h2>
            <div className="mt-6 aspect-square w-full max-w-[28rem]" aria-hidden="true">
              {near ? (
                <EffectBoundary fallback={null}><Suspense fallback={null}>
                  <ParticleHeart progress={null} reduced />
                </Suspense></EffectBoundary>
              ) : null}
            </div>
          </div>
          <ol className="grid gap-4">
            {heartRegions.map((region, index) => (
              <li key={region.id}>
                <RegionCard region={region} index={index} active reduced />
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={trackRef}
      aria-labelledby="heart-explorer-title"
      className="heart-explorer heart-explorer--pinned border-b border-ht-silver"
    >
      <div className="heart-explorer__stage">
        <div className="heart-explorer__grid mx-auto w-full max-w-[79.5rem] px-4 sm:px-6 lg:px-8 min-[1440px]:max-w-[87rem] min-[1440px]:px-10">
          <div className="heart-explorer__intro">
            <p className="heart-explorer__label">
              Healtopia <span aria-hidden="true">·</span> Care <span aria-hidden="true">·</span> 05 services
            </p>
            <h2 id="heart-explorer-title" className="mt-3 text-ht-navy">
              One clinic, every part of <span className="text-ht-cyan-700">you</span>
            </h2>
            <p className="ht-body mt-3 hidden max-w-[30rem] text-ht-gray lg:block">
              Five ways to receive care, one team that knows your whole story. Scroll through each part of the
              practice.
            </p>

            <ol className="mt-6 hidden gap-1 lg:grid" aria-label="Healtopia services">
              {heartRegions.map((region, index) => (
                <li key={region.id}>
                  <button
                    type="button"
                    onClick={() => goToRegion(index)}
                    aria-current={index === active ? 'step' : undefined}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors !duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ht-cyan ${
                      index === active ? 'bg-ht-soft-blue text-ht-navy' : 'text-ht-gray hover:text-ht-navy'
                    }`}
                  >
                    <span className={`tabular-nums text-xs tracking-[0.14em] ${index === active ? 'text-ht-navy-700' : ''}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{region.title}</span>
                    <span
                      className={`ml-auto h-1.5 rounded-full transition-all duration-500 ${
                        index === active ? 'w-6 bg-ht-cyan-700' : 'w-1.5 bg-cyan-200'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="heart-explorer__visual" aria-hidden="true">
            {near ? (
              <EffectBoundary fallback={<HeartPoster />}><Suspense fallback={<HeartPoster />}>
                <ParticleHeart progress={scrollYProgress} />
              </Suspense></EffectBoundary>
            ) : (
              <HeartPoster />
            )}
            <p className="heart-explorer__hint">
              <MoveHorizontal size={14} aria-hidden="true" />
              Scroll to explore · Drag to turn
            </p>
          </div>

          <div className="heart-explorer__cards">
            <div className="heart-explorer__card-stack">
              {heartRegions.map((region, index) => (
                <RegionCard key={region.id} region={region} index={index} active={index === active} reduced={false} />
              ))}
            </div>
            <div className="mt-3 flex justify-center gap-1.5 lg:hidden" aria-hidden="true">
              {heartRegions.map((region, index) => (
                <span
                  key={region.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? 'w-6 bg-ht-cyan-700' : 'w-1.5 bg-cyan-200'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
