import React from 'react';
import { motion } from 'framer-motion';
import DecorativeDivider from './DecorativeDivider';

export default function Hero({ t, lang = 'mr' }) {
  return (
    <div
      style={{
        position: 'relative',
        padding: '3rem 1.5rem 2rem',
        textAlign: 'center',
        zIndex: 10,
      }}
    >
      <div className="mandap-container">
        <DecorativeDivider />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '820px', margin: '0 auto' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              background: 'rgba(201, 154, 61, 0.15)',
              border: '1px solid rgba(230, 200, 117, 0.3)',
              borderRadius: '24px',
              color: '#FFF3D1',
              fontSize: '0.9rem',
              marginBottom: '1.25rem',
            }}
          >
            <span>🪔</span>
            <span className="marathi-text">{lang === 'mr' ? 'गणेशोत्सव २०२६' : 'Ganeshotsav 2026'}</span>
            <span>🪔</span>
          </div>

          <h2
            className="marathi-text"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: '#FFF3D1',
              lineHeight: 1.3,
              marginBottom: '1.2rem',
              textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 0 20px rgba(230, 200, 117, 0.3)',
            }}
          >
            {t.invitationHeading}
          </h2>

          <p
            className="marathi-text"
            style={{
              fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)',
              color: '#F8F0DC',
              lineHeight: 1.9,
              fontWeight: 400,
              opacity: 0.95,
              textShadow: '0 2px 6px rgba(0,0,0,0.7)',
            }}
          >
            {t.heroInviteText}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
