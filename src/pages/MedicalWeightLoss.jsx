import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Dna,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Users,
} from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import FAQAccordion from '../components/FAQAccordion'
import SectionHeader from '../components/SectionHeader'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import {
  PAGE_CARD,
  PAGE_CARD_SOFT,
  PAGE_CONTAINER,
  PAGE_HERO,
  PAGE_ICON_CIRCLE,
  PAGE_PANEL_GRADIENT,
  PAGE_SECTION,
  PAGE_SECTION_SOFT,
} from '../lib/pageStyles'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const heroStats = [
  { label: 'Focus', value: 'Safe progress', icon: HeartPulse },
  { label: 'Support', value: 'Physician-guided', icon: Stethoscope },
  { label: 'Care plan', value: 'Personalized', icon: ClipboardList },
]

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

const whyHealtopia = [
  {
    icon: Stethoscope,
    title: 'Medical oversight',
    text: 'Care is guided by a physician with expertise in internal medicine and obesity medicine.',
  },
  {
    icon: ClipboardList,
    title: 'Personalized planning',
    text: 'Recommendations are based on health history, clinical needs, goals, and treatment preferences.',
  },
  {
    icon: HeartPulse,
    title: 'Whole-person care',
    text: 'Weight management is considered alongside metabolism, chronic conditions, sleep, stress, and lifestyle.',
  },
  {
    icon: BarChart3,
    title: 'Ongoing support',
    text: 'Follow-up visits allow the care plan to be reviewed and adjusted over time.',
  },
]

const benefitCards = [
  'Patients with weight-related health concerns',
  'Patients who have tried lifestyle changes without lasting progress',
  'Patients interested in physician-guided treatment',
  'Patients seeking support with metabolic health',
  'Patients who need ongoing monitoring',
  'Patients preparing for or continuing long-term weight maintenance',
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

function SectionEyebrow({ children }) {
  return (
    <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
      {children}
    </p>
  )
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <motion.div className={`${PAGE_CARD} bg-ht-soft-blue/30 px-4 py-3`} {...getCardHover(useReducedMotion())}>
      <div className="flex items-center gap-3">
        <span className={PAGE_ICON_CIRCLE}>
          <Icon size={16} />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-gray">{label}</p>
          <p className="mt-1 text-base font-bold text-ht-navy">{value}</p>
        </div>
      </div>
    </motion.div>
  )
}

