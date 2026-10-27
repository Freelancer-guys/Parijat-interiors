import { useState, useEffect, useRef, type FormEvent, type TouchEvent } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Instagram,
  MapPin,
  Maximize2,
  Menu,
  MessageCircle,
  MoveRight,
  X,
} from 'lucide-react';
import {
  BUSINESS_WHATSAPP_NUMBER,
  business,
  images,
  mysaDermaProject,
  curatedProjects,
  services,
  processSteps,
} from '@/data/site';

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`logo-wrapper ${compact ? 'logo-wrapper-compact' : ''}`}>
      <img
        src={business.logo}
        alt="Parijat Interiors — Design The Devine"
        className="brand-logo"
        width={compact ? 50 : 64}
        height={compact ? 50 : 64}
        loading="eager"
      />
      <div className="brand-text">
        <span className="brand-name">पारिजात</span>
        <span className="brand-sub">Interiors</span>
      </div>
    </div>
  );
}

const navigation = [
  ['Work', 'portfolio'],
  ['Services', 'services'],
  ['Process', 'process'],
  ['Trust', 'trust'],
  ['Contact', 'contact'],
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [whatsAppToast, setWhatsAppToast] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', type: '', location: '', email: '', brief: '' });

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const whatsappReady = Boolean(BUSINESS_WHATSAPP_NUMBER && (BUSINESS_WHATSAPP_NUMBER as string).trim() !== '');
  const baseWhatsAppMessage = "Hi, I'm interested in discussing an interior design project with Parijat Interiors.";
  const whatsappUrl = whatsappReady
    ? `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(baseWhatsAppMessage)}`
    : '#contact';

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) setLightboxOpen(false);
        if (menuOpen) setMenuOpen(false);
        if (whatsAppToast) setWhatsAppToast(false);
      }
      if (lightboxOpen || document.activeElement?.closest('.mysa-carousel')) {
        if (e.key === 'ArrowLeft') {
          setActiveSlide((prev) => (prev > 0 ? prev - 1 : mysaDermaProject.slides.length - 1));
        } else if (e.key === 'ArrowRight') {
          setActiveSlide((prev) => (prev < mysaDermaProject.slides.length - 1 ? prev + 1 : 0));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, menuOpen, whatsAppToast]);

  // Touch swipe handling for mobile carousel
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 35;
    if (diff > threshold) {
      setActiveSlide((prev) => (prev < mysaDermaProject.slides.length - 1 ? prev + 1 : 0));
    } else if (diff < -threshold) {
      setActiveSlide((prev) => (prev > 0 ? prev - 1 : mysaDermaProject.slides.length - 1));
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const type = String(form.get('type') || '').trim();
    const location = String(form.get('location') || '').trim();
    const email = String(form.get('email') || '').trim();
    const brief = String(form.get('brief') || '').trim();

    if (!name || !phone || !type) {
      setFormError('Please provide your name, phone or WhatsApp number, and select a project type.');
      setFormSuccess(false);
      return;
    }

    setFormData({ name, phone, type, location, email, brief });
    setFormError('');
    setFormSuccess(true);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (!whatsappReady) {
      e.preventDefault();
      setWhatsAppToast(true);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => {
        setWhatsAppToast(false);
      }, 5500);
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const currentSlide = mysaDermaProject.slides[activeSlide];

  return (
    <div className="site-shell">
      {/* Toast Notification for WhatsApp Feature Status */}
      {whatsAppToast && (
        <div className="toast-notification" role="status" aria-live="polite">
          <div className="toast-icon">
            <MessageCircle size={18} />
          </div>
          <div className="toast-body">
            <strong>WhatsApp Feature Will Be Live Soon!</strong>
            <p>Direct WhatsApp integration is coming soon. Please leave your details in the enquiry form below or DM us on Instagram @parijatinteriors.</p>
          </div>
          <button
            className="toast-close"
            onClick={() => setWhatsAppToast(false)}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* 5. Sticky Header */}
      <header className="site-header">
        <a className="logo-link" href="#top" aria-label="Parijat Interiors home">
          <Logo compact />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-cta" href="#contact">
            Discuss Your Project <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <>
          <div className="mobile-nav-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <div className="mobile-nav-links">
              {navigation.map(([label, id]) => (
                <a
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  key={id}
                  className="mobile-nav-item"
                >
                  <span>{label}</span>
                  <ArrowUpRight size={18} />
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="button button-dark mobile-nav-cta"
            >
              Discuss Your Project <ArrowUpRight size={16} />
            </a>
          </nav>
        </>
      )}

      <main id="top">
        {/* 3. Balanced Hero Layout with Confident Typography */}
        <section className="hero section-pad" aria-label="Introduction">
          <div className="hero-container">
            <div className="hero-grid">
              <div className="hero-copy">
                <div className="eyebrow-badge">
                  <span className="eyebrow-dot" />
                  <p className="eyebrow">Parijat Interiors · Residential & Commercial</p>
                </div>

                <h1 className="hero-headline">
                  Every space has a story.<br />
                  <em>Let’s make yours beautiful.</em>
                </h1>

                <p className="hero-lede">
                  Thoughtfully designed interiors for the way you live and work. We craft enduring residential homes and modern commercial spaces shaped around everyday living.
                </p>

                <div className="hero-actions">
                  <a className="button button-dark" href="#portfolio">
                    Explore Our Work <ArrowDownRight size={17} />
                  </a>
                  <a className="text-link" href="#contact">
                    Discuss Your Project <MoveRight size={17} />
                  </a>
                </div>

                <div className="hero-location-tag">
                  <MapPin size={15} className="tag-icon" />
                  <span>Maharashtra · Enquiries across India</span>
                </div>
              </div>

              <div className="hero-visual">
                <div className="visual-frame">
                  <img
                    src={images.hero}
                    alt="Warm, sophisticated contemporary interior architecture with bespoke furnishings and layered ceiling lighting"
                    fetchPriority="high"
                    className="hero-image"
                  />
                  <div className="hero-caption">
                    <span className="caption-region">Maharashtra · Enquiries across India</span>
                    <span className="caption-label">Interior Architecture</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Featured Portfolio led by MYSA Derma Clinic */}
        <section className="portfolio section-pad" id="portfolio" aria-label="Featured Portfolio">
          <div className="content-container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">01 / Featured Portfolio</p>
                <h2>
                  Crafted spaces &<br />
                  <em>commercial environments.</em>
                </h2>
              </div>
              <p className="heading-note">
                Real commercial photography and bespoke residences designed with tactile warmth, precise joinery, and functional clarity.
              </p>
            </div>

            {/* MYSA Derma Featured Project Showcase (Refined Light Editorial Card) */}
            <article className="mysa-feature-card" aria-labelledby="mysa-project-title">
              <div className="mysa-header-row">
                <div className="mysa-badge-row">
                  <span className="project-eyebrow">{mysaDermaProject.eyebrow}</span>
                  <span className="project-category-tag">{mysaDermaProject.category}</span>
                </div>
                <h3 id="mysa-project-title" className="mysa-title">{mysaDermaProject.title}</h3>
                <p className="mysa-description">{mysaDermaProject.description}</p>
              </div>

              <div
                className="mysa-carousel"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                tabIndex={0}
                aria-label="MYSA Derma project image carousel. Use left and right arrow keys to navigate."
              >
                {/* Main Visual Display */}
                <div className="carousel-stage">
                  <div className="carousel-slide-wrapper">
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.alt}
                      className="carousel-main-image"
                      loading="lazy"
                    />
                    <button
                      className="carousel-zoom-button"
                      onClick={() => setLightboxOpen(true)}
                      aria-label={`Inspect full size image: ${currentSlide.title}`}
                      title="Inspect high-resolution photograph"
                    >
                      <Maximize2 size={16} />
                      <span>Inspect</span>
                    </button>
                    <div className="carousel-counter">
                      <span>{String(activeSlide + 1).padStart(2, '0')}</span>
                      <span className="counter-divider">/</span>
                      <span>{String(mysaDermaProject.slides.length).padStart(2, '0')}</span>
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  <div className="carousel-controls">
                    <button
                      className="carousel-nav-btn"
                      onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : mysaDermaProject.slides.length - 1))}
                      aria-label="Previous photograph"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div className="carousel-dots" role="tablist">
                      {mysaDermaProject.slides.map((slide, idx) => (
                        <button
                          key={slide.id}
                          role="tab"
                          aria-selected={idx === activeSlide}
                          aria-label={`View slide ${idx + 1}: ${slide.title}`}
                          className={`carousel-dot ${idx === activeSlide ? 'active' : ''}`}
                          onClick={() => setActiveSlide(idx)}
                        />
                      ))}
                    </div>
                    <button
                      className="carousel-nav-btn"
                      onClick={() => setActiveSlide((prev) => (prev < mysaDermaProject.slides.length - 1 ? prev + 1 : 0))}
                      aria-label="Next photograph"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Slide Meta & Thumbnail Strip */}
                <div className="carousel-meta-panel">
                  <div className="slide-editorial">
                    <span className="slide-subtitle">{currentSlide.subtitle}</span>
                    <h4 className="slide-title">{currentSlide.title}</h4>
                    <p className="slide-desc">{currentSlide.description}</p>
                  </div>

                  <div className="thumbnail-strip" aria-label="Select photograph">
                    {mysaDermaProject.slides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        className={`thumbnail-item ${idx === activeSlide ? 'active' : ''}`}
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Thumbnail: ${slide.title}`}
                      >
                        <img src={slide.image} alt="" aria-hidden="true" />
                        <span className="thumb-idx">0{idx + 1}</span>
                      </button>
                    ))}
                  </div>

                  <div className="carousel-cta-row">
                    <a className="button button-dark" href="#contact">
                      Discuss Commercial Space <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* Curated Residential & Architectural Projects */}
            <div className="curated-grid">
              {curatedProjects.map((project, index) => (
                <article
                  className={`project-card ${project.wide ? 'project-card-wide' : ''}`}
                  key={project.title}
                >
                  <div className="project-image-wrap">
                    <img src={project.image} alt={project.alt} loading="lazy" />
                    <span className="project-index">0{index + 1}</span>
                    <span className="project-view-badge">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <div className="project-details">
                    <div className="project-title-group">
                      <p className="project-category">{project.category}</p>
                      <h3 className="project-heading">{project.title}</h3>
                    </div>
                    <p className="project-description">{project.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Services Section (Rich 3-Column Card Grid Filling Whitespace) */}
        <section className="services section-pad" id="services" aria-label="Services">
          <div className="content-container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 / What We Do</p>
                <h2>
                  Designed around<br />
                  <em>your life & work.</em>
                </h2>
              </div>
              <p className="heading-note">
                From a single room transformation to complete turnkey interior execution, shaped with thoughtful craftsmanship and ergonomic function.
              </p>
            </div>

            <div className="service-grid">
              {services.map((item) => (
                <div className="service-card" key={item.title}>
                  <div className="service-card-top">
                    <span className="service-card-number">{item.number}</span>
                    <ArrowUpRight className="service-card-arrow" size={18} />
                  </div>
                  <h3 className="service-card-title">{item.title}</h3>
                  <p className="service-card-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Process Section (Compact 4-Step Timeline) */}
        <section className="process section-pad" id="process" aria-label="Design Process">
          <div className="content-container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">03 / How It Works</p>
                <h2>
                  From first conversation<br />
                  <em>to finished space.</em>
                </h2>
              </div>
              <p className="heading-note">
                A structured, collaborative workflow ensuring total transparency on design concepts, material specifications, and delivery timelines.
              </p>
            </div>

            <div className="process-list">
              {processSteps.map((step) => (
                <div className="process-item" key={step.number}>
                  <div className="process-step-header">
                    <span className="process-number">{step.number}</span>
                    <span className="process-pill">Step {step.number}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Authentic Trust Section (No Fabricated Testimonials) */}
        <section className="trust section-pad" id="trust" aria-label="Trust and Standards">
          <div className="content-container">
            <div className="trust-grid">
              <div className="trust-column-left">
                <p className="eyebrow">04 / Trust & Craftsmanship</p>
                <h2>
                  Built on clarity,<br />
                  <em>detail, and care.</em>
                </h2>
              </div>

              <div className="trust-column-right">
                <p className="trust-lede">
                  Every project begins with an attentive conversation and succeeds through meticulous execution. We balance enduring aesthetics, functional ergonomics, and respectful budgeting.
                </p>
                <p className="trust-sub">
                  Our portfolio showcases verified commercial work such as the MYSA Derma clinic alongside bespoke residential interiors across Maharashtra and India.
                </p>
                <div className="trust-action-row">
                  <a className="button button-outline-light" href="#contact">
                    Start a Conversation <MoveRight size={17} />
                  </a>
                </div>
              </div>
            </div>

            {/* Genuine Client Feedback Notice */}
            <div className="feedback-status-card">
              <div className="feedback-status-header">
                <span className="status-indicator-dot" />
                <p className="feedback-status-eyebrow">Authentic Standards</p>
              </div>
              <h3>Verified spaces, honest collaborations.</h3>
              <p>
                We believe interior photography should demonstrate real work, and client testimonials should reflect verified experiences. Client reviews are added following client sign-off.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Enquiry & Contact Section */}
        <section className="contact section-pad" id="contact" aria-label="Contact and Enquiries">
          <div className="content-container">
            <div className="contact-grid">
              <div className="contact-heading">
                <p className="eyebrow">05 / Begin Here</p>
                <h2>
                  Let’s create<br />
                  <em>a space that feels right.</em>
                </h2>
                <p>
                  Tell us about your home, clinic, office, or commercial space. We discuss initial design requirements, scope, and feasibility with complete transparency.
                </p>

                <div className="contact-channels">
                  <div className="channel-box">
                    <span className="channel-title">Studio Location & Service</span>
                    <p className="channel-text">{business.region} · Welcoming enquiries across India</p>
                  </div>
                  <div className="channel-box">
                    <span className="channel-title">Instagram Portfolio</span>
                    <a
                      href={business.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="channel-link"
                    >
                      <Instagram size={16} /> {business.instagramHandle}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Enquiry Form */}
              <div className="form-container">
                <form className="enquiry-form" onSubmit={handleFormSubmit} noValidate>
                  <div className="form-row">
                    <label>
                      Your Name *
                      <input
                        name="name"
                        placeholder="e.g. Priya Sharma"
                        autoComplete="name"
                        required
                      />
                    </label>
                    <label>
                      Phone or WhatsApp *
                      <input
                        name="phone"
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        required
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Project Type *
                      <select name="type" defaultValue="" required>
                        <option value="" disabled>Select project scope</option>
                        {services.map((item) => (
                          <option key={item.title} value={item.title}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Project Location
                      <input
                        name="location"
                        placeholder="City or region in Maharashtra / India"
                        autoComplete="address-level2"
                      />
                    </label>
                  </div>

                  <label>
                    Email Address
                    <input
                      name="email"
                      type="email"
                      placeholder="you@domain.com"
                      autoComplete="email"
                    />
                  </label>

                  <label>
                    Brief Project Requirements
                    <textarea
                      name="brief"
                      rows={4}
                      placeholder="Tell us about the space (carpet area, key requirements, preferred timeline, budget expectations)..."
                    />
                  </label>

                  {formError && (
                    <p className="form-error" role="alert">
                      {formError}
                    </p>
                  )}

                  {formSuccess && (
                    <div className="form-feedback-card" role="status">
                      <div className="feedback-icon">
                        <Check size={18} />
                      </div>
                      <div className="feedback-text">
                        <strong>Project Details Received in Preview Mode</strong>
                        <p>
                          Thank you, {formData.name}. This website is currently running in development preview mode. To connect directly with Parijat Interiors today, message us on Instagram <strong>@parijatinteriors</strong>.
                        </p>
                      </div>
                    </div>
                  )}

                  <button className="button button-dark form-submit" type="submit">
                    {formSuccess ? 'Submit Another Enquiry' : 'Send Project Enquiry'} <ArrowUpRight size={16} />
                  </button>

                  <p className="form-footnote">
                    Preview Environment — Connect a verified contact backend or email integration before public deployment.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="content-container">
          <div className="footer-top">
            <div className="footer-brand">
              <Logo />
              <p className="footer-tagline">
                Every space has a story.<br />
                <em>Let’s make yours beautiful.</em>
              </p>
            </div>

            <div className="footer-nav-col">
              <span className="footer-col-title">Navigation</span>
              <div className="footer-links">
                {navigation.map(([label, id]) => (
                  <a href={`#${id}`} key={id}>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-contact-col">
              <span className="footer-col-title">Get in Touch</span>
              <p className="footer-subtext">Open for residential and commercial enquiries across India.</p>
              <a className="footer-contact-link" href="#contact">
                Discuss Your Project <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Parijat Interiors. All rights reserved.</span>
            <span>{business.region}</span>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <Instagram size={14} /> {business.instagramHandle}
            </a>
          </div>
        </div>
      </footer>

      {/* 8. Floating WhatsApp Button */}
      <div className="floating-whatsapp-container">
        <a
          className="floating-whatsapp"
          href={whatsappUrl}
          onClick={handleWhatsAppClick}
          aria-label="Enquire on WhatsApp"
        >
          <MessageCircle size={18} />
          <span className="whatsapp-label">Enquire on WhatsApp</span>
        </a>
      </div>

      {/* Carousel Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox-backdrop" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button
              className="lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close photograph inspection"
            >
              <X size={24} />
            </button>
            <div className="lightbox-image-wrap">
              <img src={currentSlide.image} alt={currentSlide.alt} />
            </div>
            <div className="lightbox-caption">
              <div>
                <span className="lightbox-idx">{String(activeSlide + 1).padStart(2, '0')} / {String(mysaDermaProject.slides.length).padStart(2, '0')}</span>
                <h4>{currentSlide.title}</h4>
              </div>
              <p>{currentSlide.description}</p>
            </div>
            <div className="lightbox-nav-controls">
              <button
                className="lightbox-nav-btn"
                onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : mysaDermaProject.slides.length - 1))}
                aria-label="Previous photograph"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="lightbox-nav-btn"
                onClick={() => setActiveSlide((prev) => (prev < mysaDermaProject.slides.length - 1 ? prev + 1 : 0))}
                aria-label="Next photograph"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
