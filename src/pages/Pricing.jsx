import { motion, useReducedMotion } from 'framer-motion'
import SectionBadge from '../components/SectionBadge'
import {
  ArrowRight,
  Check,
  CircleDollarSign,
  Scale,
  ShieldCheck,
  Stethoscope,
  Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import NextStepSection from '../components/NextStepSection'
import CompareOptionsSection from '../components/CompareOptionsSection'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import {
  PAGE_BADGE,
  PAGE_CONTAINER,
  PAGE_HERO,
  PAGE_ICON_CIRCLE,
  PAGE_PANEL_GRADIENT,
  PAGE_SECTION,
  PAGE_SECTION_SOFT,
} from '../lib/pageStyles'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

function SectionEyebrow({ children }) {
  return <SectionBadge>{children}</SectionBadge>
}

const dpcPlans = [
  {
    name: 'Individual',
    monthlyFee: '$75',
    enrollmentFee: '$100',
    notes: 'Adults age 18–64',
    badge: 'Popular',
  },
  {
    name: 'Individual + Spouse',
    monthlyFee: '$130',
    enrollmentFee: '$150',
    notes: 'Up to age 64',
    badge: 'Family option',
  },
  {
    name: 'Child Add-on',
    monthlyFee: '$50',
    enrollmentFee: 'N/A',
    notes: 'With enrolled parent(s)',
  },
  {
    name: 'Individual (65+)',
    monthlyFee: '$130',
    enrollmentFee: '$100',
    notes: 'Adults age 65 and above',
  },
]

const conciergePricing = [
  { label: 'Annual membership', amount: '$2000' },
  { label: 'Six-month membership', amount: '$1100' },
  { label: 'Three-month membership', amount: '$550' },
  { label: 'Monthly membership', amount: '$200' },
]

const weightLossPricing = [
  { label: 'Initial evaluation and consultation', amount: '$300' },
  { label: 'Follow-up visit every 4 weeks', amount: '$75' },
]

const heroRows = [
  {
    icon: CircleDollarSign,
    title: 'Membership care',
    text: 'Transparent monthly options for patients who want direct primary care.',
  },
  {
    icon: ShieldCheck,
    title: 'Insurance-based care',
    text: 'Traditional primary care visits through Medicare, Medicaid, most commercial plans, and self-pay.',
  },
  {
    icon: Scale,
    title: 'Medical weight loss',
    text: 'Physician-guided support with clear pricing for visits and follow-up care.',
  },
]

const trustIndicators = [
  {
    icon: Check,
    label: 'Clear monthly fees',
  },
  {
    icon: Check,
    label: 'Multiple care options',
  },
  {
    icon: Check,
    label: 'Insurance and self-pay available',
  },
]

function PricingPlanCard({ plan, index }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className="group flex h-full flex-col rounded-[2rem] border border-ht-silver bg-white p-5 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] sm:p-6"
      {...getStaggerItem(reduceMotion, { y: 20 })}
      {...getCardHover(reduceMotion)}
    >
      <div className="border-t-2 border-cyan-300 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-gray">Plan {index + 1}</p>
            <h3 className="mt-2 text-xl font-bold leading-tight text-ht-navy">{plan.name}</h3>
          </div>
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 ring-1 ring-cyan-100 transition-transform duration-300 group-hover:scale-105">
            <CircleDollarSign size={18} />
          </div>
        </div>

        {plan.badge ? <span className={`${PAGE_BADGE} mt-4`}>{plan.badge}</span> : null}
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ht-gray">Monthly fee</p>
        <p className="mt-1 text-4xl font-extrabold leading-none text-ht-navy">{plan.monthlyFee}</p>
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-sm text-ht-gray">
          <span className="font-semibold text-ht-navy">Enrollment fee: </span>
          {plan.enrollmentFee}
        </p>
        <p className="rounded-2xl bg-ht-soft-blue/35 px-3 py-2 text-sm leading-relaxed text-ht-navy">{plan.notes}</p>
      </div>

      <Link
        to="/direct-primary-care"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ht-navy-700 transition-transform duration-300 group-hover:gap-2"
      >
        Choose plan
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </motion.article>
  )
}

