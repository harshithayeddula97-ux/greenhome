import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Bangalore',
    role: 'Homeowner – Green Valley Villas',
    rating: 5,
    review: "Green Home Developers delivered beyond our expectations! The quality of construction, the attention to detail, and the seamless communication throughout the process made our dream home a reality. We couldn't be happier!",
    avatar: 'PS',
    avatarColor: '#16a34a',
  },
  {
    name: 'Rajesh Nair',
    location: 'Pune',
    role: 'Investor – Emerald Heights',
    rating: 5,
    review: "I've invested in three properties with Green Home Developers. The transparency in pricing, timely delivery, and the quality of the build make them stand out in the market. Highly recommended for first-time buyers and investors alike.",
    avatar: 'RN',
    avatarColor: '#0369a1',
  },
  {
    name: 'Meera & Vikram Patel',
    location: 'Navi Mumbai',
    role: 'Homeowners – Green Township',
    rating: 5,
    review: "Moving into Green Township was the best decision we ever made. The community is wonderful, the amenities are top-notch, and the green spaces are beautiful. The team was always available to address our queries.",
    avatar: 'MP',
    avatarColor: '#7c3aed',
  },
  {
    name: 'Kavita Menon',
    location: 'Hyderabad',
    role: 'Homeowner – Emerald Heights',
    rating: 5,
    review: "The after-sales support from Green Home Developers is exceptional. They addressed every small concern with professionalism and speed. A truly customer-first organization that I would recommend to all my friends and family.",
    avatar: 'KM',
    avatarColor: '#be185d',
  },
];

function StarRating({ rating }) {
  return (
    <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < rating ? '#f59e0b' : 'none'}
          color={i < rating ? '#f59e0b' : '#d1d5db'}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (index) => {
    clearInterval(intervalRef.current);
    setActiveIndex((index + testimonials.length) % testimonials.length);
    startAutoPlay();
  };

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

  const active = testimonials[activeIndex];

  return (
    <section id="testimonials" className="section testimonials" ref={sectionRef}>
      <div className="testimonials__bg" aria-hidden="true" />
      <div className="container">
        <div className="text-center" style={{ marginBottom: '64px' }}>
          <span className="section-label reveal" style={{ justifyContent: 'center' }}>Testimonials</span>
          <h2 className="section-title reveal">What Our Customers Say</h2>
          <p className="section-subtitle reveal">
            Real stories from real families who found their dream homes with Green Home Developers.
          </p>
        </div>

        <div className="testimonials__layout reveal">
          {/* Side Cards */}
          <div className="testimonials__side">
            {testimonials.map((t, i) => (
              <button
                key={i}
                className={`testimonials__thumb${activeIndex === i ? ' testimonials__thumb--active' : ''}`}
                onClick={() => goTo(i)}
              >
                <div className="testimonials__thumb-avatar" style={{ background: t.avatarColor }}>
                  {t.avatar}
                </div>
                <div className="testimonials__thumb-info">
                  <div className="testimonials__thumb-name">{t.name}</div>
                  <div className="testimonials__thumb-role">{t.role}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Main Card */}
          <div className="testimonials__main">
            <div className="testimonials__card" key={activeIndex}>
              <Quote size={48} className="testimonials__quote-icon" />
              <StarRating rating={active.rating} />
              <blockquote className="testimonials__review">
                "{active.review}"
              </blockquote>
              <div className="testimonials__author">
                <div
                  className="testimonials__avatar"
                  style={{ background: active.avatarColor }}
                >
                  {active.avatar}
                </div>
                <div>
                  <div className="testimonials__name">{active.name}</div>
                  <div className="testimonials__meta">{active.role}</div>
                  <div className="testimonials__location">📍 {active.location}</div>
                </div>
              </div>
            </div>

            {/* Nav Buttons */}
            <div className="testimonials__nav">
              <button
                className="testimonials__nav-btn"
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="testimonials__dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`testimonials__dot${activeIndex === i ? ' testimonials__dot--active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                className="testimonials__nav-btn"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
