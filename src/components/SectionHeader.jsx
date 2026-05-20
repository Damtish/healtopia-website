import { motion, useReducedMotion } from 'framer-motion'
import { getRevealProps } from '../lib/motion'

function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  const reduceMotion = useReducedMotion()
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <motion.div className={`max-w-2xl ${alignment}`} {...getRevealProps(reduceMotion, { y: 22, amount: 0.2 })}>
      {eyebrow ? (
        <p className="mb-3 inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-ht-gray md:text-lg">{description}</p> : null}
    </motion.div>
  )
}

export default SectionHeader

