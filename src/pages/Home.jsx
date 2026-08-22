import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
  Stethoscope,
  Scale,
  Users,
} from 'lucide-react'
import Button from '../components/Button'
import CompareOptionsSection from '../components/CompareOptionsSection'
import ProgramHighlightSection from '../components/ProgramHighlightSection'
import SectionHeader from '../components/SectionHeader'
import SectionBadge from '../components/SectionBadge'
import HomeProviderShowcase from '../components/HomeProviderShowcase'
import NextStepSection from '../components/NextStepSection'
import insuranceLogos from '../data/insurance'
import { testimonials } from '../data/testimonials'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { PAGE_SECTION } from '../lib/pageStyles'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const serviceOverviewCards = [
  {
    title: 'Direct Primary Care',
    subtitle: 'Relationship-based primary care',
    points: ['Longer appointments', 'Transparent membership option'],
    link: '/direct-primary-care',
    label: 'View DPC Details',
    icon: Stethoscope,
  },
  {
    title: 'Insurance-Based Care',
    subtitle: 'Traditional insurance visits',
    points: ['Preventive care', 'Chronic disease management'],
    link: '/insurance-based-primary-care',
    label: 'View Insurance-Based Care',
    icon: ShieldCheck,
  },
  {
    title: 'Medical Weight Loss',
    subtitle: 'Physician-guided treatment',
    points: ['Personalized plans', 'Long-term support'],
    link: '/medical-weight-loss',
    label: 'Explore Medical Weight Loss',
    icon: Scale,
  },
  {
    title: 'Concierge Medicine',
    subtitle: 'Enhanced access',
    points: ['Priority scheduling', 'Highly personalized care'],
    link: '/concierge-care',
    label: 'View Concierge Details',
    icon: Users,
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
    <div>
      <style>{`
        .home-hero-shell {
          --header-height: 75px;
          padding-block: clamp(32px, 5vh, 56px);
        }

        @supports (height: 100svh) {
          @media (min-width: 1024px) {
            .home-hero-shell {
              min-height: calc(100svh - var(--header-height));
              height: calc(100svh - var(--header-height));
            }
          }
        }

        @media (min-width: 1024px) {
          .home-hero-shell {
            min-height: calc(100vh - var(--header-height));
            height: calc(100vh - var(--header-height));
          }
        }

        @media (max-width: 1023px) {
          .home-hero-shell {
            min-height: auto !important;
            height: auto !important;
          }
        }

        @media (max-width: 767px) {
          .home-hero-shell {
            padding-block: clamp(36px, 7vw, 52px);
          }
        }

        @media (min-width: 1024px) and (max-height: 800px) {
          .home-hero-shell {
            padding-block: clamp(24px, 3.5vh, 44px);
          }
        }

        .home-hero-overlay {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(251, 253, 254, 0.93) 26%,
            rgba(246, 250, 252, 0.7) 50%,
            rgba(240, 247, 250, 0.34) 74%,
            rgba(240, 247, 250, 0.14) 100%
          );
        }

        @media (max-width: 767px) {
          .home-hero-overlay {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.98) 0%,
              rgba(253, 254, 255, 0.96) 22%,
              rgba(249, 252, 254, 0.84) 48%,
              rgba(244, 249, 251, 0.54) 76%,
              rgba(244, 249, 251, 0.28) 100%
            );
          }
        }

        .home-hero-copy {
          max-width: 650px;
        }

        .home-hero-image {
          object-fit: cover;
          object-position: center;
        }

        .services-section {
          padding: 56px 0 64px;
        }

        .services-container {
          width: min(1380px, calc(100% - 64px));
          margin: 0 auto;
          padding-inline: 32px;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .services-heading {
          flex: 0 0 auto;
          max-width: 47.5rem;
          margin-bottom: 30px;
        }

        .services-heading h2 {
          font-size: 28px;
          line-height: 1.15;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 12px 0 16px;
        }

        .services-heading p {
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
          max-width: 47.5rem;
        }

        .services-grid {
          min-height: 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(18px, 1.15vw, 22px);
          align-items: stretch;
        }

        .service-card {
          min-height: 0;
          height: 100%;
          padding: 21px 22px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 1.75rem;
          box-shadow: 0 14px 34px -30px rgba(5, 42, 74, 0.38);
        }

        .service-card h3 {
          font-size: 16px;
          line-height: 1.25;
          font-weight: 700;
          margin: 16px 0 8px;
        }

        .service-card .service-subtitle {
          font-size: 12px;
          line-height: 1.35;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .service-card ul {
          margin: 0 0 14px;
          padding: 0;
        }

        .service-card li {
          font-size: 15px;
          line-height: 1.45;
          margin-bottom: 8px;
        }

        .service-card .card-button {
          margin-top: auto;
          flex-shrink: 0;
        }

        .service-card .card-button a,
        .service-card .card-button button {
          font-size: 13px;
        }

        .service-icon {
          width: 48px;
          height: 48px;
        }

        @media (max-width: 1099px) {
          .services-section {
            height: auto;
            padding: 48px 0 56px;
          }

          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 699px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-height: 800px) and (min-width: 1100px) {
          .services-section {
            padding: 48px 0 56px;
          }

          .services-heading {
            margin-bottom: 24px;
          }

          .services-grid {
            gap: 18px;
          }

          .service-card {
            min-height: 0;
            padding: 22px 24px;
          }
        }

      `}</style>
      <motion.section
        className="home-hero-shell relative isolate flex overflow-hidden border-b border-ht-silver bg-[linear-gradient(135deg,#ffffff_0%,#f7fcfe_44%,#eef8fc_100%)]"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.6, amount: 0.16 })}
      >
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/images/clinic/reception.jpg"
            alt=""
            aria-hidden="true"
            width="1920"
            height="1080"
            className="absolute inset-0 h-full w-full object-cover object-center"
            decoding="async"
            fetchPriority="high"
          />
          <div className="home-hero-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.56),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(12,174,200,0.08),transparent_24%)]" />
        </div>
        <div className="relative mx-auto flex w-full max-w-[1680px] flex-1 items-center px-5 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[clamp(48px,5vw,90px)]">
            <motion.div
              className="home-hero-copy relative z-10 min-w-0 justify-self-start text-left lg:py-1 lg:pl-1 xl:pl-2"
              {...getEntranceProps(reduceMotion, { y: 18, duration: 0.55, delay: 0.02 })}
            >
              <motion.div {...getEntranceProps(reduceMotion, { y: 14, duration: 0.5, delay: 0.03 })}>
                <SectionBadge className="mb-5">Gambrills, Maryland</SectionBadge>
              </motion.div>
              <motion.h1
                className="max-w-[12ch] text-[clamp(2.6rem,4.2vw,4.45rem)] font-extrabold leading-[0.96] tracking-[-0.04em] text-ht-navy sm:max-w-[13ch] lg:max-w-[12ch]"
                {...getEntranceProps(reduceMotion, { y: 18, duration: 0.6, delay: 0.08 })}
              >
                <span className="block">Primary care that </span>
                <span className="block text-ht-cyan-700">puts you first.</span>
              </motion.h1>
              <motion.p
                className="mt-5 max-w-[35rem] text-[clamp(0.98rem,0.96rem+0.18vw,1.06rem)] leading-[1.64] text-ht-gray sm:max-w-[35rem]"
                {...getEntranceProps(reduceMotion, { y: 18, duration: 0.55, delay: 0.16 })}
              >
                Personalized, physician-led care in Gambrills, Maryland—designed around your health, your time,
                and your goals.
              </motion.p>
              <motion.p
                className="mt-5 max-w-[34rem] text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-ht-cyan-700/90 sm:text-[0.79rem]"
                {...getEntranceProps(reduceMotion, { y: 14, duration: 0.45, delay: 0.2 })}
              >
                Primary Care &middot; Medical Weight Loss &middot; Concierge Medicine
              </motion.p>

              <motion.div
                className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                {...getEntranceProps(reduceMotion, { y: 16, duration: 0.5, delay: 0.26 })}
              >
                <Button
                  href={BOOK_APPOINTMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                  className="w-full sm:w-auto sm:px-6"
                >
                  Book Appointment
                  <ArrowRight size={15} />
                </Button>
                <Button
                  to="/services"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto sm:px-6"
                >
                  Explore Our Care
                </Button>
              </motion.div>
            </motion.div>

            <div aria-hidden="true" className="hidden lg:block" />
          </div>
        </div>
      </motion.section>

      <motion.section
        id="our-services"
        className="services-section border-y border-ht-silver bg-gradient-to-b from-white via-ht-soft-blue/20 to-white scroll-mt-28"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.16 })}
      >
        <div className="services-container">
          <div className="services-heading">
            <SectionBadge className="mb-1.5">OUR SERVICES</SectionBadge>
            <h2>Healthcare services designed around your needs</h2>
            <p>
              Whether you're looking for ongoing primary care, physician-guided weight management, or enhanced concierge
              access, our care is designed to fit your lifestyle.
            </p>
          </div>
          <motion.div
            className="services-grid"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08 })}
          >
            {serviceOverviewCards.map((option) => (
              <motion.article
                key={option.title}
                className="service-card group flex h-full flex-col border border-cyan-100 bg-gradient-to-br from-white via-ht-soft-blue/25 to-cyan-50 transition duration-300"
                {...getStaggerItem(reduceMotion, { y: 22 })}
                {...getCardHover(reduceMotion)}
              >
                <div className="service-icon inline-flex items-center justify-center rounded-2xl bg-ht-soft-blue text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100 transition duration-300 group-hover:bg-ht-cyan-700 group-hover:text-white">
                  <option.icon size={21} />
                </div>
                <h3>{option.title}</h3>
                <p className="service-subtitle text-ht-cyan-700">{option.subtitle}</p>
                <ul>
                  {option.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-ht-gray">
                      <span className="mt-1 inline-flex h-[7px] w-[7px] shrink-0 rounded-full bg-ht-cyan-700" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="card-button pt-4">
                  <Button to={option.link} variant="secondary" size="sm" className="whitespace-nowrap text-[14px]">
                    {option.label}
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <HomeProviderShowcase reduceMotion={reduceMotion} />

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
        className="border-y border-ht-silver bg-gradient-to-br from-cyan-50 via-white to-ht-soft-blue py-12 lg:py-16"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.58, amount: 0.16 })}
      >
        <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            className="rounded-[2rem] border border-cyan-100 bg-white p-6 shadow-[0_20px_48px_-34px_rgba(5,42,74,0.45)] md:p-7"
            {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.22, delay: 0.08 })}
          >
            <SectionBadge>Typical Program Milestones</SectionBadge>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
              Structured, physician-guided support for <span className="text-ht-cyan-700">sustainable results</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ht-gray">
              We combine clinical insight, behavior change, and ongoing accountability to help you lose weight safely
              and maintain progress long term.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ht-gray">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-[7px] w-[7px] rounded-full bg-ht-cyan" />
                Personalized strategy based on labs and health history
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-[7px] w-[7px] rounded-full bg-ht-cyan" />
                Regular progress check-ins and plan adjustments
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-[7px] w-[7px] rounded-full bg-ht-cyan" />
                Clear, supportive coaching for realistic lifestyle change
              </li>
            </ul>
          </motion.div>

          <motion.div {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.22 })}>
            <SectionBadge>Medical Weight Loss</SectionBadge>
            <div className="relative mt-6 space-y-4 pl-3 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:bg-cyan-100 before:content-['']">
              {[
                { label: 'Week 1', text: 'Intake, lab review, and personalized roadmap' },
                { label: 'Week 4', text: 'Progress evaluation and treatment adjustment' },
                { label: 'Week 8+', text: 'Momentum phase with sustainable routines' },
              ].map((step, index) => (
                <motion.div
                  key={step.label}
                  className="group relative rounded-2xl border border-ht-silver bg-ht-soft-blue/30 px-4 py-4 text-sm text-ht-gray shadow-[0_14px_30px_-28px_rgba(5,42,74,0.4)]"
                  {...getStaggerItem(reduceMotion, { y: 12 })}
                  {...getCardHover(reduceMotion)}
                >
                  <div className="absolute -left-[0.55rem] top-5 h-3.5 w-3.5 rounded-full border-2 border-white bg-ht-cyan-700 shadow-sm" />
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-8 shrink-0 items-center rounded-full bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100">
                      {step.label}
                    </span>
                    <p className="pt-0.5 leading-relaxed text-ht-navy">{step.text}</p>
                  </div>
                  {index < 2 ? <div className="pointer-events-none absolute -bottom-2 left-6 h-4 w-px bg-cyan-100" /> : null}
                </motion.div>
              ))}
            </div>
            <Button to="/medical-weight-loss" className="mt-6 self-start">
              View Program Details
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <CompareOptionsSection />

      <motion.section
        className={PAGE_SECTION}
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.16 })}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <TestimonialCarousel items={testimonials} reduceMotion={reduceMotion} />
        </div>
      </motion.section>

      <motion.section
        className="overflow-hidden border-y border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue/55 to-cyan-50 py-12 sm:py-14 lg:py-16"
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
                        width="136"
                        height="56"
                        className={`insurance-logo-image h-auto w-auto max-h-9 max-w-[136px] object-contain sm:max-h-10 sm:max-w-[150px] ${plan.sizeClass ?? ''}`}
                        loading="lazy"
                        decoding="async"
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

      <NextStepSection
        eyebrow="TAKE THE NEXT STEP"
        title="Experience a better healthcare relationship"
        description="Whether you’re looking for primary care, medical weight loss, concierge medicine, or insurance-based care, Healtopia offers personalized care designed around your health and long-term wellness."
        secondaryLabel="View Pricing"
        secondaryTo="/pricing"
        benefits={[
          {
            title: 'Personalized care options',
            description: 'Care designed around your individual health needs.',
          },
          {
            title: 'Convenient scheduling',
            description: 'Flexible access to care when you need it.',
          },
          {
            title: 'Support beyond the appointment',
            description: 'Ongoing guidance focused on your long-term health.',
          },
        ]}
      />
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
          <SectionBadge>Testimonials</SectionBadge>
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
          href="https://www.google.com/search?client=opera&hs=ML5&sca_esv=1b1f21a8dcd783c9&sxsrf=APpeQnt4FuHezhR_ECeiRQNQkIEhCcCrkg:1783806679927&kgmid=/g/11yckrs0wl&q=Healtopia+Primary+Care+and+Medical+Weight+Loss,+LLC&shem=dlvs1,epsd1,ltae,rimspwouoe&shndl=30&source=sh/x/loc/uni/m1/1&kgs=9a34d135c7cce0cb&utm_source=dlvs1,epsd1,ltae,rimspwouoe,sh/x/loc/uni/m1/1#"
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

export default Home





