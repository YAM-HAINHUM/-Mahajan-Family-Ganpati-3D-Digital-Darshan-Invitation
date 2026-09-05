import React from 'react';
import { motion } from 'framer-motion';

export default function SacredTimeline({ t }) {
  return (
    <section
      style={{
        position: 'relative',
        padding: '3rem 0 4rem',
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
            ✦ शुभ कार्यकाळ ✦
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
          <p
            className="marathi-text"
            style={{ color: '#E6C875', fontSize: '1rem', opacity: 0.85 }}
          >
            {t.timelineSub}
          </p>
        </div>

        {/* Timeline Path Container */}
        <div
          style={{
            position: 'relative',
            maxWidth: '680px',
            margin: '0 auto',
            padding: '2rem 0',
          }}
        >
          {/* Top Diya Cap */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <img
              src="/assets/images/diya.svg"
              alt="Sacred Lamp"
              style={{
                width: '36px',
                height: '36px',
                filter: 'drop-shadow(0 0 10px rgba(230, 200, 117, 0.8))',
              }}
            />
          </div>

          {/* Animated Golden Spine Line */}
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
              width: '2px',
              background: 'linear-gradient(180deg, #E6C875 0%, #C99A3D 50%, #8E1B23 100%)',
              transform: 'translateX(-50%)',
              transformOrigin: 'top center',
              boxShadow: '0 0 10px rgba(230, 200, 117, 0.5)',
              zIndex: 1,
            }}
          />

          {/* Timeline Events */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative', zIndex: 2 }}>
            {t.timelineEvents.map((ev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.9, delay: idx * 0.2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Center Diamond Milestone Indicator */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '24px',
                    height: '24px',
                    background: '#5C0E16',
                    border: '2px solid #E6C875',
                    borderRadius: '4px',
                    transformOrigin: 'center',
                    rotate: '45deg',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 12px rgba(230, 200, 117, 0.7)',
                    zIndex: 3,
                  }}
                >
                  <div style={{ width: '8px', height: '8px', background: '#FFF3D1', borderRadius: '1px' }} />
                </div>

                {/* Event Card (Responsive Alternating / Centered Layout) */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: '480px',
                    background: 'linear-gradient(135deg, rgba(53, 7, 12, 0.9) 0%, rgba(42, 23, 18, 0.85) 100%)',
                    border: '1px solid rgba(201, 154, 61, 0.4)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
                    marginTop: '28px',
                    position: 'relative',
                  }}
                >
                  <span
                    className="marathi-text"
                    style={{
                      display: 'inline-block',
                      padding: '3px 12px',
                      background: 'rgba(230, 200, 117, 0.15)',
                      border: '1px solid rgba(230, 200, 117, 0.3)',
                      borderRadius: '12px',
                      color: '#E6C875',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '0.6rem',
                    }}
                  >
                    ⏰ {ev.time}
                  </span>

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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2.5rem',
            }}
          >
            <img
              src="/assets/images/diya.svg"
              alt="Sacred Lamp"
              style={{
                width: '36px',
                height: '36px',
                filter: 'drop-shadow(0 0 10px rgba(230, 200, 117, 0.8))',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
