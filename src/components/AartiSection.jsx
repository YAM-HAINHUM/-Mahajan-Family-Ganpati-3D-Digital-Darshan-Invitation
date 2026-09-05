import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Volume2 } from 'lucide-react';
import { aartiData } from '../data/aartiData';
import AartiReader from './AartiReader';

export default function AartiSection({ t, lang = 'mr', onSelectTrack }) {
  const [selectedAarti, setSelectedAarti] = useState(null);

  const handlePlayFromCard = (e, aarti) => {
    e.stopPropagation();
    if (aarti.audioUrl) {
      window.open(aarti.audioUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    const idx = aartiData.findIndex((a) => a.id === aarti.id);
    if (idx !== -1) {
      onSelectTrack(idx);
    }
  };

  return (
    <section
      id="aarti-section"
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
            {lang === 'mr' ? '✦ नित्य उपासना ✦' : '✦ Daily Devotion ✦'}
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
            {t.aartiTitle}
          </h2>
          <p className="marathi-text" style={{ color: '#E6C875', fontSize: '1rem', opacity: 0.85 }}>
            {t.aartiSub}
          </p>
        </div>

        {/* Aarti Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {aartiData.map((aarti, idx) => (
            <motion.div
              key={aarti.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="gold-card"
              onClick={() => setSelectedAarti(aarti)}
              style={{
                borderRadius: '8px',
                padding: '1.75rem 1.5rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'var(--transition-smooth)',
                position: 'relative',
              }}
            >
              <div className="corner-ornament corner-tl" />
              <div className="corner-ornament corner-tr" />
              <div className="corner-ornament corner-bl" />
              <div className="corner-ornament corner-br" />

              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: '#E6C875',
                      padding: '2px 8px',
                      background: 'rgba(230, 200, 117, 0.12)',
                      borderRadius: '4px',
                      border: '1px solid rgba(230, 200, 117, 0.25)',
                    }}
                  >
                    {lang === 'en' ? aarti.categoryEn : aarti.category}
                  </span>
                  <Sparkles size={16} color="#E6C875" opacity={0.7} />
                </div>

                <h3
                  className="marathi-text"
                  style={{
                    fontSize: '1.25rem',
                    color: '#FFF8E8',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                  }}
                >
                  {lang === 'mr' ? aarti.titleMr : aarti.titleEn}
                </h3>

                <p
                  className="marathi-text"
                  style={{
                    fontSize: '0.85rem',
                    color: '#F8F0DC',
                    opacity: 0.8,
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                  }}
                >
                  {lang === 'en' ? aarti.descriptionEn : aarti.description}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '1px dashed rgba(201, 154, 61, 0.3)',
                }}
              >
                <button
                  onClick={(e) => handlePlayFromCard(e, aarti)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#E6C875',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  <Volume2 size={15} />
                  {t.playAarti}
                </button>

                <span
                  className="marathi-text"
                  style={{
                    fontSize: '0.85rem',
                    color: '#FFF3D1',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <BookOpen size={16} color="#E6C875" />
                  {t.readAarti} →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Antique Manuscript Reader Modal */}
        {selectedAarti && (
          <AartiReader
            key={`${selectedAarti.id}-${lang}`}
            aarti={selectedAarti}
            onClose={() => setSelectedAarti(null)}
            onPlayAudio={(a) => {
              if (a.audioUrl) {
                window.open(a.audioUrl, '_blank', 'noopener,noreferrer');
                return;
              }
              const idx = aartiData.findIndex((item) => item.id === a.id);
              if (idx !== -1) onSelectTrack(idx);
            }}
            t={t}
            lang={lang}
          />
        )}
      </div>
    </section>
  );
}
