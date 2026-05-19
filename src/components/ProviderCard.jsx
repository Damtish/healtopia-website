import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

function ProviderCard({ name, title, bio, specialties = [] }) {
  return (
    <motion.article
      className="rounded-3xl border border-ht-silver bg-white p-6 shadow-sm md:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-200 via-cyan-100 to-white px-3 text-center text-xs font-semibold text-ht-navy-700">
          Provider photo coming soon.
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-ht-navy-700">Provider Spotlight</p>
          <h3 className="mt-2 text-2xl font-bold text-ht-navy">{name}</h3>
          <p className="text-sm font-medium text-ht-gray">{title}</p>
          {bio ? <p className="mt-4 text-sm leading-relaxed text-ht-gray md:text-base">{bio}</p> : null}
          {specialties.length ? (
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {specialties.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-ht-navy-700">
                  <CheckCircle2 size={16} className="text-ht-cyan" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}

export default ProviderCard

