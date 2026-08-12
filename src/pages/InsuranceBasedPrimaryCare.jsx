import { motion, useReducedMotion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  HeartPulse,
  ShieldCheck,
  Thermometer,
  Users,
  SearchCheck,
} from 'lucide-react'
import Button from '../components/Button'
import FAQAccordion from '../components/FAQAccordion'
import NextStepSection from '../components/NextStepSection'
import SectionHeader from '../components/SectionHeader'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import insuranceLogos from '../data/insurance'
import {
  PAGE_CARD,
  PAGE_CARD_SOFT,
  PAGE_CONTAINER,
  PAGE_ICON_CIRCLE,
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
    <div className="bg-ht-light insurance-based-primary-care-page">
      <style>{`
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

        .insurance-how-it-works-section {
          padding-top: 2.5rem;
          padding-bottom: 2.5rem;
        }

        .insurance-preventive-cta,
        .insurance-preventive-cta::before,
        .insurance-preventive-cta::after {
          background: #0b2d4d !important;
          background-color: #0b2d4d !important;
          background-image: none !important;
          background-repeat: no-repeat !important;
          background-position: center !important;
          background-size: 100% 100% !important;
          background-blend-mode: normal !important;
          mask: none !important;
          -webkit-mask: none !important;
          mix-blend-mode: normal !important;
          opacity: 1 !important;
          filter: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          box-shadow: none !important;
        }

        .insurance-preventive-cta::before,
        .insurance-preventive-cta::after {
          content: none !important;
        }

        @media (min-width: 640px) {
          .insurance-how-it-works-section {
            padding-top: 2.75rem;
            padding-bottom: 2.75rem;
          }
        }

        @media (min-width: 1024px) {
          .insurance-how-it-works-section {
            padding-top: 2.5rem;
            padding-bottom: 2.5rem;
          }
        }

        @media (max-width: 767px) {
          .insurance-based-primary-care-page {
            padding-bottom: calc(90px + env(safe-area-inset-bottom));
          }

          .insurance-preventive-section {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
          }

          .insurance-chronic-section {
            padding-top: 1.5rem;
            padding-bottom: 2rem;
          }
        }
      `}</style>
      <section className="relative isolate overflow-hidden border-b border-ht-silver bg-[linear-gradient(180deg,#ffffff_0%,#f7fdfe_100%)] lg:h-[calc(100vh-var(--header-height,76px))] lg:min-h-0 lg:max-h-none">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:h-full lg:flex-row lg:items-center lg:gap-8 lg:px-8 lg:py-0">
          <motion.div
            className="relative z-20 max-w-[38rem] text-ht-navy lg:w-[min(35rem,47vw)]"
            {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.03 })}
          >
            <div className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700 shadow-sm">
              INSURANCE-BASED PRIMARY CARE
            </div>
            <h1 className="mt-4 max-w-[13.5ch] text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl lg:text-[clamp(40px,3.75vw,61px)] lg:leading-[1]">
              Primary care that
              <br />
              works with your
              <br />
              <span className="text-ht-cyan-700">accepted insurance plan</span>
            </h1>
            <p className="mt-4 max-w-[31rem] text-[1rem] leading-[1.5] text-ht-gray md:text-[1.05rem]">
              Receive preventive care, chronic disease management, annual wellness visits, and treatment for everyday
              non-emergency medical concerns using an accepted insurance plan.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" className="w-full whitespace-nowrap sm:w-auto">
                Book Appointment
                <ArrowRight size={16} />
              </Button>
              <Button href="#accepted-insurance-plans" variant="secondary" className="w-full whitespace-nowrap sm:w-auto">
                View Accepted Plans
              </Button>
            </div>
          </motion.div>

          <motion.aside
            className="relative lg:w-[min(50rem,53vw)]"
            {...getEntranceProps(reduceMotion, { y: 18, duration: 0.55, delay: 0.06 })}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)]">
              <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[16%] bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.55)_42%,rgba(255,255,255,0.12)_74%,rgba(255,255,255,0)_100%)] lg:block" />
              <div className="overflow-hidden rounded-[1.5rem]">
                <motion.img
                  src="/images/clinic/examination-room.png"
                  alt="Examination room with chairs"
                  className="h-[clamp(18rem,42vw,40rem)] w-full object-cover object-[58%_center]"
                  initial={reduceMotion ? false : { opacity: 0.98, scale: 1.01 }}
                  animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut', delay: 0.04 }}
                />
              </div>
            </div>
          </motion.aside>
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

      <section className={`${PAGE_SECTION} insurance-how-it-works-section relative isolate overflow-hidden`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_80%_65%,rgba(224,242,254,0.65),transparent_28%)]" />
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-7">
            <motion.div {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.03 })}>
              <SectionEyebrow>HOW IT WORKS</SectionEyebrow>
              <h2 className="mt-3.5 max-w-3xl text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl lg:text-[2.45rem] lg:leading-[1.08]">
                Traditional primary care through your <span className="text-ht-cyan-700">accepted insurance</span> plan
              </h2>
              <p className="mt-3.5 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">
                Insurance-based primary care supports routine visits, preventive care, chronic disease management, and
                non-emergency medical concerns through accepted insurance plans.
              </p>

              <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-cyan-100/70 bg-white/82 shadow-[0_18px_40px_-36px_rgba(5,42,74,0.28)] backdrop-blur-[2px]">
                <div className="relative px-4 py-1.5 sm:px-5">
                  <div className="pointer-events-none absolute left-[2.45rem] top-6 bottom-6 hidden w-px bg-cyan-200/80 sm:block" />
                </div>
                <div className="flex flex-col divide-y divide-cyan-100/60">
                  {howItWorksCards.map((item) => (
                  <motion.article
                    key={item.title}
                    className="group flex min-h-[6.25rem] items-center gap-4 px-4 py-4 sm:min-h-[6.5rem] sm:px-5 sm:py-4 lg:min-h-[6.5rem] lg:px-5 lg:py-4"
                    {...getStaggerItem(reduceMotion, { y: 14 })}
                    {...getCardHover(reduceMotion)}
                  >
                    <div className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue/90 text-ht-cyan-700 shadow-[0_12px_26px_-18px_rgba(5,42,74,0.34)] ring-1 ring-cyan-100 transition-transform duration-300 group-hover:scale-105 lg:h-[3.25rem] lg:w-[3.25rem]">
                      <item.icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[0.98rem] font-bold text-ht-navy transition-transform duration-300 group-hover:-translate-y-0.5 lg:text-[1rem]">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-[0.86rem] leading-relaxed text-ht-gray lg:text-[0.9rem]">
                        {item.text}
                      </p>
                    </div>
                  </motion.article>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.aside
              className="rounded-[2rem] border border-cyan-100 bg-white/90 p-2.5 shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)] lg:p-3"
              {...getEntranceProps(reduceMotion, { y: 24, delay: 0.08, duration: 0.55 })}
            >
              <div className="rounded-[1.5rem] border border-ht-silver bg-ht-soft-blue/12 p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ht-navy-700">Care journey</p>
                <div className="relative mt-4 space-y-2.5 pl-3 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:content-[''] before:bg-cyan-100 lg:mt-4 lg:space-y-2.5">
                  {journeySteps.map((step, index) => (
                    <motion.article
                      key={step.title}
                      className={`group relative rounded-2xl border px-4 py-3 shadow-[0_14px_30px_-28px_rgba(5,42,74,0.4)] lg:px-4 lg:py-3 ${index % 2 === 0 ? 'border-ht-silver bg-white' : 'border-cyan-100/70 bg-ht-soft-blue/18'}`}
                      {...getStaggerItem(reduceMotion, { y: 12 })}
                      {...getCardHover(reduceMotion)}
                    >
                      <div className="absolute -left-[0.65rem] top-5.5 h-3 w-3 rounded-full border-2 border-white bg-ht-cyan-700 shadow-sm" />
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 transition-transform duration-300 group-hover:scale-105 lg:h-9 lg:w-9">
                          <step.icon size={15} />
                        </span>
                        <div className="min-w-0">
                          <p className="inline-flex rounded-full bg-cyan-100 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">{step.label}</p>
                          <p className="mt-1 text-[0.92rem] font-bold leading-snug text-ht-navy lg:text-sm">{step.title}</p>
                          <p className="mt-0.5 text-[0.84rem] leading-relaxed text-ht-gray lg:text-[0.88rem]">{step.text}</p>
                        </div>
                      </div>
                      {index < journeySteps.length - 1 ? (
                        <div className="pointer-events-none absolute -bottom-1.5 left-8 h-3.5 w-px bg-cyan-100" />
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

      <section className={`${PAGE_SECTION_SOFT} insurance-preventive-section relative isolate overflow-hidden`}>
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_86%_18%,rgba(103,232,249,0.14),transparent_28%),radial-gradient(circle_at_14%_84%,rgba(224,242,254,0.92),transparent_24%)]" />
        <HeartPulse
          aria-hidden="true"
          className="pointer-events-none absolute right-[-4rem] top-[18%] z-0 hidden h-[20rem] w-[20rem] rotate-[-8deg] text-cyan-200/15 lg:block"
          strokeWidth={1.1}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="relative z-10 mx-auto max-w-[850px]">
            <motion.div {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}>
              <SectionEyebrow>PREVENTIVE CARE</SectionEyebrow>
              <div className="mt-4 h-px w-16 bg-cyan-300" />
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl lg:text-[2.65rem] lg:leading-tight">
                Preventive Care & <span className="text-ht-cyan-700">Wellness</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">
                Preventive healthcare plays an important role in maintaining long-term wellness and identifying health
                concerns early.
              </p>
            </motion.div>

            <div className="mt-7 grid gap-[18px] lg:grid-cols-2">
              {preventiveItems.map((item, index) => (
                <motion.article
                  key={item}
                  className={`group flex min-h-[118px] items-start gap-4 rounded-[1.35rem] border border-cyan-100/80 bg-ht-soft-blue/28 px-5 py-5 shadow-[0_14px_34px_-30px_rgba(5,42,74,0.32)] transition-[transform,box-shadow,border-color] duration-300 ${index === preventiveItems.length - 1 ? 'lg:col-span-2' : ''}`}
                  {...getEntranceProps(reduceMotion, { y: 14, duration: 0.45, delay: index * 0.03 })}
                  {...getCardHover(reduceMotion)}
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100 transition-transform duration-300 group-hover:scale-105">
                    <CheckCircle2 size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.98rem] font-bold text-ht-navy">{item}</p>
                    <p className="mt-1 text-[0.86rem] leading-relaxed text-ht-gray">
                      Regular checkups, screenings, vaccinations, and early identification of health concerns.
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              className="insurance-preventive-cta mt-5 flex w-full items-center justify-between gap-4 rounded-[1.25rem] border border-[#0B2D4D] bg-[#0B2D4D] px-5 py-4 text-white shadow-none"
              {...getEntranceProps(reduceMotion, { y: 14, duration: 0.45, delay: 0.14 })}
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100/90">Preventive care starts before symptoms do.</p>
                <p className="mt-1 text-[0.86rem] leading-relaxed text-slate-100/88">
                  Stay proactive with regular checkups, screenings, vaccinations, and early identification of health concerns.
                </p>
              </div>
              <ArrowRight size={18} className="shrink-0 text-cyan-100" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className={`${PAGE_SECTION_SOFT} insurance-chronic-section relative isolate overflow-hidden`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_24%,rgba(103,232,249,0.12),transparent_26%),radial-gradient(circle_at_86%_76%,rgba(224,242,254,0.7),transparent_24%)]" />
        <div className={PAGE_CONTAINER}>
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
          </motion.div>

          <div className="mt-7 grid gap-4 lg:grid-cols-3 lg:gap-5">
            {chronicGroups.map((group) => (
              <motion.article
                key={group.title}
                className={`${PAGE_CARD_SOFT} flex h-full flex-col p-5`}
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
        </div>
      </section>

      <section className={PAGE_SECTION_SOFT}>
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
            eyebrow="FAQ"
            title="Insurance-Based Care FAQs"
            description="Common questions about accepted insurance plans, benefits, and how insurance-based care compares with membership care."
          />
          <div className="mt-8">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <NextStepSection
        eyebrow="TAKE THE NEXT STEP"
        title={
          <>
            Schedule an insurance-based <br className="hidden sm:block" />
            primary care visit
          </>
        }
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
  )
}

export default InsuranceBasedPrimaryCare
