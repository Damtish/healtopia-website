import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  CalendarClock,
  HeartPulse,
  MapPin,
  Phone,
  Scale,
  ShieldCheck,
  Stethoscope,
  Users2,
} from 'lucide-react'
import Button from '../components/Button'
import SectionBadge from '../components/SectionBadge'
import SectionHeader from '../components/SectionHeader'
import AppointmentCTA from '../components/AppointmentCTA'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { SITE_ADDRESS, SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from '../constants/site'
import { PAGE_CONTAINER, PAGE_HERO, PAGE_SECTION, PAGE_SECTION_SOFT } from '../lib/pageStyles'
import { getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const careFeatures = [
  {
    title: 'Preventive care',
    description: 'Annual visits, screenings, wellness planning, and practical health guidance.',
    icon: ShieldCheck,
  },
  {
    title: 'Chronic disease management',
    description: 'Ongoing support for blood pressure, diabetes, cholesterol, asthma, and more.',
    icon: HeartPulse,
  },
  {
    title: 'Acute non-emergency visits',
    description: 'Same-day style support when available for common medical concerns.',
    icon: CalendarClock,
  },
  {
    title: 'Care coordination',
    description: 'Follow-up, referrals, and communication that keeps your care connected.',
    icon: Users2,
  },
]

const serviceCards = [
  {
    title: 'Direct Primary Care',
    description: 'Membership-based primary care with longer visits, direct access, and transparent pricing.',
    to: '/direct-primary-care',
    icon: Stethoscope,
  },
  {
    title: 'Medical Weight Loss',
    description: 'Physician-guided weight management with personalized plans and ongoing monitoring.',
    to: '/medical-weight-loss',
    icon: Scale,
  },
  {
    title: 'Concierge Medicine',
    description: 'Enhanced access, proactive planning, and a more connected care experience.',
    to: '/concierge-care',
    icon: HeartPulse,
  },
]

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ht-navy-700">
      {children}
    </span>
  )
}

