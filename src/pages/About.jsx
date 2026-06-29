import { motion, useReducedMotion } from 'framer-motion'
import { Activity, Award, Heart, ShieldCheck, Star, Users } from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const values = [
  {
    title: 'Compassion',
    description: 'We treat every patient with kindness, empathy, and respect.',
    icon: Heart,
  },
  {
    title: 'Trust',
    description: 'We believe strong healthcare begins with honest communication and lasting relationships.',
    icon: ShieldCheck,
  },
  {
    title: 'Excellence',
    description: 'We are committed to high-quality, evidence-based care.',
    icon: Award,
  },
  {
    title: 'Prevention',
    description: 'We focus on helping patients protect their long-term health.',
    icon: Activity,
  },
  {
    title: 'Patient-Centered Care',
    description: "We design care around each patient's needs, goals, and life.",
    icon: Users,
  },
]

function AboutSectionHeader({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">{description}</p> : null}
    </div>
  )
}

function About() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            {...getEntranceProps(reduceMotion, { y: 18, duration: 0.45, delay: 0.03 })}
          >
            <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700">
              ABOUT HEALTOPIA
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl">
              Healthcare built on time, <span className="text-ht-cyan-700">trust</span>, and lasting relationships
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg">
              Compassionate, personalized healthcare focused on building lasting relationships with every patient and
              family we serve.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Button href={BOOK_APPOINTMENT_URL} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap">
                Book Appointment
              </Button>
              <Button href="tel:+14105550199" variant="secondary" className="whitespace-nowrap">
                Call Our Office
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_24px_60px_-34px_rgba(5,42,74,0.45)]"
            {...getEntranceProps(reduceMotion, { y: 24, delay: 0.12, duration: 0.55 })}
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-ht-silver bg-ht-soft-blue/20">
              <img
                src="/images/clinic/reception.jpg"
                alt="Healtopia clinic reception area"
                className="h-64 w-full object-cover object-center sm:h-80 lg:h-[26rem]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <motion.div
            className="rounded-[2rem] border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] md:p-8"
            {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}
          >
            <AboutSectionHeader
              eyebrow="Our Story"
              title="Our Story"
              description="After years of caring for patients in traditional healthcare settings, we envisioned a practice where appointments were not rushed, prevention was prioritized, and patients could build lasting relationships with their healthcare team. Healtopia was created to make that vision a reality."
            />
          </motion.div>

          <motion.div
            className="rounded-[2rem] border border-ht-silver bg-ht-soft-blue/20 p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] md:p-8"
            {...getRevealProps(reduceMotion, { y: 24, amount: 0.2, delay: 0.05 })}
          >
            <AboutSectionHeader
              eyebrow="Our Mission"
              title={
                <>
                  Our <span className="text-ht-cyan-700">Mission</span>
                </>
              }
              description="Our mission is to provide high-quality, affordable, evidence-based healthcare with compassion, integrity, and respect while helping our patients achieve healthier lives through preventive care and long-term partnerships."
            />
          </motion.div>
        </div>
      </section>

      <section className="border-y border-ht-silver bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <AboutSectionHeader
            eyebrow="Values"
            title={
              <>
                Our <span className="text-ht-cyan-700">Values</span>
              </>
            }
            description="The principles that guide how we care for patients, families, and the community."
          />
          <motion.div
            className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08 })}
          >
            {values.map((value) => (
              <motion.article
                key={value.title}
                className="rounded-2xl border border-ht-silver bg-ht-soft-blue/20 p-6 text-center shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)]"
                {...getStaggerItem(reduceMotion, { y: 22 })}
                {...getCardHover(reduceMotion)}
              >
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-ht-cyan-700 shadow-sm">
                  <value.icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ht-navy">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ht-gray">{value.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <AboutSectionHeader
            eyebrow="Providers"
            title="Meet Our Providers"
            description="A placeholder provider card is shown below until the real provider bio is approved by the Healtopia team."
          />
        <motion.div
          className="mt-10 overflow-hidden rounded-[2rem] border border-ht-silver bg-white shadow-[0_22px_52px_-34px_rgba(5,42,74,0.45)]"
          {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}
        >
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex min-h-[240px] items-center justify-center bg-gradient-to-br from-cyan-100 via-ht-soft-blue to-white p-8 text-center">
              <div className="max-w-xs rounded-[1.5rem] border border-white/80 bg-white/85 px-6 py-10 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-ht-navy-700">Provider Photo Coming Soon</p>
                <p className="mt-3 text-sm leading-relaxed text-ht-gray">
                  A provider photo will be added here once approved by the Healtopia team.
                </p>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-ht-navy-700">Provider Spotlight</p>
              <h3 className="mt-2 text-3xl font-bold text-ht-navy">Provider Bio Coming Soon</h3>
              <p className="mt-2 text-sm font-medium text-ht-gray">Healtopia Primary Care & Medical Weight Loss</p>
              <p className="mt-5 text-sm leading-relaxed text-ht-gray md:text-base">
                A full provider biography will be added here once approved by the Healtopia team.
              </p>
              <blockquote className="mt-6 border-l-4 border-ht-cyan-700 bg-ht-soft-blue/20 px-4 py-4 text-sm leading-relaxed text-ht-navy md:text-base">
                “I believe every patient deserves the time to ask questions and fully understand their health. My goal
                is to build lasting relationships and provide care that supports long-term wellness.”
              </blockquote>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-ht-silver bg-ht-soft-blue/20 py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <motion.div
            className="rounded-[2rem] border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] md:p-8"
            {...getRevealProps(reduceMotion, { y: 24, amount: 0.2 })}
          >
            <AboutSectionHeader
              eyebrow="Our Approach"
              title={
                <>
                  Our Approach to <span className="text-ht-cyan-700">Care</span>
                </>
              }
              description="We believe the best healthcare begins with listening. We take the time to understand your concerns, explain treatment options clearly, and develop care plans tailored to your goals. Whether you are visiting for preventive care, chronic disease management, or an unexpected illness, our focus is on building a trusted, long-term relationship."
            />
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-[2rem] border border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50 p-3 shadow-[0_22px_52px_-34px_rgba(5,42,74,0.45)]"
            {...getEntranceProps(reduceMotion, { y: 24, delay: 0.1, duration: 0.55 })}
          >
            <div className="h-[280px] overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white sm:h-[340px] lg:h-[420px]">
              <img
                src="/images/clinic/hallway.jpg"
                alt="Healtopia clinic hallway"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <AppointmentCTA
          eyebrow="Next step"
          title="Ready to experience personalized primary care?"
          description="Use our secure booking page to choose an appointment type and a convenient time."
          buttonLabel="Book Appointment"
        />
      </section>
    </div>
  )
}

export default About
