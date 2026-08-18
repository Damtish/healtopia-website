import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getCardHover, getRevealProps } from '../lib/motion'

function ProviderCard({
  name,
  title,
  bio,
  summary,
  specialties = [],
  delay = 0,
  imageSrc = '',
  imageAlt = '',
  imageClassName = '',
  imageFrameClassName = '',
  placeholderText = 'Provider photo coming soon.',
  bioHref = '',
  className = '',
}) {
  const reduceMotion = useReducedMotion()
  const description = summary || bio

  return (
    <motion.article
      className={`ht-motion-smooth h-full rounded-3xl border border-ht-silver bg-white p-5 shadow-sm md:p-6 ${className}`}
      {...getRevealProps(reduceMotion, { y: 24, duration: 0.5, amount: 0.2, delay })}
      {...getCardHover(reduceMotion)}
    >
      <div className="flex h-full flex-col gap-5 md:flex-row md:items-start">
        {imageSrc ? (
          <div
            className={`ht-motion-smooth h-40 w-28 shrink-0 overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-[0_12px_26px_-20px_rgba(5,42,74,0.45)] md:h-48 md:w-36 ${imageFrameClassName}`}
          >
            <img
              src={imageSrc}
              alt={imageAlt || name}
              width="400"
              height="500"
              className={`ht-motion-smooth h-full w-full object-cover object-[center_12%] ${imageClassName}`}
              decoding="async"
            />
          </div>
        ) : (
          <div
            className={`ht-motion-smooth flex h-40 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-100 via-ht-soft-blue to-white px-3 text-center shadow-[0_12px_26px_-20px_rgba(5,42,74,0.45)] md:h-48 md:w-36 ${imageFrameClassName}`}
          >
            <div className="space-y-2">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100">
                <CheckCircle2 size={18} />
              </div>
              <p className="ht-eyebrow text-ht-navy-700">{placeholderText}</p>
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col justify-center">
          <p className="ht-eyebrow bg-cyan-100 text-ht-navy-700">Provider Spotlight</p>
          <h3 className="mt-2">{name}</h3>
          <p className="text-[0.92rem] font-medium text-ht-gray">{title}</p>
          {description ? <p className="ht-body mt-4 text-ht-gray">{description}</p> : null}
          {specialties.length ? (
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {specialties.map((item) => (
                <div key={item} className="flex items-center gap-2 text-[0.92rem] text-ht-navy-700">
                  <CheckCircle2 size={15} className="text-ht-cyan" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : null}
          {bioHref ? (
            <Link
              to={bioHref}
              className="ht-motion-smooth mt-4 inline-flex items-center gap-1 text-[0.92rem] font-semibold text-ht-cyan-700 hover:text-ht-cyan-800"
            >
              View Full Bio <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}

export default ProviderCard
