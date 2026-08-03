import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  HeartPulse,
  MessageSquareHeart,
  PhoneCall,
  ShieldCheck,
  Users,
  Activity,
  Laptop,
} from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import FAQAccordion from '../components/FAQAccordion'
import SectionHeader from '../components/SectionHeader'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import {
  PAGE_CARD,
  PAGE_CARD_SOFT,
  PAGE_CONTAINER,
  PAGE_HERO,
  PAGE_ICON_CIRCLE,
  PAGE_IMAGE_FRAME_SOFT,
  PAGE_PANEL_GRADIENT,
  PAGE_SECTION,
  PAGE_SECTION_SOFT,
} from '../lib/pageStyles'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const heroTiles = [
  { label: 'ACCESS', value: 'Direct', icon: PhoneCall },
  { label: 'VISITS', value: 'Extended', icon: Clock3 },
  { label: 'CARE STYLE', value: 'Personalized', icon: HeartPulse },
]

const experienceCards = [
  {
    title: 'Longer visits',
    text: 'More time for thoughtful conversation and care planning.',
    icon: Clock3,
  },
  {
    title: 'Priority access',
    text: 'Convenient scheduling and direct communication when available.',
    icon: PhoneCall,
  },
  {
    title: 'Proactive support',
    text: 'Preventive wellness planning and coordinated follow-up.',
    icon: HeartPulse,
  },
]

const journeySteps = [
  {
    label: '1',
    title: 'Join the Program',
    text: 'Review membership details and care goals.',
    icon: CalendarClock,
  },
  {
    label: '2',
    title: 'Build Your Care Plan',
    text: 'Establish priorities for prevention, wellness, and ongoing health needs.',
    icon: HeartPulse,
  },
  {
    label: '3',
    title: 'Stay Connected',
    text: 'Use direct communication and longer visits when appropriate.',
    icon: MessageSquareHeart,
  },
  {
    label: '4',
    title: 'Coordinate Care',
    text: 'Receive support with follow-up and specialist referrals.',
    icon: ShieldCheck,
  },
  {
    label: '5',
    title: 'Review and Adjust',
    text: 'Update the care plan as health goals and needs evolve.',
    icon: Activity,
  },
]

const includedCards = [
  {
    title: 'DIRECT ACCESS',
    description: 'Direct phone and text access to your physician',
    icon: PhoneCall,
    category: 'Access',
  },
  {
    title: 'PRIORITY SCHEDULING',
    description: 'Same-day or next-day appointments when available',
    icon: CalendarClock,
    category: 'Access',
  },
  {
    title: 'EXTENDED VISITS',
    description: 'Longer, more personalized office visits',
    icon: Clock3,
    category: 'Care Time',
  },
  {
    title: 'PREVENTIVE PLANNING',
    description: 'Personalized wellness planning and health monitoring',
    icon: HeartPulse,
    category: 'Prevention',
  },
  {
    title: 'CHRONIC CARE',
    description: 'Close chronic disease management',
    icon: ShieldCheck,
    category: 'Ongoing',
  },
  {
    title: 'CARE COORDINATION',
    description: 'Coordinated specialist referrals and follow-up',
    icon: Users,
    category: 'Support',
  },
  {
    title: 'LIFESTYLE SUPPORT',
    description: 'Personalized lifestyle and wellness guidance',
    icon: Laptop,
    category: 'Wellness',
  },
]

const whyCards = [
  {
    title: 'More time with your doctor',
    description:
      'Longer visits create more room to listen, understand concerns, and build a thoughtful care plan.',
    icon: MessageSquareHeart,
  },
  {
    title: 'Convenient access',
    description: 'Enhanced communication and scheduling options create a smoother care experience.',
    icon: PhoneCall,
  },
  {
    title: 'Clear membership support',
    description: 'A membership-based model with clear expectations and ongoing attention.',
    icon: ShieldCheck,
  },
  {
    title: 'Personalized wellness planning',
    description: 'Preventive guidance, lifestyle support, and coordinated follow-up centered on long-term goals.',
    icon: HeartPulse,
  },
]

const idealCards = [
  {
    title: 'More time with their physician',
    icon: MessageSquareHeart,
  },
  {
    title: 'Proactive wellness support',
    icon: HeartPulse,
  },
  {
    title: 'Chronic or complex health needs',
    icon: ShieldCheck,
  },
  {
    title: 'Busy professionals',
    icon: Laptop,
  },
  {
    title: 'Closer follow-up',
    icon: CalendarClock,
  },
  {
    title: 'A more connected care relationship',
    icon: Users,
  },
]