function MedicalWeightLoss() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className={PAGE_HERO}>
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <motion.div {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.03 })}>
            <SectionEyebrow>MEDICAL WEIGHT LOSS</SectionEyebrow>

            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl lg:text-[clamp(3.1rem,4.35vw,4.7rem)] lg:leading-[0.98]">
              Medically supervised weight loss for
              <br className="hidden lg:block" />
              <span className="text-ht-cyan-700"> safe, sustainable progress</span>
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg">
              Healtopia provides physician-guided weight management focused on understanding the medical, metabolic,
              behavioral, and lifestyle factors that can affect weight and overall health.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg">
              Each care plan is personalized and may include medical evaluation, nutrition guidance, body-composition
              analysis, ongoing monitoring, and treatment options when clinically appropriate.
            </p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: 0.32 })}
            >
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap">
                Book Appointment
                <ArrowRight size={16} />
              </Button>
              <Button to="/pricing" variant="secondary" className="whitespace-nowrap">
                View Pricing
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="group relative self-center"
            {...getEntranceProps(reduceMotion, { y: 20, delay: 0.07, duration: 0.55, fromScale: 0.98 })}
          >
            <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(circle_at_top_right,rgba(12,174,200,0.18),transparent_60%)] blur-2xl" />
            <div className={`${PAGE_PANEL_GRADIENT} relative overflow-hidden p-3`}>
              <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white p-4 shadow-inner">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_20%,rgba(12,174,200,0.08),transparent_45%)]" />
                <motion.img
                  src="/images/clinic/seca-body-composition-clean.png"
                  alt="Healtopia body composition scanner and dashboard"
                  className="ht-motion-smooth relative z-10 h-[clamp(18rem,28vw,24.5rem)] w-full object-contain object-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                  animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut', delay: 0.05 }}
                />
              </div>
            </div>

            <motion.div
              className="mt-4 grid gap-3 sm:grid-cols-3"
              {...getStaggerContainer(reduceMotion, { staggerChildren: 0.06, amount: 0.2 })}
            >
              {heroStats.map((item) => (
                <motion.div
                  key={item.label}
                  {...getStaggerItem(reduceMotion, { y: 12 })}
                >
                  <StatCard {...item} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
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

      <section className={PAGE_SECTION}>
        <div className={PAGE_CONTAINER}>
          <SectionHeader
            eyebrow="COMPREHENSIVE CARE"
            title={
              <>
                Weight management that looks beyond the <span className="text-ht-cyan-700">number on the scale</span>
              </>
            }
            description="Healtopia combines medical evaluation, lifestyle support, treatment options, and ongoing monitoring to help patients build a realistic path toward improved health."
          />

          <motion.div
            className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08 })}
          >
            {comprehensiveCare.map((card) => (
              <motion.article
                key={card.title}
                className={`${PAGE_CARD} group flex h-full flex-col border-t-2 border-t-cyan-300 p-6`}
                {...getStaggerItem(reduceMotion, { y: 22 })}
                {...getCardHover(reduceMotion)}
              >
                <div className={PAGE_ICON_CIRCLE}>
                  <card.icon size={18} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-ht-navy">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ht-gray">{card.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

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

              <div className="sm:col-span-2">
                <Button to="/pricing" variant="secondary" className="whitespace-nowrap">
                  Explore Weight Loss Technology
                </Button>
              </div>
            </motion.div>

            <motion.div
              className={`${PAGE_PANEL_GRADIENT} relative overflow-hidden p-3`}
              {...getEntranceProps(reduceMotion, { y: 24, delay: 0.08, duration: 0.55 })}
            >
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_58%_28%,rgba(12,174,200,0.14),transparent_52%)]" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white p-4 shadow-inner">
                <img
                  src="/images/clinic/seca-body-composition-clean.png"
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

      <section className={PAGE_SECTION_SOFT}>
        <div className={PAGE_CONTAINER}>
          <SectionHeader
            eyebrow="WHY HEALTOPIA"
            title={
              <>
                Why patients choose Healtopia for <span className="text-ht-cyan-700">medical weight management</span>
              </>
            }
            description="A physician-guided approach can connect weight management with the broader health factors that influence progress and long-term wellness."
          />

          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.07, amount: 0.2 })}
          >
            {whyHealtopia.map((item) => (
              <motion.article
                key={item.title}
                className={`${PAGE_CARD} group flex h-full flex-col p-6`}
                {...getStaggerItem(reduceMotion, { y: 18 })}
                {...getCardHover(reduceMotion)}
              >
                <div className={PAGE_ICON_CIRCLE}>
                  <item.icon size={18} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ht-navy">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ht-gray">{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={PAGE_SECTION}>
        <div className={PAGE_CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              className={`${PAGE_CARD_SOFT} rounded-[2rem] p-6 md:p-8`}
              {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}
            >
              <SectionHeader
                eyebrow="CONNECTED CARE"
                title={
                  <>
                    Weight care connected to your <span className="text-ht-cyan-700">overall health</span>
                  </>
                }
                description="Weight management is not only about a number on the scale. Healtopia considers metabolism, medical history, lifestyle, chronic conditions, medications, and long-term wellness goals."
              />
              <div className="mt-7 grid gap-3">
                {[
                  'Chronic-condition support',
                  'Preventive health planning',
                  'Care coordination when needed',
                ].map((item) => (
                  <motion.div
                    key={item}
                    className="group flex items-center gap-3 rounded-2xl border border-ht-silver bg-white px-4 py-3 shadow-[0_14px_30px_-28px_rgba(5,42,74,0.4)]"
                    {...getStaggerItem(reduceMotion, { y: 12 })}
                    {...getCardHover(reduceMotion)}
                  >
                    <span className={PAGE_ICON_CIRCLE}>
                      <CheckCircle2 size={16} />
                    </span>
                    <p className="text-sm font-medium text-ht-navy">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="group relative"
              {...getEntranceProps(reduceMotion, { y: 24, delay: 0.08, duration: 0.55, fromScale: 0.98 })}
            >
              <div className={`${PAGE_PANEL_GRADIENT} relative overflow-hidden p-3`}>
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_60%_25%,rgba(12,174,200,0.14),transparent_48%)]" />
                <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white p-4 shadow-inner">
                  <img
                    src="/images/clinic/exam-room-wide.jpg"
                    alt="Healtopia examination room"
                    className="ht-motion-smooth h-[clamp(17rem,30vw,29rem)] w-full rounded-[1.25rem] object-cover object-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-5 left-5 max-w-[18rem] rounded-2xl border border-white/15 bg-white/85 px-4 py-3 text-sm text-ht-navy shadow-[0_16px_34px_-24px_rgba(5,42,74,0.65)] backdrop-blur-md">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
                      Clinical setting
                    </p>
                    <p className="mt-1 leading-relaxed">
                      Care plans supported through in-person evaluation and follow-up.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={PAGE_SECTION_SOFT}>
        <div className={PAGE_CONTAINER}>
          <SectionHeader
            eyebrow="WHO MAY BENEFIT"
            title={
              <>
                Who may benefit from <span className="text-ht-cyan-700">medical weight management</span>?
              </>
            }
            description="Medical weight management may be appropriate for adults who want structured, physician-guided support and a plan connected to their broader health needs."
          />

          <motion.div
            className="mt-8 rounded-[2rem] border border-cyan-100 bg-white p-6 shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)] md:p-7"
            {...getRevealProps(reduceMotion, { y: 20, amount: 0.18 })}
          >
            <p className="max-w-4xl text-base leading-relaxed text-ht-gray md:text-lg">
              Medical weight management may be useful for patients who have struggled with weight changes, have
              weight-related medical conditions, want structured clinical support, or need help evaluating treatment
              options.
            </p>
          </motion.div>

          <motion.div
            className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.06, amount: 0.18 })}
          >
            {benefitCards.map((item) => (
              <motion.article
                key={item}
                className={`${PAGE_CARD} group flex items-start gap-3 px-4 py-4`}
                {...getStaggerItem(reduceMotion, { y: 16 })}
                {...getCardHover(reduceMotion)}
              >
                <span className={PAGE_ICON_CIRCLE}>
                  <CheckCircle2 size={16} />
                </span>
                <p className="text-sm leading-relaxed text-ht-navy">{item}</p>
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

      <section className="bg-ht-soft-blue/20 py-20 sm:py-24 lg:py-28">
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
