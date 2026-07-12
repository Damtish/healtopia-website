import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ShieldCheck,
  Star,
  Stethoscope,
  Scale,
  Users,
  Video,
} from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import ProgramHighlightSection from '../components/ProgramHighlightSection'
import SectionHeader from '../components/SectionHeader'
import ProviderCard from '../components/ProviderCard'
import PricingCard from '../components/PricingCard'
import pricingPlans from '../data/pricing'
import insuranceLogos from '../data/insurance'
import { testimonials } from '../data/testimonials'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const trustItems = [
  'Direct Primary Care',
  'Insurance-based Primary Care',
  'Concierge Medicine',
  'Medical Weight Loss',
]

const whyChoose = [
  {
    title: 'Affordable healthcare option with Direct Primary Care',
    description: 'A membership-based care option built to keep primary care more approachable and transparent.',
    icon: Stethoscope,
  },
  {
    title: 'Personalized care with attention to detail',
    description: 'Care is tailored to your history, goals, and the details that matter most to your health.',
    icon: CalendarClock,
  },
  {
    title: 'Same-week appointments when available',
    description: 'When availability allows, we aim to offer convenient access for timely primary care needs.',
    icon: ShieldCheck,
  },
  {
    title: 'After-hours appointments when available',
    description: 'When available, additional appointment times can help patients with busy schedules.',
    icon: CalendarClock,
  },
  {
    title: 'Most insurance accepted',
    description: 'Healtopia accepts many major insurance plans and also offers self-pay options.',
    icon: CreditCard,
  },
  {
    title: 'Preventive care focus',
    description: 'Preventive care is a core part of our approach to helping patients stay ahead of problems.',
    icon: ShieldCheck,
  },
  {
    title: 'Chronic disease management',
    description: 'Ongoing support for common long-term conditions with careful monitoring and follow-up.',
    icon: CalendarClock,
  },
  {
    title: 'Medical weight loss services',
    description: 'Physician-guided weight loss support with evaluation, follow-up visits, and treatment options.',
    icon: Scale,
  },
  {
    title: 'Concierge medicine services',
    description: 'Enhanced access, longer visits, and a more personalized care experience for qualifying patients.',
    icon: ShieldCheck,
  },
]

const careOptions = [
  {
    title: 'Direct Primary Care',
    text: 'A simple membership-based primary care option with transparent monthly pricing and easier access to routine care.',
    link: '/direct-primary-care',
    label: 'Learn about DPC',
    icon: Stethoscope,
  },
  {
    title: 'Insurance-based Primary Care',
    text: 'Traditional primary care visits for patients using Medicare, Medicaid, or accepted commercial insurance plans.',
    link: '/insurance-based-primary-care',
    label: 'View insurance-based care',
    icon: ShieldCheck,
  },
  {
    title: 'Concierge Medicine',
    text: 'Personalized membership care for patients who want more access, longer visits, and proactive health support.',
    link: '/concierge-care',
    label: 'Explore concierge care',
    icon: Users,
  },
  {
    title: 'Medical Weight Loss',
    text: 'Physician-guided weight loss support with evaluation, follow-up visits, and treatment options when appropriate.',
    link: '/medical-weight-loss',
    label: 'Explore weight loss',
    icon: Scale,
  },
]

