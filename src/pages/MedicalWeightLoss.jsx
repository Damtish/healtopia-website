import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  ClipboardList,
  Dna,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Users,
} from 'lucide-react'
import Button from '../components/Button'
import SectionBadge from '../components/SectionBadge'
import AppointmentCTA from '../components/AppointmentCTA'
import FAQAccordion from '../components/FAQAccordion'
import SectionHeader from '../components/SectionHeader'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import {
  PAGE_CARD,
  PAGE_CONTAINER,
  PAGE_ICON_CIRCLE,
  PAGE_PANEL_GRADIENT,
  PAGE_SECTION_CTA_SOFT,
  PAGE_SECTION,
  PAGE_SECTION_SOFT,
} from '../lib/pageStyles'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

function SectionEyebrow({ children }) {
  return <SectionBadge>{children}</SectionBadge>
}

const journeyRows = [
  {
    icon: ClipboardList,
    title: 'Comprehensive evaluation',
    text: 'Review medical history, health conditions, medications, lifestyle, and weight-related concerns.',
  },
  {
    icon: HeartPulse,
    title: 'Personalized plan',
    text: 'Develop an individualized plan based on clinical findings, goals, and treatment preferences.',
  },
  {
    icon: BarChart3,
    title: 'Ongoing follow-up',
    text: 'Monitor progress, adjust the plan when needed, and support long-term health habits.',
  },
]

const journeySteps = [
  {
    label: 'Initial Consultation',
    text: 'Discuss health history, goals, and previous weight-management efforts.',
    icon: CalendarClock,
  },
  {
    label: 'Medical Evaluation',
    text: 'Review relevant health risks, medications, and metabolic factors.',
    icon: Stethoscope,
  },
  {
    label: 'Care Plan',
    text: 'Build a personalized plan using appropriate treatment options.',
    icon: ClipboardList,
  },
  {
    label: 'Follow-Up',
    text: 'Monitor progress, side effects, challenges, and clinical response.',
    icon: HeartPulse,
  },
  {
    label: 'Long-Term Support',
    text: 'Adjust the plan and support weight maintenance over time.',
    icon: Users,
  },
]

const comprehensiveCare = [
  {
    icon: ClipboardList,
    title: 'Medical evaluation',
    text: 'Review medical history, current medications, weight-related conditions, and previous treatment efforts.',
  },
  {
    icon: HeartPulse,
    title: 'Nutrition and lifestyle support',
    text: 'Practical guidance for nutrition, movement, sleep, stress, and sustainable daily habits.',
  },
  {
    icon: Dna,
    title: 'Body composition analysis',
    text: 'Measure body fat, muscle mass, visceral fat, and other health indicators when appropriate.',
  },
  {
    icon: Syringe,
    title: 'Medication options',
    text: 'Prescription treatment may be considered when clinically appropriate and combined with ongoing monitoring.',
  },
  {
    icon: ShieldCheck,
    title: 'Condition-focused care',
    text: 'Coordinate weight management with diabetes, hypertension, high cholesterol, and metabolic concerns.',
  },
  {
    icon: BarChart3,
    title: 'Monitoring and maintenance',
    text: 'Track progress, review response to treatment, and support long-term maintenance.',
  },
]

const technologyMetrics = [
  {
    icon: Dna,
    title: 'Body Fat Percentage',
    text: 'Track body-composition changes over time.',
  },
  {
    icon: HeartPulse,
    title: 'Muscle Mass',
    text: 'Understand lean tissue as part of the plan.',
  },
  {
    icon: ShieldCheck,
    title: 'Visceral Fat',
    text: 'Review deeper fat levels that matter clinically.',
  },
  {
    icon: BarChart3,
    title: 'Metabolic Health',
    text: 'Support more informed care planning.',
  },
]

