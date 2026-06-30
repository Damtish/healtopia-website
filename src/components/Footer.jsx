import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { FACEBOOK_URL, INSTAGRAM_URL } from '../constants/links'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Direct Primary Care', to: '/direct-primary-care' },
  { label: 'Insurance-Based Care', to: '/insurance-based-primary-care' },
  { label: 'Concierge Medicine', to: '/concierge-care' },
  { label: 'Medical Weight Loss', to: '/medical-weight-loss' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Accepted Insurance', to: '/insurance' },
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
            Compassionate primary care and medical weight loss designed around your health, lifestyle,
            and long-term wellness.
          </p>
          <p className="mt-4 text-sm font-semibold text-ht-navy">
            Serving Gambrills, Odenton, Crofton, Bowie, Millersville, and Anne Arundel County.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-ht-navy-700">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-ht-gray">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-ht-cyan-700">
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
              <span>2614 Chapel Lake Dr, Gambrills, MD 21054</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 text-ht-cyan-700" />
              <div className="space-y-1">
                <a href="tel:+14107746678" className="block transition hover:text-ht-navy">
                  410-774-6678
                </a>
                <a href="tel:+14108477890" className="block transition hover:text-ht-navy">
                  410-847-7890
                </a>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-ht-cyan-700" />
              <a href="mailto:info@healtopiamed.com" className="transition hover:text-ht-navy">
                info@healtopiamed.com
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <p className="text-sm font-semibold text-ht-navy">Follow us</p>
            <div className="mt-3 flex items-center gap-2.5">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Healtopia on Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-100 bg-white text-ht-navy shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 hover:text-ht-cyan-700 hover:shadow-md"
              >
                <FaFacebookF size={15} aria-hidden="true" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Healtopia on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-100 bg-white text-ht-navy shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 hover:text-ht-cyan-700 hover:shadow-md"
              >
                <FaInstagram size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-ht-silver py-4 text-center text-xs text-ht-gray">
        © {new Date().getFullYear()} Healtopia. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

