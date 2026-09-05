import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Ganpati2_5D from './Ganpati2_5D';
import Ganpati3D from './Ganpati3D';
import TempleMandap from './TempleMandap';
import ErrorBoundary from './ErrorBoundary';

export default function GanpatiDarshan({ lang = 'mr', t }) {
  const [has3DModel, setHas3DModel] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  // Check if a real binary GLB model exists (and not Vite's HTML fallback)
  useEffect(() => {
    const checkModel = async () => {
      try {
        const res = await fetch('/assets/ganpati/ganpati.glb', {
          headers: { Range: 'bytes=0-15' },
        });

        const contentType = res.headers.get('content-type') || '';
        // If SPA router served index.html, it is NOT a model
        if (contentType.includes('text/html')) {
          setHas3DModel(false);
          return;
        }

        if (res.ok) {
          const buffer = await res.arrayBuffer();
          const magic = new TextDecoder().decode(buffer.slice(0, 4));
          // GLB binary files start with ASCII 'glTF' (0x46546C67)
          if (magic === 'glTF') {
            setHas3DModel(true);
            return;
          }
        }
        setHas3DModel(false);
      } catch {
        setHas3DModel(false);
      }
    };

    checkModel();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Subtle desktop mouse movement
  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.9], [1, 0.85, 0.2]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '2rem',
        paddingBottom: '4rem',
        background: 'radial-gradient(ellipse at 50% 30%, #5E0C15 0%, #36070C 60%, #1A0407 100%)',
        overflow: 'hidden',
      }}
      id="darshan-section"
    >
      <TempleMandap>
        {/* Top Sacred Invocations */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
            textAlign: 'center',
            marginBottom: '1.5rem',
            zIndex: 4,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3 }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '4px 18px',
              background: 'rgba(201, 154, 61, 0.12)',
              border: '1px solid rgba(230, 200, 117, 0.3)',
              borderRadius: '20px',
              color: '#FFF3D1',
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            {lang === 'mr' ? '✦ दर्शन सोहळा ✦' : '✦ Divine Darshan ✦'}
          </div>

          <h2
            className="marathi-text"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 700,
              color: '#FFF8E8',
              letterSpacing: '0.04em',
              textShadow: '0 4px 16px rgba(0,0,0,0.9), 0 0 35px rgba(230, 200, 117, 0.5)',
              marginBottom: '0.35rem',
            }}
          >
            {t.title}
          </h2>

          <h3
            className="marathi-text"
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.85rem)',
              color: '#E6C875',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            {t.morya}
          </h3>
        </motion.div>

        {/* 3D / 2.5D Central Darshan Experience with ErrorBoundary Fallback */}
        <div style={{ width: '100%', position: 'relative' }}>
          {has3DModel && !isMobile ? (
            <ErrorBoundary fallback={<Ganpati2_5D mousePos={mousePos} isMobile={isMobile} />}>
              <Ganpati3D mousePos={mousePos} />
            </ErrorBoundary>
          ) : (
            <Ganpati2_5D mousePos={mousePos} isMobile={isMobile} />
          )}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            marginTop: '2.5rem',
            zIndex: 4,
            textAlign: 'center',
          }}
        >
          <a
            href="#invitation-section"
            style={{
              color: '#E6C875',
              textDecoration: 'none',
              fontSize: '0.95rem',
              letterSpacing: '0.06em',
              fontFamily: 'var(--font-marathi)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              opacity: 0.85,
              transition: 'var(--transition-smooth)',
            }}
          >
            <span>{t.scrollDarshan}</span>
            <div
              style={{
                width: '24px',
                height: '38px',
                border: '1.5px solid #C99A3D',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '6px',
              }}
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{
                  width: '4px',
                  height: '8px',
                  backgroundColor: '#FFF3D1',
                  borderRadius: '2px',
                }}
              />
            </div>
          </a>
        </motion.div>
      </TempleMandap>
    </section>
  );
}
