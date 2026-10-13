import { useEffect, useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import './CTA.css';

export default function CTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="cta" ref={sectionRef}>
      <div className="cta__bg">
        <img src="/township.jpg" alt="Luxury property" className="cta__bg-img" />
        <div className="cta__overlay" />
      </div>
      <div className="cta__particles" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`cta__particle cta__particle--${i + 1}`} />
        ))}
      </div>
      <div className="container cta__content">
        <div className="cta__text">
          <span className="cta__badge reveal">🏡 Start Your Journey</span>
          <h2 className="cta__title reveal">
            Your Dream Property<br />
            <span className="cta__title-accent">Starts Here</span>
          </h2>
          <p className="cta__subtitle reveal">
            Explore our projects and take the first step towards finding your ideal home.
            Our expert team is ready to guide you every step of the way.
          </p>
          <div className="cta__actions reveal">
            <button className="btn btn-primary cta__btn-primary" onClick={() => scrollTo('projects')}>
              Explore Projects <ArrowRight size={18} />
            </button>
            <a href="tel:+919876543210" className="btn btn-outline cta__btn-contact">
              <Phone size={18} /> Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
