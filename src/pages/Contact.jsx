import { motion, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import AppointmentCTA from '../components/AppointmentCTA'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

function Contact() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700" {...getEntranceProps(reduceMotion, { y: 16, duration: 0.45, delay: 0.03 })}>
            Contact
          </motion.p>
          <motion.h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl" {...getEntranceProps(reduceMotion, { y: 20, delay: 0.1 })}>
            Schedule care, ask questions, or connect with our team
          </motion.h1>
          <motion.p className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg" {...getEntranceProps(reduceMotion, { y: 20, delay: 0.2 })}>
            We are here to help with appointment scheduling, insurance verification, and care program questions.
          </motion.p>
          <motion.div className="mt-7" {...getEntranceProps(reduceMotion, { y: 18, delay: 0.3, duration: 0.45 })}>
            <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
              Book Appointment
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Reach us the way that works best for you"
          description="Call, email, or visit us. For scheduling, use our secure online booking link."
        />

        <motion.div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3" {...getStaggerContainer(reduceMotion, { staggerChildren: 0.1 })}>
          {[
            {
              title: 'Call Us',
              content: '410-774-6678\n410-847-7890',
              icon: Phone,
              links: [
                { label: '410-774-6678', href: 'tel:+14107746678' },
                { label: '410-847-7890', href: 'tel:+14108477890' },
              ],
            },
            {
              title: 'Email',
              content: 'info@healtopiamed.com',
              icon: Mail,
              links: [{ label: 'info@healtopiamed.com', href: 'mailto:info@healtopiamed.com' }],
            },
            {
              title: 'Visit',
              content: '2614 Chapel Lake Dr, Gambrills, MD 21054',
              icon: MapPin,
            },
          ].map((item) => (
            <motion.article
              key={item.title}
              className="rounded-2xl border border-ht-silver bg-white p-6"
              {...getStaggerItem(reduceMotion, { y: 24 })}
              {...getCardHover(reduceMotion)}
            >
              <item.icon size={20} className="text-ht-cyan-700" />
              <h3 className="mt-4 text-xl font-bold text-ht-navy">{item.title}</h3>
              {item.links ? (
                <div className="mt-2 space-y-1">
                  {item.links.map((phone) => (
                    <a key={phone.href} href={phone.href} className="block text-sm font-medium text-ht-gray hover:text-ht-navy">
                      {phone.label}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-ht-gray">{item.content}</p>
              )}
            </motion.article>
          ))}
        </motion.div>
        <motion.div {...getRevealProps(reduceMotion, { y: 22, amount: 0.2 })}>
          <AppointmentCTA className="mt-10" />
        </motion.div>
      </section>
    </div>
  )
}

export default Contact