function Pricing() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className={PAGE_HERO}>
        <div className={`${PAGE_CONTAINER} grid gap-8 py-14 sm:py-16 lg:grid-cols-[1.04fr_0.96fr] lg:py-18`}>
          <motion.div {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.03 })}>
            <SectionEyebrow>PRICING</SectionEyebrow>

            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl lg:text-[clamp(3.2rem,4.4vw,4.8rem)] lg:leading-[0.98]">
              Simple, transparent pricing for <span className="text-ht-cyan-700">every care option</span>
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg">
              Compare Direct Primary Care, Concierge Medicine, Medical Weight Loss, and insurance-based primary care
              in one place. We keep the details clear so patients can choose the care option that fits their needs.
            </p>

            <div className="mt-8 flex flex-col gap-3 md:flex-row md:flex-wrap">
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" className="w-full whitespace-nowrap md:w-auto">
                Book Appointment
              </Button>
              <Button href="#dpc-pricing" variant="secondary" className="w-full whitespace-nowrap md:w-auto">
                Explore Plans
              </Button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {trustIndicators.map((item) => (
                <motion.div
                  key={item.label}
                  className="group flex items-center gap-3 rounded-2xl border border-ht-silver bg-white/85 px-4 py-3 shadow-[0_14px_30px_-28px_rgba(5,42,74,0.4)]"
                  {...getStaggerItem(reduceMotion, { y: 12 })}
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 ring-1 ring-cyan-100 transition-transform duration-300 group-hover:scale-105">
                    <item.icon size={16} />
                  </span>
                  <p className="text-sm font-medium text-ht-navy">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            className={`${PAGE_PANEL_GRADIENT} relative self-center overflow-hidden p-3`}
            {...getEntranceProps(reduceMotion, { y: 20, delay: 0.08, duration: 0.55, fromScale: 0.98 })}
          >
            <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(12,174,200,0.18),transparent_60%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white p-5 shadow-inner sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ht-navy-700">Plan overview</p>
              <div className="mt-5 space-y-3">
                {heroRows.map((row) => (
                  <motion.div
                    key={row.title}
                    className="group flex items-start gap-3 rounded-2xl border border-ht-silver bg-ht-soft-blue/25 px-4 py-4 shadow-[0_14px_30px_-28px_rgba(5,42,74,0.4)]"
                    {...getCardHover(reduceMotion)}
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ht-cyan-700 ring-1 ring-cyan-100 transition-transform duration-300 group-hover:scale-105">
                      <row.icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-ht-navy">{row.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ht-gray">{row.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="dpc-pricing" className={`${PAGE_SECTION_SOFT} scroll-mt-28`}>
        <div className={PAGE_CONTAINER}>
          <div className="max-w-4xl">
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
              DPC Memberships <span className="text-ht-cyan-700">Pricing</span>
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-ht-gray md:text-lg">
              Direct Primary Care offers simple monthly membership options for patients who want easier access,
              transparent pricing, and a stronger relationship with their care team.
            </p>
          </div>

          <motion.div
            className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08, amount: 0.18 })}
          >
            {dpcPlans.map((plan, index) => (
              <PricingPlanCard key={plan.name} plan={plan} index={index} />
            ))}
          </motion.div>

          <motion.div
            className="mt-6 rounded-[1.5rem] border border-cyan-100 bg-white/85 px-4 py-4 shadow-[0_16px_34px_-30px_rgba(5,42,74,0.45)] sm:px-5"
            {...getRevealProps(reduceMotion, { y: 16, amount: 0.2 })}
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 ring-1 ring-cyan-100">
                <Wallet size={18} />
              </span>
              <p className="text-sm leading-relaxed text-ht-gray md:text-base">
                Small business packages available.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="concierge-pricing" className={`${PAGE_SECTION} scroll-mt-28`}>
        <div className={PAGE_CONTAINER}>
          <div className="max-w-4xl">
            <SectionEyebrow>CONCIERGE MEDICINE</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
              Concierge Medicine <span className="text-ht-cyan-700">Services</span>
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-ht-gray md:text-lg">
              Membership-based concierge care for patients who want enhanced access, longer visits, and a more
              personalized experience.
            </p>
          </div>

          <motion.div
            className="mt-10 grid gap-5 lg:grid-cols-3"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08, amount: 0.15 })}
          >
            <motion.article
              className="group flex h-full flex-col rounded-[2rem] border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
              {...getCardHover(reduceMotion)}
              {...getStaggerItem(reduceMotion, { y: 22 })}
            >
              <div className="border-t-2 border-cyan-300 pt-4">
                <div className="flex items-center gap-3">
                  <span className={PAGE_ICON_CIRCLE}>
                    <Stethoscope size={18} />
                  </span>
                  <h3 className="text-[1.7rem] font-bold leading-tight text-ht-navy">Membership pricing</h3>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ht-gray md:text-base">
                {conciergePricing.map((item) => (
                  <li key={item.label} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                    <span>
                      {item.label}: <span className="font-semibold text-ht-navy">{item.amount}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-2xl bg-ht-soft-blue/35 px-3 py-2 text-sm leading-relaxed text-ht-navy">
                25% discount for immediate family members (spouse and/or children)
              </p>
              <Link
                to="/concierge-care"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ht-navy-700 transition-transform duration-300 group-hover:gap-2"
              >
                View concierge care
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.article>

            <motion.article
              id="medical-weight-loss-pricing"
              className="group flex h-full flex-col rounded-[2rem] border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
              {...getCardHover(reduceMotion)}
              {...getStaggerItem(reduceMotion, { y: 22 })}
            >
              <div className="border-t-2 border-cyan-300 pt-4">
                <div className="flex items-center gap-3">
                  <span className={PAGE_ICON_CIRCLE}>
                    <Scale size={18} />
                  </span>
                  <h3 className="text-[1.7rem] font-bold leading-tight text-ht-navy">Medical Weight Loss Services</h3>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ht-gray md:text-base">
                {weightLossPricing.map((item) => (
                  <li key={item.label} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                    <span>
                      {item.label}: <span className="font-semibold text-ht-navy">{item.amount}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-2xl bg-ht-soft-blue/35 px-3 py-2 text-sm leading-relaxed text-ht-gray md:text-base">
                Patients are responsible for medications, additional tests, and lab work if not covered by insurance.
              </p>
              <Link
                to="/medical-weight-loss"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ht-navy-700 transition-transform duration-300 group-hover:gap-2"
              >
                View weight loss details
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.article>

            <motion.article
              id="insurance-based-care-pricing"
              className="group flex h-full flex-col rounded-[2rem] border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
              {...getCardHover(reduceMotion)}
              {...getStaggerItem(reduceMotion, { y: 22 })}
            >
              <div className="border-t-2 border-cyan-300 pt-4">
                <div className="flex items-center gap-3">
                  <span className={PAGE_ICON_CIRCLE}>
                    <ShieldCheck size={18} />
                  </span>
                  <h3 className="text-[1.7rem] font-bold leading-tight text-ht-navy">Primary Care Services</h3>
                </div>
              </div>
              <div className="mt-5 inline-flex rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-ht-navy-700">
                Insurance-based care
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ht-gray md:text-base">
                We accept Medicare, Medicaid, and most commercial insurance plans. Affordable self-pay options are
                also available.
              </p>
              <Link
                to="/insurance-based-primary-care"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ht-navy-700 transition-transform duration-300 group-hover:gap-2"
              >
                View insurance-based care
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.article>
          </motion.div>

          <p className="mt-4 text-sm leading-relaxed text-ht-gray">
            Subject to change without prior notice*
          </p>
        </div>
      </section>

      <CompareOptionsSection />

      <NextStepSection
            title="Need help choosing the right care option?"
            description="Compare your options or speak with our office before scheduling."
            secondaryLabel="Call Our Office"
            secondaryHref="tel:+14107746678"
            benefits={[
              {
                title: 'Clear pricing',
                description: 'Straightforward options so you know what to expect.',
              },
              {
                title: 'Multiple care options',
                description: 'Membership, insurance-based, concierge, and weight loss care.',
              },
              {
                title: 'Insurance and self-pay availability',
                description: 'Flexible ways to access care based on your situation.',
              },
            ]}
          />
    </div>
  )
}

export default Pricing









