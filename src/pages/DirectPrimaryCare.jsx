import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  HeartPulse,
  MessageSquareHeart,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import Button from '../components/Button'
import FAQAccordion from '../components/FAQAccordion'
import ProgramHighlightSection from '../components/ProgramHighlightSection'
import SectionHeader from '../components/SectionHeader'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const includedBenefits = [
  'Priority appointments usually within 24–48 hours',
  'Extended, unrushed appointment visits',
  'Annual wellness exams and preventive care',
  'Chronic disease management',
  'Sick visits and acute care',
  'Telehealth or in-person appointments',
  'Direct communication with your doctor',
  'Care coordination and specialist referrals',
  'Free annual physical labs and discounted additional labs and medications',
]

const benefits = [
  {
    title: 'More time with your doctor',
    description:
      'We take the time to listen, understand your concerns, and create personalized treatment plans tailored to your needs.',
    icon: MessageSquareHeart,
  },
  {
    title: 'Convenient access to care',
    description:
      'Skip long waits and complicated scheduling. Get care when you need it with direct communication and flexible appointments.',
    icon: Clock3,
  },
  {
    title: 'Transparent pricing',
    description: 'One predictable monthly fee covers most primary care needs with no hidden costs.',
    icon: ShieldCheck,
  },
  {
    title: 'Personalized, preventive healthcare',
    description: 'Our focus is on prevention, wellness, and long-term health, not just treating symptoms.',
    icon: HeartPulse,
  },
]

const whoBenefits = [
  'Individuals without insurance',
  'Patients with high-deductible health plans',
  'Families seeking affordable healthcare',
  'Small business owners',
  'Self-employed professionals',
  'Patients who want a stronger relationship with their doctor',
]

const dpcHighlightItems = [
  {
    label: 'Start',
    text: 'Free initial consultation and membership review',
  },
  {
    label: 'Ongoing',
    text: 'Preventive care, sick visits, and chronic care support',
  },
  {
    label: 'Long term',
    text: 'A stronger relationship with your care team',
  },
]

const faqs = [
  {
    id: 'direct-primary-care-insurance',
    question: 'Do you accept insurance?',
    answer:
      'We do not bill insurance for membership primary care services under Direct Primary Care. However, many patients use DPC alongside a high-deductible insurance plan for specialist visits, hospitalizations, or emergencies.',
  },
  {
    id: 'direct-primary-care-hsa-fsa',
    question: 'Can I use my HSA or FSA?',
    answer:
      'In many cases, patients may use HSA or FSA funds for qualified medical expenses. Please check with your plan administrator for eligibility details.',
  },
  {
    id: 'direct-primary-care-vs-concierge',
    question: 'Is Direct Primary Care the same as Concierge Medicine?',
    answer:
      'No. Direct Primary Care focuses on affordable, accessible primary care with transparent monthly pricing and no insurance billing. Concierge Medicine is a separate membership option designed for patients seeking a premium healthcare experience.',
  },
]

