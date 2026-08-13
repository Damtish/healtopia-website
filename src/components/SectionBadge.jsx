function SectionBadge({ children, className = '' }) {
  return (
    <p className={`ht-eyebrow bg-cyan-100 text-ht-navy-700 ${className}`.trim()}>
      {children}
    </p>
  )
}

export default SectionBadge
