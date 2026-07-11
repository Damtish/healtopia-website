import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Button from './Button'
import { getCardHover, getEntranceProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

function ProgramHighlightSection({
  eyebrow,
  title,
  description,
  bullets,
  buttonLabel,
  buttonTo,
  rightTitle,
  rightItems,
  reverse = false,
}) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="border-y border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50 py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-8 lg:grid-cols-[1.04fr_0.96fr] ${reverse ? 'lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1' : ''}`}>
          <motion.div {...getEntranceProps(reduceMotion, { y: 24, delay: 0.05 })}>
            <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700">
              {eyebrow}
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl lg:text-[2.65rem] lg:leading-tight">
              {title}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">{description}</p>

            {bullets?.length ? (
              <motion.ul
                className="mt-7 space-y-3"
                {...getStaggerContainer(reduceMotion, { staggerChildren: 0.07, amount: 0.2 })}
              >
                {bullets.map((bullet) => (
                  <motion.li
                    key={bullet}
                    className="flex items-start gap-3 rounded-2xl border border-ht-silver bg-white/85 px-4 py-3 shadow-[0_16px_34px_-30px_rgba(5,42,74,0.45)] backdrop-blur-sm"
                    {...getStaggerItem(reduceMotion, { y: 16 })}
                    {...getCardHover(reduceMotion)}
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                    <span className="text-sm leading-relaxed text-ht-navy">{bullet}</span>
                  </motion.li>
                ))}
              </motion.ul>
            ) : null}

            {buttonLabel && buttonTo ? (
              <div className="mt-8">
                <Button to={buttonTo} className="whitespace-nowrap">
                  {buttonLabel}
                </Button>
              </div>
            ) : null}
          </motion.div>

          <motion.aside
            className="rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)]"
            {...getEntranceProps(reduceMotion, { y: 24, delay: 0.1, duration: 0.55 })}
          >
            <div className="rounded-[1.5rem] border border-ht-silver bg-ht-soft-blue/15 p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-ht-navy-700">{rightTitle}</p>
              <motion.div className="mt-5 space-y-3" {...getStaggerContainer(reduceMotion, { staggerChildren: 0.07, amount: 0.2 })}>
                {rightItems.map((item, index) => (
                  <motion.div
                    key={`${item.label}-${index}`}
                    className="rounded-2xl border border-ht-silver bg-white px-4 py-4 shadow-[0_14px_30px_-28px_rgba(5,42,74,0.4)]"
                    {...getStaggerItem(reduceMotion, { y: 14 })}
                    {...getCardHover(reduceMotion)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700">
                        <CheckCircle2 size={16} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ht-navy">{item.label}</p>
                        <p className="mt-1 text-sm leading-relaxed text-ht-gray">{item.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

export default ProgramHighlightSection
