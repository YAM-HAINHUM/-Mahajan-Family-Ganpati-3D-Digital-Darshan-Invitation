import React from 'react';
import { motion } from 'framer-motion';
import DecorativeDivider from './DecorativeDivider';
import Diyas from './Diyas';

export default function Footer({ t }) {
  return (
    <footer
      style={{
        position: 'relative',
        padding: '5rem 0 6rem',
        background: 'linear-gradient(180deg, transparent 0%, #2A060A 50%, #150305 100%)',
        textAlign: 'center',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      {/* Background Fading Sacred Mandala */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          opacity: 0.12,
          pointerEvents: 'none',
        }}
      >
        <img
          src="/assets/images/mandala.svg"
          alt="Mandala"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="mandap-container" style={{ position: 'relative', zIndex: 2 }}>
        <DecorativeDivider />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          style={{ maxWidth: '650px', margin: '0 auto' }}
        >
          {/* Sacred Diya */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <img
              src="/assets/images/diya.svg"
              alt="Diya"
              style={{
                width: '42px',
                height: '42px',
                filter: 'drop-shadow(0 0 12px rgba(230, 200, 117, 0.8))',
              }}
            />
          </div>

          <h2
            className="marathi-text"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 2.75rem)',
              color: '#FFF8E8',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textShadow: '0 4px 16px rgba(0,0,0,0.8), 0 0 25px rgba(230, 200, 117, 0.5)',
              marginBottom: '1rem',
            }}
          >
            {t.finalSalutation}
          </h2>

          <p
            className="marathi-text"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#F8F0DC',
              lineHeight: 1.8,
              opacity: 0.9,
              marginBottom: '2rem',
            }}
          >
            {t.finalBlessing}
          </p>

          <div
            style={{
              width: '100px',
              height: '1.5px',
              background: 'linear-gradient(90deg, transparent, #C99A3D, transparent)',
              margin: '0 auto 1.5rem',
            }}
          />

          <div
            className="marathi-text"
            style={{
              fontSize: '1.25rem',
              color: '#E6C875',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            {t.finalSign}
          </div>

          <div
            style={{
              marginTop: '3.5rem',
              fontSize: '0.8rem',
              color: '#76584A',
              letterSpacing: '0.04em',
            }}
          >
            ॥ सदा सर्वदा योग तुझा घडावा • तुझे कारणी देह माझा पडावा ॥
          </div>
        </motion.div>
      </div>

      <Diyas count={4} />
    </footer>
  );
}
