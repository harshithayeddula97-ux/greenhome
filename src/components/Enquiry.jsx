import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Loader } from 'lucide-react';
import './Enquiry.css';

const projectOptions = [
  'Green Valley Villas – Whitefield, Bangalore',
  'Emerald Heights – Baner, Pune',
  'Green Township Phase 2 – Navi Mumbai',
  'General Enquiry',
];

const initialForm = {
  name: '',
  phone: '',
  email: '',
  project: '',
  message: '',
};

export default function Enquiry() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success
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

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    else if (form.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';

    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) newErrors.phone = 'Enter a valid 10-digit mobile number';

    if (!form.email.trim()) newErrors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) newErrors.email = 'Enter a valid email address';

    if (!form.project) newErrors.project = 'Please select a project';
    if (!form.message.trim()) newErrors.message = 'Please enter your message';
    else if (form.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus('submitting');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1800));
    setStatus('success');
    setForm(initialForm);
  };

  return (
    <section id="contact" className="section enquiry" ref={sectionRef}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '64px' }}>
          <span className="section-label reveal" style={{ justifyContent: 'center' }}>Enquiry</span>
          <h2 className="section-title reveal">Interested in Our Properties?</h2>
          <p className="section-subtitle reveal">
            Fill in your details and our team will get in touch with you promptly to help you
            find your perfect home.
          </p>
        </div>

        <div className="enquiry__layout">
          {/* Contact Info */}
          <div className="enquiry__info reveal">
            <div className="enquiry__info-header">
              <h3>Get In Touch</h3>
              <p>Our team of real-estate experts is ready to help you make the best property decision.</p>
            </div>

            <div className="enquiry__contact-items">
              <div className="enquiry__contact-item">
                <div className="enquiry__contact-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="enquiry__contact-label">Call Us</div>
                  <a href="tel:+919876543210" className="enquiry__contact-value">+91 98765 43210</a>
                  <a href="tel:+919876543211" className="enquiry__contact-value">+91 98765 43211</a>
                </div>
              </div>

              <div className="enquiry__contact-item">
                <div className="enquiry__contact-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="enquiry__contact-label">Email Us</div>
                  <a href="mailto:info@greenhomedevelopers.in" className="enquiry__contact-value">info@greenhomedevelopers.in</a>
                  <a href="mailto:sales@greenhomedevelopers.in" className="enquiry__contact-value">sales@greenhomedevelopers.in</a>
                </div>
              </div>

              <div className="enquiry__contact-item">
                <div className="enquiry__contact-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="enquiry__contact-label">Visit Us</div>
                  <div className="enquiry__contact-value">Green Home Towers, 4th Floor,</div>
                  <div className="enquiry__contact-value">MG Road, Bangalore – 560001</div>
                </div>
              </div>
            </div>

            <div className="enquiry__hours">
              <h4>Office Hours</h4>
              <p>Monday – Saturday: 9:00 AM – 7:00 PM</p>
              <p>Sunday: 10:00 AM – 4:00 PM</p>
            </div>
          </div>

          {/* Form */}
          <div className="enquiry__form-wrap reveal">
            {status === 'success' ? (
              <div className="enquiry__success">
                <div className="enquiry__success-icon">
                  <CheckCircle size={48} />
                </div>
                <h3>Enquiry Submitted!</h3>
                <p>
                  Thank you! Your enquiry has been submitted successfully. Our team will contact you
                  within 24 hours.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setStatus('idle')}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form className="enquiry__form" onSubmit={handleSubmit} noValidate>
                <div className="enquiry__form-grid">
                  {/* Full Name */}
                  <div className={`form-group${errors.name ? ' form-group--error' : ''}`}>
                    <label htmlFor="enq-name" className="form-label">Full Name *</label>
                    <input
                      id="enq-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="form-input"
                      autoComplete="name"
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  {/* Phone */}
                  <div className={`form-group${errors.phone ? ' form-group--error' : ''}`}>
                    <label htmlFor="enq-phone" className="form-label">Phone Number *</label>
                    <input
                      id="enq-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className="form-input"
                      autoComplete="tel"
                      maxLength={10}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>

                  {/* Email */}
                  <div className={`form-group form-group--full${errors.email ? ' form-group--error' : ''}`}>
                    <label htmlFor="enq-email" className="form-label">Email Address *</label>
                    <input
                      id="enq-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="form-input"
                      autoComplete="email"
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  {/* Project Select */}
                  <div className={`form-group form-group--full${errors.project ? ' form-group--error' : ''}`}>
                    <label htmlFor="enq-project" className="form-label">Select Project *</label>
                    <select
                      id="enq-project"
                      name="project"
                      value={form.project}
                      onChange={handleChange}
                      className="form-input form-select"
                    >
                      <option value="">-- Choose a project --</option>
                      {projectOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {errors.project && <span className="form-error">{errors.project}</span>}
                  </div>

                  {/* Message */}
                  <div className={`form-group form-group--full${errors.message ? ' form-group--error' : ''}`}>
                    <label htmlFor="enq-message" className="form-label">Message *</label>
                    <textarea
                      id="enq-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements, budget, timeline..."
                      className="form-input form-textarea"
                      rows={4}
                    />
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary enquiry__submit-btn"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader size={18} className="enquiry__spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
