import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BriefcaseMedical,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  HeartPulse,
  Laptop,
  MessageSquareHeart,
  ShieldCheck,
  UserRound,
  Users,
  Wallet,
} from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import FAQAccordion from '../components/FAQAccordion'
import SectionHeader from '../components/SectionHeader'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import {
  PAGE_SECTION,
  PAGE_SECTION_CTA,
  PAGE_SECTION_SOFT,
} from '../lib/pageStyles'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const heroTiles = [
  { label: 'Monthly membership', value: 'Simple', icon: CircleDollarSign },
  { label: 'Visits', value: 'Unrushed', icon: Clock3 },
  { label: 'Access', value: 'Direct', icon: MessageSquareHeart },
]

const includedBenefits = [
  {
    title: 'Priority appointments usually within 24-48 hours',
    icon: CalendarClock,
    category: 'Access',
    tone: 'from-cyan-50 to-white',
  },
  {
    title: 'Extended, unrushed appointment visits',
    icon: MessageSquareHeart,
    category: 'Access',
    tone: 'from-white to-cyan-50',
  },
  {
    title: 'Annual wellness exams and preventive care',
    icon: HeartPulse,
    category: 'Preventive Care',
    tone: 'from-cyan-50 to-white',
  },
  {
    title: 'Chronic disease management',
    icon: ShieldCheck,
    category: 'Ongoing Care',
    tone: 'from-white to-cyan-50',
  },
  {
    title: 'Sick visits and acute care',
    icon: UserRound,
    category: 'Ongoing Care',
    tone: 'from-cyan-50 to-white',
  },
  {
    title: 'Telehealth or in-person appointments',
    icon: Users,
    category: 'Access',
    tone: 'from-white to-cyan-50',
  },
  {
    title: 'Direct communication with your doctor',
    icon: MessageSquareHeart,
    category: 'Access',
    tone: 'from-cyan-50 to-white',
  },
  {
    title: 'Care coordination and specialist referrals',
    icon: ShieldCheck,
    category: 'Ongoing Care',
    tone: 'from-white to-cyan-50',
  },
  {
    title: 'Free annual physical labs and discounted additional labs and medications',
    icon: Wallet,
    category: 'Preventive Care',
    tone: 'from-cyan-50 to-white',
  },
]

const dpcJourney = [
  {
    label: 'Start',
    text: 'Free initial consultation and membership review',
    icon: CalendarClock,
  },
  {
    label: 'Ongoing',
    text: 'Preventive care, sick visits, and chronic care support',
    icon: HeartPulse,
  },
  {
    label: 'Long term',
    text: 'A stronger relationship with your care team',
    icon: Users,
  },
]

const benefits = [
  {
    title: 'More time with your doctor',
    description:
      'We take the time to listen, understand your concerns, and create personalized treatment plans tailored to your needs.',
    icon: MessageSquareHeart,
  },
  {
    title: 'Convenient access to care',
    description:
      'Skip long waits and complicated scheduling. Get care when you need it with direct communication and flexible appointments.',
    icon: Clock3,
  },
  {
    title: 'Transparent pricing',
    description: 'One predictable monthly fee covers most primary care needs with no hidden costs.',
    icon: ShieldCheck,
  },
  {
    title: 'Personalized, preventive healthcare',
    description: 'Our focus is on prevention, wellness, and long-term health, not just treating symptoms.',
    icon: HeartPulse,
  },
]

const whoBenefits = [
  {
    title: 'Individuals without insurance',
    icon: UserRound,
  },
  {
    title: 'Patients with high-deductible health plans',
    icon: ShieldCheck,
  },
  {
    title: 'Families seeking affordable healthcare',
    icon: HeartPulse,
  },
  {
    title: 'Small business owners',
    icon: BriefcaseMedical,
  },
  {
    title: 'Self-employed professionals',
    icon: Laptop,
  },
  {
    title: 'Patients who want a stronger relationship with their doctor',
    icon: MessageSquareHeart,
  },
]

