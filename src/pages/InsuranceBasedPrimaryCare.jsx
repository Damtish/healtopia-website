import { motion, useReducedMotion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  BriefcaseMedical,
  CalendarClock,
  CheckCircle2,
  Clock3,
  HeartPulse,
  Laptop,
  ShieldCheck,
  Thermometer,
  UserRound,
  Users,
  SearchCheck,
} from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import FAQAccordion from '../components/FAQAccordion'
import SectionHeader from '../components/SectionHeader'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import insuranceLogos from '../data/insurance'
import {
  PAGE_CARD,
  PAGE_CARD_SOFT,
  PAGE_CONTAINER,
  PAGE_HERO,
  PAGE_ICON_CIRCLE,
  PAGE_IMAGE_FRAME_SOFT,
  PAGE_PANEL_GRADIENT,
  PAGE_SECTION,
  PAGE_SECTION_SOFT,
} from '../lib/pageStyles'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const acceptedInsurancePlanNames = [
  'Humana',
  'Medicare',
  'Care Improvement Plus',
  'APWU',
  'Sierra Health and Life',
  'GEHA',
]

const acceptedInsurancePlanSizing = {
  Humana: 'max-h-[2.15rem] max-w-[7.8rem] sm:max-h-[2.25rem] sm:max-w-[8.2rem]',
  Medicare: 'max-h-[2.35rem] max-w-[8.3rem] sm:max-h-[2.5rem] sm:max-w-[8.8rem]',
  'Care Improvement Plus': 'max-h-[2.1rem] max-w-[8.4rem] sm:max-h-[2.2rem] sm:max-w-[8.8rem]',
  APWU: 'max-h-[1.95rem] max-w-[7.3rem] sm:max-h-[2.05rem] sm:max-w-[7.8rem]',
  'Sierra Health and Life': 'max-h-[2.2rem] max-w-[8.5rem] sm:max-h-[2.3rem] sm:max-w-[9rem]',
  GEHA: 'max-h-[2.3rem] max-w-[7.6rem] sm:max-h-[2.45rem] sm:max-w-[8rem]',
}

const heroTiles = [
  { label: 'ACCEPTED PLANS', value: 'Most major plans', icon: ShieldCheck },
  { label: 'PREVENTIVE CARE', value: 'Ongoing wellness', icon: HeartPulse },
  { label: 'SUPPORT', value: 'Follow-up care', icon: Users },
]

const howItWorksCards = [
  {
    title: 'ROUTINE CARE',
    text: 'Preventive exams, screenings, and wellness visits.',
    icon: HeartPulse,
  },
  {
    title: 'ONGOING CARE',
    text: 'Chronic condition management and follow-up.',
    icon: ShieldCheck,
  },
  {
    title: 'WHEN NEEDED',
    text: 'Non-emergency sick visits and care coordination.',
    icon: Thermometer,
  },
]

const journeySteps = [
  {
    label: '1',
    title: 'Schedule Your Visit',
    text: 'Choose an appointment time that works for you.',
    icon: CalendarClock,
  },
  {
    label: '2',
    title: 'Meet With Your Provider',
    text: 'Talk through your concerns, goals, and symptoms.',
    icon: Users,
  },
  {
    label: '3',
    title: 'Receive Evaluation and Treatment',
    text: 'Get an exam, plan, and recommended next steps.',
    icon: HeartPulse,
  },
  {
    label: '4',
    title: 'Specialist Referral if Needed',
    text: 'When appropriate, your provider can help coordinate the next step.',
    icon: ShieldCheck,
  },
  {
    label: '5',
    title: 'Follow-up and Ongoing Care',
    text: 'Continue care with clear guidance and organized follow-up.',
    icon: Clock3,
  },
]

