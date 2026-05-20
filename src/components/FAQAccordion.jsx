import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

function FAQAccordion({ items = [] }) {
  const reduceMotion = useReducedMotion()
  const [openId, setOpenId] = useState(items[0]?.id ?? null)

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id

        return (
          <article key={item.id} className="overflow-hidden rounded-2xl border border-ht-silver bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
            >
              <span className="text-sm font-semibold text-ht-navy md:text-base">{item.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-ht-navy-700 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`faq-panel-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-ht-gray md:text-base">{item.answer}</p>
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

