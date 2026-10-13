import { useEffect, useRef } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import './Projects.css';

const projects = [
  {
    id: 1,
    name: 'Green Valley Villas',
    location: 'Whitefield, Bangalore',
    description: 'Luxury 3 & 4 BHK villas with private gardens, premium amenities, and panoramic views in the heart of Whitefield.',
    status: 'Ready to Move',
    statusColor: '#16a34a',
    image: '/villa.jpg',
    type: 'Villa',
    units: '48 Units',
  },
  {
    id: 2,
    name: 'Emerald Heights',
    location: 'Baner, Pune',
    description: 'Modern 2 & 3 BHK apartments with smart home features, rooftop gardens, and world-class clubhouse facilities.',
    status: 'Under Construction',
    statusColor: '#d97706',
    image: '/apartment.jpg',
    type: 'Apartment',
    units: '120 Units',
  },
  {
    id: 3,
    name: 'Green Township Phase 2',
    location: 'Navi Mumbai, Maharashtra',
    description: 'An integrated township spanning 50 acres with parks, schools, commercial spaces, and eco-friendly residences.',
    status: 'Upcoming',
    statusColor: '#0369a1',
    image: '/township.jpg',
    type: 'Township',
    units: '350 Units',
  },
];

export default function Projects() {
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="projects" className="section projects" ref={sectionRef}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '64px' }}>
          <span className="section-label reveal" style={{ justifyContent: 'center' }}>Featured Projects</span>
          <h2 className="section-title reveal">Our Landmark Developments</h2>
          <p className="section-subtitle reveal">
            Each project is a testament to our commitment to quality, design, and creating
            spaces where memories are made.
          </p>
        </div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <article key={project.id} className="project-card reveal">
              <div className="project-card__image-wrap">
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-card__img"
                  loading="lazy"
                />
                <div className="project-card__overlay">
                  <button className="project-card__view-btn" onClick={scrollToContact}>
                    View Project <ArrowRight size={16} />
                  </button>
                </div>
                <div
                  className="project-card__status"
                  style={{ '--status-color': project.statusColor }}
                >
                  <span className="project-card__status-dot" />
                  {project.status}
                </div>
                <div className="project-card__type">{project.type}</div>
              </div>

              <div className="project-card__body">
                <h3 className="project-card__name">{project.name}</h3>
                <div className="project-card__location">
                  <MapPin size={14} />
                  {project.location}
                </div>
                <p className="project-card__desc">{project.description}</p>
                <div className="project-card__footer">
                  <span className="project-card__units">{project.units}</span>
                  <button className="btn btn-outline-green btn-sm" onClick={scrollToContact}>
                    Enquire <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