const includedBenefits = [
  {
    title: 'Preventive Care',
    description: 'Preventive exams and wellness visits',
    icon: HeartPulse,
    category: 'Prevention',
  },
  {
    title: 'Chronic Care',
    description: 'Ongoing condition management',
    icon: ShieldCheck,
    category: 'Ongoing',
  },
  {
    title: 'Acute Care',
    description: 'Treatment for common non-emergency concerns',
    icon: Thermometer,
    category: 'Prompt Visits',
  },
  {
    title: 'Care Coordination',
    description: 'Referrals and organized follow-up',
    icon: Activity,
    category: 'Support',
  },
  {
    title: 'Screenings',
    description: 'Preventive screenings and early detection',
    icon: SearchCheck,
    category: 'Detection',
  },
  {
    title: 'Continuity',
    description: 'Long-term support from your care team',
    icon: Users,
    category: 'Relationship',
  },
]

const preventiveItems = [
  'Annual physical exams and wellness visits',
  'Preventive screening services',
  "Men's health services",
  'Vaccines and immunizations',
  'Smoking cessation support',
]

const chronicGroups = [
  {
    title: 'Heart Health',
    items: ['Hypertension', 'High cholesterol'],
  },
  {
    title: 'Endocrine Health',
    items: ['Diabetes mellitus', 'Thyroid disorders'],
  },
  {
    title: 'Respiratory & Mobility',
    items: ['Asthma and allergies', 'Arthritis and joint pain'],
  },
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

const whoBenefitsCards = [
  {
    title: 'Individuals with accepted insurance',
    icon: ShieldCheck,
  },
  {
    title: 'Families seeking ongoing primary care',
    icon: HeartPulse,
  },
  {
    title: 'Patients with chronic conditions',
    icon: Users,
  },
  {
    title: 'Patients who need preventive care',
    icon: CheckCircle2,
  },
  {
    title: 'Working professionals',
    icon: Laptop,
  },
  {
    title: 'Patients who may need specialist referrals',
    icon: BriefcaseMedical,
  },
]

const whyChooseCards = [
  {
    title: 'Accepted Insurance',
    description: 'Healtopia accepts many major insurance plans and offers self-pay options.',
    icon: ShieldCheck,
  },
  {
    title: 'Experienced Providers',
    description: 'Evidence-based care delivered with attention to each patient’s history and goals.',
    icon: Users,
  },
  {
    title: 'Convenient Scheduling',
    description: 'Timely appointment options when availability allows.',
    icon: CalendarClock,
  },
  {
    title: 'Whole-Person Care',
    description: 'Preventive care, chronic care, and follow-up designed around long-term wellness.',
    icon: HeartPulse,
  },
]

const faqItems = [
  {
    id: 'insurance-plans',
    question: 'Which insurance plans does Healtopia accept?',
    answer:
      'Healtopia accepts many major insurance plans for traditional primary care. Because coverage can vary, patients should contact the office and confirm their plan details before their visit.',
  },
  {
    id: 'verify-coverage',
    question: 'Do I need to verify my coverage before my visit?',
    answer:
      'Yes. It is a good idea to verify benefits with your insurance plan and confirm with the office so you understand what may be covered and what out-of-pocket costs may apply.',
  },
  {
    id: 'covered-services',
    question: 'What services may be covered by insurance?',
    answer:
      'Coverage can vary by plan, but many patients use insurance for routine visits, preventive care, chronic disease management, and follow-up support. Please confirm details with your insurer.',
  },
  {
    id: 'copays-deductibles',
    question: 'Are copays or deductibles required?',
    answer:
      'Copays, deductibles, and other cost-sharing amounts depend on your specific plan and the service provided. The office can help you understand the general process, but your insurer is the best source for exact benefit details.',
  },
  {
    id: 'self-pay',
    question: 'Can I still be seen if my insurance is not accepted?',
    answer:
      'In many cases, yes. Healtopia also offers self-pay options. Please contact the office so the team can help you understand your visit options.',
  },
  {
    id: 'difference-dpc',
    question: 'How is insurance-based care different from Direct Primary Care?',
    answer:
      'Insurance-based care uses accepted insurance plans for traditional primary care services. Direct Primary Care is a separate membership model with a different pricing structure and approach to billing.',
  },
]

function SectionEyebrow({ children }) {
  return (
    <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
      {children}
    </p>
  )
}

function InsuranceBasedPrimaryCare() {
  const reduceMotion = useReducedMotion()
  const acceptedInsurancePlans = acceptedInsurancePlanNames
    .map((name) => insuranceLogos.find((plan) => plan.name === name))
    .filter(Boolean)

  return (
    <div className="bg-ht-light">
      <style>{`
        .insurance-based-care-hero {
          padding-bottom: 1.75rem;
        }

        @media (min-width: 640px) {
          .insurance-based-care-hero {
            padding-bottom: 2rem;
          }
        }

        @media (min-width: 1024px) {
          .insurance-based-care-hero {
            padding-bottom: 2.25rem;
          }
        }

        .insurance-plans-section {
          scroll-margin-top: calc(var(--header-height, 76px) + 1.5rem);
          padding-top: 1.5rem;
          padding-bottom: 2.25rem;
        }

        @media (min-width: 640px) {
          .insurance-plans-section {
            padding-top: 1.75rem;
            padding-bottom: 2.5rem;
          }
        }

        @media (min-width: 1024px) {
          .insurance-plans-section {
            padding-top: 2rem;
            padding-bottom: 2.75rem;
          }
        }

        .insurance-plans-header {
          max-width: 42.5rem;
        }

        .insurance-plans-header p {
          max-width: 42.5rem;
        }
      `}</style>
      <section className={`${PAGE_HERO} insurance-based-care-hero`}>
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <motion.div {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.03 })}>
            <SectionEyebrow>INSURANCE-BASED PRIMARY CARE</SectionEyebrow>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl lg:text-[clamp(3.1rem,4.4vw,4.7rem)] lg:leading-[1]">
              Primary care that works with your <span className="text-ht-cyan-700">accepted insurance</span> plan
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg">
              Receive preventive care, chronic disease management, annual wellness visits, and treatment for everyday
              non-emergency medical concerns using an accepted insurance plan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap">
                Book Appointment
                <ArrowRight size={16} />
              </Button>
              <Button href="#accepted-insurance-plans" variant="secondary" className="whitespace-nowrap">
                View Accepted Plans
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="self-center"
            {...getEntranceProps(reduceMotion, { y: 20, delay: 0.07, duration: 0.55, fromScale: 0.98 })}
          >
            <div className="group overflow-hidden rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)] transition-shadow duration-300">
              <div className="overflow-hidden rounded-[1.5rem] border border-ht-silver bg-ht-soft-blue/20">
                <motion.img
                  src="/images/clinic/examination-room.png"
                  alt="Healtopia examination room"
                  className="h-[clamp(18rem,29vw,25rem)] w-full object-cover object-[center_60%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                  initial={reduceMotion ? false : { scale: 0.985, opacity: 0 }}
                  animate={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut', delay: 0.05 }}
                  loading="lazy"
                />
              </div>
            </div>

            <motion.div
              className="mt-4 grid gap-3 sm:grid-cols-3"
              {...getStaggerContainer(reduceMotion, { staggerChildren: 0.06, amount: 0.2 })}
            >
              {heroTiles.map((item) => (
                <motion.div
                  key={item.label}
                  className="group rounded-2xl border border-ht-silver bg-ht-soft-blue/30 px-4 py-3 shadow-[0_14px_32px_-28px_rgba(5,42,74,0.4)] transition-colors duration-300"
                  {...getStaggerItem(reduceMotion, { y: 12 })}
                  {...getCardHover(reduceMotion)}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100 transition-transform duration-300 group-hover:scale-105">
                      <item.icon size={16} />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-gray">{item.label}</p>
                      <p className="mt-1 text-base font-bold text-ht-navy">{item.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="accepted-insurance-plans" className={`${PAGE_SECTION_SOFT} insurance-plans-section`}>
        <div className={PAGE_CONTAINER}>
          <div className="insurance-plans-header mx-auto">
            <SectionHeader
              align="center"
              eyebrow="INSURANCE PARTNERS"
              title={
                <>
                  Accepted <span className="text-ht-cyan-700">Insurance Plans</span>
                </>
              }
              description="We work with many major insurance providers. Please contact our office to verify your specific plan, benefits, and coverage before your visit."
            />
          </div>

          <motion.div
            className="mt-6 grid grid-cols-1 gap-3 min-[375px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.04, amount: 0.14 })}
          >
            {acceptedInsurancePlans.map((plan) => (
              <motion.article
                key={plan.name}
                className={`${PAGE_CARD} flex h-[clamp(4.9rem,7vw,6.75rem)] items-center justify-center px-4 py-4 transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]`}
                aria-label={plan.name}
                {...getStaggerItem(reduceMotion, { y: 14 })}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -2.5,
                        scale: 1,
                        boxShadow: '0 20px 38px -30px rgba(5, 42, 74, 0.5)',
                        borderColor: 'rgba(103, 232, 249, 0.75)',
                      }
                }
                transition={reduceMotion ? { duration: 0 } : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={plan.src}
                  alt={plan.alt}
                  className={`h-full w-full object-contain ${acceptedInsurancePlanSizing[plan.name] ?? 'max-h-[2.2rem] max-w-[8rem] sm:max-h-[2.35rem] sm:max-w-[8.5rem]'}`}
                  loading="lazy"
                />
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="mt-7 flex flex-col items-center gap-4 text-center"
            {...getEntranceProps(reduceMotion, { y: 14, duration: 0.45, delay: 0.16 })}
          >
            <Button to="/insurance" variant="secondary" className="group whitespace-nowrap">
              View Full Insurance List
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
            <p className="mx-auto max-w-[42.5rem] text-sm leading-relaxed text-ht-gray">
              UnitedHealthcare Community Plan is currently not accepted.
            </p>
          </motion.div>
        </div>
      </section>

      <section className={PAGE_SECTION}>
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.03 })}>
              <SectionEyebrow>HOW IT WORKS</SectionEyebrow>
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl lg:text-[2.65rem] lg:leading-tight">
                Traditional primary care through your <span className="text-ht-cyan-700">accepted insurance</span> plan
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">
                Insurance-based primary care supports routine visits, preventive care, chronic disease management, and
                non-emergency medical concerns through accepted insurance plans.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {howItWorksCards.map((item) => (
                  <motion.article
                    key={item.title}
                    className="group rounded-2xl border border-ht-silver bg-white px-5 py-4 shadow-[0_16px_36px_-30px_rgba(5,42,74,0.45)]"
                    {...getStaggerItem(reduceMotion, { y: 14 })}
                    {...getCardHover(reduceMotion)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100 transition-transform duration-300 group-hover:scale-105">
                        <item.icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-ht-navy transition-transform duration-300 group-hover:-translate-y-0.5">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ht-gray">{item.text}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            <motion.aside
              className="rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)]"
              {...getEntranceProps(reduceMotion, { y: 24, delay: 0.08, duration: 0.55 })}
            >
              <div className="rounded-[1.5rem] border border-ht-silver bg-ht-soft-blue/15 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-ht-navy-700">Care journey</p>
                <div className="relative mt-5 space-y-4 pl-3 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:content-[''] before:bg-cyan-100">
                  {journeySteps.map((step, index) => (
                    <motion.article
                      key={step.title}
                      className="group relative rounded-2xl border border-ht-silver bg-white px-4 py-4 shadow-[0_14px_30px_-28px_rgba(5,42,74,0.4)]"
                      {...getStaggerItem(reduceMotion, { y: 12 })}
                      {...getCardHover(reduceMotion)}
                    >
                      <div className="absolute -left-[0.65rem] top-6 h-3 w-3 rounded-full border-2 border-white bg-ht-cyan-700 shadow-sm" />
                      <div className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 transition-transform duration-300 group-hover:scale-105">
                          <step.icon size={16} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ht-gray">{step.label}</p>
                          <p className="mt-1 text-sm leading-relaxed text-ht-navy">{step.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-ht-gray">{step.text}</p>
                        </div>
                      </div>
                      {index < journeySteps.length - 1 ? (
                        <div className="pointer-events-none absolute -bottom-2 left-8 h-4 w-px bg-cyan-100" />
                      ) : null}
                    </motion.article>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION_SOFT}>
        <div className={PAGE_CONTAINER}>
          <SectionHeader
            eyebrow="WHAT'S INCLUDED"
            title={
              <>
                What insurance-based primary care <span className="text-ht-cyan-700">includes</span>
              </>
            }
            description="Our insurance-based primary care services support routine checkups, preventive care, ongoing condition management, and follow-up support."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {includedBenefits.map((item, index) => (
              <motion.article
                key={item.title}
                className={`${PAGE_CARD} group relative flex h-full flex-col p-6`}
                {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: index * 0.03 })}
                {...getCardHover(reduceMotion)}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ht-cyan-700 via-cyan-300 to-transparent opacity-80" />
                <div className="flex items-start gap-3">
                  <div className={PAGE_ICON_CIRCLE}>
                    <item.icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="inline-flex rounded-full bg-cyan-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
                      {item.category}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ht-navy">{item.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION}>
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
            <motion.div {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}>
              <SectionEyebrow>PREVENTIVE CARE</SectionEyebrow>
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl lg:text-[2.65rem] lg:leading-tight">
                Preventive Care & <span className="text-ht-cyan-700">Wellness</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">
                Preventive healthcare plays an important role in maintaining long-term wellness and identifying health
                concerns early.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">
                Our preventive care services help patients stay proactive through regular checkups, screenings,
                vaccinations, and personalized wellness guidance.
              </p>

              <ul className="mt-6 space-y-3">
                {preventiveItems.map((item) => (
                  <li
                    key={item}
                    className="group flex items-start gap-3 rounded-2xl border border-ht-silver bg-ht-soft-blue/20 px-4 py-3 shadow-[0_14px_30px_-28px_rgba(5,42,74,0.4)]"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                    <span className="text-sm leading-relaxed text-ht-navy">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className={`${PAGE_PANEL_GRADIENT} p-3`}
              {...getEntranceProps(reduceMotion, { y: 24, delay: 0.08, duration: 0.55 })}
            >
              <div className={`${PAGE_IMAGE_FRAME_SOFT} h-[clamp(18rem,28vw,24rem)]`}>
                <motion.img
                  src="/images/clinic/patient-care.png"
                  alt="Patient care at Healtopia"
                  className="ht-motion-smooth h-full w-full object-cover object-center"
                  loading="lazy"
                  initial={reduceMotion ? false : { scale: 0.99, opacity: 0 }}
                  animate={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut', delay: 0.05 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION_SOFT}>
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}>
              <SectionEyebrow>CHRONIC CARE</SectionEyebrow>
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl lg:text-[2.65rem] lg:leading-tight">
                Chronic <span className="text-ht-cyan-700">Disease Management</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">
                Managing chronic health conditions requires ongoing care, monitoring, and personalized treatment.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">
                Our healthcare team works closely with patients to support long-term health, reduce complications, and
                improve quality of life.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {chronicGroups.map((group) => (
                  <motion.article
                    key={group.title}
                    className={`${PAGE_CARD_SOFT} p-5`}
                    {...getEntranceProps(reduceMotion, { y: 16, duration: 0.45 })}
                    {...getCardHover(reduceMotion)}
                  >
                    <div className="inline-flex rounded-full bg-cyan-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
                      {group.title}
                    </div>
                    <ul className="mt-4 space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-ht-navy">
                          <span className="mt-1 h-2 w-2 rounded-full bg-ht-cyan-700" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="self-stretch rounded-[2rem] border border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50 p-3 shadow-[0_22px_52px_-34px_rgba(5,42,74,0.45)]"
              {...getEntranceProps(reduceMotion, { y: 24, delay: 0.08, duration: 0.55 })}
            >
              <div className="overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white">
                <motion.img
                  src="/images/clinic/building-exterior.jpg"
                  alt="Healtopia clinic building exterior"
                  className="ht-motion-smooth h-[clamp(18rem,30vw,25rem)] w-full object-cover object-center"
                  loading="lazy"
                  initial={reduceMotion ? false : { scale: 0.99, opacity: 0 }}
                  animate={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut', delay: 0.05 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-ht-silver bg-ht-soft-blue/20 py-16 lg:py-20">
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.article
              className="rounded-[2rem] border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] md:p-8"
              {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}
            >
              <SectionEyebrow>ACUTE CARE</SectionEyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
                Acute Care Visits
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">
                We provide acute care visits for non-emergency medical concerns that require prompt attention through
                in-person and telehealth appointments.
              </p>
              <ul className="mt-6 space-y-3">
                {acuteItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-ht-silver bg-ht-soft-blue/20 px-4 py-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                    <span className="text-sm leading-relaxed text-ht-navy">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              className="rounded-[2rem] border border-ht-navy bg-gradient-to-br from-ht-navy via-[#0b2d4a] to-ht-navy p-6 text-white shadow-[0_24px_52px_-36px_rgba(5,42,74,0.5)] md:p-8"
              {...getRevealProps(reduceMotion, { y: 24, amount: 0.2, delay: 0.05 })}
            >
              <SectionEyebrow>RECOVERY</SectionEyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
                Post-Hospital Follow-up Care
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-cyan-100 md:text-lg">
                We provide follow-up care to help patients recover safely and continue their treatment plan after
                hospitalization.
              </p>
              <ul className="mt-6 space-y-3">
                {followUpItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3"
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-cyan-100">
                      <CheckCircle2 size={16} />
                    </span>
                    <span className="text-sm leading-relaxed text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION}>
        <div className={PAGE_CONTAINER}>
          <SectionHeader
            eyebrow="WHO BENEFITS"
            title="Who benefits from insurance-based primary care?"
            description="Insurance-based primary care may be a good fit for patients who want comprehensive primary care through an accepted insurance plan."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div
              className={`${PAGE_CARD} p-6 md:p-7`}
              {...getRevealProps(reduceMotion, { y: 18, amount: 0.18 })}
              {...getCardHover(reduceMotion)}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100">
                <UserRound size={20} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ht-gray md:text-base">
                Insurance-based care can be a strong fit for patients who want preventive care, treatment for everyday
                medical needs, ongoing condition management, and help coordinating the next steps in their care.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {whoBenefitsCards.map((item, index) => (
                <motion.article
                  key={item.title}
                  className={`${PAGE_CARD} group p-5`}
                  {...getEntranceProps(reduceMotion, { y: 16, duration: 0.42, delay: index * 0.03 })}
                  {...getCardHover(reduceMotion)}
                >
                  <div className="flex items-start gap-3">
                    <div className={PAGE_ICON_CIRCLE}>
                      <item.icon size={18} />
                    </div>
                    <p className="text-sm leading-relaxed text-ht-navy transition-transform duration-300 group-hover:-translate-y-0.5">
                      {item.title}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION_SOFT}>
        <div className={PAGE_CONTAINER}>
          <SectionHeader
            eyebrow="WHY HEALTOPIA"
            title="Trusted care that feels personal"
            description="We focus on relationship-driven care, modern convenience, and consistent communication so patients understand what comes next in their care plan."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {whyChooseCards.map((item, index) => (
              <motion.article
                key={item.title}
                className={`${PAGE_CARD} group flex h-full flex-col p-6`}
                {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: index * 0.04 })}
                {...getCardHover(reduceMotion)}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ht-cyan-700 via-cyan-300 to-transparent opacity-80" />
                <div className={PAGE_ICON_CIRCLE}>
                  <item.icon size={18} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-ht-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ht-gray">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ht-silver bg-white py-16 lg:py-20">
        <div className={PAGE_CONTAINER}>
          <SectionHeader
            eyebrow="FAQ"
            title="Insurance-Based Care FAQs"
            description="Common questions about accepted insurance plans, benefits, and how insurance-based care compares with membership care."
          />
          <div className="mt-8">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <section className="bg-ht-soft-blue/20 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <AppointmentCTA
            title="Schedule an insurance-based primary care visit"
            description="Choose a convenient appointment for routine, preventive, or ongoing care."
            secondaryLabel="View Accepted Insurance"
            secondaryTo="/insurance"
            benefits={[
              {
                title: 'Most major plans accepted',
                description: 'We work with Medicare, Medicaid, and many commercial plans.',
              },
              {
                title: 'Preventive and routine care',
                description: 'Wellness visits, screenings, and common primary care needs.',
              },
              {
                title: 'Chronic care follow-up',
                description: 'Ongoing support for stable, coordinated primary care.',
              },
            ]}
          />
        </div>
      </section>
    </div>
  )
}

export default InsuranceBasedPrimaryCare
