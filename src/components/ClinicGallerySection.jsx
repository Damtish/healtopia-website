import { motion } from 'framer-motion'
import { getCardHover, getStaggerItem } from '../lib/motion'

function ClinicGalleryTile({ item, reduceMotion = false, className = '' }) {
  return (
    <motion.article
      className={`clinic-gallery__item ht-motion-smooth group relative overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_40px_-32px_rgba(5,42,74,0.42)] ${className}`}
      {...getCardHover(reduceMotion)}
      {...getStaggerItem(reduceMotion, { y: 14 })}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={item.src}
          alt={item.alt}
          className={`ht-motion-smooth h-full w-full object-cover ${item.objectPosition} group-hover:scale-[1.03]`}
          loading="lazy"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0)_46%,rgba(2,6,23,0.12)_60%,rgba(2,6,23,0.78)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="ht-eyebrow text-white/75 drop-shadow-[0_1px_2px_rgba(2,6,23,0.35)]">
          {item.label}
        </p>
        <p className="mt-1 text-sm font-bold leading-tight text-white drop-shadow-[0_1px_2px_rgba(2,6,23,0.4)] sm:text-base">
          {item.title}
        </p>
      </div>
    </motion.article>
  )
}

export default function ClinicGallerySection({
  eyebrow,
  title,
  description,
  items,
  reduceMotion = false,
  compact = false,
}) {
  const mobileCardHeight = compact ? 'h-[clamp(238px,64vw,265px)]' : 'h-[clamp(250px,66vw,280px)]'
  const desktopGalleryHeight = compact ? 'lg:h-[clamp(310px,22vw,350px)]' : 'lg:h-[clamp(340px,24vw,380px)]'

  return (
    <div>
      <div className="max-w-[48rem]">
        <p className="ht-eyebrow bg-cyan-100 text-ht-navy-700">
          {eyebrow}
        </p>
        <h2 className="ht-heading-2 mt-4">
          {title}
        </h2>
        {description ? <p className="ht-body ht-text-width-section mt-4 text-ht-gray">{description}</p> : null}
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-cyan-100 bg-white p-2 shadow-[0_18px_40px_-32px_rgba(5,42,74,0.42)] sm:p-3">
        <div className={`clinic-gallery hidden md:grid md:h-[300px] md:grid-cols-3 md:gap-2 lg:grid-cols-[2fr_1fr_1fr] lg:gap-3 ${desktopGalleryHeight}`}>
          {items.map((item) => (
            <ClinicGalleryTile key={item.key} item={item} reduceMotion={reduceMotion} />
          ))}
        </div>

        <div
          className="clinic-gallery flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] md:hidden [&::-webkit-scrollbar]:hidden"
          aria-label={`${eyebrow} gallery`}
        >
          {items.map((item) => (
            <ClinicGalleryTile
              key={item.key}
              item={item}
              reduceMotion={reduceMotion}
              className={`w-[88vw] shrink-0 snap-start ${mobileCardHeight}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
