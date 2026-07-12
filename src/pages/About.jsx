import { motion, useReducedMotion } from 'framer-motion'
import { Activity, Heart, ShieldCheck, Users } from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

const expectations = [
  {
    title: 'Time to listen',
    description: 'We take time to understand your concerns, answer questions, and explain your options clearly.',
    icon: Heart,
  },
  {
    title: 'Personalized care plans',
    description: 'Your care plan is guided by your health history, goals, lifestyle, and ongoing needs.',
    icon: ShieldCheck,
  },
  {
    title: 'Prevention-focused care',
    description: 'We help patients stay proactive through wellness visits, screenings, chronic care support, and education.',
    icon: Activity,
  },
  {
    title: 'Support beyond the visit',
    description: 'Our team focuses on follow-up, care coordination, and helping patients feel informed every step of the way.',
    icon: Users,
  },
]

const providers = [
  {
    name: 'Gashaw Adugna, MD',
    role: 'Internal Medicine & Obesity Medicine',
    shortBio:
      'Gashaw Adugna, MD, is a dual board-certified physician in Internal Medicine and Obesity Medicine with over a decade of clinical experience. He focuses on compassionate, evidence-based care, obesity management, preventive health, and long-term wellness.',
    fullBio: [
      'Gashaw Adugna, MD, is a dual board-certified physician in Internal Medicine and Obesity Medicine, known not just for his clinical excellence but for the deep compassion and personal connection he brings to every patient encounter.',
      'Dr. Adugna completed his Internal Medicine residency in New York City, honing his expertise in one of the nation’s most diverse and demanding healthcare settings. Subsequently, he served as a Hospitalist at Anne Arundel Medical Center, where he established a reputation for effectively managing intricate medical cases with exceptional precision and compassion. With over a decade of clinical experience, Dr. Adugna is now implementing a personalized approach to patient care, providing evidence-based, tailored treatments with a strong emphasis on obesity management, preventive health initiatives, and long-term wellness.',
      'Whether patients are looking to take control of their weight, prevent chronic illness, or simply feel their best, Dr. Adugna is committed to walking the journey with them every step of the way.',
    ],
    tags: ['Internal Medicine', 'Obesity Medicine', 'Preventive Care', 'Medical Weight Loss'],
    image: '/images/clinic/reception.jpg',
    imageAlt: 'Healtopia clinic reception area',
  },
  {
    name: 'Malefiya Kenea, FNP-C',
    role: 'Family Nurse Practitioner',
    shortBio:
      'Malefiya Kenea, FNP-C, is a dedicated Family Nurse Practitioner with over 10 years of nursing experience across medical-surgical, ICU, dialysis, urgent care, and primary care settings.',
    fullBio: [
      'Malefiya Kenea, FNP-C, is a dedicated Family Nurse Practitioner with over 10 years of nursing experience across different clinical settings, including medical-surgical, ICU, dialysis, and urgent care. In her current role in primary care, she provides comprehensive care for acute and chronic conditions.',
      'She also emphasizes health promotion, disease prevention, and patient education to support long-term wellness. Malefiya is certified by the American Academy of Nurse Practitioners Certification Board (AANPCB) and is passionate about delivering holistic, patient-centered healthcare that empowers individuals to take an active role in their health.',
    ],
    tags: ['Family Nurse Practitioner', 'Primary Care', 'Chronic Care', 'Patient Education'],
    image: '/images/clinic/reception.jpg',
    imageAlt: 'Healtopia clinic reception area',
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

      <motion.section
        className="border-b border-ht-silver bg-white py-16 lg:py-20"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.18 })}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <AboutSectionHeader
            eyebrow="WHAT TO EXPECT"
            title={
              <>
                Care that feels <span className="text-ht-cyan-700">personal, clear, and connected</span>
              </>
            }
            description="At Healtopia, every visit is designed around listening, communication, and long-term wellness."
          />

          <motion.div
            className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.07, amount: 0.2 })}
          >
            {expectations.map((item) => (
              <motion.article
                key={item.title}
                className="flex h-full flex-col rounded-2xl border border-ht-silver bg-ht-soft-blue/20 px-5 py-5 shadow-[0_16px_34px_-30px_rgba(5,42,74,0.45)]"
                {...getStaggerItem(reduceMotion, { y: 16 })}
                {...getCardHover(reduceMotion)}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100">
                  <item.icon size={18} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ht-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ht-gray">{item.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <AboutSectionHeader
          eyebrow="Providers"
          title="Meet Our Providers"
          description="Care led by the Healtopia clinical team."
        />

        <motion.div
          className="mt-8 grid gap-5 md:grid-cols-2"
          {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08, amount: 0.2 })}
        >
          {providers.map((provider) => (
            <motion.article
              key={provider.name}
              className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ht-silver bg-white shadow-[0_18px_42px_-34px_rgba(5,42,74,0.42)]"
              {...getStaggerItem(reduceMotion, { y: 20 })}
              {...getCardHover(reduceMotion)}
            >
              <div className="overflow-hidden border-b border-ht-silver bg-ht-soft-blue/15">
                <img
                  src={provider.image}
                  alt={provider.imageAlt}
                  className="h-[200px] w-full object-cover object-center sm:h-[210px] lg:h-[220px]"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
                  Provider
                </p>
                <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ht-navy">{provider.name}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-ht-cyan-700">{provider.role}</p>

                <div className="mt-4 space-y-4 text-sm leading-relaxed text-ht-gray md:text-base">
                  {provider.fullBio.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {provider.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex rounded-full border border-cyan-100 bg-ht-soft-blue/40 px-3 py-1 text-xs font-semibold text-ht-navy-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
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
