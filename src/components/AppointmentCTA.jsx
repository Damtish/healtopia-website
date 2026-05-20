import { motion, useReducedMotion } from 'framer-motion'
import Button from './Button'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getRevealProps } from '../lib/motion'

function AppointmentCTA({ className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`mx-auto max-w-5xl rounded-3xl border border-ht-silver bg-gradient-to-r from-ht-navy to-ht-navy-700 px-6 py-8 text-white shadow-lg md:px-8 md:py-10 ${className}`}
      {...getRevealProps(reduceMotion, { y: 24, duration: 0.45, amount: 0.2 })}
    >
      <h3 className="text-2xl font-bold tracking-tight md:text-3xl">Ready to schedule your visit?</h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cyan-100 md:text-base">
        Use our secure booking page to choose an appointment type and a convenient time.
      </p>
      <div className="mt-6">
        <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" size="lg">
          Book Appointment
        </Button>
      </div>
    </motion.div>
  )
}

export default AppointmentCTA

