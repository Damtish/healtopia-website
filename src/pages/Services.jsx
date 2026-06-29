import { motion, useReducedMotion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import AppointmentCTA from '../components/AppointmentCTA'
import services, { serviceIconMap } from '../data/services'
import { getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

function Services() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700" {...getEntranceProps(reduceMotion, { y: 16, duration: 0.45, delay: 0.03 })}>
            Services
          </motion.p>
          <motion.h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl" {...getEntranceProps(reduceMotion, { y: 20, delay: 0.1 })}>
            Comprehensive care designed for your full health <span className="text-ht-cyan-700">journey</span>
          </motion.h1>
          <motion.p className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg" {...getEntranceProps(reduceMotion, { y: 20, delay: 0.2 })}>
            Explore our core services for preventive care, chronic condition support, telehealth, and medically guided
            weight management.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Service Lines"
          title={
            <>
              Clinical care that is accessible and <span className="text-ht-cyan-700">coordinated</span>
            </>
          }
          description="Each service is delivered with thoughtful follow-up, transparent communication, and continuity across your care plan."
        />
        <motion.div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3" {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08 })}>
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={serviceIconMap[service.icon]}
              path={service.path}
              delay={index * 0.07}
            />
          ))}
        </motion.div>

        <motion.div
          className="mx-auto mt-12 grid max-w-6xl items-center gap-7 overflow-hidden rounded-3xl border border-ht-silver bg-white p-4 shadow-[0_24px_54px_-32px_rgba(5,42,74,0.35)] md:p-5 lg:grid-cols-2"
          {...getRevealProps(reduceMotion, { y: 24, duration: 0.45, amount: 0.25 })}
        >
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/images/clinic/exam-room-wide.jpg"
              alt="Healtopia exam room"
              className="h-56 w-full object-cover object-center sm:h-64 lg:h-72"
              loading="lazy"
            />
          </div>
          <div className="px-2 pb-2 pt-1 md:px-3">
            <h3 className="text-2xl font-bold tracking-tight text-ht-navy">Primary care in a calm clinical setting</h3>
            <p className="mt-3 text-sm leading-relaxed text-ht-gray md:text-base">
              Our exam spaces are designed for comfort, privacy, and focused care so every visit feels clear,
              professional, and supportive.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-ht-silver bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What To Expect"
            title={
              <>
                A clear, supportive process from first visit to <span className="text-ht-cyan-700">follow-up</span>
              </>
            }
            description="Your care experience is designed to be easy to navigate and focused on practical outcomes."
          />
          <motion.div className="mt-10 grid gap-4 md:grid-cols-3" {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08, amount: 0.3 })}>
            {[
              'Step 1: Comprehensive intake and health review',
              'Step 2: Personalized treatment plan and education',
              'Step 3: Ongoing follow-up with measurable milestones',
            ].map((step) => (
              <motion.div
                key={step}
                className="rounded-xl border border-ht-silver bg-ht-soft-blue/30 px-4 py-4 text-sm font-medium text-ht-navy"
                {...getStaggerItem(reduceMotion, { y: 18 })}
              >
                {step}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <AppointmentCTA />
      </section>
    </div>
  )
}

export default Services
