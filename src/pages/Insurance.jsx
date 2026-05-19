import { motion } from 'framer-motion'

const insuranceLogos = [
  {
    name: 'Cigna',
    src: '/images/insurance/cigna.webp',
    alt: 'Cigna insurance logo',
  },
  {
    name: 'Medicaid',
    src: '/images/insurance/medicaid.webp',
    alt: 'Medicaid insurance logo',
  },
  {
    name: 'Aetna',
    src: '/images/insurance/aetna.webp',
    alt: 'Aetna insurance logo',
    sizeClass: 'max-h-[34px] max-w-[150px]',
  },
  {
    name: 'NALC',
    src: '/images/insurance/nalc.webp',
    alt: 'NALC insurance logo',
  },
  {
    name: 'Humana',
    src: '/images/insurance/humana.webp',
    alt: 'Humana insurance logo',
    sizeClass: 'max-h-[34px] max-w-[150px]',
  },
  {
    name: 'Medicare',
    src: '/images/insurance/medicare.webp',
    alt: 'Medicare insurance logo',
  },
  {
    name: 'Care Improvement Plus',
    src: '/images/insurance/care-improvement-plus.webp',
    alt: 'Care Improvement Plus insurance logo',
  },
  {
    name: 'APWU',
    src: '/images/insurance/apwu.webp',
    alt: 'APWU insurance logo',
    sizeClass: 'max-h-[34px] max-w-[150px]',
  },
  {
    name: 'Sierra Health and Life',
    src: '/images/insurance/sierra-health-and-life.webp',
    alt: 'Sierra Health and Life insurance logo',
  },
  {
    name: 'GEHA',
    src: '/images/insurance/geha.webp',
    alt: 'GEHA insurance logo',
  },
  {
    name: 'CareFirst',
    src: '/images/insurance/carefirst.webp',
    alt: 'CareFirst insurance logo',
    sizeClass: 'max-h-[34px] max-w-[150px]',
  },
  {
    name: 'UnitedHealthcare',
    src: '/images/insurance/united-healthcare.webp',
    alt: 'UnitedHealthcare insurance logo',
  },
  {
    name: 'Provider Partners',
    src: '/images/insurance/provider-partners.webp',
    alt: 'Provider Partners insurance logo',
  },
  {
    name: 'Maryland Care',
    src: '/images/insurance/maryland-care.webp',
    alt: 'Maryland Care insurance logo',
  },
]

function Insurance() {
  return (
    <div>
      <section className="border-b border-ht-silver bg-gradient-to-br from-white via-ht-soft-blue to-cyan-50">
        <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pb-20 lg:pt-28">
          <motion.p
            className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ht-navy-700"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Insurance
          </motion.p>
          <motion.h1
            className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-ht-navy md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            Insurance-friendly care with transparent benefit support
          </motion.h1>
          <motion.p
            className="mt-5 max-w-3xl text-base leading-relaxed text-ht-gray md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            We help verify your coverage before your visit so you can plan confidently and avoid billing surprises.
          </motion.p>
        </div>
      </section>

      <section className="bg-ht-soft-blue/25">
        <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-12 text-center sm:px-6 lg:pb-24 lg:pt-14">
          <h2 className="text-3xl font-extrabold tracking-tight text-ht-navy md:text-4xl">
            Accepted Insurance Plans
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-ht-gray md:text-base">
            We currently accept many major insurance plans and also offer affordable cash payment options. Please
            contact our team to confirm your coverage before your visit.
          </p>

          <div className="mx-auto mt-7 grid max-w-4xl grid-cols-2 items-center justify-items-center gap-x-7 gap-y-6 md:grid-cols-3 lg:grid-cols-3">
            {insuranceLogos.map((plan, index) => (
              <motion.article
                key={plan.src}
                className="flex w-full items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.02 }}
                aria-label={plan.name}
              >
                <img
                  src={plan.src}
                  alt={plan.alt}
                  className={`h-auto w-auto max-h-[42px] max-w-[170px] object-contain ${plan.sizeClass ?? ''}`}
                  loading="lazy"
                />
              </motion.article>
            ))}
          </div>

          <p className="mx-auto mt-7 inline-flex rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-ht-gray">
            * Except UHC Community Plan
          </p>
        </div>
      </section>
    </div>
  )
}

export default Insurance
