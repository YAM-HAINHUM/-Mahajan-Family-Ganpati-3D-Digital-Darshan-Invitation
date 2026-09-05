import React from 'react';
import { motion } from 'framer-motion';

export default function InvitationMessage({ t }) {
  return (
    <section
      style={{
        position: 'relative',
        padding: '2rem 0 4rem',
        zIndex: 10,
      }}
    >
      <div className="mandap-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(74, 11, 18, 0.9) 0%, rgba(36, 8, 11, 0.95) 100%)',
            border: '2px solid #C99A3D',
            borderRadius: '12px',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 30px rgba(201, 154, 61, 0.15)',
          }}
        >
          {/* Top Traditional Kalash / Diya Symbol */}
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '-50px auto 1rem',
              background: 'radial-gradient(circle, #5C0E16 60%, #2A1712 100%)',
              border: '2px solid #E6C875',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(0,0,0,0.8), 0 0 20px rgba(230, 200, 117, 0.5)',
            }}
          >
            <img
              src="/assets/images/diya.svg"
              alt="Sacred Lamp"
              style={{ width: '38px', height: '38px' }}
            />
          </div>

          <h2
            className="marathi-text"
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)',
              color: '#FFF3D1',
              fontWeight: 700,
              marginBottom: '1.25rem',
              letterSpacing: '0.04em',
            }}
          >
            {t.messageHeading}
          </h2>

          <p
            className="marathi-text"
            style={{
              fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)',
              color: '#F8F0DC',
              lineHeight: 2,
              fontStyle: 'normal',
              marginBottom: '1.75rem',
            }}
          >
            "{t.messageBody}"
          </p>

          <div
            style={{
              width: '120px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #E6C875, transparent)',
              margin: '0 auto 1.5rem',
            }}
          />

          <div
            className="marathi-text"
            style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              color: '#E6C875',
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}
          >
            {t.messageFamily}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
