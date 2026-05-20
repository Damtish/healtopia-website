import { motion, useReducedMotion } from 'framer-motion'
import Button from './Button'
import { getCardHover, getRevealProps } from '../lib/motion'

function PricingCard({
  name,
  price,
  cadence,
  priceLines = [],
  description,
  features = [],
  featured = false,
  ctaLabel = 'Get Started',
  ctaTo = '/contact',
  delay = 0,
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className={`flex h-full flex-col rounded-3xl border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-7 ${
        featured
          ? 'border-cyan-300 bg-gradient-to-b from-cyan-50 via-white to-white'
          : 'border-ht-silver bg-white'
      }`}
      {...getRevealProps(reduceMotion, { y: 24, duration: 0.45, amount: 0.25, delay })}
      {...getCardHover(reduceMotion)}
    >
      <h3 className="text-2xl font-bold text-ht-navy">{name}</h3>

      {price ? (
        <p className="mt-2 text-4xl font-extrabold text-ht-navy">
          {price}
          {cadence ? <span className="ml-1 text-base font-medium text-ht-gray">{cadence}</span> : null}
        </p>
      ) : null}

      {priceLines.length ? (
        <ul className="mt-5 space-y-2 text-sm text-ht-gray">
          {priceLines.map((line) => (
            <li key={line} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-ht-cyan" aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {description ? <p className="mt-4 text-sm text-ht-gray">{description}</p> : null}

      {features.length ? (
        <ul className="mt-6 space-y-2 text-sm text-ht-gray">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-ht-cyan" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <Button to={ctaTo} variant={featured ? 'primary' : 'secondary'} className="mt-6 w-full">
        {ctaLabel}
      </Button>
    </motion.article>
  )
}

export default PricingCard
