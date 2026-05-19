import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function ServiceCard({ title, description, icon: Icon, path }) {
  return (
    <motion.article
      className="group flex h-full flex-col rounded-2xl border border-ht-silver bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
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

