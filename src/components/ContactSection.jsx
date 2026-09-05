import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, UserCheck } from 'lucide-react';
import { eventData } from '../data/eventData';

export default function ContactSection({ t, lang = 'mr' }) {
  return (
    <section
      id="contact-section"
      style={{
        position: 'relative',
        padding: '3rem 1rem 4rem',
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
            {lang === 'mr' ? '✦ आपुलकीचा संवाद ✦' : '✦ Warm Conversations ✦'}
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
          <p className="marathi-text" style={{ color: '#E6C875', fontSize: '1rem', opacity: 0.85 }}>
            {t.contactSub}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '820px',
            margin: '0 auto',
          }}
        >
          {eventData.contacts.map((host, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="gold-card"
              style={{
                borderRadius: '12px',
                padding: '2.25rem 1.75rem',
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

              <h3 className="marathi-text" style={{ fontSize: '1.35rem', color: '#FFF8E8', fontWeight: 700 }}>
                {lang === 'mr' ? host.nameMr : host.name}
              </h3>
              <span style={{ fontSize: '0.9rem', color: '#E6C875', marginBottom: '1.5rem' }}>
                {lang === 'mr' ? host.roleMr : host.roleEn} • {Array.isArray(host.displayPhone) ? host.displayPhone.join(' / ') : host.displayPhone}
              </span>

              {/* Action Buttons: Call, WhatsApp, Email */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.6rem',
                  justifyContent: 'center',
                  width: '100%',
                  marginTop: 'auto',
                }}
              >
                <a
                  href={`tel:${host.phone}`}
                  className="gold-btn"
                  style={{ flex: 1, minWidth: '100px', padding: '0.65rem 0.8rem', fontSize: '0.9rem' }}
                >
                  <Phone size={15} />
                  {t.callBtn}
                </a>

                <a
                  href={`https://wa.me/91${host.phone}?text=${encodeURIComponent("॥ श्री गणेशाय नमः ॥ महाजन परिवार गणपती आमंत्रण बाबत...")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-btn-outline"
                  style={{ flex: 1, minWidth: '100px', padding: '0.65rem 0.8rem', fontSize: '0.9rem' }}
                >
                  <MessageCircle size={15} color="#4ADE80" />
                  {t.whatsappBtn}
                </a>

                {host.email && (
                  <a
                    href={`mailto:${host.email}?subject=${encodeURIComponent("Ganpati Sthapana RSVP - Mahajan Family")}`}
                    className="gold-btn-outline"
                    style={{ flex: 1, minWidth: '100px', padding: '0.65rem 0.8rem', fontSize: '0.9rem' }}
                  >
                    <Mail size={15} />
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
