import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Heart,
  ShieldCheck,
  Star,
  Stethoscope,
  Scale,
  Users,
} from 'lucide-react'
import Button from '../components/Button'
import AppointmentCTA from '../components/AppointmentCTA'
import ProgramHighlightSection from '../components/ProgramHighlightSection'
import SectionHeader from '../components/SectionHeader'
import HomeProviderShowcase from '../components/HomeProviderShowcase'
import PricingCard from '../components/PricingCard'
import pricingPlans from '../data/pricing'
import insuranceLogos from '../data/insurance'
import { testimonials } from '../data/testimonials'
import { BOOK_APPOINTMENT_URL } from '../constants/links'
import { PAGE_SECTION, PAGE_SECTION_CTA } from '../lib/pageStyles'
import { getCardHover, getEntranceProps, getRevealProps, getStaggerContainer, getStaggerItem } from '../lib/motion'

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

const heroServiceBadges = [
  { label: 'Direct Primary Care', to: '/direct-primary-care' },
  { label: 'Insurance-based Primary Care', to: '/insurance-based-primary-care' },
  { label: 'Concierge Medicine', to: '/concierge-care' },
  { label: 'Medical Weight Loss', to: '/medical-weight-loss' },
]

const serviceOverviewCards = [
  {
    title: 'Direct Primary Care',
    subtitle: 'Relationship-based primary care',
    points: ['Longer appointments', 'Transparent membership option'],
    link: '/direct-primary-care',
    label: 'View DPC Details',
    icon: Stethoscope,
  },
  {
    title: 'Insurance-Based Care',
    subtitle: 'Traditional insurance visits',
    points: ['Preventive care', 'Chronic disease management'],
    link: '/insurance-based-primary-care',
    label: 'View Insurance-Based Care',
    icon: ShieldCheck,
  },
  {
    title: 'Medical Weight Loss',
    subtitle: 'Physician-guided treatment',
    points: ['Personalized plans', 'Long-term support'],
    link: '/medical-weight-loss',
    label: 'Explore Weight Loss',
    icon: Scale,
  },
  {
    title: 'Concierge Medicine',
    subtitle: 'Enhanced access',
    points: ['Priority scheduling', 'Highly personalized care'],
    link: '/concierge-care',
    label: 'View Concierge Details',
    icon: Users,
  },
]

const careHighlights = [
  {
    eyebrow: 'DIRECT PRIMARY CARE',
    title: (
      <>
        Simple membership care with more time and <span className="text-ht-cyan-700">direct access</span>
      </>
    ),
    description: 'Direct Primary Care is a membership-based option designed to make primary care more personal, accessible, and transparent.',
    bullets: [
      'Predictable monthly membership pricing',
      'Longer visits focused on your full health story',
      'Direct communication and easier follow-up',
    ],
    buttonLabel: 'View DPC Details',
    buttonTo: '/direct-primary-care',
    rightTitle: 'What DPC offers',
    rightItems: [
      { label: 'Start', text: 'Free initial consultation and membership review' },
      { label: 'Ongoing', text: 'Preventive care, sick visits, and chronic care support' },
      { label: 'Long term', text: 'A stronger relationship with your care team' },
    ],
    reverse: false,
  },
  {
    eyebrow: 'INSURANCE-BASED CARE',
    title: (
      <>
        Traditional primary care using your <span className="text-ht-cyan-700">accepted insurance</span>
      </>
    ),
    description:
      'Insurance-based primary care supports routine visits, preventive care, chronic disease management, and non-emergency concerns through accepted insurance plans.',
    bullets: [
      'Wellness visits, screenings, and preventive care',
      'Chronic disease management and follow-up support',
      'Acute visits for non-emergency medical concerns',
    ],
    buttonLabel: 'View Insurance-Based Care',
    buttonTo: '/insurance-based-primary-care',
    rightTitle: 'Care through insurance',
    rightItems: [
      { label: 'Routine care', text: 'Wellness visits and preventive screenings' },
      { label: 'Ongoing care', text: 'Chronic condition management and follow-up' },
      { label: 'When needed', text: 'Non-emergency sick visits and care coordination' },
    ],
    reverse: true,
  },
  {
    eyebrow: 'CONCIERGE MEDICINE',
    title: (
      <>
        Premium care with <span className="text-ht-cyan-700">personalized support</span>
      </>
    ),
    description:
      'Concierge Medicine is designed for patients who want a more connected, proactive, and personalized healthcare experience.',
    bullets: [
      'Longer, more personalized visits',
      'Priority scheduling when available',
      'Preventive wellness planning and care coordination',
    ],
    buttonLabel: 'View Concierge Details',
    buttonTo: '/concierge-care',
    rightTitle: 'Concierge care experience',
    rightItems: [
      { label: 'Access', text: 'Direct communication and priority scheduling when available' },
      { label: 'Planning', text: 'Personalized wellness and prevention support' },
      { label: 'Follow-up', text: 'Coordinated care and ongoing health guidance' },
    ],
    reverse: false,
  },
]

