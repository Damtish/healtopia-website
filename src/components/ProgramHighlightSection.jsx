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
    <section className="border-y border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50 py-14 lg:py-18">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid items-start gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8 ${reverse ? 'lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1' : ''}`}
        >
          <motion.div className="self-start" {...getEntranceProps(reduceMotion, { y: 24, delay: 0.05 })}>
            <p className="ht-eyebrow bg-cyan-100 text-ht-navy-700">
              {eyebrow}
            </p>

            <h2 className="ht-heading-2 mt-4 max-w-[48rem]">
              {title}
            </h2>

            <p className="ht-body ht-text-width-section mt-5 text-ht-gray">{description}</p>

            {bullets?.length ? (
              <motion.ul
                className="mt-6 space-y-3"
                {...getStaggerContainer(reduceMotion, { staggerChildren: 0.07, amount: 0.2 })}
              >
                {bullets.map((bullet) => (
                  <motion.li
                    key={bullet}
                    className="ht-motion-smooth group flex items-start gap-3 rounded-2xl border border-ht-silver bg-white/90 px-3.5 py-2.5 shadow-[0_16px_34px_-30px_rgba(5,42,74,0.45)] backdrop-blur-sm"
                    {...getStaggerItem(reduceMotion, { y: 16 })}
                    {...getCardHover(reduceMotion)}
                  >
                    <span className="ht-motion-smooth mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 group-hover:scale-105">
                      <CheckCircle2 size={18} />
                    </span>
                    <span className="text-sm leading-relaxed text-ht-navy">{bullet}</span>
                  </motion.li>
                ))}
              </motion.ul>
            ) : null}

            {buttonLabel && buttonTo ? (
              <div className="mt-6 flex justify-start">
                <Button to={buttonTo} className="self-start whitespace-nowrap">
                  {buttonLabel}
                </Button>
              </div>
            ) : null}
          </motion.div>

          <motion.aside
            className="self-start rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)]"
            {...getEntranceProps(reduceMotion, { y: 24, delay: 0.1, duration: 0.55 })}
          >
            <div className="rounded-[1.5rem] border border-ht-silver bg-ht-soft-blue/15 p-5 sm:p-6">
              <p className="ht-eyebrow bg-cyan-100 text-ht-navy-700">{rightTitle}</p>
              <motion.div className="mt-5 space-y-3" {...getStaggerContainer(reduceMotion, { staggerChildren: 0.07, amount: 0.2 })}>
                {rightItems.map((item, index) => (
                  <motion.div
                    key={`${item.label}-${index}`}
                    className="ht-motion-smooth group rounded-2xl border border-ht-silver bg-white px-4 py-3.5 shadow-[0_14px_30px_-28px_rgba(5,42,74,0.4)]"
                    {...getStaggerItem(reduceMotion, { y: 14 })}
                    {...getCardHover(reduceMotion)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="ht-motion-smooth mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700 group-hover:scale-105">
                        <CheckCircle2 size={15} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ht-navy">{item.label}</p>
                    <p className="mt-1 ht-body text-ht-gray">{item.text}</p>
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
