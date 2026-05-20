import { Link } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ht-cyan focus-visible:ring-offset-2 ring-offset-white disabled:pointer-events-none disabled:opacity-60'

const variantStyles = {
  primary:
    'bg-ht-cyan text-white shadow-[0_12px_28px_-16px_rgba(12,174,200,0.8)] hover:-translate-y-0.5 hover:bg-ht-cyan-700 hover:shadow-[0_16px_34px_-18px_rgba(10,146,167,0.88)]',
  secondary:
    'border border-ht-silver bg-white text-ht-navy shadow-sm hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-ht-soft-blue hover:shadow-md',
  ghost: 'text-ht-navy hover:bg-ht-soft-blue',
}

const sizeStyles = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm md:text-base',
  lg: 'h-12 px-6 text-base',
}

function Button({
  children,
  to,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className,
  ariaLabel,
  ...props
}) {
  const classes = classNames(baseStyles, variantStyles[variant], sizeStyles[size], className)

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  )
}

export default Button

