import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, CalendarClock, CreditCard, Heart, Scale, ShieldCheck, Stethoscope, Users } from 'lucide-react'
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
    title: 'Most insurance accepted',
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
      <style>{`
        .why-healtopia-section {
          background:
            radial-gradient(circle at 15% 20%, rgba(65, 205, 225, 0.06), transparent 30%),
            linear-gradient(180deg, #ffffff 0%, #f7fcfe 100%);
          border-top: 1px solid rgba(20, 75, 110, 0.08);
          border-bottom: 1px solid rgba(20, 75, 110, 0.1);
        }

        .why-healtopia-container {
          padding-block: clamp(36px, 4vw, 60px);
        }

        .why-healtopia-heading {
          max-width: 62rem;
          margin-bottom: clamp(16px, 1.8vw, 24px);
        }

        .why-healtopia-heading h2 {
          margin: 10px 0 8px;
          color: #102b50;
          font-size: 30px;
          line-height: 1.15;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .why-healtopia-heading p {
          margin: 0;
          max-width: 62rem;
          color: #607997;
          font-size: 15px;
          line-height: 1.5;
        }

        .why-healtopia-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
        }

        .why-healtopia-card {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr);
          gap: 12px;
          align-items: start;
          min-height: 0;
          padding: 21px;
          background: #ffffff;
          border: 1px solid rgba(186, 214, 231, 0.95);
          border-radius: 22px;
          box-shadow: 0 14px 34px rgba(15, 48, 82, 0.06);
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .why-healtopia-card:hover {
          transform: translateY(-4px);
          border-color: rgba(48, 203, 226, 0.72);
          box-shadow: 0 20px 38px rgba(33, 76, 109, 0.1);
        }

        .why-healtopia-icon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: #e4f8fc;
          color: #188ead;
          flex: 0 0 48px;
        }

        .why-healtopia-card h3 {
          margin: 0 0 7px;
          color: #102b50;
          font-size: 16px;
          line-height: 1.25;
          font-weight: 700;
        }

        .why-healtopia-card p {
          margin: 0;
          color: #607997;
          line-height: 1.45;
          font-size: 14px;
        }

        @media (min-width: 1100px) and (max-height: 850px) {
          .why-healtopia-container {
            padding-block: 30px;
          }

          .why-healtopia-heading {
            margin-bottom: 16px;
          }

          .why-healtopia-heading h2 {
            font-size: 28px;
            margin-top: 8px;
          }

          .why-healtopia-heading p {
            font-size: 14px;
          }

          .why-healtopia-grid {
            gap: 16px;
          }

          .why-healtopia-card {
            padding: 20px;
          }

          .why-healtopia-card p {
            font-size: 13.5px;
            line-height: 1.45;
          }
        }

        @media (max-width: 1199px) {
          .why-healtopia-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .why-healtopia-heading h2 {
            font-size: 28px;
            line-height: 1.15;
          }
        }

        @media (max-width: 680px) {
          .why-healtopia-container {
            padding-block: 28px;
          }

          .why-healtopia-heading h2 {
            font-size: clamp(1.55rem, 7vw, 1.8rem);
            line-height: 1.15;
          }

          .why-healtopia-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .why-healtopia-card {
            min-height: 0;
            padding: 18px;
            border-radius: 20px;
          }
        }
      `}</style>

      <div className={`${PAGE_CONTAINER} why-healtopia-container`}>
        <div className="why-healtopia-heading">
          <p className="inline-flex rounded-full bg-cyan-100 px-3 py-[6px] text-[11px] font-semibold uppercase tracking-[0.14em] text-ht-navy-700">
            WHY HEALTOPIA
          </p>
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