function DirectPrimaryCare() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700">
              DIRECT PRIMARY CARE
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl">
              Healthcare designed <span className="text-ht-cyan-700">around you</span>
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg">
              At Healtopia, we believe healthcare should be simple, personal, and accessible. Our Direct Primary Care
              membership model gives patients direct access to their physician for a simple monthly fee, without the
              stress of copays, surprise bills, or rushed appointments.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg">
              We focus on building real relationships with our patients so they can receive the time, attention, and
              personalized care they deserve.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap">
                Book Appointment
              </Button>
              <Button to="/pricing" variant="secondary" className="whitespace-nowrap">
                View Pricing
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)]">
            <div className="overflow-hidden rounded-[1.5rem] border border-ht-silver bg-ht-soft-blue/20">
              <img
                src="/images/clinic/exam-room-wide.jpg"
                alt="Healtopia exam room"
                className="h-64 w-full object-cover object-center sm:h-72 lg:h-full"
              />
            </div>
            <div className="grid gap-3 pt-4 sm:grid-cols-3">
              {[
                { label: 'Monthly membership', value: 'Simple' },
                { label: 'Visits', value: 'Unrushed' },
                { label: 'Access', value: 'Direct' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-ht-silver bg-ht-soft-blue/30 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-ht-gray">{item.label}</p>
                  <p className="mt-1 text-base font-bold text-ht-navy">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProgramHighlightSection
        eyebrow="DIRECT PRIMARY CARE"
        title={
          <>
            Simpler primary care with more time and <span className="text-ht-cyan-700">direct access</span>
          </>
        }
        description="Direct Primary Care is a membership-based model designed to make routine primary care more personal, accessible, and transparent."
        bullets={[
          'Predictable monthly membership pricing',
          'Longer visits focused on your full health story',
          'Direct communication and easier follow-up',
        ]}
        buttonLabel="View DPC Pricing"
        buttonTo="/pricing"
        rightTitle="What patients can expect"
        rightItems={dpcHighlightItems}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Membership"
          title={
            <>
              What’s included in your <span className="text-ht-cyan-700">membership</span>
            </>
          }
          description="Your Direct Primary Care membership includes a wide range of primary care services, including:"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {includedBenefits.map((item, index) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-ht-silver bg-white p-5 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
            >
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ht-cyan-700" />
              <p className="text-sm leading-relaxed text-ht-navy">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-ht-silver bg-white py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <SectionHeader
              eyebrow="Getting Started"
              title="Free initial consultation"
              description="We offer a free initial consultation to help patients learn more about our practice and determine if Direct Primary Care is the right fit."
            />
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ht-gray">
              This no-obligation visit gives patients the opportunity to meet the physician, discuss healthcare goals,
              and ask questions about membership and services.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50 p-3 shadow-[0_22px_52px_-34px_rgba(5,42,74,0.45)]">
            <div className="overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white">
              <img
                src="/images/clinic/reception.jpg"
                alt="Healtopia clinic reception area"
                className="h-64 w-full object-cover object-center sm:h-72"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Benefits"
          title={
            <>
              Why patients choose <span className="text-ht-cyan-700">Direct Primary Care</span>
            </>
          }
          description="A Direct Primary Care membership can create a calmer, more personal primary care experience."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit) => (
            <motion.article
              key={benefit.title}
              className="rounded-2xl border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
              {...getEntranceProps(reduceMotion, { y: 22 })}
              {...getCardHover(reduceMotion)}
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700">
                <benefit.icon size={18} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-ht-navy">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ht-gray">{benefit.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-y border-ht-silver bg-ht-soft-blue/25 py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Who Benefits"
            title="Who benefits from Direct Primary Care?"
            description="Direct Primary Care may be a great fit for:"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
            <motion.div
              className="rounded-2xl border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
              {...getEntranceProps(reduceMotion, { y: 22 })}
              {...getCardHover(reduceMotion)}
            >
              <UserRound size={20} className="text-ht-cyan-700" />
              <p className="mt-4 text-sm leading-relaxed text-ht-gray">
                Direct Primary Care may be a great fit for patients who want a more personal relationship with their
                doctor and a simpler way to access primary care.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {whoBenefits.map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-ht-silver bg-white p-5 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
                  {...getEntranceProps(reduceMotion, { y: 18, delay: index * 0.04 })}
                  {...getCardHover(reduceMotion)}
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                  <span className="text-sm leading-relaxed text-ht-navy">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <motion.div
          className="rounded-[2rem] border border-cyan-100 bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50 p-8 shadow-[0_22px_52px_-34px_rgba(5,42,74,0.45)] md:p-10"
          {...getRevealProps(reduceMotion, { y: 24, amount: 0.18 })}
        >
          <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700">
            Take the next step
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
            Experience a better healthcare relationship
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg">
            Whether you need ongoing primary care, preventive services, or support managing chronic conditions, our
            Direct Primary Care model provides a more connected and patient-focused approach to healthcare.
          </p>
          <div className="mt-7">
            <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap">
              Book Appointment
              <ArrowRight size={16} />
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <SectionHeader
          eyebrow="FAQ"
          title="Direct Primary Care FAQs"
          description="Common questions about membership care, coverage, and how DPC compares with concierge care."
        />
        <div className="mt-8">
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <motion.div
          className="rounded-[2rem] border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] md:p-8"
          {...getRevealProps(reduceMotion, { y: 22, amount: 0.2 })}
        >
          <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700">
            Related Care
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button to="/pricing" variant="secondary" className="whitespace-nowrap">
              View Pricing
            </Button>
            <Button to="/insurance-based-primary-care" variant="secondary" className="whitespace-nowrap">
              Insurance-Based Care
            </Button>
            <Button to="/concierge-care" variant="secondary" className="whitespace-nowrap">
              Concierge Medicine
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default DirectPrimaryCare
