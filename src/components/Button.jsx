import { Link } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold text-[clamp(0.84rem,0.81rem+0.1vw,0.94rem)] transform-gpu transition-[transform,box-shadow,border-color,background-color,color,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ht-cyan focus-visible:ring-offset-2 ring-offset-white disabled:pointer-events-none disabled:opacity-60'

const variantStyles = {
  primary:
    'bg-ht-cyan text-white shadow-[0_12px_28px_-16px_rgba(12,174,200,0.8)] hover:-translate-y-0.5 hover:bg-ht-cyan-700 hover:shadow-[0_16px_34px_-18px_rgba(10,146,167,0.88)] active:translate-y-0',
  secondary:
    'border border-white/90 bg-white !text-ht-navy shadow-[0_10px_22px_-16px_rgba(5,42,74,0.25)] hover:-translate-y-0.5 hover:border-[#39c2df] hover:bg-[#e8fbff] hover:!text-[#0b2948] hover:shadow-[0_14px_30px_-18px_rgba(5,42,74,0.28)] active:translate-y-0 active:shadow-[0_10px_22px_-16px_rgba(5,42,74,0.22)] visited:!text-ht-navy',
  ghost: 'text-ht-navy hover:bg-ht-soft-blue',
}

const sizeStyles = {
  sm: 'px-[1rem] py-[0.64rem]',
  md: 'px-[1.15rem] py-[0.7rem]',
  lg: 'px-[1.35rem] py-[0.76rem]',
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

