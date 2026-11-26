import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import SectionBadge from './SectionBadge'
import { PAGE_CONTAINER } from '../lib/pageStyles'
import useNearViewport from './effects/useNearViewport'
import EffectBoundary from './effects/EffectBoundary'

const HelixCanvas = lazy(() => import('./effects/HelixCanvas.jsx'))

const careSteps = [
  {
    number: '01',
    title: 'Book',
    lead: 'Online or by phone.',
    description:
      'Schedule through our secure online booking link or call the office. Same-day and next-day appointments are available based on schedule availability.',
    tags: ['Online booking', 'By phone', 'Same-week visits'],
  },
  {
    number: '02',
    title: 'First visit',
    lead: 'Unhurried time with your provider.',
    description:
      'An extended visit to review your health history, medications, and goals, in person in Gambrills or by telehealth when it fits.',
    tags: ['Extended visits', 'In-person', 'Telehealth'],
  },
  {
    number: '03',
    title: 'Your care plan',
    lead: 'Labs, prescriptions, and a plan built around you.',
    description:
      'Preventive care, lab work, prescriptions when appropriate, and a physician-guided weight-loss plan if that is one of your goals.',
    tags: ['Labs', 'Prescriptions', 'Weight-loss plan'],
  },
  {
    number: '04',
    title: 'Ongoing care',
    lead: 'Follow-ups and direct communication.',
    description:
      'Regular follow-ups keep your plan on track, with direct communication with your doctor for Direct Primary Care and concierge patients.',
    tags: ['Follow-ups', 'Direct access', 'Care coordination'],
  },
]

function HelixFallback() {
  return (
    <div className="flex h-full w-full justify-center" aria-hidden="true">
      <div className="h-full w-px bg-gradient-to-b from-transparent via-cyan-200 to-transparent opacity-70" />
    </div>
  )
}

export default function CareJourneySection() {
  const reduceMotion = useReducedMotion()
  const timelineRef = useRef(null)
  const stepRefs = useRef([])
  const stepOffsets = useRef([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const near = useNearViewport(timelineRef)

  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 62%', 'end 62%'] })

  // Measure where each step starts, as a fraction of the timeline height.
  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return undefined

    const measure = () => {
      const height = timeline.offsetHeight || 1
      stepOffsets.current = stepRefs.current.map((el) => (el ? (el.offsetTop + 28) / height : 1))
      updateActive(scrollYProgress.get())
    }

    const updateActive = (value) => {
      let next = -1
      stepOffsets.current.forEach((offset, index) => {
        if (value >= offset) next = index
      })
      setActiveIndex((current) => (current === next ? current : next))
    }

    const ro = new ResizeObserver(measure)
    ro.observe(timeline)
    measure()
    return () => ro.disconnect()
  }, [scrollYProgress])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    let next = -1
    stepOffsets.current.forEach((offset, index) => {
      if (value >= offset) next = index
    })
    if (next !== activeIndex) setActiveIndex(next)
  })

  const reachedIndex = reduceMotion ? careSteps.length - 1 : activeIndex
  const counter = String(Math.max(1, reachedIndex + 1)).padStart(2, '0')

  return (
    <section
      id="how-care-works"
      aria-labelledby="how-care-works-title"
      className="care-journey relative border-b border-ht-silver bg-gradient-to-b from-white via-ht-soft-blue/25 to-white py-14 sm:py-16 lg:py-24"
    >
      <div className={`${PAGE_CONTAINER} grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16`}>
        <div className="lg:sticky lg:top-[calc(var(--ht-header-h,4.7rem)+3rem)] lg:self-start">
          <SectionBadge>How care works</SectionBadge>
          <h2 id="how-care-works-title" className="mt-4 text-ht-navy">
            How care works at <span className="text-ht-cyan-700">Healtopia</span>
          </h2>
          <p className="ht-body mt-4 max-w-[34rem] text-ht-gray">
            Four clear steps, one care team. From your first booking to ongoing follow-up, you always know what
            comes next.
          </p>
          <p className="mt-6 hidden items-baseline gap-2 font-semibold text-ht-navy-700 lg:flex" aria-hidden="true">
            <span className="text-3xl tabular-nums text-ht-cyan-700">{counter}</span>
            <span className="text-sm tracking-[0.18em] text-ht-gray">/ 04</span>
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          <div
            className="pointer-events-none absolute bottom-0 left-0 top-0 w-[56px] sm:w-[88px] lg:w-[112px]"
            aria-hidden="true"
          >
            {near ? (
              <EffectBoundary fallback={<HelixFallback />}><Suspense fallback={<HelixFallback />}>
                <HelixCanvas progress={reduceMotion ? null : scrollYProgress} reduced={Boolean(reduceMotion)} />
              </Suspense></EffectBoundary>
            ) : (
              <HelixFallback />
            )}
          </div>

          <ol className="relative space-y-6 pl-[68px] sm:space-y-8 sm:pl-[104px] lg:pl-[128px]">
            {careSteps.map((step, index) => {
              const reached = index <= reachedIndex
              const current = index === reachedIndex
              return (
                <li
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[index] = el
                  }}
                  className={`care-step rounded-[1.6rem] border p-5 transition-[opacity,border-color,background-color,box-shadow,transform] duration-500 sm:p-6 lg:p-7 ${
                    reached ? 'care-step--reached' : 'care-step--dim'
                  } ${current ? 'care-step--current border-cyan-200 bg-white shadow-[0_22px_48px_-36px_rgba(5,42,74,0.5)]' : 'border-transparent'}`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold tabular-nums tracking-[0.16em] text-ht-cyan-700">{step.number}</span>
                    <h3 className="text-ht-navy">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-lg font-semibold leading-snug text-ht-navy-700">{step.lead}</p>
                  <p className="ht-body mt-2 max-w-[40rem] text-ht-gray">{step.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${step.title} highlights`}>
                    {step.tags.map((tag, tagIndex) => (
                      <motion.li
                        key={tag}
                        className="rounded-full border border-cyan-100 bg-ht-soft-blue/60 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ht-navy-700"
                        initial={false}
                        animate={reached ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                        transition={
                          reduceMotion ? { duration: 0 } : { duration: 0.4, delay: reached ? 0.12 + tagIndex * 0.07 : 0, ease: [0.22, 1, 0.36, 1] }
                        }
                      >
                        {tag}
                      </motion.li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
