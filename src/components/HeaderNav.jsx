import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Music, Volume2, Sparkles } from 'lucide-react';

export default function HeaderNav({ lang, onToggleLang, t, isPlaying, onToggleMusic }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#darshan-section", label: t.nav.darshan },
    { href: "#card-section", label: t.nav.invitation },
    { href: "#timeline-section", label: t.nav.muhurat },
    { href: "#aarti-section", label: t.nav.aarti },
    { href: "#location-section", label: t.nav.location },
    { href: "#contact-section", label: t.nav.contact },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        transition: 'all 0.4s ease',
        background: isScrolled
          ? 'linear-gradient(180deg, rgba(42, 6, 11, 0.96) 0%, rgba(26, 4, 7, 0.92) 100%)'
          : 'linear-gradient(180deg, rgba(26, 4, 7, 0.75) 0%, transparent 100%)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(201, 154, 61, 0.35)' : 'none',
        boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.7)' : 'none',
      }}
    >
      <div
        className="mandap-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
        }}
      >
        {/* Left Sacred Logo */}
        <a
          href="#darshan-section"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: '#FFF3D1',
          }}
        >
          <img
            src="/assets/images/diya.svg"
            alt="Diya"
            style={{ width: '26px', height: '26px', filter: 'drop-shadow(0 0 6px rgba(230, 200, 117, 0.8))' }}
          />
          <span
            className="marathi-text"
            style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#FFF8E8',
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            {t.title}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="marathi-text"
              style={{
                color: '#F8F0DC',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                position: 'relative',
                padding: '4px 0',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E6C875')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#F8F0DC')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls: Audio Status + Language Switcher + Mobile Menu Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Audio Quick Button */}
          <button
            onClick={onToggleMusic}
            style={{
              background: isPlaying ? 'rgba(201, 154, 61, 0.2)' : 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(230, 200, 117, 0.4)',
              color: isPlaying ? '#FFF3D1' : '#C99A3D',
              borderRadius: '20px',
              padding: '5px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              transition: 'var(--transition-smooth)',
            }}
            aria-label="Toggle Devotional Chant"
          >
            <Volume2 size={15} color={isPlaying ? '#E6C875' : '#8E1B23'} />
            <span className="marathi-text" style={{ whiteSpace: 'nowrap' }}>
              {isPlaying ? '🔊' : '🔈'} {t.audioTitle}
            </span>
          </button>

          {/* Language Toggle */}
          <div
            style={{
              background: 'rgba(42, 6, 11, 0.8)',
              border: '1.5px solid #C99A3D',
              borderRadius: '16px',
              padding: '2px 6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <button
              onClick={() => onToggleLang('mr')}
              style={{
                background: lang === 'mr' ? 'rgba(230, 200, 117, 0.25)' : 'transparent',
                border: 'none',
                color: lang === 'mr' ? '#FFF3D1' : '#C99A3D',
                fontWeight: lang === 'mr' ? 700 : 500,
                padding: '2px 6px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-marathi)',
              }}
            >
              मराठी
            </button>
            <span style={{ color: 'rgba(201, 154, 61, 0.4)', fontSize: '0.75rem' }}>|</span>
            <button
              onClick={() => onToggleLang('en')}
              style={{
                background: lang === 'en' ? 'rgba(230, 200, 117, 0.25)' : 'transparent',
                border: 'none',
                color: lang === 'en' ? '#FFF3D1' : '#C99A3D',
                fontWeight: lang === 'en' ? 700 : 500,
                padding: '2px 6px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              EN
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-nav-toggle"
            style={{
              background: 'rgba(201, 154, 61, 0.15)',
              border: '1px solid rgba(230, 200, 117, 0.4)',
              borderRadius: '6px',
              width: '38px',
              height: '38px',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF3D1',
              cursor: 'pointer',
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'linear-gradient(180deg, #3A070E 0%, #200408 100%)',
              borderBottom: '2px solid #C99A3D',
              boxShadow: '0 20px 40px rgba(0,0,0,0.9)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="marathi-text"
                  style={{
                    color: '#FFF8E8',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'rgba(201, 154, 61, 0.08)',
                    border: '1px solid rgba(230, 200, 117, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Sparkles size={16} color="#E6C875" />
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
