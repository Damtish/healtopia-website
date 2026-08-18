import { motion, useReducedMotion } from 'framer-motion'

function PageLoader() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="flex min-h-[calc(100vh-var(--header-height,76px))] w-full items-center justify-center bg-white px-4"
      role="status"
      aria-label="Loading page"
    >
      <motion.div
        className="flex flex-col items-center gap-6 text-center"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: 'easeOut' }}
      >
        <img
          src="/images/healtopia-logo.webp"
          alt="Healtopia"
          width="164"
          height="164"
          className="h-20 w-auto object-contain sm:h-24"
          decoding="async"
        />

        <div className="flex flex-col items-center gap-2">
          <div className="relative h-1.5 w-[112px] overflow-hidden rounded-full bg-cyan-100/80 sm:w-[128px]">
            {reduceMotion ? (
              <div className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-ht-cyan-700" />
            ) : (
              <motion.div
                className="absolute inset-y-0 left-0 w-12 rounded-full bg-ht-cyan-700 shadow-[0_0_18px_rgba(12,174,200,0.35)]"
                animate={{ x: ['-110%', '220%'] }}
                transition={{
                  duration: 1.2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 0.25,
                }}
              />
            )}
          </div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ht-cyan-700/80">
            Healtopia
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default PageLoader
