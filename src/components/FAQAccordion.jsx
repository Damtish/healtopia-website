import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { EASE_OUT } from '../lib/motion'

function FAQAccordion({ items = [] }) {
  const reduceMotion = useReducedMotion()
  const [openId, setOpenId] = useState(items[0]?.id ?? null)

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id

        return (
          <article
            key={item.id}
            className={`ht-motion-smooth overflow-hidden rounded-2xl border bg-white shadow-[0_14px_34px_-30px_rgba(5,42,74,0.42)] ${
              isOpen ? 'border-cyan-200 bg-ht-soft-blue/30' : 'border-ht-silver'
            }`}
          >
            <button
              type="button"
              className="ht-motion-smooth flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left hover:bg-ht-soft-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ht-cyan focus-visible:ring-inset"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
            >
              <span className="ht-heading-3 text-ht-navy">{item.question}</span>
              <ChevronDown
                size={18}
                className={`ht-motion-smooth shrink-0 text-ht-cyan-700 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`faq-panel-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE_OUT }}
                >
                  <div className="relative px-4 pb-4">
                    <div className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-cyan-200/80" />
                    <p className="ht-body pl-4 text-ht-gray">{item.answer}</p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        )
      })}
    </div>
  )
}

export default FAQAccordion

