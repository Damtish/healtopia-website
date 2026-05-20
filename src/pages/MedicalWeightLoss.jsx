import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import AppointmentCTA from '../components/AppointmentCTA'
import FAQAccordion from '../components/FAQAccordion'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import faqs from '../data/faqs'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const pillars = [
  'Medical intake and metabolic review',
  'Lab-informed personalized treatment strategy',
  'Monthly check-ins and progress tracking',
  'Nutrition and lifestyle coaching',
  'Medication management when clinically appropriate',
]

function MedicalWeightLoss() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <motion.p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700" {...getEntranceProps(reduceMotion, { y: 16, duration: 0.45, delay: 0.03 })}>
              Medical Weight Loss
            </motion.p>
            <motion.h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl" {...getEntranceProps(reduceMotion, { y: 20, delay: 0.1 })}>
              Evidence-based weight management with clinical support
            </motion.h1>
            <motion.p className="mt-5 text-base leading-relaxed text-ht-gray md:text-lg" {...getEntranceProps(reduceMotion, { y: 20, delay: 0.2 })}>
              Build momentum with a plan that combines medical oversight, realistic lifestyle strategy, and regular
              follow-up.
            </motion.p>
            <motion.div className="mt-8 flex flex-wrap gap-3" {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: 0.3 })}>
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
                Book a Consultation
              </Button>
              <Button to="/pricing" variant="secondary">
                View Program Pricing
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="rounded-3xl border border-ht-silver bg-white p-7 shadow-sm"
            {...getEntranceProps(reduceMotion, { y: 24, delay: 0.2, duration: 0.5 })}
            {...getCardHover(reduceMotion)}
          >
            <h3 className="text-xl font-bold text-ht-navy">Program Pillars</h3>
            <motion.ul className="mt-5 space-y-3" {...getStaggerContainer(reduceMotion, { staggerChildren: 0.07, amount: 0.1 })}>
              {pillars.map((item) => (
                <motion.li key={item} className="flex items-start gap-2 text-sm text-ht-gray" {...getStaggerItem(reduceMotion, { y: 12 })}>
                  <CheckCircle2 size={16} className="mt-0.5 text-ht-cyan" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="How It Works"
          title="A step-by-step plan tailored to your body and goals"
          description="We focus on safe, sustainable progress with data-driven decisions and structured accountability."
        />
        <motion.div className="mt-10 grid gap-4 md:grid-cols-3" {...getStaggerContainer(reduceMotion, { staggerChildren: 0.09 })}>
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
              {...getStaggerItem(reduceMotion, { y: 24 })}
              {...getCardHover(reduceMotion)}
            >
              <h3 className="text-xl font-bold text-ht-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ht-gray">{item.text}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div className="mt-12" {...getRevealProps(reduceMotion, { y: 20, amount: 0.2 })}>
          <SectionHeader
            eyebrow="Common Questions"
            title="Medical weight loss FAQs"
            description="Answers to common questions about program structure, scheduling, and care planning."
          />
          <div className="mt-6">
            <FAQAccordion items={faqs.slice(0, 4)} />
          </div>
        </motion.div>

        <motion.div className="mt-10" {...getRevealProps(reduceMotion, { y: 18, amount: 0.2 })}>
          <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
            Schedule Your First Visit
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <AppointmentCTA />
      </section>
    </div>
  )
}

export default MedicalWeightLoss