const careHighlights = [
  {
    eyebrow: 'DIRECT PRIMARY CARE',
    title: (
      <>
        Simple membership care with more time and <span className="text-ht-cyan-700">direct access</span>
      </>
    ),
    description: 'Direct Primary Care is a membership-based option designed to make primary care more personal, accessible, and transparent.',
    bullets: [
      'Predictable monthly membership pricing',
      'Longer visits focused on your full health story',
      'Direct communication and easier follow-up',
    ],
    buttonLabel: 'View DPC Details',
    buttonTo: '/direct-primary-care',
    rightTitle: 'What DPC offers',
    rightItems: [
      { label: 'Start', text: 'Free initial consultation and membership review' },
      { label: 'Ongoing', text: 'Preventive care, sick visits, and chronic care support' },
      { label: 'Long term', text: 'A stronger relationship with your care team' },
    ],
    reverse: false,
  },
  {
    eyebrow: 'INSURANCE-BASED CARE',
    title: (
      <>
        Traditional primary care using your <span className="text-ht-cyan-700">accepted insurance</span>
      </>
    ),
    description:
      'Insurance-based primary care supports routine visits, preventive care, chronic disease management, and non-emergency concerns through accepted insurance plans.',
    bullets: [
      'Wellness visits, screenings, and preventive care',
      'Chronic disease management and follow-up support',
      'Acute visits for non-emergency medical concerns',
    ],
    buttonLabel: 'View Insurance-Based Care',
    buttonTo: '/insurance-based-primary-care',
    rightTitle: 'Care through insurance',
    rightItems: [
      { label: 'Routine care', text: 'Wellness visits and preventive screenings' },
      { label: 'Ongoing care', text: 'Chronic condition management and follow-up' },
      { label: 'When needed', text: 'Non-emergency sick visits and care coordination' },
    ],
    reverse: true,
  },
  {
    eyebrow: 'CONCIERGE MEDICINE',
    title: (
      <>
        Premium care with <span className="text-ht-cyan-700">personalized support</span>
      </>
    ),
    description:
      'Concierge Medicine is designed for patients who want a more connected, proactive, and personalized healthcare experience.',
    bullets: [
      'Longer, more personalized visits',
      'Priority scheduling when available',
      'Preventive wellness planning and care coordination',
    ],
    buttonLabel: 'View Concierge Details',
    buttonTo: '/concierge-care',
    rightTitle: 'Concierge care experience',
    rightItems: [
      { label: 'Access', text: 'Direct communication and priority scheduling when available' },
      { label: 'Planning', text: 'Personalized wellness and prevention support' },
      { label: 'Follow-up', text: 'Coordinated care and ongoing health guidance' },
    ],
    reverse: false,
  },
]

