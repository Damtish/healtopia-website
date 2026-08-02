import { motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

function PageTransition({ children }) {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      key={location.pathname}
      className="w-full"
      initial={false}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.18, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition

