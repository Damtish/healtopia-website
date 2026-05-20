import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getCardHover, getRevealProps } from '../lib/motion'

function ServiceCard({ title, description, icon: Icon, path, delay = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className="group flex h-full flex-col rounded-2xl border border-ht-silver bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      {...getRevealProps(reduceMotion, { y: 22, duration: 0.45, amount: 0.3, delay })}
      {...getCardHover(reduceMotion)}
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-ht-navy-700">
        <Icon size={22} />
      </div>
      <h3 className="text-xl font-bold text-ht-navy">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ht-gray">{description}</p>
      {path ? (
        <Link
          to={path}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ht-navy-700 transition group-hover:gap-2"
        >
          Learn more
          <ArrowRight size={16} />
        </Link>
      ) : null}
    </motion.article>
  )
}

export default ServiceCard

