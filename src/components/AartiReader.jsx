import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Play, Download, BookOpen, Volume2 } from 'lucide-react';

export default function AartiReader({ aarti, onClose, onPlayAudio, t, lang = 'mr' }) {
  const [fontSize, setFontSize] = useState(18);
  const [activeTab, setActiveTab] = useState('original');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!aarti) return null;

  const handleZoomIn = () => setFontSize((prev) => Math.min(prev + 2, 28));
  const handleZoomOut = () => setFontSize((prev) => Math.max(prev - 2, 14));
  const getVerseText = (verse) => lang === 'en' ? verse.meaning : verse.original;
  const getPronunciation = (verse) => verse.transliteration?.replace(/[।॥]/g, '');
  const getCategory = () => lang === 'en' ? aarti.categoryEn : aarti.category;
  const getComposer = () => lang === 'en' ? aarti.composerEn : aarti.composer;
  const getDescription = () => lang === 'en' ? aarti.descriptionEn : aarti.description;

  const handleDownloadText = () => {
    const versesText = aarti.verses
      .map((v, i) => `[Verse ${i + 1}]\n${getVerseText(v)}\n\n[Meaning]\n${lang === 'en' ? getVerseText(v) : v.meaning}\n`)
      .join('\n---\n\n');
    const content = `${lang === 'mr' ? aarti.titleMr : aarti.titleEn}\n${getCategory()} | ${getComposer()}\n\n${getDescription()}\n\n====================\n\n${versesText}\n\n${lang === 'en' ? 'Ganpati Bappa Morya, Mangalmurti Morya' : '॥ गणपती बाप्पा मोरया, मंगलमूर्ती मोरया ॥'}\n${lang === 'en' ? '— The Mahajan Family' : '— महाजन परिवार'}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${aarti.id}_text.txt`;
    link.click();
  };

  return createPortal(
    <AnimatePresence>
      <div
        className="aarti-modal-overlay"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={lang === 'en' ? aarti.titleEn : aarti.titleMr}
      >
        <motion.div
          className="aarti-manuscript"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: '720px' }}
        >
          {/* Header */}
          <div
            className="aarti-reader-header"
            style={{
              background: 'linear-gradient(180deg, #6B121B 0%, #4D0911 100%)',
              color: '#FFF3D1',
              padding: '1rem 1.5rem',
              borderBottom: '2px solid #C99A3D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={22} color="#E6C875" />
              <div>
                <h3
                  className="marathi-text"
                  style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.2, color: '#FFF8E8' }}
                >
                  {lang === 'mr' ? aarti.titleMr : aarti.titleEn}
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#E6C875', opacity: 0.85 }}>
                  {getCategory()} • {getComposer()}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="aarti-reader-controls" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={handleZoomOut}
                className="gold-btn-outline"
                style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                title="अक्षर लहान करा"
              >
                <ZoomOut size={15} /> A-
              </button>

              <button
                onClick={handleZoomIn}
                className="gold-btn-outline"
                style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                title="अक्षर मोठे करा"
              >
                <ZoomIn size={15} /> A+
              </button>

              <button
                onClick={() => onPlayAudio(aarti)}
                className="gold-btn"
                style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                title="सूर ऐका"
              >
                <Volume2 size={15} /> {t.playAarti}
              </button>

              <button
                onClick={handleDownloadText}
                className="gold-btn-outline"
                style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                title="मजकूर डाऊनलोड करा"
              >
                <Download size={15} />
              </button>

              <button
                onClick={onClose}
                style={{
                  background: 'rgba(0,0,0,0.35)',
                  border: '1px solid #C99A3D',
                  color: '#FFF3D1',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  marginLeft: '4px',
                }}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Sub-header Tabs: Original Verses, Roman Pronunciation, and Meaning */}
          <div
            style={{
              display: 'flex',
              background: '#F0E2C6',
              borderBottom: '1px solid #C99A3D',
              padding: '0 1.5rem',
            }}
          >
            <button
              onClick={() => setActiveTab('original')}
              style={{
                padding: '10px 18px',
                background: activeTab === 'original' ? '#FFF9E9' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'original' ? '3px solid #8E1B23' : 'none',
                color: activeTab === 'original' ? '#8E1B23' : '#76584A',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-marathi)',
                fontSize: '0.95rem',
              }}
            >
              📜 {t.tabOriginal}
            </button>

            <button
              onClick={() => setActiveTab('pronunciation')}
              style={{
                padding: '10px 18px',
                background: activeTab === 'pronunciation' ? '#FFF9E9' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'pronunciation' ? '3px solid #8E1B23' : 'none',
                color: activeTab === 'pronunciation' ? '#8E1B23' : '#76584A',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-marathi)',
                fontSize: '0.95rem',
              }}
            >
              🔤 English Pronunciation
            </button>

            <button
              onClick={() => setActiveTab('meaning')}
              style={{
                padding: '10px 18px',
                background: activeTab === 'meaning' ? '#FFF9E9' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'meaning' ? '3px solid #8E1B23' : 'none',
                color: activeTab === 'meaning' ? '#8E1B23' : '#76584A',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-marathi)',
                fontSize: '0.95rem',
              }}
            >
              📖 Meaning
            </button>
          </div>

          {/* Manuscript Devotional Parchment Body */}
          <div
            className={`aarti-manuscript-inner ${aarti.id === 'shiva-aarti' ? 'aarti-watermark-shiva' : 'aarti-watermark-ganpati'}`}
          >
            {/* Top Ornamental Seal */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <img
                src="/assets/images/diya.svg"
                alt="Diya"
                style={{ width: '32px', height: '32px', filter: 'drop-shadow(0 2px 4px rgba(166, 124, 46, 0.4))' }}
              />
            </div>

            <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#76584A', marginBottom: '1.25rem' }}>
              {getDescription()}
            </p>

            <div
              style={{
                width: '80px',
                height: '1px',
                background: '#C99A3D',
                margin: '0 auto 1.5rem',
              }}
            />

            {/* Verses Content */}
            <div
              style={{
                fontSize: `${fontSize}px`,
                color: '#2A1712',
                fontFamily: activeTab === 'original' ? 'var(--font-marathi)' : 'var(--font-ui)',
                fontWeight: 500,
                lineHeight: activeTab === 'original' ? 2.2 : 1.8,
                textAlign: activeTab === 'original' ? 'center' : 'left',
              }}
            >
              {aarti.verses.map((verse, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: '1.75rem',
                    paddingBottom: '1rem',
                    borderBottom: idx < aarti.verses.length - 1 ? '1px dashed rgba(201, 154, 61, 0.3)' : 'none',
                  }}
                >
                  {activeTab === 'original' ? (
                    <div style={{ whiteSpace: 'pre-line' }}>{getVerseText(verse)}</div>
                  ) : activeTab === 'pronunciation' ? (
                    <div style={{ whiteSpace: 'pre-line' }}>{getPronunciation(verse)}</div>
                  ) : (
                    <div>
                      <div
                        style={{
                          fontSize: '0.85rem',
                          color: '#8E1B23',
                          fontWeight: 700,
                          marginBottom: '6px',
                          textTransform: 'uppercase',
                        }}
                      >
                        Verse {idx + 1}
                      </div>
                      <p style={{ color: '#3A1810', lineHeight: 1.7 }}>{verse.meaning}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Auspicious Blessing */}
            <div style={{ marginTop: '2rem', color: '#8E1B23', fontWeight: 700, fontSize: '1.1rem' }}>
              {lang === 'en' ? 'Ganpati Bappa Morya, Mangalmurti Morya' : '॥ गणपती बाप्पा मोरया, मंगलमूर्ती मोरया ॥'}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
