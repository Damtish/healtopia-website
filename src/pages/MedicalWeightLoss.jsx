import { motion, useReducedMotion } from 'framer-motion'
import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Dna,
  HeartPulse,
  Stethoscope,
  Syringe,
} from 'lucide-react'
import Button from '../components/Button'
import FAQAccordion from '../components/FAQAccordion'
import AppointmentCTA from '../components/AppointmentCTA'
import SectionHeader from '../components/SectionHeader'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const serviceCards = [
  {
    title: 'Weight Loss Evaluations',
    icon: ClipboardList,
    text: 'Comprehensive assessments designed to identify contributing health conditions and create personalized treatment plans.',
    items: [
      'Detailed medical history reviews',
      'Metabolic testing and indirect calorimetry',
      'Medical-grade body composition analysis',
      'Evaluation of obesity-related health conditions',
      'Personalized health and wellness assessments',
    ],
  },
  {
    title: 'Nutrition & Lifestyle Counseling',
    icon: HeartPulse,
    text: 'Personalized nutrition counseling, exercise guidance, and healthy habit coaching to help patients improve overall wellness while supporting safe, sustainable weight loss.',
  },
  {
    title: 'Prescription Weight Loss Medications',
    icon: Syringe,
    text: 'For some patients, prescription weight loss medications may be an appropriate part of a medically supervised weight loss plan. Medication management is combined with lifestyle guidance, ongoing monitoring, and physician support.',
  },
  {
    title: 'Bariatric Surgery & Specialty Care Referrals',
    icon: Stethoscope,
    text: 'When appropriate, we provide referrals for bariatric surgery evaluations, endocrinology consultations, and additional specialty care services.',
  },
  {
    title: 'Integrated Care for Obesity-Related Conditions',
    icon: Dna,
    text: 'Integrated care for obesity-related conditions including diabetes, hypertension, high cholesterol, heart disease, and metabolic conditions.',
  },
  {
    title: 'Weight Loss Monitoring & Maintenance',
    icon: BarChart3,
    text: 'Continuous monitoring and support help track weight loss progress, adjust the plan as needed, and support long-term maintenance.',
  },
]

const whyHealtopiaItems = [
  'Affordable healthcare option with Direct Primary Care',
  'Personalized care with attention to detail',
  'Same-week appointments when available',
  'After-hours appointments when available',
  'Most insurance accepted',
  'Preventive care focus',
  'Chronic disease management',
  'Medical weight loss services',
  'Concierge medicine services',
]

const faqs = [
  {
    id: 'what-is-medical-weight-loss',
    question: 'What is medical weight loss?',
    answer:
      'Medical weight loss is a physician-guided approach to weight management that looks at your medical history, metabolism, lifestyle, and overall health. At Healtopia, the program is designed to support safe, sustainable, and long-term results through evaluation, personalized planning, follow-up care, and ongoing support.',
  },
  {
    id: 'do-you-prescribe-medications',
    question: 'Do you prescribe weight loss medications?',
    answer:
      'For some patients, prescription weight loss medications may be appropriate as part of a medically supervised plan. Medication decisions are made after a medical evaluation and are combined with lifestyle guidance, monitoring, and physician support.',
  },
  {
    id: 'personalized-plan',
    question: 'Will I receive a personalized plan?',
    answer:
      'Yes. Each patient receives a plan based on their health history, goals, body composition, metabolic factors, and any weight-related conditions. The plan may include nutrition guidance, lifestyle counseling, medication support when appropriate, and follow-up monitoring.',
  },
  {
    id: 'follow-up-frequency',
    question: 'How often will I have appointments?',
    answer:
      'Follow-up frequency depends on your individual plan and progress. Some patients may need more frequent visits at the beginning of the program, while others may transition to less frequent maintenance visits over time.',
  },
  {
    id: 'how-is-it-different',
    question: 'How is this program different from other weight loss options?',
    answer:
      'Healtopia’s program is medically supervised and focuses on the underlying factors that can affect weight, metabolism, and overall health. The program combines medical evaluation, lifestyle support, treatment options when appropriate, and ongoing monitoring rather than using a one-size-fits-all approach.',
  },
  {
    id: 'first-appointment',
    question: 'What can I expect during my first appointment?',
    answer:
      'Your first appointment may include a detailed medical history review, discussion of your weight and wellness goals, evaluation of obesity-related health conditions, body composition assessment, metabolic testing when appropriate, and a personalized care plan.',
  },
  {
    id: 'support-between-visits',
    question: 'Is support available between visits?',
    answer:
      'Support may be available between visits depending on your care plan and membership or visit type. The care team will explain communication options and follow-up expectations during your appointment.',
  },
  {
    id: 'how-much-weight',
    question: 'How much weight can I expect to lose?',
    answer:
      'Weight loss varies from person to person and depends on factors such as medical history, metabolism, lifestyle, treatment plan, consistency, and follow-up. Healtopia does not guarantee a specific amount of weight loss, but the program is designed to support safe, sustainable progress.',
  },
  {
    id: 'insurance-coverage',
    question: 'Is the program covered by insurance?',
    answer:
      'Coverage can vary by insurance plan and by service. Some visits, labs, medications, or tests may be covered, while others may not be. Patients should contact the office and their insurance plan to confirm coverage and out-of-pocket costs.',
  },
]

