import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import AppointmentCTA from '../components/AppointmentCTA'
import services, { serviceIconMap } from '../data/services'

function Services() {
  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.p
            className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Services
          </motion.p>
          <motion.h1
            className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            Comprehensive care designed for your full health journey
          </motion.h1>
          <motion.p
            className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Explore our core services for preventive care, chronic condition support, telehealth, and medically guided
            weight management.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Service Lines"
          title="Clinical care that is accessible and coordinated"
          description="Each service is delivered with thoughtful follow-up, transparent communication, and continuity across your care plan."
        />
        <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={serviceIconMap[service.icon]}
              path={service.path}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-ht-silver bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What To Expect"
            title="A clear, supportive process from first visit to follow-up"
            description="Your care experience is designed to be easy to navigate and focused on practical outcomes."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              'Step 1: Comprehensive intake and health review',
              'Step 2: Personalized treatment plan and education',
              'Step 3: Ongoing follow-up with measurable milestones',
            ].map((step) => (
              <motion.div
                key={step}
                className="rounded-xl border border-ht-silver bg-ht-soft-blue/30 px-4 py-4 text-sm font-medium text-ht-navy"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35 }}
              >
                {step}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <AppointmentCTA />
      </section>
    </div>
  )
}

export default Services
