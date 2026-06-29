import { motion, useReducedMotion } from 'framer-motion'
import { Activity, CheckCircle2, HeartPulse, ShieldCheck, Thermometer } from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import SectionHeader from '../components/SectionHeader'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const introCards = [
  {
    title: 'Preventive care and wellness visits',
    icon: HeartPulse,
    text: 'Routine care that helps support long-term health and catch concerns early.',
  },
  {
    title: 'Chronic disease management',
    icon: ShieldCheck,
    text: 'Ongoing support for common long-term conditions with personalized follow-up.',
  },
  {
    title: 'Acute care for common illnesses and non-emergency concerns',
    icon: Thermometer,
    text: 'Prompt visits for everyday medical concerns that do not require emergency care.',
  },
  {
    title: 'Care coordination and follow-up support',
    icon: Activity,
    text: 'Clear next steps, referrals, and follow-up planning to keep your care organized.',
  },
]

const preventiveItems = [
  'Annual physical exams and wellness visits',
  'Preventive screening services',
  "Men's health services",
  'Vaccines and immunizations',
  'Smoking cessation support',
]

const chronicItems = [
  'Hypertension',
  'Diabetes mellitus',
  'Thyroid disorders',
  'High cholesterol',
  'Arthritis and joint pain',
  'Asthma and allergies',
]

const acuteItems = [
  'Cold, flu, and upper respiratory infections',
  'Sinus infections and bronchitis',
  'Urinary tract infections',
  'Sexually transmitted infections',
  'Minor injuries, cuts, and sprains',
  'Gastrointestinal illnesses including nausea, vomiting, and diarrhea',
]

const followUpItems = [
  'Reviewing the hospital stay and treatment plan',
  'Medication reconciliation and adjustments',
  'Monitoring recovery progress',
  'Coordinating additional care or specialist referrals if needed',
]

function InsuranceBasedPrimaryCare() {
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
              INSURANCE-BASED PRIMARY CARE
            </motion.p>
            <motion.h1
              className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl"
              {...getEntranceProps(reduceMotion, { y: 20, delay: 0.1 })}
            >
              Primary care using your accepted insurance plan
            </motion.h1>
            <motion.p
              className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg"
              {...getEntranceProps(reduceMotion, { y: 20, delay: 0.2 })}
            >
              Healtopia accepts most major insurance plans for traditional primary care services. Our insurance-based
              care includes a broad range of services designed to support ongoing health needs, preventive wellness,
              chronic condition management, and non-emergency medical concerns.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: 0.3 })}
            >
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap">
                Book Appointment
              </Button>
              <Button to="/insurance" variant="secondary" className="whitespace-nowrap">
                View Accepted Insurance
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
                { label: 'Coverage', value: 'Most major plans' },
                { label: 'Visit type', value: 'Primary care' },
                { label: 'Care focus', value: 'Routine and ongoing' },
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
          title="What insurance-based primary care includes"
          description="Our insurance-based primary care services are designed to support patients through routine checkups, preventive care, ongoing condition management, and follow-up support."
        />
        <motion.div
          className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08 })}
        >
          {introCards.map((card) => (
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
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="border-y border-ht-silver bg-white py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <motion.div {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}>
            <SectionHeader
              eyebrow="Preventive Care"
              title="Preventive Care & Wellness"
              description="Preventive healthcare plays an important role in maintaining long-term wellness and identifying health concerns early."
            />
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ht-gray">
              Our preventive care services help patients stay proactive about their health through regular checkups,
              screenings, vaccinations, and personalized wellness guidance.
            </p>
            <ul className="mt-6 space-y-3">
              {preventiveItems.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-ht-silver bg-ht-soft-blue/20 px-4 py-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                  <span className="text-sm leading-relaxed text-ht-navy">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-[2rem] border border-ht-silver bg-ht-soft-blue/25 p-3 shadow-[0_22px_52px_-34px_rgba(5,42,74,0.45)]"
            {...getEntranceProps(reduceMotion, { y: 24, delay: 0.08, duration: 0.55 })}
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white">
              <img
                src="/images/clinic/reception.jpg"
                alt="Healtopia clinic reception area"
                className="h-64 w-full object-cover object-center sm:h-72"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <motion.div
            className="rounded-[2rem] border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] md:p-8"
            {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}
          >
            <SectionHeader
              eyebrow="Chronic Care"
              title="Chronic Disease Management"
              description="Managing chronic health conditions requires ongoing care, monitoring, and personalized treatment."
            />
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ht-gray">
              Our healthcare team works closely with patients to support long-term health, reduce complications, and
              improve quality of life.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {chronicItems.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-ht-silver bg-ht-soft-blue/20 px-4 py-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                  <span className="text-sm leading-relaxed text-ht-navy">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="rounded-[2rem] border border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50 p-3 shadow-[0_22px_52px_-34px_rgba(5,42,74,0.45)]"
            {...getEntranceProps(reduceMotion, { y: 24, delay: 0.1, duration: 0.55 })}
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white">
              <img
                src="/images/clinic/exam-room-wide.jpg"
                alt="Healtopia exam room"
                className="h-full min-h-[360px] w-full object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-ht-silver bg-ht-soft-blue/20 py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              className="rounded-[2rem] border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] md:p-8"
              {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}
            >
              <SectionHeader
                eyebrow="Acute Care"
                title="Acute Care Visits"
                description="We provide acute care visits for non-emergency medical concerns that require prompt attention through in-person and telehealth appointments."
              />
              <ul className="mt-6 space-y-3">
                {acuteItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-ht-silver bg-white px-4 py-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                    <span className="text-sm leading-relaxed text-ht-navy">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="rounded-[2rem] border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] md:p-8"
              {...getRevealProps(reduceMotion, { y: 24, amount: 0.2, delay: 0.05 })}
            >
              <SectionHeader
                eyebrow="Recovery"
                title="Post-hospital Follow-up Care"
                description="We also provide post-hospital follow-up care to help patients recover safely and continue their treatment plan after hospitalization."
              />
              <div className="mt-6 grid gap-3">
                {followUpItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-ht-silver bg-ht-soft-blue/20 px-4 py-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                    <span className="text-sm leading-relaxed text-ht-navy">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <AppointmentCTA
          eyebrow="Next step"
          title="Schedule an insurance-based primary care visit"
          description="Use our secure booking page to choose an appointment type and a convenient time."
          buttonLabel="Book Appointment"
        />
      </section>
    </div>
  )
}

export default InsuranceBasedPrimaryCare
