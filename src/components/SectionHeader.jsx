import { motion, useReducedMotion } from 'framer-motion'
import { getRevealProps } from '../lib/motion'

function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  const reduceMotion = useReducedMotion()
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <motion.div className={`max-w-[48rem] ${alignment}`} {...getRevealProps(reduceMotion, { y: 22, amount: 0.2 })}>
      {eyebrow ? (
        <p className="ht-eyebrow mb-3 bg-cyan-100 text-ht-navy-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="ht-heading-2">{title}</h2>
      {description ? <p className="ht-body ht-text-width-section mt-4 text-ht-gray">{description}</p> : null}
    </motion.div>
  )
}

export default SectionHeader

