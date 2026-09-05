import React from 'react';
import { motion } from 'framer-motion';
import DecorativeDivider from './DecorativeDivider';
import Diyas from './Diyas';
import { eventData } from '../data/eventData';

export default function BlessingsSection({ t, lang = 'mr' }) {
  const host = eventData.contacts[0];
  const coordinator = eventData.contacts.find((contact) => contact.name === 'Yash Anil Mahajan');

  return (
    <footer
      style={{
        position: 'relative',
        padding: '5rem 1rem 7rem',
        background: 'linear-gradient(180deg, transparent 0%, #200407 40%, #120204 100%)',
        textAlign: 'center',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      {/* Background Soft Closing Curtains Vignette */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '18%',
          background: 'linear-gradient(90deg, rgba(30, 4, 8, 0.9) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '18%',
          background: 'linear-gradient(-90deg, rgba(30, 4, 8, 0.9) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="mandap-container" style={{ position: 'relative', zIndex: 2 }}>
        <DecorativeDivider />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          style={{ maxWidth: '680px', margin: '0 auto' }}
        >
          {/* Sacred Diya */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <img
              src="/assets/images/diya.svg"
              alt="Diya"
              style={{ width: '46px', height: '46px', filter: 'drop-shadow(0 0 14px rgba(230, 200, 117, 0.8))' }}
            />
          </div>

          <h3
            className="marathi-text"
            style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              color: '#FFF3D1',
              fontWeight: 600,
              lineHeight: 1.8,
              marginBottom: '1.5rem',
            }}
          >
            "{t.finalTitle}"
          </h3>

          <h2
            className="marathi-text"
            style={{
              fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)',
              color: '#FFF8E8',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textShadow: '0 4px 16px rgba(0,0,0,0.85), 0 0 25px rgba(230, 200, 117, 0.5)',
              marginBottom: '1.25rem',
            }}
          >
            🪔 {t.finalSalutation}
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
              width: '120px',
              height: '1.5px',
              background: 'linear-gradient(90deg, transparent, #C99A3D, transparent)',
              margin: '0 auto 1.5rem',
            }}
          />

          <div
            className="marathi-text"
            style={{
              fontSize: '1.35rem',
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
              letterSpacing: '0.05em',
            }}
          >
            {lang === 'mr' ? '॥ सदा सर्वदा योग तुझा घडावा • तुझे कारणी देह माझा पडावा ॥' : 'May we always remain united in devotion, and may my life be dedicated to your service.'}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginTop: '3rem',
              padding: '1rem 1.25rem',
              borderTop: '1px solid rgba(201, 154, 61, 0.3)',
              borderBottom: '1px solid rgba(201, 154, 61, 0.3)',
              color: '#C99A3D',
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span>{lang === 'mr' ? 'महाजन परिवार' : 'The Mahajan Family'}</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                border: '1px solid rgba(230, 200, 117, 0.55)',
                borderRadius: '999px',
                padding: '0.55rem 0.9rem',
                background: 'rgba(230, 200, 117, 0.08)',
                color: '#FFF3D1',
                cursor: 'pointer',
                font: 'inherit',
                letterSpacing: '0.08em',
              }}
              aria-label="Back to top"
            >
              ↑ {lang === 'mr' ? 'वरती' : 'Back to top'}
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginTop: '2rem',
              padding: '1.5rem 0',
              borderBottom: '1px solid rgba(201, 154, 61, 0.2)',
              textAlign: 'left',
            }}
          >
            <div>
              <div style={{ color: '#E6C875', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {lang === 'mr' ? 'उत्सव आयोजक' : 'Hosted by'}
              </div>
              <div style={{ color: '#FFF3D1', fontWeight: 700 }}>{eventData.familyName}</div>
              <div style={{ color: '#B99A82', fontSize: '0.82rem' }}>{eventData.address.city}, {eventData.address.state}</div>
            </div>

            <div>
              <div style={{ color: '#E6C875', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {lang === 'mr' ? 'गणपती उत्सव' : 'Ganpati Festival'}
              </div>
              <div style={{ color: '#FFF3D1', fontWeight: 700 }}>{eventData.sthapana.date}</div>
              <div style={{ color: '#B99A82', fontSize: '0.82rem' }}>{eventData.celebration.duration}</div>
            </div>

            <div>
              <div style={{ color: '#E6C875', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {lang === 'mr' ? 'संपर्क' : 'Contact'}
              </div>
              <div style={{ color: '#FFF3D1', fontWeight: 700 }}>{host.name}</div>
              <div style={{ color: '#B99A82', fontSize: '0.82rem' }}>{host.displayPhone.join(' / ')}</div>
              <div style={{ color: '#FFF3D1', fontWeight: 700, marginTop: '0.35rem' }}>{coordinator.name}</div>
              <div style={{ color: '#B99A82', fontSize: '0.82rem' }}>{coordinator.displayPhone}</div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', color: '#C99A3D', fontSize: '0.78rem', letterSpacing: '0.08em' }}>
            {lang === 'mr' ? 'निर्मिती: ' : 'Made by '}
            <strong style={{ color: '#FFF3D1' }}>YAM</strong>
            {lang === 'mr' ? ' (यश अनिल महाजन)' : ' (Yash Anil Mahajan)'}
          </div>
        </motion.div>
      </div>

      <Diyas count={4} />
    </footer>
  );
}
