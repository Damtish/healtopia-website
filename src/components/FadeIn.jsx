import { motion, useReducedMotion } from 'framer-motion'
import { getRevealProps } from '../lib/motion'

function FadeIn({
  as = 'div',
  className,
  children,
  delay = 0,
  duration = 0.5,
  y = 20,
  amount = 0.25,
  once = true,
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      {...getRevealProps(reduceMotion, { delay, duration, y, amount, once })}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

export default FadeIn

