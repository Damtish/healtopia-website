import { motion, useReducedMotion } from 'framer-motion'
import SectionBadge from './SectionBadge'
import { PAGE_BADGE, PAGE_CONTAINER, PAGE_SECTION_SOFT } from '../lib/pageStyles'
import { getCardHover, getStaggerContainer, getStaggerItem } from '../lib/motion'

const comparisonPlans = [
  {
    title: 'Direct Primary Care',
    paymentModel: 'Monthly membership',
    bestFor: 'Patients who want simpler primary care and easier access',
    appointmentStyle: 'Unrushed, relationship-based primary care',
    insuranceUse: 'Membership services are not billed to insurance',
    mainBenefit: 'Predictable access with transparent pricing',
    accent: 'Membership-based',
  },
  {
    title: 'Concierge Medicine',
    paymentModel: 'Membership / retainer',
    bestFor: 'Patients seeking premium access and longer visits',
    appointmentStyle: 'Personalized visits and priority scheduling when available',
    insuranceUse: 'Membership fees are generally separate from insurance',
    mainBenefit: 'Enhanced access and personalized support',
    accent: 'Premium access',
  },
  {
    title: 'Medical Weight Loss',
    paymentModel: 'Visit-based program',
    bestFor: 'Patients wanting physician-guided weight management',
    appointmentStyle: 'Evaluation and follow-up visits with progress monitoring',
    insuranceUse: 'Coverage varies by service, plan, and medical need',
    mainBenefit: 'Structured treatment with clinical monitoring',
    accent: 'Weight management',
  },
  {
    title: 'Insurance-Based Care',
    paymentModel: 'Insurance + self-pay',
    bestFor: 'Patients who want traditional primary care visits',
    appointmentStyle: 'Routine and problem-focused primary care visits',
    insuranceUse: 'Accepts Medicare, Medicaid, and most commercial plans',
    mainBenefit: 'Familiar coverage with flexible self-pay options',
    accent: 'Traditional care',
  },
]

function PricingComparisonCard({ plan }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className="group flex h-full flex-col rounded-[2rem] border border-ht-silver bg-white p-5 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] sm:p-6"
      {...getStaggerItem(reduceMotion, { y: 18 })}
      {...getCardHover(reduceMotion)}
    >
      <div className="border-t-2 border-cyan-300 pt-4">
        <span className={PAGE_BADGE}>{plan.accent}</span>
        <h3 className="mt-3 text-xl font-bold text-ht-navy">{plan.title}</h3>
      </div>

      <dl className="mt-5 space-y-3">
        {[
          ['Payment model', plan.paymentModel],
          ['Best for', plan.bestFor],
          ['Appointment style', plan.appointmentStyle],
          ['Insurance use', plan.insuranceUse],
          ['Key benefit', plan.mainBenefit],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-ht-soft-blue/25 px-4 py-3">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-gray">{label}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-ht-navy">{value}</dd>
          </div>
        ))}
      </dl>
    </motion.article>
  )
}

export default function CompareOptionsSection() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className={`${PAGE_SECTION_SOFT} scroll-mt-28`}
      id="pricing-comparison"
      {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08, amount: 0.18 })}
    >
      <div className={PAGE_CONTAINER}>
        <SectionBadge>CARE OPTIONS</SectionBadge>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
          How the care options <span className="text-ht-cyan-700">differ</span>
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-ht-gray md:text-lg">
          A simple side-by-side view can help you compare payment style, visit experience, and how each option fits
          your care goals.
        </p>

        <motion.div
          className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08, amount: 0.18 })}
        >
          {comparisonPlans.map((plan) => (
            <PricingComparisonCard key={plan.title} plan={plan} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}











