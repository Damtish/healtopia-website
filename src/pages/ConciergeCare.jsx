import { motion } from 'framer-motion'
import { Clock3, MessageSquareHeart, ShieldCheck, UserRoundCheck } from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import SectionHeader from '../components/SectionHeader'

const benefits = [
  {
    title: 'Priority Access',
    description: 'Same-day and next-day availability for urgent questions and timely clinical support.',
    icon: Clock3,
  },
  {
    title: 'Longer Visits',
    description: 'More time during each appointment for deeper care planning and proactive prevention.',
    icon: UserRoundCheck,
  },
  {
    title: 'Direct Communication',
    description: 'Secure direct messaging and coordinated follow-up for a smoother care experience.',
    icon: MessageSquareHeart,
  },
  {
    title: 'Proactive Health Strategy',
    description: 'Regular wellness reviews to detect risk early and protect long-term outcomes.',
    icon: ShieldCheck,
  },
]

function ConciergeCare() {
  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.p
            className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Concierge Care
          </motion.p>
          <motion.h1
            className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            Elevated healthcare access for patients who want deeper continuity and convenience
          </motion.h1>
          <motion.p
            className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Our concierge model gives you more time, faster access, and a proactive partnership focused on your
            long-term wellness.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Membership Benefits"
          title="Care that moves at your pace"
          description="Concierge care is designed for patients who value convenience, responsive communication, and high-touch clinical guidance."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {benefits.map((benefit) => (
            <motion.article
              key={benefit.title}
              className="rounded-2xl border border-ht-silver bg-white p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
            >
              <benefit.icon size={20} className="text-ht-cyan-700" />
              <h3 className="mt-4 text-xl font-bold text-ht-navy">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ht-gray">{benefit.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-ht-silver bg-ht-soft-blue/30 p-6 md:p-8">
          <h3 className="text-2xl font-bold text-ht-navy">Is concierge care right for you?</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ht-gray md:text-base">
            This model is ideal for individuals and families who prefer a highly personalized healthcare experience,
            easier access to their clinician, and proactive planning rather than reactive treatment.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/pricing">View Membership Pricing</Button>
            <Button to="/contact" variant="secondary">
              Talk With Our Team
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <AppointmentCTA />
      </section>
    </div>
  )
}

export default ConciergeCare
