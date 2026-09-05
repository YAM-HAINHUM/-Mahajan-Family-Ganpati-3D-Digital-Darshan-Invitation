import React from 'react';
import { motion } from 'framer-motion';

export default function EventTimeline({ t, lang = 'mr' }) {
  return (
    <section
      id="timeline-section"
      style={{
        position: 'relative',
        padding: '3.5rem 1rem 4.5rem',
        zIndex: 10,
      }}
    >
      <div className="mandap-container">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span
            style={{
              color: '#C99A3D',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-marathi)',
            }}
          >
            {lang === 'mr' ? '✦ मुहूर्त व विधी कार्यकाळ ✦' : '✦ Muhurat & Ritual Schedule ✦'}
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
            {t.timelineTitle}
          </h2>
          <p className="marathi-text" style={{ color: '#E6C875', fontSize: '1rem', opacity: 0.85 }}>
            {t.timelineSub}
          </p>
        </div>

        {/* Timeline Track with Glowing Nodes */}
        <div
          style={{
            position: 'relative',
            maxWidth: '680px',
            margin: '0 auto',
            padding: '2rem 0',
          }}
        >
          {/* Top Diya Cap */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <img
              src="/assets/images/diya.svg"
              alt="Sacred Lamp"
              style={{ width: '38px', height: '38px', filter: 'drop-shadow(0 0 10px rgba(230, 200, 117, 0.8))' }}
            />
          </div>

          {/* Animated Gold Spine */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '70px',
              bottom: '70px',
              left: '50%',
              width: '3px',
              background: 'linear-gradient(180deg, #E6C875 0%, #C99A3D 50%, #8E1B23 100%)',
              transform: 'translateX(-50%)',
              transformOrigin: 'top center',
              boxShadow: '0 0 15px rgba(230, 200, 117, 0.6)',
              zIndex: 1,
            }}
          />

          {/* Event Nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.75rem', position: 'relative', zIndex: 2 }}>
            {t.timelineEvents.map((ev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  paddingTop: '2.25rem',
                }}
              >
                {/* Glowing Diamond Node on Spine */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '1rem',
                    transform: 'translate(-50%, -50%)',
                    width: '24px',
                    height: '24px',
                    background: '#5C0E16',
                    border: '2px solid #FFF3D1',
                    borderRadius: '4px',
                    rotate: '45deg',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 16px rgba(230, 200, 117, 0.8), inset 0 0 6px #FFA726',
                    zIndex: 4,
                  }}
                >
                  <div style={{ width: '8px', height: '8px', background: '#E6C875', borderRadius: '1px' }} />
                </div>

                {/* Ritual Card */}
                <div
                  className="gold-card"
                  style={{
                    width: '100%',
                    maxWidth: '480px',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  {ev.time && (
                    <span
                      className="marathi-text"
                      style={{
                        display: 'inline-block',
                        padding: '4px 14px',
                        background: 'rgba(230, 200, 117, 0.15)',
                        border: '1px solid rgba(230, 200, 117, 0.35)',
                        borderRadius: '16px',
                        color: '#FFF3D1',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        marginBottom: '0.6rem',
                      }}
                    >
                      {ev.time}
                    </span>
                  )}

                  <h3
                    className="marathi-text"
                    style={{
                      fontSize: '1.25rem',
                      color: '#FFF8E8',
                      fontWeight: 700,
                      marginBottom: '0.4rem',
                    }}
                  >
                    {ev.title}
                  </h3>

                  <p
                    className="marathi-text"
                    style={{
                      fontSize: '0.95rem',
                      color: '#F8F0DC',
                      lineHeight: 1.7,
                      opacity: 0.9,
                    }}
                  >
                    {ev.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Diya Cap */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
            <img
              src="/assets/images/diya.svg"
              alt="Sacred Lamp"
              style={{ width: '38px', height: '38px', filter: 'drop-shadow(0 0 10px rgba(230, 200, 117, 0.8))' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
