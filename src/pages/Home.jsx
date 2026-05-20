import { motion } from 'framer-motion'
import {
  BadgeCheck,
  CalendarClock,
  CreditCard,
  ShieldCheck,
  Stethoscope,
  Video,
} from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import SectionHeader from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import ProviderCard from '../components/ProviderCard'
import PricingCard from '../components/PricingCard'
import services, { serviceIconMap } from '../data/services'
import pricingPlans from '../data/pricing'
import { BOOK_APPOINTMENT_URL } from '../constants/links'

const trustItems = ['Primary Care', 'Medical Weight Loss', 'Telehealth Available', 'Insurance Accepted']

const whyChoose = [
  {
    title: 'Personalized Care Plans',
    description: 'We tailor each care plan to your medical history, lifestyle, and long-term goals.',
    icon: Stethoscope,
  },
  {
    title: 'Convenient Access',
    description: 'Flexible in-person and telehealth options make it easier to get care when you need it.',
    icon: CalendarClock,
  },
  {
    title: 'Trusted Clinical Guidance',
    description: 'Evidence-based medicine delivered with empathy, clear communication, and continuity.',
    icon: ShieldCheck,
  },
]

function Home() {
  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="mb-4 inline-flex rounded-full bg-cyan-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700">
              Gambrills, Maryland
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ht-navy md:text-5xl">
              Compassionate Primary Care & Medical Weight Loss in Gambrills, MD
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ht-gray md:text-lg">
              Personalized, accessible care designed around your health, lifestyle, and long-term wellness.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" size="lg">
                Book Appointment
              </Button>
              <Button to="/services" variant="secondary" size="lg">
                Explore Services
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
          >
            <div className="overflow-hidden rounded-[2rem] border border-cyan-200/90 bg-gradient-to-br from-cyan-100 via-ht-soft-blue to-white p-3 shadow-[0_24px_60px_-26px_rgba(12,174,200,0.5)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] border border-cyan-100 bg-white">
                <img
                  src="/images/clinic/reception.jpg"
                  alt="Healtopia clinic reception area"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-5 -left-3 right-3 grid gap-2 sm:grid-cols-2">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-ht-silver bg-white/95 px-3 py-2 text-xs font-semibold text-ht-navy shadow-md"
                >
                  <BadgeCheck size={14} className="text-ht-cyan-700" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-ht-silver bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { label: 'Compassion-first model', icon: HeartIcon },
            { label: 'Board-certified clinicians', icon: ShieldCheck },
            { label: 'Secure telehealth options', icon: Video },
            { label: 'Flexible insurance support', icon: CreditCard },
          ].map((item) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-3 rounded-xl border border-ht-silver bg-ht-soft-blue/40 px-4 py-3"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35 }}
            >
              <item.icon size={18} className="text-ht-cyan-700" />
              <p className="text-sm font-semibold text-ht-navy">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Our Services"
          title="Whole-person healthcare for modern life"
          description="From preventive care to advanced weight management, we deliver practical and compassionate support in every visit."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={serviceIconMap[service.icon]}
              path={service.path}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-ht-silver bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Healtopia"
            title="Trusted care that feels personal"
            description="We focus on relationship-driven care, modern convenience, and consistent communication so you always know what is next in your plan."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {whyChoose.map((item) => (
              <motion.article
                key={item.title}
                className="rounded-2xl border border-ht-silver bg-ht-soft-blue/30 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
              >
                <item.icon size={20} className="text-ht-cyan-700" />
                <h3 className="mt-4 text-xl font-bold text-ht-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ht-gray">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Meet Your Providers"
          title="Care led by the Healtopia clinical team"
          description="Our providers offer primary care and weight management support with a patient-first approach."
        />
        <div className="mt-10 grid gap-5">
          <ProviderCard
            name="Dr. Gashaw Adugna, MD"
            title="Internal Medicine & Obesity Medicine"
            specialties={['Internal Medicine', 'Obesity Medicine']}
          />
          <ProviderCard name="Malefiya Kenea, FNP-C" title="Family Nurse Practitioner" />
        </div>
      </section>

      <section className="border-y border-ht-silver bg-gradient-to-br from-cyan-50 via-white to-ht-soft-blue py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ht-navy-700">
              Medical Weight Loss
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
              Structured, physician-guided support for sustainable results
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ht-gray">
              We combine clinical insight, behavior change, and ongoing accountability to help you lose weight safely
              and maintain progress long term.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ht-gray">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-ht-cyan" />
                Personalized strategy based on labs and health history
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-ht-cyan" />
                Regular progress check-ins and plan adjustments
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-ht-cyan" />
                Clear, supportive coaching for realistic lifestyle change
              </li>
            </ul>
            <Button to="/medical-weight-loss" className="mt-6">
              View Program Details
            </Button>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-ht-silver bg-white p-8 shadow-lg"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-ht-navy">Typical program milestones</h3>
            <div className="mt-5 space-y-4">
              {[
                'Week 1: Intake, lab review, and personalized roadmap',
                'Week 4: Progress evaluation and treatment adjustment',
                'Week 8+: Momentum phase with sustainable routines',
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-xl border border-ht-silver bg-ht-soft-blue/30 px-4 py-3 text-sm text-ht-gray"
                >
                  {step}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Simple Pricing"
          title="Transparent care options"
          description="Review current care options and discuss the best fit during your visit."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </section>

      <section className="border-y border-ht-silver bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Testimonials"
            title="Patient testimonials coming soon"
            description="Verified patient feedback will be published here when available."
          />
          <motion.div
            className="mt-10 rounded-2xl border border-ht-silver bg-ht-soft-blue/30 p-6 text-sm text-ht-gray"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
          >
            We do not publish unverified testimonials. This section will be updated with approved patient feedback.
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <AppointmentCTA />
      </section>
    </div>
  )
}

function HeartIcon(props) {
  return <BadgeCheck {...props} />
}

export default Home
