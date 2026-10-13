import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const stats = [
  { value: '500+', label: 'Happy Families' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '15+', label: 'Years Experience' },
  { value: '20+', label: 'Prime Locations' },
];

export default function Hero() {
  const titleRef = useRef(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      {/* Background Image */}
      <div className="hero__bg">
        <img src="/hero.jpg" alt="Luxury residential property by Green Home Developers" className="hero__bg-img" />
        <div className="hero__overlay" />
      </div>

      {/* Animated particles */}
      <div className="hero__particles" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`hero__particle hero__particle--${i + 1}`} />
        ))}
      </div>

      {/* Content */}
      <div className="container hero__content">
        <div className="hero__text">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Trusted Real Estate Developers Since 2008
          </div>

          <h1 className="hero__title" ref={titleRef}>
            Building Better Homes,<br />
            <span className="hero__title-accent">Creating Better Lives</span>
          </h1>

          <p className="hero__subtitle">
            Discover quality properties, thoughtfully designed spaces, and trusted real-estate
            solutions with Green Home Developers. Your dream home is just one step away.
          </p>

          <div className="hero__actions">
            <button
              className="btn btn-primary hero__btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              Explore Our Projects
              <ArrowRight size={18} />
            </button>
            <button
              className="btn btn-outline"
              onClick={() => scrollToSection('contact')}
            >
              Enquire Now
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="hero__stats">
          {stats.map((s, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
