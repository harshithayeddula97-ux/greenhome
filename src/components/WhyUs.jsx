import { useEffect, useRef } from 'react';
import { ShieldCheck, MapPin, Palette, FileText, SmilePlus, Award } from 'lucide-react';
import './WhyUs.css';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Quality Construction',
    description: 'We use ISI-certified materials, advanced construction techniques, and strict quality audits at every stage.',
  },
  {
    icon: MapPin,
    title: 'Prime Locations',
    description: 'Our projects are strategically located near schools, hospitals, highways, and commercial hubs.',
  },
  {
    icon: Palette,
    title: 'Modern Designs',
    description: 'Thoughtfully designed spaces with contemporary aesthetics, efficient layouts, and premium finishes.',
  },
  {
    icon: FileText,
    title: 'Transparent Process',
    description: 'Complete transparency in pricing, documentation, legal approvals, and construction milestones.',
  },
  {
    icon: SmilePlus,
    title: 'Customer Satisfaction',
    description: '500+ satisfied families trust us — our after-sales support and maintenance services ensure lasting happiness.',
  },
  {
    icon: Award,
    title: 'Trusted Service',
    description: 'Award-winning developer with 15+ years of industry recognition and RERA-compliant projects.',
  },
];

export default function WhyUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-us" className="section why-us" ref={sectionRef}>
      <div className="why-us__bg-pattern" aria-hidden="true" />
      <div className="container">
        <div className="text-center" style={{ marginBottom: '64px' }}>
          <span className="section-label reveal" style={{ justifyContent: 'center' }}>Why Choose Us</span>
          <h2 className="section-title reveal">Why Choose Green Home Developers?</h2>
          <p className="section-subtitle reveal">
            We combine expertise, integrity, and passion to deliver homes that exceed expectations and
            stand as a legacy for generations.
          </p>
        </div>

        <div className="why-us__grid">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div key={i} className="why-card reveal">
                <div className="why-card__icon-wrap">
                  <Icon size={32} />
                </div>
                <div className="why-card__number">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="why-card__title">{reason.title}</h3>
                <p className="why-card__desc">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
