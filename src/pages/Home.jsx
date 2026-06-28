import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CreditCard,
  ShieldCheck,
  Star,
  Stethoscope,
  Video,
} from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import SectionHeader from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import ProviderCard from '../components/ProviderCard'
import PricingCard from '../components/PricingCard'
import services, { serviceIconMap } from '../data/services'
import pricingPlans from '../data/pricing'
import insuranceLogos from '../data/insurance'
import { testimonials } from '../data/testimonials'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getCardHover, getStaggerContainer, getStaggerItem } from '../lib/motion'

const trustItems = ['Primary Care', 'Medical Weight Loss', 'Telehealth Available', 'Insurance Accepted']

const whyChoose = [
  {
    title: 'Personalized Care Plans',
    description: 'We tailor each care plan to your medical history, lifestyle, and long-term goals.',
    icon: Stethoscope,
  },
  {
    title: 'Convenient Access',
    description: 'Flexible in-person and telehealth options make it easier to get care when you need it.',
    icon: CalendarClock,
  },
  {
    title: 'Trusted Clinical Guidance',
    description: 'Evidence-based medicine delivered with empathy, clear communication, and continuity.',
    icon: ShieldCheck,
  },
]

function Home() {
  const reduceMotion = useReducedMotion()
  const [isDesktopFloat, setIsDesktopFloat] = useState(false)

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
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <motion.p
              className="mb-4 inline-flex rounded-full bg-cyan-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.03 }}
            >
              Gambrills, Maryland
            </motion.p>
            <motion.h1
              className="text-4xl font-extrabold leading-tight tracking-tight text-ht-navy md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
            >
              Compassionate Primary Care & Medical Weight Loss in Gambrills, MD
            </motion.h1>
            <motion.p
              className="mt-5 max-w-xl text-base leading-relaxed text-ht-gray md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.22 }}
            >
              Personalized, accessible care designed around your health, lifestyle, and long-term wellness.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.32 }}
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
                to="/services"
                variant="secondary"
                size="md"
                className="w-full sm:h-12 sm:w-auto sm:px-6"
              >
                Explore Services
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
          >
            <motion.div
              className="overflow-hidden rounded-[2rem] border border-cyan-200/90 bg-gradient-to-br from-cyan-100 via-ht-soft-blue to-white p-3 shadow-[0_24px_60px_-26px_rgba(12,174,200,0.5)]"
              animate={isDesktopFloat ? { y: [0, -6, 0] } : { y: 0 }}
              transition={isDesktopFloat ? { duration: 6.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
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
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.28, delay: 0.08 + index * 0.08 }}
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
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.08 }}
                >
                  <BadgeCheck size={14} className="text-ht-cyan-700" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-ht-silver bg-white">
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
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Our Services"
          title="Whole-person healthcare for modern life"
          description="From preventive care to advanced weight management, we deliver practical and compassionate support in every visit."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 3).map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={serviceIconMap[service.icon]}
              path={service.path}
              delay={index * 0.08}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-ht-silver bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Healtopia"
            title="Trusted care that feels personal"
            description="We focus on relationship-driven care, modern convenience, and consistent communication so you always know what is next in your plan."
          />
          <motion.div className="mt-10 grid gap-5 md:grid-cols-3" {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08 })}>
            {whyChoose.map((item) => (
              <motion.article
                key={item.title}
                className="rounded-2xl border border-ht-silver bg-ht-soft-blue/30 p-6"
                {...getStaggerItem(reduceMotion, { y: 20 })}
                {...getCardHover(reduceMotion)}
              >
                <item.icon size={20} className="text-ht-cyan-700" />
                <h3 className="mt-4 text-xl font-bold text-ht-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ht-gray">{item.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
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
      </section>

      <section className="border-y border-ht-silver bg-gradient-to-br from-cyan-50 via-white to-ht-soft-blue py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ht-navy-700">
              Medical Weight Loss
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
              Structured, physician-guided support for sustainable results
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
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
      </section>

      <section className="overflow-hidden border-y border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue/55 to-cyan-50 py-14 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Accepted by many major insurance plans"
            description="Patients are encouraged to contact the office to confirm coverage before their visit."
            align="center"
          />

          <div
            className="insurance-logo-marquee relative mt-8 overflow-hidden"
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

          <div className="mt-7 text-center">
            <Link
              to="/insurance"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ht-navy-700 transition-colors hover:text-ht-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ht-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-ht-soft-blue"
            >
              View accepted insurance plans
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-ht-silver bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Testimonials"
            title="Patient Testimonials"
            description="Approved patient feedback can be managed from a single testimonials data file."
          />
          <motion.div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3" {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08 })}>
            {testimonials.map((testimonial, index) => {
              const showStars = testimonial.source === 'Google Review'

              return (
                <motion.article
                  key={`${testimonial.name}-${testimonial.source}-${index}`}
                  className="rounded-2xl border border-ht-silver bg-ht-soft-blue/30 p-6 shadow-sm"
                  {...getStaggerItem(reduceMotion, { y: 24 })}
                  {...getCardHover(reduceMotion)}
                >
                  {showStars ? (
                    <div className="mb-3 flex items-center gap-1 text-ht-cyan-700" aria-label="5 star review">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star key={starIndex} size={14} fill="currentColor" />
                      ))}
                    </div>
                  ) : null}

                  <blockquote className="text-sm leading-relaxed text-ht-gray">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                  <p className="mt-4 text-sm font-semibold text-ht-navy">{testimonial.name}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ht-gray">{testimonial.source}</p>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <AppointmentCTA />
      </section>
    </div>
  )
}

function HeartIcon(props) {
  return <BadgeCheck {...props} />
}

export default Home