function HomeSectionEyebrow({ children, className = '' }) {
  return (
    <p className={`ht-eyebrow bg-cyan-100 text-ht-navy-700 ${className}`}>
      {children}
    </p>
  )
}

function HomeClinicGallery({ reduceMotion }) {
  const galleryItems = [
    {
      src: '/images/clinic/reception.jpg',
      alt: 'Healtopia reception area',
      label: 'Reception',
      title: 'Welcoming arrival',
      size: 'lg:row-span-3',
    },
    {
      src: '/images/clinic/examination-room.png',
      alt: 'Healtopia examination room',
      label: 'Examination Room',
      title: 'Private care space',
    },
    {
      src: '/images/clinic/building-exterior.jpg',
      alt: 'Healtopia clinic exterior',
      label: 'Clinic Exterior',
      title: 'Gambrills location',
    },
    {
      src: '/images/clinic/hallway.jpg',
      alt: 'Healtopia hallway',
      label: 'Hallway',
      title: 'Calm circulation',
      size: 'sm:col-span-2 lg:col-span-1',
    },
  ]

  return (
    <div>
      <div className="max-w-[48rem]">
        <HomeSectionEyebrow>INSIDE OUR CLINIC</HomeSectionEyebrow>
        <h2 className="mt-4">
          Care that begins in a <span className="text-ht-cyan-700">calm, welcoming space</span>
        </h2>
        <p className="ht-body ht-text-width-hero mt-4 text-ht-gray">
          Take a look inside the modern Gambrills clinic where patients receive personalized primary care and medical
          weight loss support.
        </p>
      </div>

      <div className="mt-7 hidden md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:gap-[18px] lg:h-[clamp(500px,36vw,540px)]">
        <GalleryPanel
          item={galleryItems[0]}
          reduceMotion={reduceMotion}
          className="md:col-span-2 md:h-[320px] lg:col-span-7 lg:row-span-2 lg:h-full"
        />
        <GalleryPanel
          item={galleryItems[1]}
          reduceMotion={reduceMotion}
          className="md:h-[240px] lg:col-span-3 lg:col-start-8 lg:row-start-1 lg:h-full"
        />
        <GalleryPanel
          item={galleryItems[2]}
          reduceMotion={reduceMotion}
          className="md:h-[240px] lg:col-span-2 lg:col-start-11 lg:row-start-1 lg:h-full"
        />
        <GalleryPanel
          item={galleryItems[3]}
          reduceMotion={reduceMotion}
          className="md:col-span-2 md:h-[240px] lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:h-full"
        />
      </div>

      <div className="mt-7 grid gap-4 md:hidden">
        {galleryItems.map((item, index) => (
          <GalleryPanel
            key={item.label}
            item={item}
            reduceMotion={reduceMotion}
            className="h-[clamp(230px,72vw,280px)]"
            delay={index * 0.06}
          />
        ))}
      </div>
    </div>
  )
}

function GalleryPanel({ item, reduceMotion, className = '', delay = 0 }) {
  return (
    <motion.article
      className={`group relative overflow-hidden rounded-[1.6rem] border border-cyan-100 bg-white shadow-[0_20px_44px_-34px_rgba(5,42,74,0.5)] ${className}`}
      {...getEntranceProps(reduceMotion, { y: 18, duration: 0.52, delay, amount: 0.16 })}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
              boxShadow: '0 24px 48px -30px rgba(5, 42, 74, 0.55)',
              borderColor: 'rgba(103, 232, 249, 0.88)',
            }
      }
      transition={reduceMotion ? { duration: 0 } : { duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
          loading="lazy"
          initial={reduceMotion ? false : { scale: 1 }}
          animate={reduceMotion ? { scale: 1 } : { scale: 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0)_50%,rgba(2,6,23,0.12)_64%,rgba(2,6,23,0.82)_100%)] transition-opacity duration-500 group-hover:opacity-90" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5 transition-transform duration-500 group-hover:-translate-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">{item.label}</p>
        <p className="mt-1 text-sm font-bold leading-tight text-white sm:text-base">{item.title}</p>
      </div>
    </motion.article>
  )
}

