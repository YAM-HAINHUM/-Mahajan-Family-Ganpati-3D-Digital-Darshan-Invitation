import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Heart } from 'lucide-react';
import DecorativeDivider from './DecorativeDivider';

export default function Invitation({ t, lang = 'mr' }) {
  const details = [
    {
      icon: <Calendar size={28} color="#E6C875" />,
      label: t.dateLabel,
      value: t.dateValue,
      sub: t.dayValue,
    },
    {
      icon: <Sparkles size={28} color="#E6C875" />,
      label: t.sthapanaLabel,
      value: t.sthapanaTime,
      sub: lang === 'mr' ? "शुभ मुहूर्तावर" : "On an auspicious muhurat",
    },
    {
      icon: <Heart size={28} color="#E6C875" />,
      label: t.durationLabel,
      value: t.durationValue,
      sub: lang === 'mr' ? "मंगलमय सहवास" : "A joyful celebration together",
    },
  ];

  return (
    <section 
      id="invitation-section"
      style={{
        position: 'relative',
        padding: '3rem 0 4rem',
        zIndex: 10,
      }}
    >
      <div className="mandap-container">
        {/* Main Royal Invitation Card */}
        <motion.div
          className="gold-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderRadius: '12px',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="corner-ornament corner-tl" />
          <div className="corner-ornament corner-tr" />
          <div className="corner-ornament corner-bl" />
          <div className="corner-ornament corner-br" />

          {/* Subtitle / Devotional Note */}
          <div style={{ maxWidth: '720px', margin: '0 auto 2.5rem' }}>
            <h3
              className="marathi-text"
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                fontWeight: 700,
                color: '#FFF3D1',
                marginBottom: '1rem',
                letterSpacing: '0.03em',
              }}
            >
              {t.invitationHeading}
            </h3>
            <p
              className="marathi-text"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: '#F8F0DC',
                lineHeight: 1.85,
                opacity: 0.9,
              }}
            >
              {t.invitationSubheading}
            </p>
          </div>

          <DecorativeDivider />

          {/* Ceremony Highlights Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              marginTop: '2rem',
            }}
          >
            {details.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                style={{
                  background: 'rgba(42, 23, 18, 0.65)',
                  border: '1px solid rgba(201, 154, 61, 0.3)',
                  borderRadius: '8px',
                  padding: '1.75rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.5)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'rgba(201, 154, 61, 0.15)',
                    border: '1px solid rgba(230, 200, 117, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px rgba(201, 154, 61, 0.2)',
                  }}
                >
                  {item.icon}
                </div>

                <span
                  className="marathi-text"
                  style={{
                    fontSize: '0.85rem',
                    color: '#C99A3D',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </span>

                <strong
                  className="marathi-text"
                  style={{
                    fontSize: '1.35rem',
                    color: '#FFF8E8',
                    fontWeight: 700,
                  }}
                >
                  {item.value}
                </strong>

                <span
                  className="marathi-text"
                  style={{
                    fontSize: '0.85rem',
                    color: '#E6C875',
                    opacity: 0.8,
                  }}
                >
                  {item.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
