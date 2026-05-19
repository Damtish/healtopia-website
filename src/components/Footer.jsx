import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'

const quickLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Medical Weight Loss', to: '/medical-weight-loss' },
  { label: 'Concierge Care', to: '/concierge-care' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Insurance', to: '/insurance' },
  { label: 'Contact', to: '/contact' },
]

function Footer() {
  return (
    <footer className="border-t border-ht-silver bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <img
            src="/images/healtopia-logo.webp"
            alt="Healtopia Primary Care and Medical Weight Loss logo"
            className="h-16 w-auto max-w-[220px] object-contain"
          />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ht-gray">
            Compassionate primary care and medical weight loss designed around your life, your goals,
            and your long-term health.
          </p>
          <p className="mt-4 text-sm font-semibold text-ht-navy">Serving Gambrills, MD and surrounding communities.</p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-ht-navy-700">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-ht-gray">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-ht-navy">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-ht-navy-700">Contact</h4>
          <ul className="mt-3 space-y-3 text-sm text-ht-gray">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-ht-cyan-700" />
              <span>123 Wellness Lane, Gambrills, MD 21054</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-ht-cyan-700" />
              <a href="tel:+14105550199" className="transition hover:text-ht-navy">
                (410) 555-0199
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-ht-cyan-700" />
              <a href="mailto:care@healtopia.com" className="transition hover:text-ht-navy">
                care@healtopia.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ht-silver py-4 text-center text-xs text-ht-gray">
        © {new Date().getFullYear()} Healtopia. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

