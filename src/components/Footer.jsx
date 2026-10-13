import { Home, Phone, Mail, MapPin } from 'lucide-react';
import './Footer.css';

// Inline social icons (lucide-react doesn't include social icons)
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const quickLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

const projects = [
  'Green Valley Villas',
  'Emerald Heights',
  'Green Township Phase 2',
];

const socials = [
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: FacebookIcon, label: 'Facebook', href: '#' },
  { icon: YoutubeIcon, label: 'YouTube', href: '#' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__wave" aria-hidden="true">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,0 L0,0 Z" fill="#f0fdf4"/>
        </svg>
      </div>

      <div className="container footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-icon">
              <Home size={20} />
            </div>
            <div>
              <div className="footer__logo-name">Green Home</div>
              <div className="footer__logo-sub">Developers</div>
            </div>
          </div>
          <p className="footer__desc">
            Building quality homes and creating lasting communities across India. Trusted by
            500+ families with over 15 years of excellence in real estate development.
          </p>
          <div className="footer__socials">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="footer__social-link"
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul className="footer__links">
            {quickLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="footer__link"
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="footer__col">
          <h4 className="footer__col-title">Our Projects</h4>
          <ul className="footer__links">
            {projects.map(p => (
              <li key={p}>
                <a
                  href="#projects"
                  className="footer__link"
                  onClick={(e) => { e.preventDefault(); scrollTo('#projects'); }}
                >
                  {p}
                </a>
              </li>
            ))}
          </ul>
          <h4 className="footer__col-title" style={{ marginTop: '28px' }}>RERA Approved</h4>
          <p className="footer__rera">All our projects are RERA registered and legally compliant for your safety and peace of mind.</p>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4 className="footer__col-title">Contact Us</h4>
          <div className="footer__contact-items">
            <a href="tel:+919876543210" className="footer__contact-item">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@greenhomedevelopers.in" className="footer__contact-item">
              <Mail size={16} />
              <span>info@greenhomedevelopers.in</span>
            </a>
            <div className="footer__contact-item">
              <MapPin size={16} />
              <span>Green Home Towers, MG Road,<br />Bangalore – 560001</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Green Home Developers. All Rights Reserved.</p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Privacy Policy</a>
            <a href="#" className="footer__bottom-link">Terms of Service</a>
            <a href="#" className="footer__bottom-link">RERA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
