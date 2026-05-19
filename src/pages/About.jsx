import { motion } from 'framer-motion'
import { Award, HandHeart, Target } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

const values = [
  {
    title: 'Compassion',
    description: 'We meet each patient with empathy, respect, and active listening in every encounter.',
    icon: HandHeart,
  },
  {
    title: 'Clinical Excellence',
    description: 'Our care plans are grounded in evidence-based medicine and clear, practical communication.',
    icon: Award,
  },
  {
    title: 'Long-Term Partnership',
    description: 'We focus on sustained outcomes by helping patients build health habits that fit real life.',
    icon: Target,
  },
]

function About() {
  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.p
            className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About Healtopia
          </motion.p>
          <motion.h1
            className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            Patient-centered care built on trust, access, and lasting wellness
          </motion.h1>
          <motion.p
            className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Healtopia was founded to make high-quality primary care and metabolic wellness more personal, more
            responsive, and easier to access.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Our Mission"
          title="Empower healthier lives through personalized care"
          description="We combine modern clinical tools with human-centered relationships so each patient feels seen, supported, and confident in their care journey."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <motion.article
              key={value.title}
              className="rounded-2xl border border-ht-silver bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
            >
              <value.icon size={20} className="text-ht-cyan-700" />
              <h3 className="mt-4 text-xl font-bold text-ht-navy">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ht-gray">{value.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-y border-ht-silver bg-white py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            className="rounded-2xl border border-ht-silver bg-ht-soft-blue/40 p-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
          >
            <h3 className="text-2xl font-bold text-ht-navy">Our Approach</h3>
            <p className="mt-4 text-sm leading-relaxed text-ht-gray md:text-base">
              Every plan begins with listening. We focus on your full story, then build care strategies that are
              evidence-based, realistic, and designed for sustainable progress.
            </p>
          </motion.div>
          <motion.div
            className="rounded-2xl border border-ht-silver bg-white p-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.06 }}
          >
            <h3 className="text-2xl font-bold text-ht-navy">Our Promise</h3>
            <p className="mt-4 text-sm leading-relaxed text-ht-gray md:text-base">
              You will always receive clear communication, collaborative decision-making, and care that honors both
              your clinical needs and your day-to-day life.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
