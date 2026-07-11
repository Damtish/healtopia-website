import { motion, useReducedMotion } from 'framer-motion'
import { Check, CircleDollarSign, CreditCard, Scale, ShieldCheck, Stethoscope, Users, Wallet } from 'lucide-react'
import AppointmentCTA from '../components/AppointmentCTA'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const conciergeItems = [
  { label: 'Annual membership:', amount: '$2000' },
  { label: 'Six-month membership:', amount: '$1100' },
  { label: 'Three-month membership:', amount: '$550' },
  { label: 'Monthly membership:', amount: '$200' },
]

const weightLossItems = [
  { label: 'Initial evaluation and consultation:', amount: '$300' },
  { label: 'Follow-up visit every 4 weeks:', amount: '$75' },
]

const dpcRows = [
  {
    planType: 'Individual',
    monthlyFee: '$75',
    enrollmentFee: '$100',
    notes: 'Adults age 18-64',
    badge: 'Popular',
  },
  {
    planType: 'Individual + Spouse',
    monthlyFee: '$130',
    enrollmentFee: '$150',
    notes: 'Up to age 64',
    badge: 'Family option',
  },
  { planType: 'Child Add-on', monthlyFee: '$50', enrollmentFee: 'N/A', notes: 'With enrolled parent(s)' },
  { planType: 'Individual (65+)', monthlyFee: '$130', enrollmentFee: '$100', notes: 'Adults age 65 and above' },
]

const pricingOverviewCards = [
  {
    title: 'Transparent pricing',
    description: 'Clear pricing helps patients understand their care options before they book.',
    icon: Wallet,
  },
  {
    title: 'Flexible care options',
    description:
      'Choose from membership-based care, insurance-based primary care, concierge medicine, and medical weight loss services.',
    icon: Users,
  },
  {
    title: 'Insurance accepted',
    description: 'Healtopia accepts many major insurance plans and also offers self-pay options.',
    icon: CreditCard,
  },
]