const planIncludes = [
  {
    icon: ClipboardList,
    title: 'Health and weight assessment',
    text: 'A detailed review of health history, medications, prior treatment efforts, and weight-related concerns.',
  },
  {
    icon: HeartPulse,
    title: 'Nutrition guidance',
    text: 'Practical support tailored to health needs, preferences, and long-term goals.',
  },
  {
    icon: BarChart3,
    title: 'Movement and activity planning',
    text: 'Guidance for building a realistic activity routine based on ability and health status.',
  },
  {
    icon: Users,
    title: 'Behavior and habit support',
    text: 'Strategies for eating patterns, sleep, stress, consistency, and sustainable routines.',
  },
  {
    icon: Syringe,
    title: 'Prescription treatment',
    text: 'Medication may be discussed when clinically appropriate after evaluation.',
  },
  {
    icon: Dna,
    title: 'Laboratory or metabolic review',
    text: 'Relevant testing may be reviewed or recommended based on clinical need.',
  },
  {
    icon: ShieldCheck,
    title: 'Specialist coordination',
    text: 'Referrals may be considered for bariatric surgery, endocrinology, nutrition, or other specialty support.',
  },
  {
    icon: HeartPulse,
    title: 'Maintenance planning',
    text: 'Continued monitoring and adjustments to support long-term weight maintenance.',
  },
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
    question: 'Do you prescribe weight-loss medications?',
    answer:
      'For some patients, prescription weight-loss medications may be appropriate as part of a medically supervised plan. Medication decisions are made after a medical evaluation and are combined with lifestyle guidance, monitoring, and physician support.',
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
    question: 'How is this program different from other weight-loss options?',
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
    id: 'insurance-coverage',
    question: 'Is the program covered by insurance?',
    answer:
      'Coverage can vary by insurance plan and by service. Some visits, labs, medications, or tests may be covered, while others may not be. Patients should contact the office and their insurance plan to confirm coverage and out-of-pocket costs.',
  },
]

function getWeightLossCardHover(reduceMotion) {
  if (reduceMotion) return {}

  return {
    whileHover: {
      y: -4,
      boxShadow: '0 24px 44px -28px rgba(5, 42, 74, 0.5)',
      borderColor: 'rgba(103, 232, 249, 0.9)',
    },
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  }
}

