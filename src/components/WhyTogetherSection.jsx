import { Suspense, lazy, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { HeartHandshake, ShieldCheck } from 'lucide-react'
import SectionBadge from './SectionBadge'
import useNearViewport from './effects/useNearViewport'
import EffectBoundary from './effects/EffectBoundary'

const TogetherCanvas = lazy(() => import('./effects/TogetherCanvas.jsx'))

const headlines = ['Health feels scattered.', 'We bring it together.', 'Care that puts you first.']

const points = [
  {
    title: 'One team, start to finish',
    description: 'Visits, labs, follow-ups, and specialist referrals coordinated by the same care team.',
    icon: HeartHandshake,
  },
  {
    title: 'Insurance or direct care, your choice',
    description: 'Use one of the many major insurance plans we accept, or choose a Direct Primary Care membership.',
    icon: ShieldCheck,
  },
]

function stateFor(progress) {
  if (progress < 0.34) return 0
  if (progress < 0.68) return 1
  return 2
}

export default function WhyTogetherSection() {
  const reduceMotion = useReducedMotion()
  const trackRef = useRef(null)
  const near = useNearViewport(trackRef)
  const [state, setState] = useState(0)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = stateFor(value)
    if (next !== state) setState(next)
  })

  const activeState = reduceMotion ? 2 : state

  return (
    <section
      ref={trackRef}
      aria-labelledby="why-together-title"
      className={`why-together relative border-b border-ht-silver ${reduceMotion ? '' : 'why-together--pinned'}`}
    >
      <div className="why-together__stage">
        <div className="why-together__canvas" aria-hidden="true">
          {near ? (
            <EffectBoundary fallback={null}><Suspense fallback={null}>
              <TogetherCanvas progress={reduceMotion ? null : scrollYProgress} reduced={Boolean(reduceMotion)} />
            </Suspense></EffectBoundary>
          ) : null}
        </div>

        <div className="why-together__content mx-auto w-full max-w-[79.5rem] px-4 sm:px-6 lg:px-8 min-[1440px]:max-w-[87rem] min-[1440px]:px-10">
          <div className="why-together__copy">
            <SectionBadge>Why Healtopia</SectionBadge>

            <h2 id="why-together-title" className="mt-5 text-ht-navy">
              <span className="sr-only">{headlines.join(' ')}</span>
              <span className="why-together__headlines" aria-hidden="true">
                {headlines.map((line, index) => {
                  const active = index === activeState
                  const offset = index < activeState ? -8 : 8
                  return (
                    <motion.span
                      key={line}
                      className={`why-together__headline ${index === 2 ? 'text-ht-cyan-700' : ''}`}
                      initial={false}
                      animate={
                        active ? { opacity: 1, y: 0 } : { opacity: 0, y: offset }
                      }
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {line}
                    </motion.span>
                  )
                })}
              </span>
            </h2>

            <div className="mt-4 flex gap-1.5" aria-hidden="true">
              {headlines.map((line, index) => (
                <span
                  key={line}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === activeState ? 'w-8 bg-ht-cyan-700' : 'w-3 bg-cyan-200'
                  }`}
                />
              ))}
            </div>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
              {points.map((point) => (
                <li
                  key={point.title}
                  className="why-together__point flex gap-3 rounded-2xl border border-ht-silver bg-white/85 p-4 shadow-[0_18px_40px_-34px_rgba(5,42,74,0.45)]"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 ring-1 ring-cyan-100">
                    <point.icon size={19} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-bold leading-snug text-ht-navy">{point.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ht-gray">{point.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
