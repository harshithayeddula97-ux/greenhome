import { useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import './About.css';

const highlights = [
  'Over 15 years of real-estate excellence',
  '500+ families successfully housed',
  'Eco-friendly and sustainable construction',
  'ISO certified quality standards',
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToEnquiry = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="section about" ref={sectionRef}>
      <div className="container about__inner">
        {/* Image Side */}
        <div className="about__image-wrapper reveal">
          <div className="about__image-card">
            <img src="/about.jpg" alt="Green Home Developers construction team" className="about__img" />
            <div className="about__image-badge">
              <span className="about__image-badge-number">15+</span>
              <span className="about__image-badge-text">Years of<br />Excellence</span>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="about__deco about__deco--1" />
          <div className="about__deco about__deco--2" />
        </div>

        {/* Content Side */}
        <div className="about__content">
          <div className="reveal">
            <span className="section-label">About Us</span>
          </div>
          <h2 className="section-title reveal">
            Trusted Builders of<br />
            <span className="about__title-green">Exceptional Homes</span>
          </h2>
          <p className="section-subtitle reveal" style={{ marginBottom: '20px' }}>
            Green Home Developers is a premier real-estate company committed to building
            quality homes that stand the test of time. Founded on the principles of
            integrity, innovation, and sustainability, we deliver residential and commercial
            spaces that transform communities.
          </p>

          <div className="about__vm reveal">
            <div className="about__vm-card">
              <h4>Our Vision</h4>
              <p>To be India's most trusted real-estate developer, creating sustainable communities where families thrive and grow.</p>
            </div>
            <div className="about__vm-card">
              <h4>Our Mission</h4>
              <p>To deliver quality homes on time, with transparency, modern design, and unwavering customer satisfaction.</p>
            </div>
          </div>

          <ul className="about__highlights">
            {highlights.map((h, i) => (
              <li key={i} className="about__highlight-item reveal">
                <CheckCircle size={18} className="about__highlight-icon" />
                {h}
              </li>
            ))}
          </ul>

          <button className="btn btn-primary reveal" onClick={scrollToEnquiry} style={{ marginTop: '8px' }}>
            Know More <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
