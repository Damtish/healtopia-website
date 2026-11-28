import { motion } from 'framer-motion'
import useReducedMotion from '../lib/useReducedMotionSafe'
import { BadgeCheck, CalendarClock, CreditCard, Heart, Scale, ShieldCheck, Stethoscope, Users } from 'lucide-react'
import SectionBadge from './SectionBadge'
import { PAGE_CONTAINER } from '../lib/pageStyles'
import { getCardHover, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const whyBenefits = [
  {
    title: 'Affordable healthcare option with Direct Primary Care',
    description: 'A membership-based care option built to keep primary care more approachable and transparent.',
    icon: Stethoscope,
  },
  {
    title: 'Personalized care with attention to detail',
    description: 'Care is tailored to your history, goals, and the details that matter most to your health.',
    icon: Heart,
  },
  {
    title: 'Same-week appointments when available',
    description: 'When availability allows, we aim to offer convenient access for timely primary care needs.',
    icon: CalendarClock,
  },
  {
    title: 'After-hours appointments when available',
    description: 'When available, additional appointment times can help patients with busy schedules.',
    icon: CalendarClock,
  },
  {
    title: 'Many major insurance plans accepted',
    description: 'Healtopia accepts many major insurance plans and also offers self-pay options.',
    icon: CreditCard,
  },
  {
    title: 'Preventive care focus',
    description: 'Preventive care is a core part of our approach to helping patients stay ahead of problems.',
    icon: BadgeCheck,
  },
  {
    title: 'Chronic disease management',
    description: 'Ongoing support for common long-term conditions with careful monitoring and follow-up.',
    icon: ShieldCheck,
  },
  {
    title: 'Medical weight loss services',
    description: 'Physician-guided weight loss support with evaluation, follow-up visits, and treatment options.',
    icon: Scale,
  },
  {
    title: 'Concierge medicine services',
    description: 'Enhanced access, longer visits, and a more personalized care experience for qualifying patients.',
    icon: Users,
  },
]

export default function WhyHealtopiaSection() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className="why-healtopia-section border-b border-ht-silver"
      {...getRevealProps(reduceMotion, { y: 16, duration: 0.55, amount: 0.18 })}
    >

      <div className={`${PAGE_CONTAINER} why-healtopia-container`}>
        <div className="why-healtopia-heading">
          <SectionBadge>
            WHY HEALTOPIA
          </SectionBadge>
          <h2>Trusted care that feels personal</h2>
          <p>Thoughtful care, experienced clinicians, and a welcoming practice built around the patient experience.</p>
        </div>

        <motion.div className="why-healtopia-grid" {...getStaggerContainer(reduceMotion, { staggerChildren: 0.06, amount: 0.18 })}>
          {whyBenefits.map((item) => (
            <motion.article
              key={item.title}
              className="why-healtopia-card group"
              {...getStaggerItem(reduceMotion, { y: 14 })}
              {...getCardHover(reduceMotion)}
            >
              <div className="why-healtopia-icon transition duration-300 group-hover:bg-ht-cyan-700 group-hover:text-white">
                <item.icon size={18} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
