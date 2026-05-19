import { HeartPulse, Scale, Stethoscope } from 'lucide-react'

export const serviceIconMap = {
  Stethoscope,
  Scale,
  HeartPulse,
}

const services = [
  {
    id: 'primary-care',
    title: 'Primary Care',
    description:
      'Comprehensive preventive, acute, and chronic care that keeps you healthy and supported through every stage of life.',
    icon: 'Stethoscope',
    path: '/services',
  },
  {
    id: 'weight-loss',
    title: 'Medical Weight Loss',
    description:
      'Evidence-based treatment plans with physician guidance, nutrition strategy, and regular progress reviews.',
    icon: 'Scale',
    path: '/medical-weight-loss',
  },
  {
    id: 'concierge',
    title: 'Concierge Medicine',
    description:
      'Enhanced access with same-day scheduling, longer visits, and proactive wellness planning.',
    icon: 'HeartPulse',
    path: '/concierge-care',
  },
]

export default services

