import React from 'react';

export default function DownloadInvitation({ t, lang = 'mr' }) {
  return (
    <section
      id="download-section"
      style={{
        position: 'relative',
        padding: '3rem 1rem 4rem',
        zIndex: 10,
      }}
    >
      <div className="mandap-container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span
            style={{
              color: '#C99A3D',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-marathi)',
            }}
          >
            {lang === 'mr' ? '✦ जतन करा व पाठवा ✦' : '✦ Save & Share ✦'}
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
            {t.download.title}
          </h2>
          <p className="marathi-text" style={{ color: '#E6C875', fontSize: '1rem', opacity: 0.9 }}>
            {t.download.sub}
          </p>
        </div>
      </div>
    </section>
  );
}
