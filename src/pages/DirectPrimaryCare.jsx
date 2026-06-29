import { motion, useReducedMotion } from 'framer-motion'
import { Clock3, MessageSquareHeart, ShieldCheck } from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import SectionHeader from '../components/SectionHeader'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getCardHover, getEntranceProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const benefits = [
  {
    title: 'Direct access to your clinician',
    description: 'Streamlined communication and easier scheduling help keep care responsive and practical.',
    icon: MessageSquareHeart,
  },
  {
    title: 'Preventive and ongoing support',
    description: 'Routine check-ins, chronic care coordination, and preventive planning stay central to the visit.',
    icon: ShieldCheck,
  },
  {
    title: 'Clear, membership-style structure',
    description: 'Transparent care delivery helps make expectations easier to understand from the start.',
    icon: Clock3,
  },
]

function DirectPrimaryCare() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.p
            className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700"
            {...getEntranceProps(reduceMotion, { y: 16, duration: 0.45, delay: 0.03 })}
          >
            Direct Primary Care
          </motion.p>
          <motion.h1
            className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl"
            {...getEntranceProps(reduceMotion, { y: 20, delay: 0.1 })}
          >
            Personalized primary care with simpler access and more time for the conversation
          </motion.h1>
          <motion.p
            className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg"
            {...getEntranceProps(reduceMotion, { y: 20, delay: 0.2 })}
          >
            This page is a clean starting point for our direct primary care offering, with a focus on continuity,
            responsiveness, and practical follow-up.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: 0.3 })}
          >
            <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
              Book a Visit
            </Button>
            <Button to="/contact" variant="secondary">
              Contact Our Team
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Care Highlights"
          title="Built for accessible, ongoing primary care"
          description="A direct model can reduce friction and keep the focus on thoughtful clinical support."
        />
        <motion.div
          className="mt-10 grid gap-5 md:grid-cols-3"
          {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08 })}
        >
          {benefits.map((benefit) => (
            <motion.article
              key={benefit.title}
              className="rounded-2xl border border-ht-silver bg-white p-6"
              {...getStaggerItem(reduceMotion, { y: 24 })}
              {...getCardHover(reduceMotion)}
            >
              <benefit.icon size={20} className="text-ht-cyan-700" />
              <h3 className="mt-4 text-xl font-bold text-ht-navy">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ht-gray">{benefit.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <AppointmentCTA />
      </section>
    </div>
  )
}

export default DirectPrimaryCare
