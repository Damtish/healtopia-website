import { CheckCircle2, ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import Button from './Button'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getEntranceProps, getStaggerItem } from '../lib/motion'

function CTAButtonArrow() {
  return <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
}

export default function NextStepSection({
  eyebrow = 'TAKE THE NEXT STEP',
  title = 'Experience a better healthcare relationship',
  description = 'Whether you’re looking for primary care, medical weight loss, concierge medicine, or insurance-based care, Healtopia offers personalized care designed around your health and long-term wellness.',
  primaryLabel = 'Book Appointment',
  primaryHref = BOOK_APPOINTMENT_URL,
  primaryTarget = '_blank',
  primaryRel = 'noopener noreferrer',
  secondaryLabel = 'View Pricing',
  secondaryTo = '/pricing',
  secondaryHref,
  secondaryTarget,
  secondaryRel,
  benefits = [
    {
      title: 'Personalized care options',
      description: 'Care designed around your individual health needs.',
    },
    {
      title: 'Convenient scheduling',
      description: 'Flexible access to care when you need it.',
    },
    {
      title: 'Support beyond the appointment',
      description: 'Ongoing guidance focused on your long-term health.',
    },
  ],
}) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="border-b border-ht-silver bg-gradient-to-br from-ht-navy via-[#0b2d4a] to-ht-navy py-16 text-white lg:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:px-8">
        <motion.div {...getEntranceProps(reduceMotion, { y: 18, duration: 0.48 })}>
          <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">{description}</p>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:flex-wrap">
            <Button href={primaryHref} target={primaryTarget} rel={primaryRel} className="w-full whitespace-nowrap md:w-auto">
              {primaryLabel}
              <CTAButtonArrow />
            </Button>
            {secondaryTo ? (
              <Button
                to={secondaryTo}
                variant="secondary"
                className="w-full whitespace-nowrap border-white/15 bg-white/95 text-ht-navy hover:border-cyan-300 hover:bg-white md:w-auto"
              >
                {secondaryLabel}
              </Button>
            ) : (
              <Button
                href={secondaryHref}
                target={secondaryTarget}
                rel={secondaryRel}
                variant="secondary"
                className="w-full whitespace-nowrap border-white/15 bg-white/95 text-ht-navy hover:border-cyan-300 hover:bg-white md:w-auto"
              >
                {secondaryLabel}
              </Button>
            )}
          </div>
        </motion.div>

        <motion.div
          className="self-center rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-[0_24px_52px_-36px_rgba(5,42,74,0.5)] backdrop-blur-sm"
          {...getEntranceProps(reduceMotion, { y: 20, duration: 0.48, delay: 0.04 })}
        >
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {benefits.map((item, index) => (
              <motion.div
                key={item.title}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3"
                {...getStaggerItem(reduceMotion, { y: 10 })}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.12] text-white">
                  <CheckCircle2 size={16} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white/90">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
