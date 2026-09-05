import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const previousYears = [
  {
    src: '/assets/gallery/ganpati_2017.png',
    titleMr: '२०१७ सालचे बाप्पा दर्शन',
    titleEn: 'Bappa Darshan 2017',
    descriptionMr: 'महाजन कुटुंबाच्या भक्तिमय आठवणींची सुंदर सुरुवात.',
    descriptionEn: 'A beautiful beginning to the Mahajan family\'s cherished memories.',
  },
  {
    src: '/assets/gallery/ganpati_2019.png',
    titleMr: '२०१९ सालचे बाप्पा दर्शन',
    titleEn: 'Bappa Darshan 2019',
    descriptionMr: 'प्रेम, श्रद्धा आणि आनंदाने उजळलेले बाप्पांचे मंगल दर्शन.',
    descriptionEn: 'A blessed darshan filled with devotion, love, and joyful memories.',
  },
  {
    src: '/assets/gallery/ganpati_2021.png',
    titleMr: '२०२१ सालचे बाप्पा दर्शन',
    titleEn: 'Bappa Darshan 2021',
    descriptionMr: 'कुटुंबाला एकत्र आणणारी बाप्पांच्या आशीर्वादांची आठवण.',
    descriptionEn: 'A treasured memory of Bappa\'s blessings bringing the family together.',
  },
];

export default function PreviousYearsCarousel({ lang = 'mr' }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % previousYears.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  const showPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + previousYears.length) % previousYears.length);
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % previousYears.length);
  };

  const activeImage = previousYears[activeIndex];

  return (
    <section
      aria-labelledby="previous-years-title"
      style={{
        position: 'relative',
        padding: '1rem 0 4rem',
        zIndex: 10,
      }}
    >
      <div className="mandap-container">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span
            style={{
              color: '#C99A3D',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-marathi)',
            }}
          >
            {lang === 'mr' ? '✦ स्मरणरंजन ✦' : '✦ Previous Celebrations ✦'}
          </span>
          <h2
            id="previous-years-title"
            className="marathi-text"
            style={{
              fontSize: 'clamp(1.7rem, 4vw, 2.35rem)',
              color: '#FFF3D1',
              fontWeight: 700,
              marginTop: '0.5rem',
            }}
          >
            {lang === 'mr' ? 'मागील वर्षांचे बाप्पा दर्शन' : 'Bappa Darshan from Previous Years'}
          </h2>
        </div>

        <div
          className="gold-card"
          style={{
            position: 'relative',
            maxWidth: '780px',
            margin: '0 auto',
            padding: '0.75rem',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <div className="corner-ornament corner-tl" />
          <div className="corner-ornament corner-tr" />
          <div className="corner-ornament corner-bl" />
          <div className="corner-ornament corner-br" />
          <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', background: '#24080B' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage.src}
                src={activeImage.src}
                alt={lang === 'mr' ? activeImage.titleMr : activeImage.titleEn}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </AnimatePresence>

            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous year's Ganpati"
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1px solid #C99A3D',
                background: 'rgba(42, 6, 11, 0.82)',
                color: '#FFF3D1',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next year's Ganpati"
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1px solid #C99A3D',
                background: 'rgba(42, 6, 11, 0.82)',
                color: '#FFF3D1',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', padding: '0.9rem 0.5rem 0.35rem' }}>
            <Images size={17} color="#E6C875" />
            <span className="marathi-text" style={{ color: '#FFF3D1', fontWeight: 600 }}>
              {lang === 'mr' ? activeImage.titleMr : activeImage.titleEn}
            </span>
          </div>
          <p
            className="marathi-text"
            style={{
              color: 'rgba(255, 243, 209, 0.78)',
              fontSize: '0.95rem',
              lineHeight: 1.5,
              textAlign: 'center',
              margin: '0 auto 0.65rem',
              padding: '0 1rem',
            }}
          >
            {lang === 'mr' ? activeImage.descriptionMr : activeImage.descriptionEn}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', paddingBottom: '0.4rem' }}>
            {previousYears.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === activeIndex}
                style={{
                  width: index === activeIndex ? '24px' : '8px',
                  height: '8px',
                  padding: 0,
                  border: 'none',
                  borderRadius: '8px',
                  background: index === activeIndex ? '#E6C875' : 'rgba(230, 200, 117, 0.35)',
                  cursor: 'pointer',
                  transition: 'width 0.25s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
