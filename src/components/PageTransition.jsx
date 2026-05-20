import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { getEntranceProps } from '../lib/motion'

function PageTransition({ children }) {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        {...getEntranceProps(reduceMotion, { y: 12, duration: 0.35 })}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition

