import { useState, useEffect } from 'react';
import { Menu, X, Home, ChevronDown } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      // Determine active section
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <a href="#home" className="navbar__logo" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>
          <div className="navbar__logo-icon">
            <Home size={20} />
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">Green Home</span>
            <span className="navbar__logo-sub">Developers</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link${activeSection === link.href ? ' navbar__link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="btn btn-primary btn-sm navbar__cta"
          onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
        >
          Enquire Now
        </a>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile${isOpen ? ' navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__mobile-link${activeSection === link.href ? ' navbar__mobile-link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            >
              Enquire Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
