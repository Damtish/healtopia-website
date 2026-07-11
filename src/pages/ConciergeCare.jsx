import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Clock3, HeartPulse, MessageSquareHeart, ShieldCheck } from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import ProgramHighlightSection from '../components/ProgramHighlightSection'
import SectionHeader from '../components/SectionHeader'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const includedItems = [
  'Direct phone and text access to your physician',
  'Same-day or next-day appointments',
  'Extended, personalized office visits',
  'Personalized preventive wellness planning and health monitoring',
  'Close chronic disease management',
  'Coordinated specialist referrals and follow-up care',
  'Personalized lifestyle and wellness guidance',
]

const benefits = [
  {
    title: 'More time with your doctor',
    description: 'We take the time to listen, understand your concerns, and create personalized treatment plans tailored to your needs.',
    icon: Clock3,
  },
  {
    title: 'Convenient access to care',
    description: 'Concierge care is designed to give you enhanced physician access and a smoother experience when you need support.',
    icon: MessageSquareHeart,
  },
  {
    title: 'Transparent, membership-based support',
    description: 'This model is built for patients who want a premium healthcare relationship with clear expectations and ongoing attention.',
    icon: ShieldCheck,
  },
  {
    title: 'Personalized wellness planning',
    description: 'Your care can include proactive prevention, lifestyle guidance, and coordinated follow-up that stays centered on your goals.',
    icon: HeartPulse,
  },
]

const idealCards = [
  {
    title: 'More time with your physician',
    description: 'Longer visits allow more room for conversation, questions, and personalized care planning.',
    icon: Clock3,
  },
  {
    title: 'Proactive wellness support',
    description:
      'Preventive planning and ongoing monitoring help patients stay focused on long-term health goals.',
    icon: HeartPulse,
  },
  {
    title: 'Ongoing health management',
    description:
      'Closer follow-up and care coordination can support patients managing chronic or complex health needs.',
    icon: ShieldCheck,
  },
  {
    title: 'Convenient access',
    description:
      'Designed for patients who want a more connected relationship with their physician and care team.',
    icon: MessageSquareHeart,
  },
]

const conciergeHighlightItems = [
  {
    label: 'Access',
    text: 'Direct communication and priority scheduling when available',
  },
  {
    label: 'Planning',
    text: 'Personalized wellness and prevention support',
  },
  {
    label: 'Follow-up',
    text: 'Coordinated care and ongoing health guidance',
  },
]