const expectSteps = [
  'Membership Review',
  'Health Goals Discussion',
  'Personalized Care Planning',
  'Ongoing Access and Follow-up',
  'Annual Review and Care Plan Updates',
]

const faqItems = [
  {
    id: 'concierge-what-is',
    question: 'What is Concierge Medicine?',
    answer:
      'Concierge Medicine is a membership-based care model designed for patients who want enhanced physician access, longer visits, preventive wellness planning, and coordinated follow-up.',
  },
  {
    id: 'concierge-vs-dpc',
    question: 'How is Concierge Medicine different from Direct Primary Care?',
    answer:
      'Both approaches prioritize a more personal relationship with your care team, but Concierge Medicine is a separate membership program with its own care structure, access model, and pricing.',
  },
  {
    id: 'concierge-insurance',
    question: 'Does Concierge Medicine replace health insurance?',
    answer:
      'No. Concierge Medicine does not replace health insurance. Patients should keep appropriate insurance coverage for specialist care, hospitalizations, emergencies, and services outside the concierge membership.',
  },
  {
    id: 'concierge-include',
    question: 'What does the membership include?',
    answer:
      'Membership details vary, but concierge care may include enhanced access, longer visits, preventive planning, chronic care support, care coordination, and follow-up guidance. Please contact the office to confirm current details.',
  },
  {
    id: 'concierge-access',
    question: 'How do appointments and physician access work?',
    answer:
      'Patients can expect a more connected experience with direct communication options and scheduling support when available. The office can provide the current communication and appointment process.',
  },
  {
    id: 'concierge-chronic',
    question: 'Is Concierge Medicine right for patients with chronic conditions?',
    answer:
      'Concierge Medicine may be a good fit for patients who want closer follow-up, preventive planning, and more coordinated support for chronic or complex needs.',
  },
  {
    id: 'concierge-pricing',
    question: 'How can I learn about pricing?',
    answer:
      'Please contact the office or review the pricing page for the most current membership information and any related care options.',
  },
]

function SectionEyebrow({ children }) {
  return (
    <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
      {children}
    </p>
  )
}

