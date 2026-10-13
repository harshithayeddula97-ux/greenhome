import { useEffect, useRef } from 'react';
import { Building2, Landmark, HardHat, ClipboardList, TrendingUp, HeadphonesIcon } from 'lucide-react';
import './Services.css';

const services = [
  {
    icon: Building2,
    title: 'Residential Development',
    description: 'From compact apartments to sprawling villas, we develop premium residential spaces tailored to modern lifestyles and family needs.',
    color: '#16a34a',
  },
  {
    icon: Landmark,
    title: 'Property Development',
    description: 'Strategic property development across prime urban and suburban locations, maximizing value for investors and end-users alike.',
    color: '#0d9488',
  },
  {
    icon: HardHat,
    title: 'Construction',
    description: 'World-class construction using top-grade materials and certified engineers to ensure structural excellence and long-term durability.',
    color: '#0369a1',
  },
  {
    icon: ClipboardList,
    title: 'Project Planning',
    description: 'Meticulous project planning and execution from concept to completion, ensuring timelines, budgets, and quality standards are met.',
    color: '#7c3aed',
  },
  {
    icon: TrendingUp,
    title: 'Real Estate Consultation',
    description: 'Expert real-estate advisory services to help you make informed property investment decisions with confidence and clarity.',
    color: '#c2410c',
  },
  {
    icon: HeadphonesIcon,
    title: 'Customer Support',
    description: 'Dedicated customer support throughout your journey — from site visits to possession, our team is always by your side.',
    color: '#be185d',
  },
];

export default function Services() {
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
    <section id="services" className="section services" ref={sectionRef}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '64px' }}>
          <span className="section-label reveal" style={{ justifyContent: 'center' }}>Our Services</span>
          <h2 className="section-title reveal">What We Offer</h2>
          <p className="section-subtitle reveal">
            Comprehensive real-estate services designed to make your property journey seamless,
            rewarding, and completely stress-free.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={i} className="service-card reveal">
                <div className="service-card__icon-wrap" style={{ '--svc-color': service.color }}>
                  <Icon size={28} />
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.description}</p>
                <div className="service-card__hover-bar" style={{ background: service.color }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
