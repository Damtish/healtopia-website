const pricingPlans = [
  {
    id: 'direct-primary-care',
    name: 'Direct Primary Care',
    ctaLabel: 'View DPC Pricing',
    ctaTo: '#dpc-pricing',
    priceLines: [
      'Individual: $75/month',
      'Individual + Spouse: $130/month',
      'Child add-on: $50/month',
      'Individual 65+: $130/month',
    ],
    description: 'Enrollment fees may apply.',
  },
  {
    id: 'concierge-medicine',
    name: 'Concierge Medicine',
    ctaLabel: 'View Concierge Pricing',
    ctaTo: '#concierge-pricing',
    priceLines: [
      'Monthly subscription: $200/month',
      'Six-month subscription: $1,100',
      'Yearly subscription: $2,000',
    ],
  },
  {
    id: 'medical-weight-loss',
    name: 'Medical Weight Loss',
    description:
      'Pricing and medication coverage may vary. Patients can review options during their visit.',
    ctaLabel: 'Ask About Weight Loss Pricing',
    ctaTo: '/contact',
  },
]

export default pricingPlans
