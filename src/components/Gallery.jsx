import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';

export default function Gallery({ t, lang = 'mr' }) {
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const galleryItems = [
    {
      src: '/assets/images/ganpati.jpg',
      titleMr: 'श्री गणपती बाप्पा मंगल दर्शन',
      titleEn: 'Shri Ganpati Bappa Mangal Darshan',
      tagMr: 'श्री दर्शन',
      tagEn: 'Darshan',
      descMr: 'पारंपरिक सुवर्ण मुकुट व दिव्य पीतांबराने नटलेले बाप्पांचे विलोभनीय रूप.',
      descEn: 'The majestic form of Lord Ganesha adorned in royal pitambar and golden crown.',
    },
    {
      src: '/assets/gallery/aarti_thali.jpg',
      titleMr: 'सुग्रास नैवेद्य व मंगल आरती थाळी',
      titleEn: 'Aarti Thali & Modak Naivedya',
      tagMr: 'पूजा विधी',
      tagEn: 'Puja Rituals',
      descMr: 'कर्पूर दीप, ताजी लाल जास्वंद फुले आणि अस्सल उकडीचे मोदक.',
      descEn: 'Glowing camphor flame, fresh red hibiscus, and traditional steamed ukadiche modaks.',
    },
    {
      src: '/assets/gallery/mandap_decor.jpg',
      titleMr: 'झेंडू व मोगरा सुवर्ण मंडप सजावट',
      titleEn: 'Mandap Floral & Bell Decoration',
      tagMr: 'मंडप सजावट',
      tagEn: 'Mandap Decor',
      descMr: 'पिवळ्या-केशरी झेंडूच्या माळा, लटकणाऱ्या पितळी घंटा आणि दीपमाळा.',
      descEn: 'Cascading fragrant marigolds, hanging temple bells, and illuminated deepams.',
    },
  ];

  const handleOpenLightbox = (index) => {
    setActiveImageIndex(index);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = () => {
    setActiveImageIndex(null);
    setZoomLevel(1);
    document.body.style.overflow = 'auto';
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    setZoomLevel(1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % galleryItems.length);
    setZoomLevel(1);
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    setZoomLevel((prev) => (prev === 1 ? 1.5 : 1));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'ArrowRight') handleNext(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  return (
    <section
      id="gallery-section"
      style={{
        position: 'relative',
        padding: '3rem 1rem 4rem',
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
            ✦ उत्सव क्षण ✦
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
            {t.galleryTitle}
          </h2>
          <p className="marathi-text" style={{ color: '#E6C875', fontSize: '1rem', opacity: 0.85 }}>
            {t.gallerySub}
          </p>
        </div>

        {/* Masonry / Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              whileHover={{ y: -5 }}
              onClick={() => handleOpenLightbox(idx)}
              className="gold-card"
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div className="corner-ornament corner-tl" />
              <div className="corner-ornament corner-tr" />
              <div className="corner-ornament corner-bl" />
              <div className="corner-ornament corner-br" />

              {/* Photo Frame */}
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <img
                  src={item.src}
                  alt={lang === 'mr' ? item.titleMr : item.titleEn}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* Category Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(53, 7, 12, 0.85)',
                    border: '1px solid #C99A3D',
                    borderRadius: '12px',
                    padding: '3px 10px',
                    fontSize: '0.75rem',
                    color: '#FFF3D1',
                    fontFamily: 'var(--font-marathi)',
                  }}
                >
                  {lang === 'mr' ? item.tagMr : item.tagEn}
                </div>
              </div>

              {/* Caption */}
              <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(42, 6, 11, 0.9)' }}>
                <h3
                  className="marathi-text"
                  style={{ fontSize: '1.15rem', color: '#FFF8E8', fontWeight: 700, marginBottom: '0.35rem' }}
                >
                  {lang === 'mr' ? item.titleMr : item.titleEn}
                </h3>
                <p className="marathi-text" style={{ fontSize: '0.85rem', color: '#F8F0DC', opacity: 0.8, lineHeight: 1.6 }}>
                  {lang === 'mr' ? item.descMr : item.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {activeImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseLightbox}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(10, 2, 4, 0.94)',
                backdropFilter: 'blur(16px)',
                zIndex: 250,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
              }}
            >
              {/* Top Bar with Controls */}
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#FFF8E8',
                  zIndex: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="#E6C875" />
                  <span className="marathi-text" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                    {lang === 'mr'
                      ? galleryItems[activeImageIndex].titleMr
                      : galleryItems[activeImageIndex].titleEn}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={toggleZoom}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid #C99A3D',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      color: '#FFF3D1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    aria-label="Toggle Zoom"
                  >
                    {zoomLevel === 1 ? <ZoomIn size={18} /> : <ZoomOut size={18} />}
                  </button>

                  <button
                    onClick={handleCloseLightbox}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid #C99A3D',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      color: '#FFF3D1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    aria-label="Close Lightbox"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Main Lightbox Image View */}
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  maxWidth: '90vw',
                  maxHeight: '75vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <motion.img
                  key={activeImageIndex}
                  src={galleryItems[activeImageIndex].src}
                  alt="Gallery Lightbox"
                  animate={{ scale: zoomLevel }}
                  transition={{ duration: 0.3 }}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '75vh',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    border: '2px solid #C99A3D',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.95)',
                    cursor: zoomLevel === 1 ? 'zoom-in' : 'zoom-out',
                  }}
                  onClick={toggleZoom}
                />
              </div>

              {/* Prev / Next Buttons */}
              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(53, 7, 12, 0.7)',
                  border: '1.5px solid #C99A3D',
                  borderRadius: '50%',
                  width: '46px',
                  height: '46px',
                  color: '#FFF3D1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(53, 7, 12, 0.7)',
                  border: '1.5px solid #C99A3D',
                  borderRadius: '50%',
                  width: '46px',
                  height: '46px',
                  color: '#FFF3D1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image Description Footer */}
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  bottom: '25px',
                  textAlign: 'center',
                  maxWidth: '600px',
                  padding: '0 1rem',
                }}
              >
                <p className="marathi-text" style={{ color: '#F8F0DC', fontSize: '0.95rem' }}>
                  {lang === 'mr'
                    ? galleryItems[activeImageIndex].descMr
                    : galleryItems[activeImageIndex].descEn}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
