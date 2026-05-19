import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import AppointmentCTA from '../components/AppointmentCTA'
import { BOOK_APPOINTMENT_URL } from '../constants/links'

const pillars = [
  'Medical intake and metabolic review',
  'Lab-informed personalized treatment strategy',
  'Monthly check-ins and progress tracking',
  'Nutrition and lifestyle coaching',
  'Medication management when clinically appropriate',
]

function MedicalWeightLoss() {
  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <motion.p
              className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Medical Weight Loss
            </motion.p>
            <motion.h1
              className="mt-4 text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              Evidence-based weight management with clinical support
            </motion.h1>
            <motion.p
              className="mt-5 text-base leading-relaxed text-ht-gray md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Build momentum with a plan that combines medical oversight, realistic lifestyle strategy, and regular
              follow-up.
            </motion.p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
                Book a Consultation
              </Button>
              <Button to="/pricing" variant="secondary">
                View Program Pricing
              </Button>
            </div>
          </div>

          <motion.div
            className="rounded-3xl border border-ht-silver bg-white p-7 shadow-sm"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-ht-navy">Program Pillars</h3>
            <ul className="mt-5 space-y-3">
              {pillars.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ht-gray">
                  <CheckCircle2 size={16} className="mt-0.5 text-ht-cyan" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="How It Works"
          title="A step-by-step plan tailored to your body and goals"
          description="We focus on safe, sustainable progress with data-driven decisions and structured accountability."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Clinical Assessment',
              text: 'We evaluate your health history, metabolic markers, lifestyle, and previous attempts to build your starting strategy.',
            },
            {
              title: 'Personalized Intervention',
              text: 'Your care plan may include nutrition targets, movement goals, behavioral support, and medication when appropriate.',
            },
            {
              title: 'Progress Optimization',
              text: 'Regular follow-ups help us monitor outcomes, address barriers, and fine-tune your plan for long-term success.',
            },
          ].map((item) => (
            <motion.article
              key={item.title}
              className="rounded-2xl border border-ht-silver bg-white p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-bold text-ht-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ht-gray">{item.text}</p>
            </motion.article>
          ))}
        </div>
        <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" className="mt-10">
          Schedule Your First Visit
          <ArrowRight size={16} />
        </Button>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <AppointmentCTA />
      </section>
    </div>
  )
}

export default MedicalWeightLoss
