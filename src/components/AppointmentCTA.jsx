import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import Button from './Button'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

function CTAButtonArrow() {
  return <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
}

function AppointmentCTA({
  eyebrow = 'NEXT STEP',
  title = 'Ready to schedule your visit?',
  description = 'Use our secure booking page to choose an appointment type and a convenient time.',
  primaryLabel = 'Book Appointment',
  primaryHref = BOOK_APPOINTMENT_URL,
  primaryTarget = '_blank',
  primaryRel = 'noopener noreferrer',
  secondaryLabel = 'Call Our Office',
  secondaryTo,
  secondaryHref,
  secondaryTarget,
  secondaryRel,
  benefits = [
    { title: 'Convenient scheduling', description: 'Easy booking when you are ready to be seen.' },
    { title: 'Personalized support', description: 'Care plans guided by your goals and follow-up needs.' },
    { title: 'Multiple care options', description: 'A full range of primary care and wellness services.' },
  ],
  className = '',
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`group/cta relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,#0b2545_0%,#0d3558_52%,#09203b_100%)] px-4 pt-9 pb-6 text-white shadow-[0_34px_84px_-50px_rgba(5,42,74,0.92)] sm:px-5 sm:py-7 md:px-7 md:py-8 lg:px-8 lg:py-9 ${className}`}
      {...getRevealProps(reduceMotion, { y: 20, duration: 0.5, amount: 0.18 })}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -3,
              boxShadow: '0 38px 92px -52px rgba(5, 42, 74, 0.95)',
            }
      }
      transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(22,182,212,0.16),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_78%_82%,rgba(22,182,212,0.09),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] ring-1 ring-inset ring-white/10" />

      <div className="relative grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch lg:gap-10">
        <div className="min-w-0">
          <p className="ht-eyebrow border border-cyan-100/24 bg-white/10 text-cyan-100">
            {eyebrow}
          </p>
          <h2 className="ht-heading-2 mt-4 max-w-[48rem] text-white">
            {title}
          </h2>
          <p className="ht-body ht-text-width-section mt-4 text-cyan-100">{description}</p>

          <div className="mt-7 flex flex-col gap-3 md:flex-row md:flex-wrap">
            <Button
              href={primaryHref}
              target={primaryTarget}
              rel={primaryRel}
              className="group w-full min-h-[2.62rem] justify-center whitespace-nowrap md:w-auto md:min-h-12"
            >
              {primaryLabel}
              <CTAButtonArrow />
            </Button>

            {secondaryTo ? (
              <Button
                to={secondaryTo}
                variant="secondary"
                className="w-full min-h-[2.62rem] justify-center whitespace-nowrap md:w-auto md:min-h-12"
              >
                {secondaryLabel}
              </Button>
            ) : (
              <Button
                href={secondaryHref}
                target={secondaryTarget}
                rel={secondaryRel}
                variant="secondary"
                className="w-full min-h-[2.62rem] justify-center whitespace-nowrap md:w-auto md:min-h-12"
              >
                {secondaryLabel}
              </Button>
            )}
          </div>
        </div>

        <motion.div
          className="rounded-[1.75rem] border border-white/8 bg-white/[0.06] p-3.5 shadow-[0_20px_48px_-40px_rgba(5,42,74,0.54)] md:p-4 lg:p-5"
          {...getStaggerContainer(reduceMotion, { staggerChildren: 0.06, amount: 0.18 })}
        >
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="group/benefit flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.08] px-3.5 py-3 shadow-[0_12px_24px_-22px_rgba(5,42,74,0.62)] transition-[transform,background-color,border-color,box-shadow] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-[3px] group-hover/cta:bg-white/[0.11] group-hover/cta:shadow-[0_16px_30px_-24px_rgba(5,42,74,0.68)]"
                style={{ transitionDelay: `${index * 70}ms` }}
                {...getStaggerItem(reduceMotion, { y: 10 })}
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-cyan-100 ring-1 ring-white/10 transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:bg-white group-hover/cta:text-ht-cyan-700">
                  <CheckCircle2 size={16} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.94rem] font-semibold leading-snug text-white">{benefit.title}</p>
                  {benefit.description ? (
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-cyan-100/90">{benefit.description}</p>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AppointmentCTA