function ConciergeCare() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div>
            <motion.p
              className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700"
              {...getEntranceProps(reduceMotion, { y: 16, duration: 0.45, delay: 0.03 })}
            >
              CONCIERGE MEDICINE
            </motion.p>
            <motion.h1
              className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl"
              {...getEntranceProps(reduceMotion, { y: 20, delay: 0.1 })}
            >
              A more <span className="text-ht-cyan-700">personalized</span> healthcare experience
            </motion.h1>
            <motion.p
              className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg"
              {...getEntranceProps(reduceMotion, { y: 20, delay: 0.2 })}
            >
              Our concierge medicine program is designed for patients who want a more personalized healthcare
              experience with enhanced physician access, longer appointments, and comprehensive wellness support.
              This membership-based healthcare model offers direct access to your physician, priority scheduling,
              extended visits, preventive wellness planning, and coordinated care.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: 0.3 })}
            >
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap">
                Book Appointment
              </Button>
              <Button to="/pricing" variant="secondary" className="whitespace-nowrap">
                View Pricing
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="overflow-hidden rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)]"
            {...getEntranceProps(reduceMotion, { y: 24, delay: 0.12, duration: 0.55 })}
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-ht-silver bg-ht-soft-blue/20">
              <img
                src="/images/clinic/exam-room-wide.jpg"
                alt="Healtopia exam room"
                className="h-64 w-full object-cover object-center sm:h-72 lg:h-full"
              />
            </div>
            <div className="grid gap-3 pt-4 sm:grid-cols-3">
              {[
                { label: 'Access', value: 'Direct' },
                { label: 'Visits', value: 'Extended' },
                { label: 'Care style', value: 'Personalized' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-ht-silver bg-ht-soft-blue/30 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-ht-gray">{item.label}</p>
                  <p className="mt-1 text-base font-bold text-ht-navy">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ProgramHighlightSection
        eyebrow="CONCIERGE MEDICINE"
        title={
          <>
            Premium care with more access and <span className="text-ht-cyan-700">personalized support</span>
          </>
        }
        description="Concierge Medicine is designed for patients who want a more connected, proactive, and personalized healthcare experience."
        bullets={[
          'Longer, more personalized visits',
          'Priority scheduling when available',
          'Preventive wellness planning and care coordination',
        ]}
        buttonLabel="View Concierge Pricing"
        buttonTo="/pricing"
        rightTitle="Concierge care experience"
        rightItems={conciergeHighlightItems}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Included"
          title={
            <>
              What’s included in <span className="text-ht-cyan-700">Concierge Medicine</span>?
            </>
          }
          description="Concierge care combines enhanced access, longer visits, and coordinated support for patients who want a more personalized healthcare experience."
        />

        <motion.div
          className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08 })}
        >
          {includedItems.map((item) => (
            <motion.article
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-ht-silver bg-white p-5 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
              {...getStaggerItem(reduceMotion, { y: 22 })}
              {...getCardHover(reduceMotion)}
            >
              <CheckItemIcon />
              <p className="text-sm leading-relaxed text-ht-navy">{item}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="border-y border-ht-silver bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Benefits"
            title="Why patients choose concierge medicine"
            description="Concierge care is built for patients who want a highly personalized approach with proactive support and convenient access."
          />

          <motion.div
            className="mt-10 grid gap-5 md:grid-cols-2"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08 })}
          >
            {benefits.map((benefit) => (
              <motion.article
                key={benefit.title}
                className="rounded-2xl border border-ht-silver bg-ht-soft-blue/20 p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
                {...getStaggerItem(reduceMotion, { y: 22 })}
                {...getCardHover(reduceMotion)}
              >
                <benefit.icon size={20} className="text-ht-cyan-700" />
                <h3 className="mt-4 text-xl font-bold text-ht-navy">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ht-gray">{benefit.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            className="rounded-[2rem] border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] md:p-8"
            {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}
          >
          <SectionHeader
            eyebrow="Ideal For"
            title={
              <>
                Who Concierge Medicine is <span className="text-ht-cyan-700">ideal for</span>
              </>
            }
            description="Concierge Medicine may be a good fit for patients looking for premium, highly personalized healthcare with convenient access and ongoing physician support."
          />
            <motion.div
              className="mt-8 grid gap-4 md:grid-cols-2"
              {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08, amount: 0.2 })}
            >
              {idealCards.map((card) => (
                <motion.article
                  key={card.title}
                  className="rounded-2xl border border-ht-silver bg-ht-soft-blue/20 p-5 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
                  {...getStaggerItem(reduceMotion, { y: 18 })}
                  {...getCardHover(reduceMotion)}
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ht-cyan-700 shadow-sm">
                    <card.icon size={18} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ht-navy">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ht-gray">{card.description}</p>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-[2rem] border border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50 p-3 shadow-[0_22px_52px_-34px_rgba(5,42,74,0.45)]"
            {...getEntranceProps(reduceMotion, { y: 24, delay: 0.1, duration: 0.55 })}
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white">
              <img
                src="/images/clinic/reception.jpg"
                alt="Healtopia clinic reception area"
                className="h-[240px] w-full object-cover object-center sm:h-[280px] lg:h-[360px]"
                loading="lazy"
              />
            </div>
            <p className="mt-3 px-1 text-sm leading-relaxed text-ht-gray">
              A concierge model can support patients who value more consistent access, longer visits, and a highly
              personalized care experience.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <AppointmentCTA />
      </section>
    </div>
  )
}

function CheckItemIcon() {
  return <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ht-cyan-700" />
}

export default ConciergeCare