function Home() {
  const reduceMotion = useReducedMotion()
  const [isDesktopFloat, setIsDesktopFloat] = useState(false)
  const shouldFloatHero = isDesktopFloat && !reduceMotion

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const updateFloatMode = () => setIsDesktopFloat(mediaQuery.matches)
    updateFloatMode()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateFloatMode)
      return () => mediaQuery.removeEventListener('change', updateFloatMode)
    }

    mediaQuery.addListener(updateFloatMode)
    return () => mediaQuery.removeListener(updateFloatMode)
  }, [])

  return (
    <div>
      <motion.section
        className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.65, amount: 0.16 })}
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <motion.p
              className="mb-4 inline-flex rounded-full bg-cyan-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700"
              {...getEntranceProps(reduceMotion, { y: 14, duration: 0.5, delay: 0.03 })}
            >
              Gambrills, Maryland
            </motion.p>
            <motion.h1
              className="text-4xl font-extrabold leading-tight tracking-tight text-ht-navy md:text-5xl"
              {...getEntranceProps(reduceMotion, { y: 18, duration: 0.6, delay: 0.1 })}
            >
              Compassionate Primary Care & <span className="text-ht-cyan-700">Medical Weight Loss</span> in Gambrills,
              MD
            </motion.h1>
            <motion.p
              className="mt-5 max-w-xl text-base leading-relaxed text-ht-gray md:text-lg"
              {...getEntranceProps(reduceMotion, { y: 18, duration: 0.55, delay: 0.18 })}
            >
              Personalized, accessible care designed around your health, lifestyle, and long-term wellness.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              {...getEntranceProps(reduceMotion, { y: 16, duration: 0.5, delay: 0.26 })}
            >
              <Button
                href={BOOK_APPOINTMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                className="w-full sm:h-12 sm:w-auto sm:px-6"
              >
                Book Appointment
              </Button>
              <Button
                to="/contact"
                variant="secondary"
                size="md"
                className="w-full sm:h-12 sm:w-auto sm:px-6"
              >
                Contact Us
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={
              reduceMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : shouldFloatHero
                  ? { opacity: 1, y: [0, -5, 0], scale: 1 }
                  : { opacity: 1, y: 0, scale: 1 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : shouldFloatHero
                  ? { duration: 7, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.7, delay: 0.08, ease: 'easeOut' }
            }
          >
            <motion.div
              className="overflow-hidden rounded-[2rem] border border-cyan-200/90 bg-gradient-to-br from-cyan-100 via-ht-soft-blue to-white p-3 shadow-[0_24px_60px_-26px_rgba(12,174,200,0.5)]"
              initial={false}
              animate={shouldFloatHero ? { y: [0, -6, 0] } : { y: 0 }}
              transition={shouldFloatHero ? { duration: 6.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
            >
              <div className="relative h-[330px] overflow-hidden rounded-[1.4rem] border border-cyan-100 bg-white sm:h-[360px] md:h-auto md:aspect-[4/3]">
                <img
                  src="/images/clinic/reception.jpg"
                  alt="Healtopia clinic reception area"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </motion.div>

            <div className="mt-4 grid grid-cols-2 gap-2 md:hidden">
              {trustItems.map((item, index) => (
                <motion.div
                  key={`mobile-${item}`}
                  className="flex items-center gap-2 rounded-xl border border-cyan-100 bg-white px-3 py-2 text-xs font-semibold text-ht-navy shadow-[0_10px_22px_-16px_rgba(5,42,74,0.45)]"
                  {...getRevealProps(reduceMotion, { y: 12, duration: 0.35, delay: 0.06 + index * 0.06, amount: 0.25 })}
                >
                  <BadgeCheck size={14} className="text-ht-cyan-700" />
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="pointer-events-none absolute -bottom-3 left-3 right-3 hidden gap-2 md:grid md:grid-cols-2 lg:-bottom-4">
              {trustItems.map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-ht-silver bg-white/95 px-3 py-2 text-xs font-semibold text-ht-navy shadow-md"
                  {...getRevealProps(reduceMotion, { y: 12, duration: 0.35, delay: 0.08 + index * 0.06, amount: 0.2 })}
                >
                  <BadgeCheck size={14} className="text-ht-cyan-700" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="border-b border-ht-silver bg-white" {...getRevealProps(reduceMotion, { y: 16, duration: 0.5, amount: 0.2 })}>
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { label: 'Compassion-first model', icon: HeartIcon },
            { label: 'Board-certified clinicians', icon: ShieldCheck },
            { label: 'Secure telehealth options', icon: Video },
            { label: 'Flexible insurance support', icon: CreditCard },
          ].map((item) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-3 rounded-xl border border-ht-silver bg-ht-soft-blue/40 px-4 py-3"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35 }}
            >
              <item.icon size={18} className="text-ht-cyan-700" />
              <p className="text-sm font-semibold text-ht-navy">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="care-options"
        className="scroll-mt-28 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.6, amount: 0.18 })}
      >
        <SectionHeader
          title={
            <>
              Choose the care option that <span className="text-ht-cyan-700">fits you</span>
            </>
          }
          description="Healtopia offers flexible primary care and wellness options designed around how patients prefer to access care."
        />
        <motion.div
          className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08 })}
        >
          {careOptions.map((option) => (
            <motion.article
              key={option.title}
              className="flex h-full flex-col rounded-2xl border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
              {...getStaggerItem(reduceMotion, { y: 22 })}
              {...getCardHover(reduceMotion)}
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700">
                <option.icon size={18} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-ht-navy">{option.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ht-gray">{option.text}</p>
              <div className="mt-6">
                <Button to={option.link} variant="secondary" size="sm" className="whitespace-nowrap">
                  {option.label}
                  <ArrowRight size={14} />
                </Button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="border-y border-ht-silver bg-white py-16 lg:py-20"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.16 })}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Healtopia"
            title="Trusted care that feels personal"
            description="We focus on relationship-driven care, modern convenience, and consistent communication so you always know what is next in your plan."
          />
          <motion.div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" {...getStaggerContainer(reduceMotion, { staggerChildren: 0.07 })}>
            {whyChoose.map((item) => (
              <motion.article
                key={item.title}
                className="flex items-start gap-3 rounded-2xl border border-ht-silver bg-ht-soft-blue/20 px-4 py-4 shadow-[0_16px_34px_-30px_rgba(5,42,74,0.45)]"
                {...getStaggerItem(reduceMotion, { y: 18 })}
                {...getCardHover(reduceMotion)}
              >
                <item.icon size={18} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                <div>
                  <h3 className="text-sm font-semibold text-ht-navy">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ht-gray">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.16 })}
      >
        <SectionHeader
          eyebrow="Meet Your Providers"
          title="Care led by the Healtopia clinical team"
          description="Our providers offer primary care and weight management support with a patient-first approach."
        />
        <div className="mt-10 grid gap-5">
          <ProviderCard
            name="Dr. Gashaw Adugna, MD"
            title="Internal Medicine & Obesity Medicine"
            specialties={['Internal Medicine', 'Obesity Medicine']}
            delay={0.03}
          />
          <ProviderCard name="Malefiya Kenea, FNP-C" title="Family Nurse Practitioner" delay={0.1} />
        </div>
      </motion.section>

      {careHighlights.map((section) => (
        <ProgramHighlightSection
          key={section.eyebrow}
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          bullets={section.bullets}
          buttonLabel={section.buttonLabel}
          buttonTo={section.buttonTo}
          rightTitle={section.rightTitle}
          rightItems={section.rightItems}
          reverse={section.reverse}
        />
      ))}

      <motion.section
        className="border-y border-ht-silver bg-gradient-to-br from-cyan-50 via-white to-ht-soft-blue py-16 lg:py-20"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.58, amount: 0.16 })}
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.22 })}>
            <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ht-navy-700">
              Medical Weight Loss
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
              Structured, physician-guided support for <span className="text-ht-cyan-700">sustainable results</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ht-gray">
              We combine clinical insight, behavior change, and ongoing accountability to help you lose weight safely
              and maintain progress long term.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ht-gray">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-ht-cyan" />
                Personalized strategy based on labs and health history
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-ht-cyan" />
                Regular progress check-ins and plan adjustments
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-ht-cyan" />
                Clear, supportive coaching for realistic lifestyle change
              </li>
            </ul>
            <Button to="/medical-weight-loss" className="mt-6">
              View Program Details
            </Button>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-ht-silver bg-white p-8 shadow-lg"
            {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.22, delay: 0.08 })}
          >
            <h3 className="text-lg font-bold text-ht-navy">Typical program milestones</h3>
            <div className="mt-5 space-y-4">
              {[
                'Week 1: Intake, lab review, and personalized roadmap',
                'Week 4: Progress evaluation and treatment adjustment',
                'Week 8+: Momentum phase with sustainable routines',
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-xl border border-ht-silver bg-ht-soft-blue/30 px-4 py-3 text-sm text-ht-gray"
                >
                  {step}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.16 })}
      >
        <SectionHeader
          eyebrow="Simple Pricing"
          title="Transparent care options"
          description="Review current care options and discuss the best fit during your visit."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} {...plan} delay={index * 0.08} />
          ))}
        </div>
      </motion.section>

      <motion.section
        className="border-y border-ht-silver bg-white py-16 lg:py-20"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.16 })}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <TestimonialCarousel items={testimonials} reduceMotion={reduceMotion} />
        </div>
      </motion.section>

      <motion.section
        className="overflow-hidden border-y border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue/55 to-cyan-50 py-14 lg:py-16"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.16 })}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={
              <>
                Accepted <span className="text-ht-cyan-700">Insurance Plans</span>
              </>
            }
            description="Patients are encouraged to contact the office to confirm coverage before their visit."
            align="center"
          />

          <div
            className="insurance-logo-marquee relative mt-6 overflow-hidden"
            aria-label="Accepted insurance plans"
          >
            <div className="insurance-logo-marquee-track flex w-max items-center">
              {[0, 1].map((setIndex) => (
                <div
                  key={setIndex}
                  className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
                  aria-hidden={setIndex === 1 ? 'true' : undefined}
                >
                  {insuranceLogos.map((plan) => (
                    <div
                      key={`${setIndex}-${plan.src}`}
                      className="flex h-14 w-32 shrink-0 items-center justify-center px-2 sm:h-16 sm:w-40 sm:px-3"
                    >
                      <img
                        src={plan.src}
                        alt={plan.alt}
                        className={`insurance-logo-image h-auto w-auto max-h-9 max-w-[136px] object-contain sm:max-h-10 sm:max-w-[150px] ${plan.sizeClass ?? ''}`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 text-center">
            <Link
              to="/insurance"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ht-navy-700 transition-colors hover:text-ht-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ht-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-ht-soft-blue"
            >
              View accepted insurance plans
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.18 })}
      >
        <AppointmentCTA />
      </motion.section>
    </div>
  )
}

function TestimonialCarousel({ items, reduceMotion }) {
  const [activePage, setActivePage] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setVisibleCount(3)
        return
      }

      if (window.matchMedia('(min-width: 768px)').matches) {
        setVisibleCount(2)
        return
      }

      setVisibleCount(1)
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  const pageCount = Math.max(1, Math.ceil(items.length / visibleCount))
  const safeActivePage = Math.min(activePage, pageCount - 1)

  useEffect(() => {
    if (reduceMotion || isPaused || pageCount <= 1) return undefined

    const interval = window.setInterval(() => {
      setActivePage((current) => (current + 1) % pageCount)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [isPaused, pageCount, reduceMotion])

  const getInitials = (name) =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase()

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false)
        }
      }}
    >
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">Patient Testimonials</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">
            Hear what patients are saying about their experience with Healtopia.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-ht-navy lg:hidden">
            <span>5.0</span>
            <span className="inline-flex items-center gap-0.5 text-amber-400" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star key={starIndex} size={14} fill="currentColor" />
              ))}
            </span>
            <span>Google Rating · 46 reviews</span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-end">
          <div className="hidden items-center gap-2 text-sm font-semibold text-ht-navy lg:flex">
            <span>5.0</span>
            <span className="inline-flex items-center gap-0.5 text-amber-400" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star key={starIndex} size={14} fill="currentColor" />
              ))}
            </span>
            <span>Google Rating · 46 reviews</span>
          </div>

          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => setActivePage((current) => (current - 1 + pageCount) % pageCount)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ht-silver bg-white text-ht-navy shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-ht-soft-blue hover:text-ht-cyan-700"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setActivePage((current) => (current + 1) % pageCount)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ht-silver bg-white text-ht-navy shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-ht-soft-blue hover:text-ht-cyan-700"
              aria-label="Next testimonials"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex"
          animate={reduceMotion ? { x: 0 } : { x: `-${safeActivePage * 100}%` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeInOut' }}
        >
          {Array.from({ length: pageCount }).map((_, pageIndex) => {
            const start = pageIndex * visibleCount
            const pageItems = items.slice(start, start + visibleCount)

            return (
              <div key={pageIndex} className="w-full flex-none px-px">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {pageItems.map((testimonial, index) => (
                    <motion.article
                      key={`${testimonial.name}-${testimonial.source}-${pageIndex}-${index}`}
                      className={`rounded-2xl border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] ${
                        index === 0 ? 'md:border-cyan-200 md:bg-gradient-to-b md:from-white md:to-ht-soft-blue/25 md:shadow-[0_22px_50px_-36px_rgba(5,42,74,0.5)]' : ''
                      }`}
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold uppercase tracking-wide text-ht-cyan-700">
                            {getInitials(testimonial.name)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-amber-400" aria-label="5 star review">
                              {Array.from({ length: 5 }).map((_, starIndex) => (
                                <Star key={starIndex} size={14} fill="currentColor" />
                              ))}
                            </div>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ht-gray">Google Review</p>
                          </div>
                        </div>

                        {index === 0 ? (
                          <span className="hidden rounded-full bg-cyan-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ht-cyan-700 md:inline-flex">
                            Featured
                          </span>
                        ) : null}
                      </div>

                      <blockquote
                        className="text-[15px] leading-relaxed text-ht-gray md:text-base"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>

                      <p className="mt-4 text-sm font-semibold text-ht-navy">{testimonial.name}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ht-gray">
                        <span>{testimonial.source}</span>
                        {testimonial.timeAgo ? <span>• {testimonial.timeAgo}</span> : null}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
        <button
          type="button"
          onClick={() => setActivePage((current) => (current - 1 + pageCount) % pageCount)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ht-silver bg-white text-ht-navy shadow-sm transition hover:border-cyan-300 hover:text-ht-cyan-700"
          aria-label="Previous testimonials"
        >
          <ChevronLeft size={17} />
        </button>
        <button
          type="button"
          onClick={() => setActivePage((current) => (current + 1) % pageCount)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ht-silver bg-white text-ht-navy shadow-sm transition hover:border-cyan-300 hover:text-ht-cyan-700"
          aria-label="Next testimonials"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {Array.from({ length: pageCount }).map((_, pageIndex) => (
          <button
            key={pageIndex}
            type="button"
            onClick={() => setActivePage(pageIndex)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              pageIndex === safeActivePage ? 'w-7 bg-ht-cyan-700' : 'w-2.5 bg-cyan-200 hover:bg-cyan-300'
            }`}
            aria-label={`Go to testimonial group ${pageIndex + 1}`}
            aria-pressed={pageIndex === safeActivePage}
          />
        ))}
      </div>

      <div className="mt-7 text-center">
        <a
          href="https://share.google/JYuTIVEeq1YttWsWv"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-ht-silver bg-white px-5 py-2.5 text-sm font-semibold text-ht-navy shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-ht-soft-blue hover:text-ht-cyan-700"
        >
          View all Google reviews
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

function HeartIcon(props) {
  return <BadgeCheck {...props} />
}

export default Home