function MedicalWeightLoss() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-ht-silver bg-[linear-gradient(180deg,#ffffff_0%,#f7fdfe_100%)] lg:min-h-[calc(100vh-var(--header-height,76px))] lg:h-auto">
        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          <motion.img
            src="/images/clinic/weight-loss-waist-measurement-optimized.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[68%_center] sm:object-[68%_center] md:object-[69%_center] lg:object-[70%_center]"
            initial={reduceMotion ? false : { opacity: 0.98, scale: 1.01 }}
            animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut', delay: 0.04 }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.97)_28%,rgba(255,255,255,0.9)_48%,rgba(255,255,255,0.68)_72%,rgba(255,255,255,0.3)_100%)] lg:bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.95)_18%,rgba(255,255,255,0.72)_32%,rgba(255,255,255,0.2)_46%,rgba(255,255,255,0)_58%)]" />
        </div>
        <div className="pointer-events-none absolute -left-24 -bottom-24 hidden h-[28rem] w-[28rem] rounded-full bg-cyan-200/16 blur-[110px] lg:block" />

        <div className={PAGE_CONTAINER}>
          <div className="relative flex min-h-0 items-center py-7 sm:py-8 lg:h-full lg:items-center lg:py-10">
            <motion.div
              className="relative z-10 mx-auto w-full max-w-[36rem] text-ht-navy lg:ml-8 lg:m-0 lg:w-[min(36rem,37vw)]"
              {...getEntranceProps(reduceMotion, { y: 16, duration: 0.5, delay: 0.03 })}
            >
              <div className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700 shadow-sm">
                MEDICAL WEIGHT LOSS
              </div>

              <h1 className="mt-3.5 max-w-[13.5ch] text-[clamp(44px,3.6vw,60px)] font-extrabold leading-[1] tracking-tight text-ht-navy">
                Medically supervised
                <br />
                weight loss for
                <br />
                <span className="text-ht-cyan-700">safe, sustainable progress</span>
              </h1>

              <p className="mt-3 max-w-[31rem] text-[0.95rem] leading-[1.42] text-ht-gray md:text-[1rem]">
                Healtopia provides physician-guided weight management focused on understanding the medical,
                metabolic, behavioral, and lifestyle factors that can affect weight and overall health.
              </p>
              <p className="mt-1.5 max-w-[30rem] text-[0.95rem] leading-[1.42] text-ht-gray md:text-[1rem]">
                Each care plan is personalized and may include medical evaluation, nutrition guidance,
                body-composition analysis, ongoing monitoring, and treatment options when clinically appropriate.
              </p>

              <div className="mt-6 sm:hidden">
                <img
                  src="/images/clinic/weight-loss-waist-measurement-optimized.jpg"
                  alt="Weight loss waist measurement"
                  className="h-[clamp(15rem,72vw,18.75rem)] w-full rounded-[1.2rem] object-cover object-[68%_center] shadow-[0_14px_28px_-24px_rgba(5,42,74,0.38)]"
                  loading="lazy"
                />
              </div>

              <motion.div
                className="mt-6 flex flex-col gap-2.5 sm:mt-3.5 sm:flex-row sm:flex-wrap"
                {...getEntranceProps(reduceMotion, { y: 16, duration: 0.45, delay: 0.26 })}
              >
                <Button
                  href={BOOK_APPOINTMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full whitespace-nowrap sm:w-auto"
                >
                  Book Appointment
                  <ArrowRight size={16} />
                </Button>
                <Button
                  to="/pricing"
                  variant="secondary"
                  className="w-full whitespace-nowrap sm:w-auto"
                >
                  View Pricing
                </Button>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION}>
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.37fr_0.63fr] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-14 lg:gap-y-8">
            <motion.div
              className="group order-2 lg:order-1 lg:row-span-2 lg:self-center lg:max-w-[26rem] xl:max-w-[28rem]"
              {...getEntranceProps(reduceMotion, { y: 24, delay: 0.08, duration: 0.55, fromScale: 0.98 })}
            >
              <img
                src="/images/clinic/weight-loss-scale-measuring-tape-optimized.jpg"
                alt="Weight scale and measuring tape"
                className="ht-motion-smooth h-[clamp(16rem,58vw,20rem)] w-full rounded-[1.25rem] object-cover object-[center_45%] shadow-[0_12px_26px_-24px_rgba(5,42,74,0.38)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:h-[clamp(20rem,30vw,25rem)] lg:rounded-[1.4rem] lg:group-hover:scale-[1.015]"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className="order-1 lg:order-2 lg:col-start-2 lg:row-start-1"
              {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.03 })}
            >
              <SectionHeader
                eyebrow="COMPREHENSIVE CARE"
                title={
                  <>
                    Weight management that looks beyond the <span className="text-ht-cyan-700">number on the scale</span>
                  </>
                }
                description="Healtopia combines medical evaluation, lifestyle support, treatment options, and ongoing monitoring to help patients build a realistic path toward improved health."
              />
            </motion.div>

            <motion.div
              className="order-3 lg:order-3 lg:col-start-2 lg:row-start-2 lg:mt-1"
              {...getStaggerContainer(reduceMotion, { staggerChildren: 0.07, amount: 0.18 })}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {comprehensiveCare.map((card) => (
                  <motion.article
                    key={card.title}
                    className={`${PAGE_CARD} group flex h-full items-start gap-3 px-4 py-4`}
                    {...getStaggerItem(reduceMotion, { y: 14 })}
                    {...getWeightLossCardHover(reduceMotion)}
                  >
                    <div className={PAGE_ICON_CIRCLE}>
                      <card.icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[1.02rem] font-bold leading-[1.28] text-ht-navy">{card.title}</h3>
                      <p className="mt-1 text-[0.95rem] leading-[1.58] text-ht-gray">{card.text}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        className="border-b border-ht-silver bg-gradient-to-b from-white via-ht-soft-blue/25 to-white py-16 lg:py-20"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.18 })}
      >
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.03 })}>
              <SectionEyebrow>YOUR CARE JOURNEY</SectionEyebrow>
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                A medical approach built around <span className="text-ht-cyan-700">your health</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">
                Medical weight management begins with understanding the factors affecting your weight, health, and
                long-term goals.
              </p>

              <motion.div
                className="mt-7 grid gap-3"
                {...getStaggerContainer(reduceMotion, { staggerChildren: 0.07, amount: 0.2 })}
              >
                {journeyRows.map((row) => (
                  <motion.article
                    key={row.title}
                    className={`${PAGE_CARD} group px-5 py-4`}
                    {...getStaggerItem(reduceMotion, { y: 14 })}
                    {...getCardHover(reduceMotion)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={PAGE_ICON_CIRCLE}>
                        <row.icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-ht-navy transition-transform duration-300 group-hover:-translate-y-0.5">
                          {row.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ht-gray">{row.text}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>

            <motion.aside
              className="rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)]"
              {...getEntranceProps(reduceMotion, { y: 20, delay: 0.08, duration: 0.55 })}
            >
              <div className="rounded-[1.5rem] border border-ht-silver bg-ht-soft-blue/15 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-ht-navy-700">What patients can expect</p>
                <div className="relative mt-5 space-y-4 pl-3 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:content-[''] before:bg-cyan-100">
                  {journeySteps.map((step, index) => (
                    <motion.article
                      key={step.label}
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
                          <p className="mt-1 text-sm leading-relaxed text-ht-navy">{step.text}</p>
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
      </motion.section>

      <section className={PAGE_SECTION_SOFT}>
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div
              className="grid gap-4 self-start sm:grid-cols-2"
              {...getEntranceProps(reduceMotion, { y: 20, delay: 0.05, duration: 0.5 })}
            >
              <div className="sm:col-span-2">
                <SectionHeader
                  eyebrow="BODY COMPOSITION TECHNOLOGY"
                  title={
                    <>
                      Better insight than <span className="text-ht-cyan-700">weight alone</span>
                    </>
                  }
                  description="Body weight is only one measure. Body-composition analysis can provide additional information about muscle mass, body fat, visceral fat, and metabolic health to support more informed care planning."
                />
              </div>

              {technologyMetrics.map((metric) => (
                <motion.article
                  key={metric.title}
                  className={`${PAGE_CARD} group flex h-full items-start gap-3 px-4 py-4`}
                  {...getStaggerItem(reduceMotion, { y: 14 })}
                  {...getCardHover(reduceMotion)}
                >
                  <div className={PAGE_ICON_CIRCLE}>
                    <metric.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ht-navy">{metric.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ht-gray">{metric.text}</p>
                  </div>
                </motion.article>
              ))}

            </motion.div>

            <motion.div
              className={`${PAGE_PANEL_GRADIENT} relative overflow-hidden p-3`}
              {...getEntranceProps(reduceMotion, { y: 24, delay: 0.08, duration: 0.55 })}
            >
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_58%_28%,rgba(12,174,200,0.14),transparent_52%)]" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white p-4 shadow-inner">
                <img
                  src="/images/clinic/seca-body-composition-clean-optimized.jpg"
                  alt="Healtopia body composition scanner and dashboard"
                  className="ht-motion-smooth h-[clamp(20rem,32vw,31rem)] w-full object-contain object-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION}>
        <div className={PAGE_CONTAINER}>
          <SectionHeader
            eyebrow="PERSONALIZED PLAN"
            title="Your plan may include several forms of support"
            description="Treatment recommendations depend on medical history, health needs, clinical findings, patient preferences, and whether a treatment is medically appropriate."
          />

          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.07, amount: 0.18 })}
          >
            {planIncludes.map((item) => (
              <motion.article
                key={item.title}
                className={`${PAGE_CARD} group flex h-full flex-col border-t-2 border-t-cyan-300 p-5`}
                {...getStaggerItem(reduceMotion, { y: 18 })}
                {...getCardHover(reduceMotion)}
              >
                <div className={PAGE_ICON_CIRCLE}>
                  <item.icon size={18} />
                </div>
                <h3 className="mt-4 text-base font-bold text-ht-navy">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ht-gray">{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={PAGE_SECTION}>
        <div className={PAGE_CONTAINER}>
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

      <section className={PAGE_SECTION_CTA_SOFT}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <AppointmentCTA
            title="Ready to begin your weight loss journey?"
            description="Start with physician-guided support designed around sustainable progress."
            secondaryLabel="View Weight Loss Pricing"
            secondaryTo="/pricing"
            benefits={[
              {
                title: 'Personalized evaluation',
                description: 'A first step built around your goals and health history.',
              },
              {
                title: 'Ongoing progress monitoring',
                description: 'Follow-up support that helps track what is working.',
              },
              {
                title: 'Physician-guided treatment',
                description: 'Care plans based on medical guidance and follow-through.',
              },
            ]}
          />
        </div>
      </section>

    </div>
  )
}

export default MedicalWeightLoss










