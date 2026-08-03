import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getCardHover, getRevealProps } from '../lib/motion'

function ServiceCard({ title, description, icon: Icon, path, delay = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className="ht-motion-smooth group flex h-full flex-col rounded-2xl border border-ht-silver bg-white p-5 shadow-sm hover:-translate-y-1 hover:shadow-xl"
      {...getRevealProps(reduceMotion, { y: 22, duration: 0.45, amount: 0.3, delay })}
      {...getCardHover(reduceMotion)}
    >
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-ht-navy-700">
        <Icon size={20} />
      </div>
      <h3 className="text-[1.15rem] font-bold text-ht-navy">{title}</h3>
      <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-ht-gray">{description}</p>
      {path ? (
        <Link
          to={path}
          className="ht-motion-smooth mt-4 inline-flex items-center gap-1 text-[0.92rem] font-semibold text-ht-navy-700 group-hover:gap-2"
        >
          Learn more
          <ArrowRight size={15} />
        </Link>
      ) : null}
    </motion.article>
  )
}

export default ServiceCard

