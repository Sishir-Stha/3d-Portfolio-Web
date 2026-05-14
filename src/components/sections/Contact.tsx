import { useState } from 'react';
import { profile } from '@/data/profile';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

const contactItems = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { label: 'Location', value: profile.location },
  { label: 'GitHub', value: 'Sishir-Stha', href: profile.github },
];

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  return (
    <SectionWrapper id="contact" minHeight="100vh" className="contact-section">
      <div className="contact-shell">
        <div className="contact-heading animate-in">
          <span className="contact-heading-kicker">05 / Contact</span>
          <h2>Get In Touch</h2>
          <p>Have a system to ship, stabilize, or improve? Send the useful details and I will get back with a clear next step.</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-left-panel animate-in" aria-label="Avatar contact summary">
            <div className="contact-avatar-copy">
              <span>Available for reliable builds</span>
              <h3>Want to build something reliable?</h3>
              <p>Let's connect around the problem, the stack, and the fastest path to a production-ready result.</p>
              <div className="contact-actions">
                <a className="contact-action primary" href={`mailto:${profile.email}`}>Email Me</a>
                <a className="contact-action" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>

          <div className="contact-right-panel">
            <div className="contact-info-grid animate-in">
              {contactItems.map((item) => (
                <div key={item.label} className="contact-info-card glass-card">
                  <span className="contact-info-label">{item.label}</span>
                  {item.href ? (
                    <a
                      className="contact-info-value"
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="contact-info-value">{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="contact-form-card glass-card animate-in">
              <h3 className="contact-form-title">Send a Message</h3>
              <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
                <div className="contact-form-grid">
                  <div>
                    <label className="contact-label" htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name"
                      className="contact-input"
                      type="text"
                      value={formData.name}
                      onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="contact-label" htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      className="contact-input"
                      type="email"
                      value={formData.email}
                      onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="contact-field-full">
                    <label className="contact-label" htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      className="contact-textarea"
                      value={formData.message}
                      onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Send Message <span>-&gt;</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