function Gambrills() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className={PAGE_HERO}>
        <div className={`${PAGE_CONTAINER} grid gap-10 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:py-20`}>
          <motion.div {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: 0.03 })}>
            <SectionBadge>Gambrills, Maryland</SectionBadge>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl lg:text-6xl">
              Primary Care &amp; Medical Weight Loss in Gambrills, Maryland
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ht-gray">
              Healtopia serves patients in Gambrills and nearby communities with personalized primary care,
              Direct Primary Care, insurance-based care, concierge medicine, and physician-guided medical weight
              loss.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
                Book Appointment
              </Button>
              <Button to="/contact" variant="secondary">
                Contact Healtopia
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-[2rem] border border-cyan-100 bg-white shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)]"
            {...getRevealProps(reduceMotion, { y: 18, duration: 0.5, amount: 0.2, delay: 0.08 })}
          >
            <div className="grid gap-0 lg:grid-cols-[1.12fr_0.88fr]">
              <div className="overflow-hidden">
                <img
                  src="/images/clinic/building-exterior-optimized.jpg"
                  alt="Healtopia clinic exterior in Gambrills, Maryland"
                  className="h-full min-h-[18rem] w-full object-cover object-center lg:min-h-[30rem]"
                  loading="eager"
                  decoding="async"
                  width="1200"
                  height="900"
                />
              </div>
              <div className="flex flex-col justify-between gap-5 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,251,253,0.92))] p-6 lg:p-7">
                <div>
                  <Pill>Location</Pill>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-ht-navy-700">
                    2614 Chapel Lake Drive<br />
                    Gambrills, MD 21054
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ht-gray">
                    A local care destination for patients in Gambrills, Crofton, Odenton, Bowie, Millersville, and
                    Anne Arundel County.
                  </p>
                </div>

                <div className="grid gap-3">
                  <a
                    href={SITE_PHONE_TEL}
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-4 py-2 text-sm font-semibold text-ht-navy shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 hover:text-ht-cyan-700"
                  >
                    <Phone size={16} />
                    {SITE_PHONE_DISPLAY}
                  </a>
                  <Button to="/services" variant="secondary" className="justify-center">
                    Explore Services
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={PAGE_SECTION}>
        <div className={PAGE_CONTAINER}>
          <SectionHeader
            eyebrow="Primary Care in Gambrills"
            title={
              <>
                Everyday care that stays centered on <span className="text-ht-cyan-700">you</span>
              </>
            }
            description="Our primary care approach focuses on prevention, practical follow-up, and clear communication so you always know what comes next."
          />

          <motion.div
            className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08, amount: 0.22 })}
          >
            {careFeatures.map((feature) => (
              <motion.article
                key={feature.title}
                className="ht-motion-smooth flex h-full flex-col rounded-2xl border border-ht-silver bg-white p-5 shadow-sm"
                {...getStaggerItem(reduceMotion, { y: 16 })}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-ht-cyan-700">
                  <feature.icon size={20} />
                </div>
                <h3 className="mt-4 text-[1.1rem] font-bold text-ht-navy">{feature.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ht-gray">{feature.description}</p>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            {...getRevealProps(reduceMotion, { y: 18, duration: 0.45, amount: 0.2 })}
          >
            <Button to="/insurance-based-primary-care">
              View Insurance-Based Primary Care
            </Button>
            <Button to="/direct-primary-care" variant="secondary">
              View Direct Primary Care
            </Button>
          </motion.div>
        </div>
      </section>

      <section className={PAGE_SECTION_SOFT}>
        <div className={PAGE_CONTAINER}>
          <SectionHeader
            eyebrow="Care Options"
            title={
              <>
                The Healtopia services patients in Gambrills <span className="text-ht-cyan-700">can use</span>
              </>
            }
            description="Whether you want traditional insurance-based visits, a membership-based model, or physician-guided weight loss, you can explore the option that fits your goals."
          />

          <motion.div
            className="mt-10 grid gap-5 lg:grid-cols-3"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08, amount: 0.24 })}
          >
            {serviceCards.map((card) => (
              <motion.article
                key={card.title}
                className="ht-motion-smooth flex h-full flex-col rounded-2xl border border-ht-silver bg-white p-5 shadow-sm"
                {...getStaggerItem(reduceMotion, { y: 16 })}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-ht-cyan-700">
                  <card.icon size={20} />
                </div>
                <h3 className="mt-4 text-[1.1rem] font-bold text-ht-navy">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ht-gray">{card.description}</p>
                <Button to={card.to} variant="secondary" className="mt-5 justify-center">
                  Learn more
                  <ArrowRight size={15} />
                </Button>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={PAGE_SECTION}>
        <div className={`${PAGE_CONTAINER} grid gap-6 lg:grid-cols-[1.1fr_0.9fr]`}>
          <motion.div
            className="rounded-[2rem] border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] lg:p-8"
            {...getRevealProps(reduceMotion, { y: 18, duration: 0.45, amount: 0.2 })}
          >
            <SectionBadge>Meet the Team</SectionBadge>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy">
              Connect with the clinicians behind the care
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ht-gray">
              Learn more about the providers who care for Healtopia patients. If you are planning a visit, the
              About page includes the full team introduction and provider bios.
            </p>
            <div className="mt-6">
              <Button to="/about#providers">
                Meet Our Providers
                <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="rounded-[2rem] border border-cyan-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,251,253,0.88))] p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] lg:p-8"
            {...getRevealProps(reduceMotion, { y: 18, duration: 0.45, amount: 0.2, delay: 0.05 })}
          >
            <SectionBadge>Location &amp; Service Area</SectionBadge>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ht-navy-700">Healtopia</p>
                <p className="mt-2 text-base leading-relaxed text-ht-gray">
                  {SITE_ADDRESS.streetAddress}
                  <br />
                  {SITE_ADDRESS.addressLocality}, {SITE_ADDRESS.addressRegion} {SITE_ADDRESS.postalCode}
                </p>
              </div>
              <div className="flex items-start gap-3 text-sm leading-relaxed text-ht-gray">
                <MapPin size={18} className="mt-0.5 shrink-0 text-ht-cyan-700" />
                <p>
                  Patients visit from Gambrills and nearby communities including Crofton, Odenton, Bowie,
                  Millersville, and across Anne Arundel County.
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-ht-navy">
                <Phone size={18} className="text-ht-cyan-700" />
                <a href={SITE_PHONE_TEL} className="transition hover:text-ht-cyan-700">
                  {SITE_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className={PAGE_CONTAINER}>
          <AppointmentCTA
            title={
              <>
                Ready to <span className="text-cyan-100">book</span> care in Gambrills?
              </>
            }
          />
        </div>
      </section>
    </div>
  )
}

export default Gambrills
