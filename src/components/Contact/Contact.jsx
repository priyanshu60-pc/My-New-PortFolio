import { useRef, useState } from 'react';
import styles from './Contact.module.scss';
import { personal } from '../../data/content';

const CONTACT_ITEMS = [
  {
    id: 'whatsapp',
    icon: '💬',
    label: 'WhatsApp',
    value: personal.phone,
    href: `https://wa.me/918509554213?text=Hi%20Priyanshu!%20I%20found%20you%20through%20your%20portfolio.`,
  },
  {
    id: 'email',
    icon: '✉',
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    id: 'phone',
    icon: '☎',
    label: 'Phone',
    value: personal.phone,
    href: `tel:${personal.phone}`,
  },
  {
    id: 'location',
    icon: '◎',
    label: 'Location',
    value: personal.location,
    href: null,
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    const subject = encodeURIComponent(`Portfolio Contact: ${data.get('subject') || 'General Inquiry'}`);
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`
    );
    window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className={`section ${styles.contact}`} id="contact" name="contact">
      <div className="container">
        <p className="section-label">Get In Touch</p>
        <h2 className="section-title">Let's Build Something Together</h2>

        <div className={styles.grid}>
          {/* ── INFO COLUMN ─────────────────────────── */}
          <div className={styles.info} data-aos="fade-right" data-aos-duration="700">
            <p className={styles.intro}>
              I'm actively seeking opportunities in AI/ML engineering and full-stack development.
              Whether it's a project, internship, or full-time role — I'd love to connect. Reach out via WhatsApp, email, or phone!
            </p>

            <div className={styles.contactItems}>
              {CONTACT_ITEMS.map((item) => (
                <div key={item.id} className={styles.contactItem} id={`contact-${item.id}`}>
                  <span className={styles.contactIcon}>{item.icon}</span>
                  <div>
                    <div className={styles.contactLabel}>{item.label}</div>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        className={styles.contactValue}
                        target={item.id === 'whatsapp' ? '_blank' : undefined}
                        rel={item.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className={styles.contactValue}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className={styles.socials}>
              <a href={personal.links.github}   target="_blank" rel="noopener noreferrer" className={styles.socialLink} id="contact-github">
                GitHub →
              </a>
              <a href={personal.links.linkedin}  target="_blank" rel="noopener noreferrer" className={styles.socialLink} id="contact-linkedin">
                LinkedIn →
              </a>
              <a href={personal.links.leetcode}  target="_blank" rel="noopener noreferrer" className={styles.socialLink} id="contact-leetcode">
                LeetCode →
              </a>
            </div>
          </div>

          {/* ── FORM ────────────────────────────────── */}
          <div className={styles.formCard} data-aos="fade-left" data-aos-duration="700" data-aos-delay="100">
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form} id="contact-form">
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={styles.input}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={styles.input}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className={styles.input}
                  placeholder="What's this about?"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="Tell me about the opportunity or project…"
                />
              </div>

              <button
                type="submit"
                className={`btn-cta ${styles.submitBtn}`}
                id="contact-submit"
              >
                {sent ? '✓ Message Queued' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