const faqs = [
  {
    id: 'direct-primary-care-insurance',
    question: 'Do you accept insurance?',
    answer:
      'We do not bill insurance for membership primary care services under Direct Primary Care. However, many patients use DPC alongside a high-deductible insurance plan for specialist visits, hospitalizations, or emergencies.',
  },
  {
    id: 'direct-primary-care-hsa-fsa',
    question: 'Can I use my HSA or FSA?',
    answer:
      'In many cases, patients may use HSA or FSA funds for qualified medical expenses. Please check with your plan administrator for eligibility details.',
  },
  {
    id: 'direct-primary-care-vs-concierge',
    question: 'Is Direct Primary Care the same as Concierge Medicine?',
    answer:
      'No. Direct Primary Care focuses on affordable, accessible primary care with transparent monthly pricing and no insurance billing. Concierge Medicine is a separate membership option designed for patients seeking a premium healthcare experience.',
  },
]

function SectionEyebrow({ children }) {
  return (
    <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
      {children}
    </p>
  )
}

function DirectPrimaryCare() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue/70 to-cyan-50">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <motion.div {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.03 })}>
            <SectionEyebrow>DIRECT PRIMARY CARE</SectionEyebrow>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl lg:text-[clamp(3.1rem,4.4vw,4.7rem)] lg:leading-[1]">
              Healthcare designed <span className="text-ht-cyan-700">around you</span>
            </h1>
            <p className="ht-body ht-text-width-hero mt-5 text-ht-gray">
              At Healtopia, we believe healthcare should be simple, personal, and accessible. Our Direct Primary Care
              membership model gives patients direct access to their physician for a simple monthly fee, without the
              stress of copays, surprise bills, or rushed appointments.
            </p>
            <p className="ht-body ht-text-width-hero mt-4 text-ht-gray">
              We focus on building real relationships with our patients so they can receive the time, attention, and
              personalized care they deserve.
            </p>
            <div className="mt-8 flex flex-col gap-3 md:flex-row md:flex-wrap">
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" className="w-full whitespace-nowrap md:w-auto">
                Book Appointment
                <ArrowRight size={16} />
              </Button>
              <Button to="/pricing" variant="secondary" className="w-full whitespace-nowrap md:w-auto">
                View Pricing
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
                  src="/images/clinic/patient-care.png"
                  alt="Patient care at Healtopia"
                  className="h-[clamp(18rem,28vw,24rem)] w-full object-cover object-center md:h-[clamp(21rem,30vw,28rem)] lg:h-[clamp(18rem,28vw,24rem)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                  initial={reduceMotion ? false : { scale: 0.985, opacity: 0 }}
                  animate={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut', delay: 0.05 }}
                />
              </div>
            </div>

            <motion.div className="mt-4 grid gap-3 sm:grid-cols-3 min-[1280px]:grid-cols-1" {...getStaggerContainer(reduceMotion, { staggerChildren: 0.06, amount: 0.2 })}>
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

      <motion.section
        className="border-b border-ht-silver bg-gradient-to-b from-white via-ht-soft-blue/25 to-white py-16 lg:py-20"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.18 })}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
            <motion.div className="self-start" {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.03 })}>
              <SectionEyebrow>SIMPLER PRIMARY CARE</SectionEyebrow>
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
                Simpler primary care with more time and <span className="text-ht-cyan-700">direct access</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">
                Direct Primary Care is a membership-based model designed to make routine primary care more personal,
                accessible, and transparent.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  {
                    title: 'Predictable monthly membership pricing',
                    text: 'Know what to expect with a simple monthly membership model.',
                    icon: CircleDollarSign,
                  },
                  {
                    title: 'Longer visits focused on your full health story',
                    text: 'Appointments are designed to slow things down and give care room to breathe.',
                    icon: MessageSquareHeart,
                  },
                  {
                    title: 'Direct communication and easier follow-up',
                    text: 'Stay connected with your care team between visits when needed.',
                    icon: Users,
                  },
                ].map((item) => (
                  <motion.article
                    key={item.title}
                    className="group rounded-2xl border border-ht-silver bg-white px-5 py-4 shadow-[0_16px_36px_-30px_rgba(5,42,74,0.45)]"
                    {...getStaggerItem(reduceMotion, { y: 14 })}
                    {...getCardHover(reduceMotion)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100 transition-transform duration-300 group-hover:scale-105">
                        <item.icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-ht-navy transition-transform duration-300 group-hover:-translate-y-0.5">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ht-gray">{item.text}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="mt-6 flex justify-start">
                <Button to="/pricing" className="self-start whitespace-nowrap">
                  View DPC Pricing
                </Button>
              </div>
            </motion.div>

            <motion.aside
              className="self-start rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)]"
              {...getEntranceProps(reduceMotion, { y: 20, delay: 0.08, duration: 0.55 })}
            >
              <div className="rounded-[1.5rem] border border-ht-silver bg-ht-soft-blue/15 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-ht-navy-700">What patients can expect</p>
                <div className="relative mt-5 space-y-4 pl-3 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:content-[''] before:bg-cyan-100">
                  {dpcJourney.map((step, index) => (
                    <motion.article
                      key={step.label}
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
                          <p className="mt-1 text-sm leading-relaxed text-ht-navy">{step.text}</p>
                        </div>
                      </div>
                      {index < dpcJourney.length - 1 ? (
                        <div className="pointer-events-none absolute -bottom-2 left-8 h-4 w-px bg-cyan-100" />
                      ) : null}
                    </motion.article>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </motion.section>

      <section className={PAGE_SECTION_SOFT}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Membership"
            title={
              <>
                What&apos;s included in your <span className="text-ht-cyan-700">membership</span>
              </>
            }
            description="Your Direct Primary Care membership includes a wide range of primary care services, including:"
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {includedBenefits.map((item, index) => (
              <motion.article
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl border border-ht-silver bg-gradient-to-br ${item.tone} p-5 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]`}
                {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: index * 0.03 })}
                {...getCardHover(reduceMotion)}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ht-cyan-700 via-cyan-300 to-transparent opacity-80" />
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100 transition-transform duration-300 group-hover:scale-105">
                    <item.icon size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="inline-flex rounded-full bg-cyan-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
                      {item.category}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ht-navy">{item.title}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION}>
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <motion.div {...getEntranceProps(reduceMotion, { y: 18, duration: 0.48 })}>
            <SectionHeader
              eyebrow="Getting Started"
              title="Free initial consultation"
              description="We offer a free initial consultation to help patients learn more about our practice and determine if Direct Primary Care is the right fit."
            />
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ht-gray">
              This no-obligation visit gives patients the opportunity to meet the physician, discuss healthcare goals,
              and ask questions about membership and services.
            </p>

            <ul className="mt-6 space-y-3">
              {['Meet the physician', 'Review your healthcare goals', 'Ask questions about membership'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm leading-relaxed text-ht-navy">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700">
                    <CheckCircle2 size={16} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap">
                Schedule a Free Consultation
                <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="group overflow-hidden rounded-[2rem] border border-cyan-100 bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50 p-3 shadow-[0_22px_52px_-34px_rgba(5,42,74,0.45)]"
            {...getEntranceProps(reduceMotion, { y: 20, delay: 0.07, duration: 0.55, fromScale: 0.985 })}
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-ht-silver bg-white">
              <img
                src="/images/clinic/examination-room.png"
                alt="Healtopia examination room"
                className="h-[clamp(17rem,24vw,22rem)] w-full object-cover object-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className={PAGE_SECTION_SOFT}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Benefits"
            title={
              <>
                Why patients choose <span className="text-ht-cyan-700">Direct Primary Care</span>
              </>
            }
            description="A Direct Primary Care membership can create a calmer, more personal primary care experience."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.article
                key={benefit.title}
                className="group relative overflow-hidden rounded-2xl border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
                {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: index * 0.04 })}
                {...getCardHover(reduceMotion)}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ht-cyan-700 via-cyan-300 to-transparent opacity-80" />
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100 transition-transform duration-300 group-hover:scale-105">
                  <benefit.icon size={18} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-ht-navy transition-transform duration-300 group-hover:-translate-y-0.5">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ht-gray">{benefit.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ht-silver bg-gradient-to-b from-white via-ht-soft-blue/25 to-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Who Benefits"
            title="Who benefits from Direct Primary Care?"
            description="Direct Primary Care may be a great fit for:"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
            <motion.div
              className="rounded-[2rem] border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
              {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45 })}
              {...getCardHover(reduceMotion)}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100">
                <UserRound size={20} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ht-gray">
                Direct Primary Care may be a great fit for patients who want a more personal relationship with their
                doctor and a simpler way to access primary care.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {whoBenefits.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="group rounded-2xl border border-ht-silver bg-white p-5 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
                  {...getEntranceProps(reduceMotion, { y: 16, duration: 0.42, delay: index * 0.03 })}
                  {...getCardHover(reduceMotion)}
                >
                  <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-ht-cyan-700 via-cyan-300 to-transparent opacity-80" />
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100 transition-transform duration-300 group-hover:scale-105">
                      <item.icon size={18} />
                    </span>
                    <p className="text-sm leading-relaxed text-ht-navy transition-transform duration-300 group-hover:-translate-y-0.5">
                      {item.title}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ht-silver bg-gradient-to-br from-ht-navy via-[#0b2d4a] to-ht-navy py-16 text-white lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:px-8">
          <motion.div {...getEntranceProps(reduceMotion, { y: 18, duration: 0.48 })}>
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Take the next step
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Experience a better healthcare relationship
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
              Whether you need ongoing primary care, preventive services, or support managing chronic conditions, our
              Direct Primary Care model provides a more connected and patient-focused approach to healthcare.
            </p>
            <div className="mt-8 flex flex-col gap-3 md:flex-row md:flex-wrap">
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" className="w-full whitespace-nowrap md:w-auto">
                Book Appointment
                <ArrowRight size={16} />
              </Button>
              <Button
                to="/pricing"
                variant="secondary"
                className="w-full whitespace-nowrap border-white/15 bg-white/95 text-ht-navy hover:border-cyan-300 hover:bg-white md:w-auto"
              >
                View Pricing
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="self-center rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-[0_24px_52px_-36px_rgba(5,42,74,0.5)] backdrop-blur-sm"
            {...getEntranceProps(reduceMotion, { y: 20, duration: 0.48, delay: 0.04 })}
          >
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {['Transparent monthly pricing', 'Longer, unrushed visits', 'Support beyond the appointment'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.12] text-white">
                    <CheckCircle2 size={16} />
                  </span>
                  <span className="text-sm font-medium text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className={PAGE_SECTION}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Direct Primary Care FAQs"
            description="Common questions about membership care, coverage, and how DPC compares with concierge care."
          />
          <div className="mt-8">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION_CTA}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <AppointmentCTA
            title="Experience a better healthcare relationship"
            description="Get more time, direct access, and transparent membership-based primary care."
            secondaryLabel="View Pricing"
            secondaryTo="/pricing"
            benefits={[
              {
                title: 'Transparent monthly pricing',
                description: 'Clear membership costs that are easy to understand.',
              },
              {
                title: 'Longer, unrushed visits',
                description: 'Appointments with more time for conversation and planning.',
              },
              {
                title: 'Support beyond the appointment',
                description: 'Direct communication and follow-up when you need it.',
              },
            ]}
          />
        </div>
      </section>
    </div>
  )
}

export default DirectPrimaryCare
