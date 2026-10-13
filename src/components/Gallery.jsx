import { useState, useEffect, useRef } from 'react';
import { X, ZoomIn } from 'lucide-react';
import './Gallery.css';

// Using available local images + Unsplash for variety
const galleryImages = [
  {
    src: '/villa.jpg',
    alt: 'Luxury Villa with Pool',
    caption: 'Green Valley Villas',
    category: 'Villa',
    span: 'wide',
  },
  {
    src: '/interior.jpg',
    alt: 'Modern Living Room Interior',
    caption: 'Premium Interiors',
    category: 'Interior',
    span: 'normal',
  },
  {
    src: '/apartment.jpg',
    alt: 'Emerald Heights Apartments',
    caption: 'Emerald Heights',
    category: 'Apartment',
    span: 'normal',
  },
  {
    src: '/about.jpg',
    alt: 'Expert Construction Team',
    caption: 'Expert Construction',
    category: 'Construction',
    span: 'normal',
  },
  {
    src: '/township.jpg',
    alt: 'Green Township Aerial View',
    caption: 'Green Township Aerial',
    category: 'Township',
    span: 'wide',
  },
  {
    src: '/hero.jpg',
    alt: 'Luxury Residential Complex',
    caption: 'Premium Residences',
    category: 'Villa',
    span: 'normal',
  },
];

const categories = ['All', 'Villa', 'Apartment', 'Interior', 'Construction', 'Township'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImg(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxImg ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxImg]);

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="section gallery" ref={sectionRef}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <span className="section-label reveal" style={{ justifyContent: 'center' }}>Gallery</span>
          <h2 className="section-title reveal">Our Project Showcase</h2>
          <p className="section-subtitle reveal">
            A glimpse into the world-class properties and craftsmanship that define
            Green Home Developers.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="gallery__filters reveal">
          {categories.map(cat => (
            <button
              key={cat}
              className={`gallery__filter-btn${activeCategory === cat ? ' gallery__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gallery__grid">
          {filtered.map((img, i) => (
            <div
              key={i}
              className={`gallery__item gallery__item--${img.span} reveal`}
              onClick={() => setLightboxImg(img)}
              tabIndex={0}
              role="button"
              aria-label={`View ${img.caption}`}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxImg(img)}
            >
              <img src={img.src} alt={img.alt} className="gallery__img" loading="lazy" />
              <div className="gallery__item-overlay">
                <ZoomIn size={28} className="gallery__zoom-icon" />
                <span className="gallery__item-caption">{img.caption}</span>
                <span className="gallery__item-cat">{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)} role="dialog" aria-modal="true">
          <button
            className="lightbox__close"
            onClick={() => setLightboxImg(null)}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          <div className="lightbox__content" onClick={e => e.stopPropagation()}>
            <img src={lightboxImg.src} alt={lightboxImg.alt} className="lightbox__img" />
            <div className="lightbox__info">
              <span className="lightbox__cat">{lightboxImg.category}</span>
              <h4 className="lightbox__caption">{lightboxImg.caption}</h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
