import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, UserCheck } from 'lucide-react';

export default function Contact({ t }) {
  const hosts = [
    {
      name: "Anil Nago Mahajan",
      nameMr: "अनिल नागो महाजन",
      role: "गृहप्रमुख (Host)",
      phone: "9012345678",
      displayPhone: "+91 90123 45678",
    },
    {
      name: "Yash Mahajan",
      nameMr: "यश महाजन",
      role: "समन्वयक (Coordinator)",
      phone: "9012345678",
      displayPhone: "+91 90123 45678",
      email: "abc@abc.com",
    },
  ];

  return (
    <section
      id="contact-section"
      style={{
        position: 'relative',
        padding: '3rem 0 4rem',
        zIndex: 10,
      }}
    >
      <div className="mandap-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              color: '#C99A3D',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-marathi)',
            }}
          >
            ✦ आपुलकीचा संवाद ✦
          </span>
          <h2
            className="marathi-text"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              color: '#FFF3D1',
              fontWeight: 700,
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            {t.contactTitle}
          </h2>
          <p
            className="marathi-text"
            style={{ color: '#E6C875', fontSize: '1rem', opacity: 0.85 }}
          >
            {t.contactSub}
          </p>
        </div>

        {/* Host Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '820px',
            margin: '0 auto',
          }}
        >
          {hosts.map((host, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="gold-card"
              style={{
                borderRadius: '10px',
                padding: '2rem 1.75rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <div className="corner-ornament corner-tl" />
              <div className="corner-ornament corner-tr" />
              <div className="corner-ornament corner-bl" />
              <div className="corner-ornament corner-br" />

              {/* Avatar Icon */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(201, 154, 61, 0.15)',
                  border: '1.5px solid #E6C875',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  boxShadow: '0 0 15px rgba(201, 154, 61, 0.3)',
                }}
              >
                <UserCheck size={26} color="#FFF3D1" />
              </div>

              <h3
                className="marathi-text"
                style={{ fontSize: '1.35rem', color: '#FFF8E8', fontWeight: 700 }}
              >
                {host.nameMr}
              </h3>
              <span style={{ fontSize: '0.9rem', color: '#E6C875', marginBottom: '1.25rem' }}>
                {host.name} • {host.role}
              </span>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  justifyContent: 'center',
                  width: '100%',
                  marginTop: 'auto',
                }}
              >
                <a
                  href={`tel:${host.phone}`}
                  className="gold-btn"
                  style={{ flex: 1, minWidth: '130px', padding: '0.65rem 1rem', fontSize: '0.95rem' }}
                >
                  <Phone size={16} />
                  {t.callBtn}
                </a>

                {host.email && (
                  <a
                    href={`mailto:${host.email}?subject=${encodeURIComponent("Ganpati Sthapana RSVP - Mahajan Family")}`}
                    className="gold-btn-outline"
                    style={{ flex: 1, minWidth: '130px', padding: '0.65rem 1rem', fontSize: '0.95rem' }}
                  >
                    <Mail size={16} />
                    {t.emailBtn}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
