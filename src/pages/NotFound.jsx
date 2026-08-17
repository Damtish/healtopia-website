import { motion, useReducedMotion } from 'framer-motion'
import { Home, Mail } from 'lucide-react'
import Button from '../components/Button'
import SectionBadge from '../components/SectionBadge'
import { getEntranceProps } from '../lib/motion'

function NotFound() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="border-b border-ht-silver bg-gradient-to-b from-white via-ht-soft-blue/20 to-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
        <motion.div {...getEntranceProps(reduceMotion, { y: 14, duration: 0.45, delay: 0.03 })}>
          <SectionBadge>404</SectionBadge>
        </motion.div>

        <motion.h1
          className="mt-5 text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl"
          {...getEntranceProps(reduceMotion, { y: 16, duration: 0.45, delay: 0.1 })}
        >
          Page not found
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg"
          {...getEntranceProps(reduceMotion, { y: 16, duration: 0.45, delay: 0.16 })}
        >
          The page you&apos;re looking for may have been moved, renamed, or removed. You can return home or reach out
          if you need help finding the right care page.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          {...getEntranceProps(reduceMotion, { y: 16, duration: 0.45, delay: 0.22 })}
        >
          <Button to="/" className="min-w-44">
            <Home size={16} />
            Return Home
          </Button>
          <Button to="/contact" variant="secondary" className="min-w-44">
            <Mail size={16} />
            Contact Healtopia
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default NotFound