function Pricing() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto w-full max-w-[88rem] px-4 pb-14 pt-24 sm:px-6 lg:px-8 lg:pb-16 lg:pt-28">
          <motion.p
            className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700"
            {...getEntranceProps(reduceMotion, { y: 16, duration: 0.45, delay: 0.03 })}
          >
            Pricing
          </motion.p>
          <motion.h1
            className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl lg:text-[3.5rem]"
            {...getEntranceProps(reduceMotion, { y: 20, delay: 0.1 })}
          >
            Pricing & <span className="text-ht-cyan-700">Membership</span>
          </motion.h1>
          <motion.p
            className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg"
            {...getEntranceProps(reduceMotion, { y: 20, delay: 0.2 })}
          >
            Transparent care options designed to support your health, access, and long-term wellness.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[88rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <motion.div
          className="grid gap-5 md:grid-cols-3"
          {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08, amount: 0.18 })}
        >
          {pricingOverviewCards.map((card) => (
            <motion.article
              key={card.title}
              className="rounded-3xl border border-ht-silver bg-white p-5 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] transition-all duration-300 md:p-6"
              {...getStaggerItem(reduceMotion, { y: 18 })}
              {...getCardHover(reduceMotion)}
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 text-ht-cyan-700">
                <card.icon size={18} />
              </div>
              <h2 className="mt-4 text-lg font-bold text-ht-navy">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ht-gray">{card.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section id="dpc-pricing" className="border-y border-ht-silver bg-ht-soft-blue/35">
        <div className="mx-auto w-full max-w-[88rem] px-4 pb-12 pt-16 sm:px-6 lg:px-8 lg:pb-14 lg:pt-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
            DPC Memberships <span className="text-ht-cyan-700">Pricing</span>
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-ht-gray md:text-lg">
            Direct Primary Care offers simple monthly membership options for patients who want easier access,
            transparent pricing, and a stronger relationship with their care team.
          </p>

          <motion.div
            className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08, amount: 0.15 })}
          >
            {dpcRows.map((row) => (
              <motion.article
                key={row.planType}
                className="group flex h-full flex-col rounded-3xl border border-ht-silver bg-white p-5 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-md md:p-6"
                {...getStaggerItem(reduceMotion, { y: 22 })}
                {...getCardHover(reduceMotion)}
              >
                <div className="border-t-2 border-cyan-200 pt-3.5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-ht-cyan-700">
                      <CircleDollarSign size={18} />
                    </span>
                    <h3 className="text-xl font-bold text-ht-navy">{row.planType}</h3>
                  </div>
                  {row.badge ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ht-cyan-700">
                        {row.badge}
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold uppercase tracking-wide text-ht-gray">Monthly Fee</p>
                  <p className="mt-1 text-4xl font-extrabold leading-none text-ht-navy">{row.monthlyFee}</p>
                </div>

                <div className="mt-5 flex-1">
                  <p className="text-sm text-ht-gray">
                    <span className="font-semibold text-ht-navy">Enrollment Fee: </span>
                    {row.enrollmentFee}
                  </p>
                </div>

                <div className="mt-5 inline-flex rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-ht-navy-700">
                  {row.notes}
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="mt-7 inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-sm font-semibold text-ht-cyan-700"
            {...getRevealProps(reduceMotion, { y: 14, amount: 0.2 })}
          >
            Small business packages available
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[88rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <motion.div
          className="grid gap-5 lg:grid-cols-3 lg:gap-6"
          {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08, amount: 0.15 })}
        >
          <motion.article
            id="concierge-pricing"
            className="flex h-full flex-col rounded-3xl border border-ht-silver bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-7"
            {...getStaggerItem(reduceMotion, { y: 22 })}
            {...getCardHover(reduceMotion)}
          >
            <div className="mb-5 flex items-center gap-3 border-t-2 border-cyan-200 pt-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 text-ht-cyan-700">
                <Stethoscope size={18} />
              </span>
              <h2 className="text-[1.7rem] font-bold leading-tight text-ht-navy">Concierge Medicine Services</h2>
            </div>
            <ul className="space-y-3 text-base text-ht-gray">
              {conciergeItems.map((item) => (
                <li key={item.label} className="flex items-start gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                  <span>
                    {item.label} <span className="font-semibold text-ht-navy">{item.amount}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-cyan-50 px-3 py-2 text-sm leading-relaxed text-ht-navy-700 md:text-base">
              25% discount for immediate family members (spouse and/or children)
            </p>
          </motion.article>

          <motion.article
            className="flex h-full flex-col rounded-3xl border border-ht-silver bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-7"
            {...getStaggerItem(reduceMotion, { y: 22 })}
            {...getCardHover(reduceMotion)}
          >
            <div className="mb-5 flex items-center gap-3 border-t-2 border-cyan-200 pt-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 text-ht-cyan-700">
                <Scale size={18} />
              </span>
              <h2 className="text-[1.7rem] font-bold leading-tight text-ht-navy">Medical Weight Loss Services</h2>
            </div>
            <ul className="space-y-3 text-base text-ht-gray">
              {weightLossItems.map((item) => (
                <li key={item.label} className="flex items-start gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                  <span>
                    {item.label} <span className="font-semibold text-ht-navy">{item.amount}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-cyan-50 px-3 py-2 text-sm leading-relaxed text-ht-gray md:text-base">
              Patients are responsible for the cost of medications, additional tests, and lab work if these are not covered by their insurance.
            </p>
          </motion.article>

          <motion.article
            className="flex h-full flex-col rounded-3xl border border-ht-silver bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-7"
            {...getStaggerItem(reduceMotion, { y: 22 })}
            {...getCardHover(reduceMotion)}
          >
            <div className="mb-5 flex items-center gap-3 border-t-2 border-cyan-200 pt-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 text-ht-cyan-700">
                <ShieldCheck size={18} />
              </span>
              <h2 className="text-[1.7rem] font-bold leading-tight text-ht-navy">Primary care services</h2>
            </div>
            <div className="mb-4 inline-flex rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-ht-navy-700">
              Insurance-based care
            </div>
            <p className="text-sm leading-relaxed text-ht-gray md:text-base">
              For traditional fee-for-service primary care, we accept Medicare, Medicaid, and most commercial
              insurance plans. Affordable self-pay options are also available.
            </p>
            <p className="mt-5 rounded-xl bg-cyan-50 px-3 py-2 text-sm leading-relaxed text-ht-gray md:text-base">
              Affordable self-pay options are also available.
            </p>
          </motion.article>
        </motion.div>

        <motion.p
          className="mt-7 text-sm font-semibold text-ht-cyan-700"
          {...getRevealProps(reduceMotion, { y: 16, amount: 0.2 })}
        >
          Subject to change without prior notice*
        </motion.p>
      </section>

      <section className="mx-auto w-full max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <AppointmentCTA />
      </section>
    </div>
  )
}

export default Pricing