function ConciergeCare() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className={PAGE_HERO}>
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <motion.div {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.03 })}>
            <SectionEyebrow>CONCIERGE MEDICINE</SectionEyebrow>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl lg:text-[clamp(3.1rem,4.4vw,4.7rem)] lg:leading-[1]">
              A more <span className="text-ht-cyan-700">personalized</span> healthcare experience
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg">
              Concierge Medicine is designed for patients who want enhanced physician access, longer visits,
              preventive wellness planning, and coordinated follow-up in a more connected care experience.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap">
                Book Appointment
                <ArrowRight size={16} />
              </Button>
              <Button to="/pricing" variant="secondary" className="whitespace-nowrap">
                View Concierge Pricing
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="self-center"
            {...getEntranceProps(reduceMotion, { y: 20, delay: 0.07, duration: 0.55, fromScale: 0.98 })}
          >
            <div className="group overflow-hidden rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)] transition-shadow duration-300">
              <div className="overflow-hidden rounded-[1.5rem] border border-ht-silver bg-ht-soft-blue/20">
                <motion.img
                  src="/images/clinic/dr-gashaw-adugna-white-coat.png"
                  alt="Dr. Gashaw Adugna in a white coat"
                  className="ht-motion-smooth h-[clamp(18rem,28vw,24rem)] w-full object-cover object-[center_12%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                  initial={reduceMotion ? false : { scale: 0.985, opacity: 0 }}
                  animate={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut', delay: 0.05 }}
                  loading="lazy"
                />
              </div>
            </div>

            <motion.div
              className="mt-4 grid gap-3 sm:grid-cols-3"
              {...getStaggerContainer(reduceMotion, { staggerChildren: 0.06, amount: 0.2 })}
            >
              {heroTiles.map((item) => (
                <motion.div
                  key={item.label}
                  className="group rounded-2xl border border-ht-silver bg-ht-soft-blue/30 px-4 py-3 shadow-[0_14px_32px_-28px_rgba(5,42,74,0.4)] transition-colors duration-300"
                  {...getStaggerItem(reduceMotion, { y: 12 })}
                  {...getCardHover(reduceMotion)}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100 transition-transform duration-300 group-hover:scale-105">
                      <item.icon size={16} />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-gray">{item.label}</p>
                      <p className="mt-1 text-base font-bold text-ht-navy">{item.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={PAGE_SECTION}>
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.03 })}>
              <SectionEyebrow>CONCIERGE EXPERIENCE</SectionEyebrow>
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl lg:text-[2.65rem] lg:leading-tight">
                Premium care with more access and <span className="text-ht-cyan-700">personalized support</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">
                Concierge Medicine is designed for patients who want a more connected, proactive, and personalized
                healthcare experience.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {experienceCards.map((item) => (
                  <motion.article
                    key={item.title}
                    className="group relative flex min-h-[152px] items-center overflow-hidden rounded-[1.75rem] border border-cyan-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(244,250,252,0.94)_100%)] px-6 py-5 shadow-[0_18px_40px_-30px_rgba(5,42,74,0.42)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 md:min-h-[160px] md:col-span-2 xl:col-span-1 sm:px-7"
                    style={{
                      boxShadow: '0 18px 40px -30px rgba(5, 42, 74, 0.42)',
                    }}
                    {...getStaggerItem(reduceMotion, { y: 14 })}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -4,
                            boxShadow: '0 24px 44px -28px rgba(5, 42, 74, 0.5)',
                            borderColor: 'rgba(103, 232, 249, 0.85)',
                          }
                    }
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                    }
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(22,182,212,0.08),transparent_38%)]" />
                    <div className="relative z-10 flex items-center gap-4 sm:gap-5">
                      <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100 transition-colors duration-300 group-hover:bg-cyan-50">
                        <item.icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[1.25rem] font-bold leading-[1.25] text-ht-navy">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-[30rem] text-[1rem] leading-[1.6] text-ht-gray">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            <motion.aside
              className="rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)]"
              {...getEntranceProps(reduceMotion, { y: 24, delay: 0.08, duration: 0.55 })}
            >
              <div className="rounded-[1.5rem] border border-ht-silver bg-ht-soft-blue/15 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-ht-navy-700">Your concierge care journey</p>
                <div className="relative mt-5 space-y-4 pl-3 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:content-[''] before:bg-cyan-100">
                  {journeySteps.map((step, index) => (
                    <motion.article
                      key={step.title}
                      className="group relative rounded-2xl border border-ht-silver bg-white px-4 py-4 shadow-[0_14px_30px_-28px_rgba(5,42,74,0.4)]"
                      {...getStaggerItem(reduceMotion, { y: 12 })}
                      {...getCardHover(reduceMotion)}
                    >
                      <div className="absolute -left-[0.65rem] top-6 h-3 w-3 rounded-full border-2 border-white bg-ht-cyan-700 shadow-sm" />
                      <div className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 transition-transform duration-300 group-hover:scale-105">
                          <step.icon size={16} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ht-gray">{step.label}</p>
                          <p className="mt-1 text-sm leading-relaxed text-ht-navy">{step.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-ht-gray">{step.text}</p>
                        </div>
                      </div>
                      {index < journeySteps.length - 1 ? (
                        <div className="pointer-events-none absolute -bottom-2 left-8 h-4 w-px bg-cyan-100" />
                      ) : null}
                    </motion.article>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION_SOFT}>
        <div className={PAGE_CONTAINER}>
          <SectionHeader
            eyebrow="WHAT'S INCLUDED"
            title={
              <>
                What&apos;s included in <span className="text-ht-cyan-700">Concierge Medicine</span>?
              </>
            }
            description="Concierge Medicine combines enhanced access, longer visits, preventive planning, and coordinated support for patients who want a more personalized healthcare experience."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {includedCards.map((card, index) => (
              <motion.article
                key={card.title}
                className={`${PAGE_CARD} group relative flex h-full flex-col p-6`}
                {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: index * 0.03 })}
                {...getCardHover(reduceMotion)}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ht-cyan-700 via-cyan-300 to-transparent opacity-80" />
                <div className="flex items-start gap-3">
                  <div className={PAGE_ICON_CIRCLE}>
                    <card.icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="inline-flex rounded-full bg-cyan-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
                      {card.category}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ht-navy">{card.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION}>
        <div className={PAGE_CONTAINER}>
          <SectionHeader
            eyebrow="BENEFITS"
            title="Why patients choose Concierge Medicine"
            description="Concierge care is built for patients who want a highly personalized approach with proactive support and convenient access."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {whyCards.map((card, index) => (
              <motion.article
                key={card.title}
                className={`${PAGE_CARD} group flex h-full flex-col p-6`}
                {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: index * 0.04 })}
                {...getCardHover(reduceMotion)}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ht-cyan-700 via-cyan-300 to-transparent opacity-80" />
                <div className={PAGE_ICON_CIRCLE}>
                  <card.icon size={18} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-ht-navy">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ht-gray">{card.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION_SOFT}>
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <motion.div
              className={`${PAGE_CARD} p-6 md:p-7`}
              {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}
            >
              <SectionHeader
                eyebrow="IDEAL FOR"
                title={
                  <>
                    Who Concierge Medicine is <span className="text-ht-cyan-700">ideal for</span>
                  </>
                }
                description="Concierge Medicine may be a good fit for patients who want premium, highly personalized healthcare with convenient access and ongoing physician support."
              />

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ht-gray">
                Concierge Medicine can be a strong fit for patients who value longer visits, closer communication,
                preventive planning, and more coordinated support across their healthcare needs.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {idealCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  className={`${PAGE_CARD_SOFT} group p-5`}
                  {...getEntranceProps(reduceMotion, { y: 16, duration: 0.42, delay: index * 0.03 })}
                  {...getCardHover(reduceMotion)}
                >
                  <div className="flex items-start gap-3">
                    <div className={PAGE_ICON_CIRCLE}>
                      <card.icon size={18} />
                    </div>
                    <p className="text-sm leading-relaxed text-ht-navy transition-transform duration-300 group-hover:-translate-y-0.5">
                      {card.title}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION}>
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}>
              <SectionHeader
                eyebrow="WHAT TO EXPECT"
                title={
                  <>
                    A more connected <span className="text-ht-cyan-700">care experience</span>
                  </>
                }
                description="Concierge Medicine is designed to give patients more time, closer communication, and coordinated support throughout their care journey."
              />

              <div className="mt-6 space-y-3">
                {expectSteps.map((step, index) => (
                  <motion.article
                    key={step}
                    className="group rounded-2xl border border-ht-silver bg-white px-5 py-4 shadow-[0_16px_36px_-30px_rgba(5,42,74,0.45)]"
                    {...getStaggerItem(reduceMotion, { y: 14 })}
                    {...getCardHover(reduceMotion)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100 transition-transform duration-300 group-hover:scale-105">
                        {index + 1}
                      </span>
                      <p className="text-sm font-semibold text-ht-navy">{step}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            <motion.div
              className={`${PAGE_PANEL_GRADIENT} p-3`}
              {...getEntranceProps(reduceMotion, { y: 24, delay: 0.08, duration: 0.55 })}
            >
              <div className={PAGE_IMAGE_FRAME_SOFT}>
                <motion.img
                  src="/images/clinic/patient-care.png"
                  alt="Patient care at Healtopia"
                  className="ht-motion-smooth h-[clamp(18rem,28vw,24rem)] w-full object-cover object-center"
                  loading="lazy"
                  initial={reduceMotion ? false : { scale: 0.99, opacity: 0 }}
                  animate={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut', delay: 0.05 }}
                />
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {[
                  'Longer, more personalized visits',
                  'Enhanced communication and access',
                  'Preventive planning and coordinated follow-up',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-ht-silver bg-white px-4 py-3 shadow-[0_14px_32px_-28px_rgba(5,42,74,0.4)]"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100">
                      <CheckCircle2 size={16} />
                    </span>
                    <span className="text-sm font-medium leading-relaxed text-ht-navy">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION_SOFT}>
        <div className={PAGE_CONTAINER}>
          <SectionHeader
            eyebrow="FAQ"
            title="Concierge Medicine FAQs"
            description="Common questions about concierge care, access, and membership details."
          />
          <div className="mt-8">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <AppointmentCTA
            title="Ready for more personalized access?"
            description="Explore enhanced physician access, longer visits, and coordinated care."
            secondaryLabel="View Concierge Pricing"
            secondaryTo="/pricing"
            benefits={[
              {
                title: 'Priority scheduling',
                description: 'Support for timely visits when available.',
              },
              {
                title: 'Extended visits',
                description: 'More time for conversation, planning, and follow-up.',
              },
              {
                title: 'Personalized wellness planning',
                description: 'Preventive care and coordination tailored to your goals.',
              },
            ]}
          />
        </div>
      </section>

    </div>
  )
}

export default ConciergeCare
