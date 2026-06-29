import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Stethoscope, Users } from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import SectionHeader from '../components/SectionHeader'
import { getCardHover, getEntranceProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const pillars = [
  {
    title: 'Insurance-friendly visits',
    description: 'A straightforward primary care experience that works within accepted coverage paths when applicable.',
    icon: ShieldCheck,
  },
  {
    title: 'Continuity of care',
    description: 'Ongoing follow-up supports prevention, chronic care, and clear next steps after each appointment.',
    icon: Stethoscope,
  },
  {
    title: 'Practical support for families',
    description: 'A calm, coordinated approach helps patients and families understand care options more clearly.',
    icon: Users,
  },
]

function InsuranceBasedPrimaryCare() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.p
            className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700"
            {...getEntranceProps(reduceMotion, { y: 16, duration: 0.45, delay: 0.03 })}
          >
            Insurance-based Primary Care
          </motion.p>
          <motion.h1
            className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl"
            {...getEntranceProps(reduceMotion, { y: 20, delay: 0.1 })}
          >
            Primary care that stays organized, accessible, and easy to navigate
          </motion.h1>
          <motion.p
            className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg"
            {...getEntranceProps(reduceMotion, { y: 20, delay: 0.2 })}
          >
            This page serves as a polished placeholder for our insurance-based primary care offering while keeping the
            site structure consistent and clear.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: 0.3 })}
          >
            <Button to="/insurance">
              View Accepted Insurance Plans
              <ArrowRight size={16} />
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
          title="A straightforward option for insured primary care"
          description="The framework here is intentionally simple for now, with the same clean Healtopia presentation."
        />
        <motion.div
          className="mt-10 grid gap-5 md:grid-cols-3"
          {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08 })}
        >
          {pillars.map((pillar) => (
            <motion.article
              key={pillar.title}
              className="rounded-2xl border border-ht-silver bg-white p-6"
              {...getStaggerItem(reduceMotion, { y: 24 })}
              {...getCardHover(reduceMotion)}
            >
              <pillar.icon size={20} className="text-ht-cyan-700" />
              <h3 className="mt-4 text-xl font-bold text-ht-navy">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ht-gray">{pillar.description}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 rounded-2xl border border-ht-silver bg-ht-soft-blue/30 p-6 md:p-8"
          {...getEntranceProps(reduceMotion, { y: 18, delay: 0.08 })}
        >
          <h3 className="text-2xl font-bold text-ht-navy">Need to verify plan coverage?</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ht-gray md:text-base">
            You can review the accepted insurance page for the current plan list and contact the office directly with
            any coverage questions.
          </p>
          <div className="mt-6">
            <Button to="/insurance" variant="secondary">
              View accepted insurance plans
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <AppointmentCTA />
      </section>
    </div>
  )
}

export default InsuranceBasedPrimaryCare