function MedicalWeightLoss() {
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
              MEDICAL WEIGHT LOSS
            </motion.p>
            <motion.h1
              className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl"
              {...getEntranceProps(reduceMotion, { y: 20, delay: 0.1 })}
            >
              Medically supervised weight loss for <span className="text-ht-cyan-700">safe, sustainable results</span>
            </motion.h1>
            <motion.p
              className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg"
              {...getEntranceProps(reduceMotion, { y: 20, delay: 0.2 })}
            >
              Healtopia provides medically supervised weight loss programs designed to help patients achieve safe,
              sustainable, and long-term results.
            </motion.p>
            <motion.p
              className="mt-4 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg"
              {...getEntranceProps(reduceMotion, { y: 20, delay: 0.26 })}
            >
              Our program is led by an obesity board-certified physician and focuses on identifying the underlying
              factors affecting weight, metabolism, and overall health.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: 0.32 })}
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
                { label: 'Focus', value: 'Safe progress' },
                { label: 'Support', value: 'Physician-led' },
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

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Overview"
          title={
            <>
              Comprehensive <span className="text-ht-cyan-700">weight loss</span> care
            </>
          }
          description="Our program combines medical evaluation, lifestyle support, treatment options, and ongoing monitoring to help patients build a realistic path toward long-term health."
        />

        <motion.div
          className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08 })}
        >
          {serviceCards.map((card) => (
            <motion.article
              key={card.title}
              className="rounded-2xl border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
              {...getStaggerItem(reduceMotion, { y: 22 })}
              {...getCardHover(reduceMotion)}
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700">
                <card.icon size={18} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-ht-navy">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ht-gray">{card.text}</p>
              {card.items ? (
                <ul className="mt-4 space-y-2">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ht-navy">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="border-y border-ht-silver bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Healtopia"
            title="Why choose Healtopia?"
            description="A care model that brings together prevention, chronic disease support, medical weight loss, and broader primary care services."
          />

          <motion.div
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.07 })}
          >
            {whyHealtopiaItems.map((item) => (
              <motion.div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-ht-silver bg-ht-soft-blue/20 px-4 py-4 shadow-[0_16px_34px_-30px_rgba(5,42,74,0.45)]"
                {...getStaggerItem(reduceMotion, { y: 18 })}
                {...getCardHover(reduceMotion)}
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                <span className="text-sm leading-relaxed text-ht-navy">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            className="rounded-[2rem] border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] md:p-8"
            {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}
          >
            <SectionHeader
              eyebrow="Connected Care"
              title="Weight care connected to your overall health"
              description="Weight loss is not only about a number on the scale. Healtopia's approach considers metabolism, medical history, lifestyle, chronic conditions, and long-term wellness goals."
            />
            <p className="mt-4 text-base leading-relaxed text-ht-gray">
              Our team uses a whole-person approach so your plan can stay aligned with your broader health needs and
              personal goals.
            </p>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-[2rem] border border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50 p-3 shadow-[0_22px_52px_-34px_rgba(5,42,74,0.45)]"
            {...getEntranceProps(reduceMotion, { y: 24, delay: 0.1, duration: 0.55 })}
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white">
              <img
                src="/images/clinic/reception.jpg"
                alt="Healtopia clinic reception area"
                className="h-[260px] w-full object-cover object-center sm:h-[320px] lg:h-full"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-ht-silver bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title={
              <>
                Medical Weight Loss <span className="text-ht-cyan-700">FAQs</span>
              </>
            }
            description="Common questions about Healtopia’s physician-guided weight loss program."
          />
          <div className="mt-8">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <AppointmentCTA
          eyebrow="Next step"
          title="Ready to begin your weight loss journey?"
          description="Use our secure booking page to choose an appointment type and a convenient time."
          buttonLabel="Book Appointment"
        />
      </section>
    </div>
  )
}

export default MedicalWeightLoss
