import { motion, useReducedMotion } from 'framer-motion'
import { getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'
import insuranceLogos from '../data/insurance'

function Insurance() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pb-20 lg:pt-28">
          <motion.p
            className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700"
            {...getEntranceProps(reduceMotion, { y: 16, duration: 0.45, delay: 0.03 })}
          >
            Insurance
          </motion.p>
          <motion.h1
            className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl"
            {...getEntranceProps(reduceMotion, { y: 20, delay: 0.1 })}
          >
            Insurance-friendly care with transparent benefit support
          </motion.h1>
          <motion.p
            className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg"
            {...getEntranceProps(reduceMotion, { y: 20, delay: 0.2 })}
          >
            We help verify your coverage before your visit so you can plan confidently and avoid billing surprises.
          </motion.p>
        </div>
      </section>

      <section className="bg-ht-soft-blue/25">
        <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-12 text-center sm:px-6 lg:pb-24 lg:pt-14">
          <h2 className="text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
            Accepted Insurance Plans
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-ht-gray md:text-base">
            We currently accept many major insurance plans and also offer affordable cash payment options. Please
            contact our team to confirm your coverage before your visit.
          </p>

          <motion.div
            className="mx-auto mt-7 grid max-w-4xl grid-cols-2 items-center justify-items-center gap-x-7 gap-y-6 md:grid-cols-3 lg:grid-cols-3"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.03, amount: 0.12 })}
          >
            {insuranceLogos.map((plan) => (
              <motion.article
                key={plan.src}
                className="flex w-full items-center justify-center"
                {...getStaggerItem(reduceMotion, { y: 16 })}
                aria-label={plan.name}
              >
                <img
                  src={plan.src}
                  alt={plan.alt}
                  className={`h-auto w-auto max-h-[42px] max-w-[170px] object-contain ${plan.sizeClass ?? ''}`}
                  loading="lazy"
                />
              </motion.article>
            ))}
          </motion.div>

          <motion.p
            className="mx-auto mt-7 inline-flex rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-ht-gray"
            {...getRevealProps(reduceMotion, { y: 14, amount: 0.2 })}
          >
            * Except UHC Community Plan
          </motion.p>
        </div>
      </section>
    </div>
  )
}

export default Insurance