function Home() {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    const root = document.documentElement
    const header = document.querySelector('header')

    const updateHeaderHeight = () => {
      const measuredHeight = header?.getBoundingClientRect?.().height || 75
      root.style.setProperty('--header-height', `${Math.round(measuredHeight)}px`)
    }

    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
      root.style.removeProperty('--header-height')
    }
  }, [])

  return (
    <div>
      <style>{`
        .home-hero-shell {
          --header-height: 75px;
          min-height: calc(100vh - var(--header-height));
        }

        @supports (height: 100svh) {
          .home-hero-shell {
            min-height: calc(100svh - var(--header-height));
          }
        }

        @media (max-height: 800px) and (min-width: 900px) {
          .home-hero-shell {
            padding-block: 48px !important;
          }

          .home-hero-shell .home-hero-grid {
            gap: 24px !important;
          }

          .home-hero-shell .home-hero-image-wrap {
            max-height: min(610px, calc(100svh - var(--header-height) - 100px));
          }
        }

        @media (max-width: 767px) {
          .home-hero-shell {
            min-height: auto !important;
          }
        }

        .services-section {
          min-height: calc(100svh - var(--header-height));
          height: calc(100svh - var(--header-height));
          max-height: calc(100svh - var(--header-height));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: clamp(22px, 3vh, 38px) 0;
        }

        .services-container {
          width: min(1680px, calc(100% - 8vw));
          height: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .services-heading {
          flex: 0 0 auto;
          max-width: 48rem;
          margin-bottom: clamp(20px, 3vh, 32px);
        }

        .services-heading h2 {
          font-size: clamp(2rem, 3vw, 3rem);
          line-height: 1.1;
          font-weight: 600;
          margin: 12px 0 18px;
        }

        .services-heading p {
          font-size: clamp(1rem, 1.2vw, 1.25rem);
          line-height: 1.55;
          margin: 0;
          max-width: 48rem;
        }

        .services-grid {
          flex: 1;
          min-height: 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(16px, 1.5vw, 26px);
          align-items: stretch;
        }

        .service-card {
          min-height: 0;
          height: 100%;
          padding: clamp(20px, 2vw, 30px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 1.75rem;
          box-shadow: 0 14px 34px -30px rgba(5, 42, 74, 0.38);
        }

        .service-card h3 {
          font-size: clamp(1.25rem, 1.55vw, 1.7rem);
          line-height: 1.12;
          margin: 18px 0 10px;
        }

        .service-card .service-subtitle {
          font-size: clamp(0.88rem, 1vw, 1.05rem);
          line-height: 1.35;
          margin-bottom: 14px;
        }

        .service-card ul {
          margin: 0 0 16px;
          padding: 0;
        }

        .service-card li {
          font-size: clamp(0.9rem, 1vw, 1.05rem);
          line-height: 1.35;
          margin-bottom: 9px;
        }

        .service-card .card-button {
          margin-top: auto;
          flex-shrink: 0;
        }

        .service-icon {
          width: clamp(3.5rem, 3.8vw, 4rem);
          height: clamp(3.5rem, 3.8vw, 4rem);
        }

        @media (max-width: 1099px) {
          .services-section {
            min-height: auto;
            height: auto;
            max-height: none;
            overflow: visible;
          }

          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 699px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-height: 800px) and (min-width: 1100px) {
          .services-section {
            padding: clamp(18px, 2.5vh, 30px) 0;
          }

          .services-heading {
            margin-bottom: clamp(16px, 2.4vh, 24px);
          }

          .services-grid {
            gap: 18px;
          }

          .service-card {
            padding: 20px;
          }
        }

        .why-healtopia-section {
          background:
            radial-gradient(circle at 15% 20%, rgba(65, 205, 225, 0.06), transparent 30%),
            linear-gradient(180deg, #ffffff 0%, #f7fcfe 100%);
          border-top: 1px solid rgba(20, 75, 110, 0.08);
          border-bottom: 1px solid rgba(20, 75, 110, 0.1);
        }

        .why-healtopia-container {
          width: min(1540px, calc(100% - 8vw));
          margin: 0 auto;
          padding: clamp(46px, 5.8vw, 76px) 0;
        }

        .why-healtopia-heading {
          max-width: 48rem;
          margin-bottom: clamp(24px, 3vw, 34px);
        }

        .why-healtopia-heading h2 {
          margin: 14px 0 12px;
          color: #102b50;
          font-size: clamp(2rem, 3vw, 3rem);
          line-height: 1.1;
          font-weight: 600;
          letter-spacing: -0.03em;
        }

        .why-healtopia-heading p {
          margin: 0;
          max-width: 48rem;
          color: #607997;
          font-size: clamp(1rem, 1.12vw, 1.22rem);
          line-height: 1.55;
        }

        .why-healtopia-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          align-items: stretch;
        }

        .why-healtopia-card {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr);
          gap: 16px;
          align-items: start;
          min-height: 150px;
          padding: 24px;
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
          border-radius: 15px;
          background: #e4f8fc;
          color: #188ead;
          flex: 0 0 48px;
        }

        .why-healtopia-card h3 {
          margin: 0 0 8px;
          color: #102b50;
          font-size: 1.08rem;
          line-height: 1.3;
        }

        .why-healtopia-card p {
          margin: 0;
          color: #607997;
          line-height: 1.55;
          font-size: 0.98rem;
        }

        @media (min-width: 1100px) and (max-height: 850px) {
          .why-healtopia-container {
            padding-block: 34px;
          }

          .why-healtopia-heading {
            margin-bottom: 20px;
          }

          .why-healtopia-heading h2 {
            font-size: clamp(2.05rem, 2.65vw, 3rem);
            margin-top: 10px;
          }

          .why-healtopia-heading p {
            font-size: 1rem;
          }

          .why-healtopia-grid {
            gap: 16px;
          }

          .why-healtopia-card {
            min-height: 138px;
            padding: 20px;
          }

          .why-healtopia-card p {
            font-size: 0.92rem;
            line-height: 1.45;
          }
        }

        @media (max-width: 1099px) {
          .why-healtopia-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .why-healtopia-heading h2,
          .services-heading h2 {
            font-size: 2.25rem;
            line-height: 1.1;
          }
        }

        @media (max-width: 680px) {
          .why-healtopia-container {
            width: min(100% - 32px, 620px);
            padding-block: 42px;
          }

          .why-healtopia-heading h2 {
            font-size: 1.9rem;
            line-height: 1.15;
          }

          .why-healtopia-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .why-healtopia-card {
            min-height: 0;
            padding: 20px;
            border-radius: 20px;
          }

          .services-heading h2 {
            font-size: 1.9rem;
            line-height: 1.15;
          }
        }

        .technology-section {
          height: calc(100svh - var(--header-height));
          min-height: calc(100svh - var(--header-height));
          max-height: calc(100svh - var(--header-height));
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .technology-container {
          width: min(1740px, calc(100% - 9vw));
          height: 100%;
          margin: 0 auto;
          padding: clamp(18px, 2.5vh, 30px) 0;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(30px, 4vw, 64px);
          align-items: center;
          min-height: 0;
        }

        .technology-copy {
          min-width: 0;
          align-self: center;
        }

        .technology-copy .eyebrow {
          margin-bottom: clamp(10px, 1.2vh, 14px);
        }

        .technology-copy h2 {
          font-size: clamp(1.9rem, 2.7vw, 3rem);
          line-height: 1.02;
          margin: 0 0 clamp(18px, 2vh, 28px);
          max-width: 48rem;
        }

        .technology-copy p {
          font-size: clamp(0.95rem, 0.9rem + 0.15vw, 1.05rem);
          line-height: 1.65;
          margin: 0 0 clamp(18px, 2vh, 26px);
          max-width: 48rem;
        }

        .technology-features {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(10px, 1.3vh, 16px);
          margin-bottom: clamp(18px, 2vh, 26px);
        }

        .technology-feature {
          min-height: 0;
          padding: clamp(12px, 1.25vw, 18px);
          border-radius: 18px;
        }

        .technology-feature-icon {
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
        }

        .technology-feature span {
          font-size: clamp(0.9rem, 1vw, 1.1rem);
        }

        .technology-copy .primary-button {
          margin-top: 0;
          min-height: 48px;
          padding: 12px 24px;
        }

        .technology-visual {
          height: min(74vh, 690px);
          max-height: calc(100svh - var(--header-height) - 48px);
          min-height: 0;
          display: flex;
          align-items: center;
        }

        .technology-image-card {
          width: 100%;
          height: 100%;
          max-height: 100%;
          padding: clamp(14px, 1.5vw, 22px);
          border-radius: 30px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .technology-image-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }

        @media (min-width: 1100px) and (max-height: 800px) {
          .technology-container {
            padding-block: 14px;
            gap: 32px;
          }

          .technology-copy h2 {
            font-size: clamp(2.2rem, 3.4vw, 3.5rem);
            margin-bottom: 14px;
          }

          .technology-copy p {
            font-size: clamp(0.95rem, 1.15vw, 1.15rem);
            line-height: 1.4;
            margin-bottom: 14px;
          }

          .technology-features {
            gap: 10px;
            margin-bottom: 14px;
          }

          .technology-feature {
            padding: 10px 14px;
          }

          .technology-visual {
            height: calc(100svh - var(--header-height) - 28px);
          }
        }

        @media (max-width: 1099px) {
          .technology-section {
            height: auto;
            min-height: auto;
            max-height: none;
            overflow: visible;
          }

          .technology-container {
            width: min(1740px, calc(100% - 8vw));
            height: auto;
            padding: 20px 0;
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .technology-copy h2 {
            font-size: clamp(2.1rem, 5vw, 3rem);
          }

          .technology-copy p {
            font-size: 1rem;
          }

          .technology-features {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .technology-visual {
            height: auto;
            max-height: none;
          }

          .technology-image-card {
            height: auto;
            aspect-ratio: 4 / 3;
          }

          .technology-image-card img {
            height: 100%;
          }
        }

        @media (max-width: 699px) {
          .technology-container {
            width: min(1740px, calc(100% - 7vw));
          }

          .technology-features {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <motion.section
        className="home-hero-shell border-b border-ht-silver bg-[linear-gradient(135deg,#ffffff_0%,#eff8fd_44%,#dff3fb_100%)] flex items-center"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.6, amount: 0.16 })}
      >
        <div className="home-hero-grid mx-auto grid w-full max-w-7xl items-center gap-6 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10 lg:px-8 lg:py-[clamp(48px,4vw,60px)]">
          <motion.div
            className="relative min-w-0 max-w-none text-left"
            {...getEntranceProps(reduceMotion, { y: 18, duration: 0.55, delay: 0.02 })}
          >
            <motion.p
              className="mb-4 inline-flex rounded-full bg-cyan-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ht-navy-700"
              {...getEntranceProps(reduceMotion, { y: 14, duration: 0.5, delay: 0.03 })}
            >
              Gambrills, Maryland
            </motion.p>
            <motion.h1
              className="home-hero-title max-w-[20ch] text-[clamp(2.6rem,3.55vw,4.05rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ht-navy"
              {...getEntranceProps(reduceMotion, { y: 18, duration: 0.6, delay: 0.1 })}
            >
              <span className="block">Compassionate Primary</span>
              <span className="block">
                Care & <span className="text-ht-cyan-700">Medical Weight</span>
              </span>
              <span className="block">
                <span className="text-ht-cyan-700">Loss</span> in Gambrills, MD
              </span>
            </motion.h1>
            <motion.p
              className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-ht-gray md:text-lg"
              {...getEntranceProps(reduceMotion, { y: 18, duration: 0.55, delay: 0.18 })}
            >
              Personalized, accessible care designed around your health, lifestyle, and long-term wellness.
            </motion.p>

            <motion.div
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              {...getEntranceProps(reduceMotion, { y: 16, duration: 0.5, delay: 0.26 })}
            >
              <Button
                href={BOOK_APPOINTMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                className="w-full sm:h-12 sm:w-auto sm:px-6"
              >
                Book Appointment
              </Button>
              <Button
                to="/contact"
                variant="secondary"
                size="md"
                className="w-full sm:h-12 sm:w-auto sm:px-6"
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="home-hero-image-wrap relative min-w-0 self-center"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
            animate={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.65, delay: 0.08, ease: 'easeOut' }}
          >
            <div className="group relative overflow-visible rounded-[2rem] border border-cyan-200/90 bg-[linear-gradient(180deg,rgba(202,244,252,0.9)_0%,rgba(255,255,255,0.98)_100%)] p-3 shadow-[0_24px_60px_-26px_rgba(12,174,200,0.42)]">
              <div className="pointer-events-none absolute -inset-5 rounded-[2.5rem] bg-[radial-gradient(circle_at_65%_24%,rgba(12,174,200,0.2),transparent_58%)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white shadow-[0_20px_42px_-30px_rgba(5,42,74,0.28)] aspect-[4/3] md:aspect-[5/4] lg:max-h-[min(610px,calc(100svh-var(--header-height)-100px))]">
                <img
                  src="/images/clinic/reception.jpg"
                  alt="Healtopia reception area"
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(22,182,212,0.08),transparent_24%)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(7,26,49,0.18)_34%,rgba(7,26,49,0.76)_100%)]" />
                <div className="absolute inset-x-3 bottom-3 z-10 hidden gap-2 md:grid md:grid-cols-2 lg:inset-x-4 lg:bottom-4 lg:gap-3">
                  {heroServiceBadges.map((badge, index) => (
                    <motion.div
                      key={badge.label}
                      {...getRevealProps(reduceMotion, { y: 12, duration: 0.35, delay: 0.05 + index * 0.05, amount: 0.2 })}
                    >
                      <Link
                        to={badge.to}
                        className="flex h-full items-center gap-2 rounded-xl border border-ht-silver bg-white px-3 py-2 text-xs font-semibold text-ht-navy shadow-[0_10px_22px_-16px_rgba(5,42,74,0.45)] transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-ht-soft-blue hover:text-ht-cyan-700"
                      >
                        <BadgeCheck size={14} className="text-ht-cyan-700" />
                        <span>{badge.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 md:hidden">
              {heroServiceBadges.map((badge, index) => (
                <motion.div
                  key={badge.label}
                  {...getRevealProps(reduceMotion, { y: 12, duration: 0.35, delay: 0.05 + index * 0.05, amount: 0.25 })}
                >
                  <Link
                    to={badge.to}
                    className="flex h-full w-full min-w-0 items-center gap-2 rounded-xl border border-ht-silver bg-white px-3 py-2 text-left text-xs font-semibold leading-tight text-ht-navy shadow-[0_10px_22px_-16px_rgba(5,42,74,0.45)] transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-ht-soft-blue hover:text-ht-cyan-700"
                  >
                    <BadgeCheck size={14} className="text-ht-cyan-700" />
                    <span className="min-w-0 whitespace-normal break-words">{badge.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="why-healtopia-section border-b border-ht-silver"
        {...getRevealProps(reduceMotion, { y: 16, duration: 0.55, amount: 0.18 })}
      >
        <div className="why-healtopia-container">
          <div className="why-healtopia-heading">
            <HomeSectionEyebrow>WHY HEALTOPIA</HomeSectionEyebrow>
            <h2>Trusted care that feels personal</h2>
            <p>Thoughtful care, experienced clinicians, and a welcoming practice built around the patient experience.</p>
          </div>

          <motion.div
            className="why-healtopia-grid"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.06, amount: 0.18 })}
          >
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

      <motion.section
        className="border-y border-ht-silver bg-gradient-to-b from-white via-ht-soft-blue/20 to-white py-12 sm:py-14 lg:py-16"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.16 })}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <HomeClinicGallery reduceMotion={reduceMotion} />
        </div>
      </motion.section>

      <motion.section
        id="our-services"
        className="services-section border-y border-ht-silver bg-gradient-to-b from-white via-ht-soft-blue/20 to-white scroll-mt-28"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.16 })}
      >
        <div className="services-container">
          <div className="services-heading">
            <HomeSectionEyebrow>OUR SERVICES</HomeSectionEyebrow>
            <h2>Healthcare services designed around your needs</h2>
            <p>
              Whether you're looking for ongoing primary care, physician-guided weight management, or enhanced concierge
              access, our care is designed to fit your lifestyle.
            </p>
          </div>
          <motion.div
            className="services-grid"
            {...getStaggerContainer(reduceMotion, { staggerChildren: 0.08 })}
          >
            {serviceOverviewCards.map((option) => (
              <motion.article
                key={option.title}
                className="service-card group flex h-full flex-col border border-cyan-100 bg-gradient-to-br from-white via-ht-soft-blue/25 to-cyan-50 transition duration-300"
                {...getStaggerItem(reduceMotion, { y: 22 })}
                {...getCardHover(reduceMotion)}
              >
                <div className="service-icon inline-flex items-center justify-center rounded-2xl bg-ht-soft-blue text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100 transition duration-300 group-hover:bg-ht-cyan-700 group-hover:text-white">
                  <option.icon size={20} />
                </div>
                <h3>{option.title}</h3>
                <p className="service-subtitle text-sm font-semibold uppercase tracking-wide text-ht-cyan-700">{option.subtitle}</p>
                <ul>
                  {option.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-ht-gray">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-ht-cyan-700" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="card-button pt-5">
                  <Button to={option.link} variant="secondary" size="sm" className="whitespace-nowrap">
                    {option.label}
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <HomeProviderShowcase reduceMotion={reduceMotion} />
      <motion.section
        className="technology-section border-y border-ht-silver bg-gradient-to-b from-white via-ht-soft-blue/20 to-white"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.58, amount: 0.16 })}
      >
        <div className="technology-container">
          <motion.div
            className="technology-copy max-w-2xl"
            {...getEntranceProps(reduceMotion, { y: 18, duration: 0.5, delay: 0.04 })}
          >
            <p className="ht-eyebrow eyebrow bg-cyan-100 text-ht-navy-700">
              Technology
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl lg:text-[2.8rem] lg:leading-tight">
              Advanced body composition analysis for <span className="text-ht-cyan-700">better insights</span>
            </h2>
            <p className="ht-body ht-text-width-hero mt-4 text-ht-gray">
              Weight is only part of the picture. Our body composition scanner helps patients understand muscle, fat,
              and metabolic health so care plans can be more informed and personalized.
            </p>

            <div className="technology-features mt-6 grid gap-3 sm:grid-cols-2">
              {['Body Fat Percentage', 'Muscle Mass', 'Visceral Fat', 'Metabolic Health'].map((item) => (
                <div
                  key={item}
                  className="technology-feature flex items-center gap-3 rounded-2xl border border-cyan-100 bg-white px-4 py-3 text-sm font-semibold text-ht-navy shadow-[0_14px_30px_-28px_rgba(5,42,74,0.4)]"
                >
                  <span className="technology-feature-icon inline-flex h-8 w-8 items-center justify-center rounded-full bg-ht-soft-blue text-ht-cyan-700">
                    <Scale size={16} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <Button to="/medical-weight-loss" className="primary-button whitespace-nowrap">
                Explore Weight Loss Technology
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="technology-visual group relative"
            {...getEntranceProps(reduceMotion, { y: 24, delay: 0.08, duration: 0.55 })}
            {...getCardHover(reduceMotion)}
          >
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_40%,rgba(22,182,212,0.1),transparent_42%),radial-gradient(circle_at_60%_72%,rgba(22,182,212,0.06),transparent_28%)] blur-2xl" />

            <div className="technology-image-card relative overflow-hidden rounded-[2.25rem] border border-cyan-100 bg-white p-6 shadow-[0_22px_58px_-38px_rgba(5,42,74,0.42)] transition duration-500 sm:p-7 lg:p-8">
              <div className="relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden rounded-[1.75rem] bg-white">
                <img
                  src="/images/clinic/seca-body-composition-clean.png"
                  alt="SECA body composition scanner showing body composition analysis dashboard"
                  className="technology-image h-full w-full object-contain object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-ht-navy-700">
                Physician-guided insight
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {careHighlights.map((section) => (
        <ProgramHighlightSection
          key={section.eyebrow}
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          bullets={section.bullets}
          buttonLabel={section.buttonLabel}
          buttonTo={section.buttonTo}
          rightTitle={section.rightTitle}
          rightItems={section.rightItems}
          reverse={section.reverse}
        />
      ))}

      <motion.section
        className="border-y border-ht-silver bg-gradient-to-br from-cyan-50 via-white to-ht-soft-blue py-12 lg:py-16"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.58, amount: 0.16 })}
      >
        <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.22 })}>
            <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ht-navy-700">
              Medical Weight Loss
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
              Structured, physician-guided support for <span className="text-ht-cyan-700">sustainable results</span>
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
            <Button to="/medical-weight-loss" className="mt-6 self-start">
              View Program Details
            </Button>
          </motion.div>

          <motion.div
            className="rounded-[2rem] border border-cyan-100 bg-white p-6 shadow-[0_20px_48px_-34px_rgba(5,42,74,0.45)] md:p-7"
            {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.22, delay: 0.08 })}
          >
            <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
              Typical program milestones
            </p>
            <div className="relative mt-6 space-y-4 pl-3 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:bg-cyan-100 before:content-['']">
              {[
                { label: 'Week 1', text: 'Intake, lab review, and personalized roadmap' },
                { label: 'Week 4', text: 'Progress evaluation and treatment adjustment' },
                { label: 'Week 8+', text: 'Momentum phase with sustainable routines' },
              ].map((step, index) => (
                <motion.div
                  key={step.label}
                  className="group relative rounded-2xl border border-ht-silver bg-ht-soft-blue/30 px-4 py-4 text-sm text-ht-gray shadow-[0_14px_30px_-28px_rgba(5,42,74,0.4)]"
                  {...getStaggerItem(reduceMotion, { y: 12 })}
                  {...getCardHover(reduceMotion)}
                >
                  <div className="absolute -left-[0.55rem] top-5 h-3.5 w-3.5 rounded-full border-2 border-white bg-ht-cyan-700 shadow-sm" />
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-8 shrink-0 items-center rounded-full bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-ht-cyan-700 shadow-sm ring-1 ring-cyan-100">
                      {step.label}
                    </span>
                    <p className="pt-0.5 leading-relaxed text-ht-navy">{step.text}</p>
                  </div>
                  {index < 2 ? <div className="pointer-events-none absolute -bottom-2 left-6 h-4 w-px bg-cyan-100" /> : null}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.16 })}
      >
        <SectionHeader
          eyebrow="Simple Pricing"
          title="Transparent care options"
          description="Review current care options and discuss the best fit during your visit."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} {...plan} delay={index * 0.08} />
          ))}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-ht-gray">
          Pricing and eligibility may vary. Contact the office to confirm the best care option for your needs.
        </p>
      </motion.section>

      <motion.section
        className={PAGE_SECTION}
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.16 })}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <TestimonialCarousel items={testimonials} reduceMotion={reduceMotion} />
        </div>
      </motion.section>

      <motion.section
        className="overflow-hidden border-y border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue/55 to-cyan-50 py-12 sm:py-14 lg:py-16"
        {...getRevealProps(reduceMotion, { y: 18, duration: 0.55, amount: 0.16 })}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={
              <>
                Accepted <span className="text-ht-cyan-700">Insurance Plans</span>
              </>
            }
            description="Patients are encouraged to contact the office to confirm coverage before their visit."
            align="center"
          />

          <div
            className="insurance-logo-marquee relative mt-6 overflow-hidden"
            aria-label="Accepted insurance plans"
          >
            <div className="insurance-logo-marquee-track flex w-max items-center">
              {[0, 1].map((setIndex) => (
                <div
                  key={setIndex}
                  className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
                  aria-hidden={setIndex === 1 ? 'true' : undefined}
                >
                  {insuranceLogos.map((plan) => (
                    <div
                      key={`${setIndex}-${plan.src}`}
                      className="flex h-14 w-32 shrink-0 items-center justify-center px-2 sm:h-16 sm:w-40 sm:px-3"
                    >
                      <img
                        src={plan.src}
                        alt={plan.alt}
                        className={`insurance-logo-image h-auto w-auto max-h-9 max-w-[136px] object-contain sm:max-h-10 sm:max-w-[150px] ${plan.sizeClass ?? ''}`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 text-center">
            <Link
              to="/insurance"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ht-navy-700 transition-colors hover:text-ht-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ht-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-ht-soft-blue"
            >
              View accepted insurance plans
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </motion.section>

      <section className={PAGE_SECTION_CTA}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <AppointmentCTA
            title="Ready to schedule your visit?"
            description="Schedule an appointment and take the next step toward care designed around your needs."
            secondaryLabel="Call Our Office"
            secondaryHref="tel:4107746678"
            benefits={[
              {
                title: 'Convenient scheduling',
                description: 'Easy booking when you are ready to be seen.',
              },
              {
                title: 'Multiple care options',
                description: 'Primary care, weight management, and concierge services.',
              },
              {
                title: 'Personalized support',
                description: 'Care guided by your goals and follow-up needs.',
              },
            ]}
          />
        </div>
      </section>
    </div>
  )
}

function TestimonialCarousel({ items, reduceMotion }) {
  const [activePage, setActivePage] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setVisibleCount(3)
        return
      }

      if (window.matchMedia('(min-width: 768px)').matches) {
        setVisibleCount(2)
        return
      }

      setVisibleCount(1)
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  const pageCount = Math.max(1, Math.ceil(items.length / visibleCount))
  const safeActivePage = Math.min(activePage, pageCount - 1)

  useEffect(() => {
    if (reduceMotion || isPaused || pageCount <= 1) return undefined

    const interval = window.setInterval(() => {
      setActivePage((current) => (current + 1) % pageCount)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [isPaused, pageCount, reduceMotion])

  const getInitials = (name) =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase()

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false)
        }
      }}
    >
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ht-navy-700">
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">Patient Testimonials</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ht-gray md:text-lg">
            Hear what patients are saying about their experience with Healtopia.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-ht-navy lg:hidden">
            <span>5.0</span>
            <span className="inline-flex items-center gap-0.5 text-amber-400" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star key={starIndex} size={14} fill="currentColor" />
              ))}
            </span>
            <span>Google Rating · 46 reviews</span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-end">
          <div className="hidden items-center gap-2 text-sm font-semibold text-ht-navy lg:flex">
            <span>5.0</span>
            <span className="inline-flex items-center gap-0.5 text-amber-400" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star key={starIndex} size={14} fill="currentColor" />
              ))}
            </span>
            <span>Google Rating · 46 reviews</span>
          </div>

          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => setActivePage((current) => (current - 1 + pageCount) % pageCount)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ht-silver bg-white text-ht-navy shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-ht-soft-blue hover:text-ht-cyan-700"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setActivePage((current) => (current + 1) % pageCount)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ht-silver bg-white text-ht-navy shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-ht-soft-blue hover:text-ht-cyan-700"
              aria-label="Next testimonials"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex"
          animate={reduceMotion ? { x: 0 } : { x: `-${safeActivePage * 100}%` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeInOut' }}
        >
          {Array.from({ length: pageCount }).map((_, pageIndex) => {
            const start = pageIndex * visibleCount
            const pageItems = items.slice(start, start + visibleCount)

            return (
              <div key={pageIndex} className="w-full flex-none px-px">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {pageItems.map((testimonial, index) => (
                    <motion.article
                      key={`${testimonial.name}-${testimonial.source}-${pageIndex}-${index}`}
                      className={`rounded-2xl border border-ht-silver bg-white p-6 shadow-[0_18px_42px_-34px_rgba(5,42,74,0.45)] ${
                        index === 0 ? 'md:border-cyan-200 md:bg-gradient-to-b md:from-white md:to-ht-soft-blue/25 md:shadow-[0_22px_50px_-36px_rgba(5,42,74,0.5)]' : ''
                      }`}
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold uppercase tracking-wide text-ht-cyan-700">
                            {getInitials(testimonial.name)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-amber-400" aria-label="5 star review">
                              {Array.from({ length: 5 }).map((_, starIndex) => (
                                <Star key={starIndex} size={14} fill="currentColor" />
                              ))}
                            </div>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ht-gray">Google Review</p>
                          </div>
                        </div>

                        {index === 0 ? (
                          <span className="hidden rounded-full bg-cyan-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ht-cyan-700 md:inline-flex">
                            Featured
                          </span>
                        ) : null}
                      </div>

                      <blockquote
                        className="text-[15px] leading-relaxed text-ht-gray md:text-base"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>

                      <p className="mt-4 text-sm font-semibold text-ht-navy">{testimonial.name}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ht-gray">
                        <span>{testimonial.source}</span>
                        {testimonial.timeAgo ? <span>• {testimonial.timeAgo}</span> : null}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
        <button
          type="button"
          onClick={() => setActivePage((current) => (current - 1 + pageCount) % pageCount)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ht-silver bg-white text-ht-navy shadow-sm transition hover:border-cyan-300 hover:text-ht-cyan-700"
          aria-label="Previous testimonials"
        >
          <ChevronLeft size={17} />
        </button>
        <button
          type="button"
          onClick={() => setActivePage((current) => (current + 1) % pageCount)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ht-silver bg-white text-ht-navy shadow-sm transition hover:border-cyan-300 hover:text-ht-cyan-700"
          aria-label="Next testimonials"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {Array.from({ length: pageCount }).map((_, pageIndex) => (
          <button
            key={pageIndex}
            type="button"
            onClick={() => setActivePage(pageIndex)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              pageIndex === safeActivePage ? 'w-7 bg-ht-cyan-700' : 'w-2.5 bg-cyan-200 hover:bg-cyan-300'
            }`}
            aria-label={`Go to testimonial group ${pageIndex + 1}`}
            aria-pressed={pageIndex === safeActivePage}
          />
        ))}
      </div>

      <div className="mt-7 text-center">
        <a
          href="https://share.google/JYuTIVEeq1YttWsWv"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-ht-silver bg-white px-5 py-2.5 text-sm font-semibold text-ht-navy shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-ht-soft-blue hover:text-ht-cyan-700"
        >
          View all Google reviews
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

export default Home