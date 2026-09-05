import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';
import { eventData } from '../data/eventData';

export default function LocationSection({ t, lang = 'mr' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(eventData.address.fullAddressEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="location-section"
      style={{
        position: 'relative',
        padding: '4rem 1rem',
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
            {lang === 'mr' ? '✦ स्थान व मार्ग ✦' : '✦ Location & Directions ✦'}
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
            {t.locationTitle}
          </h2>
          <p className="marathi-text" style={{ color: '#E6C875', fontSize: '1rem', opacity: 0.85 }}>
            {t.locationSub}
          </p>
        </div>

        {/* Location & Map Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch',
          }}
        >
          {/* Address Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="gold-card"
            style={{
              borderRadius: '12px',
              padding: 'clamp(1.75rem, 4vw, 2.75rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'rgba(201, 154, 61, 0.15)',
                    border: '1.5px solid #E6C875',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px rgba(201, 154, 61, 0.3)',
                  }}
                >
                  <MapPin size={26} color="#FFF3D1" />
                </div>
                <div>
                  <h3 className="marathi-text" style={{ fontSize: '1.35rem', color: '#FFF8E8', fontWeight: 700 }}>
                    {t.venueLabel}
                  </h3>
                  <span style={{ fontSize: '0.9rem', color: '#E6C875' }}>
                    {lang === 'mr' ? 'डोंबिवली (पश्चिम)' : 'Dombivli West'}
                  </span>
                </div>
              </div>

              {/* Address Box */}
              <div
                style={{
                  background: 'rgba(26, 4, 7, 0.75)',
                  border: '1px solid rgba(230, 200, 117, 0.3)',
                  borderRadius: '8px',
                  padding: '1.75rem',
                  marginBottom: '1.75rem',
                }}
              >
                <p
                  className="marathi-text"
                  style={{
                    fontSize: '1.25rem',
                    color: '#FFF3D1',
                    lineHeight: 1.8,
                    fontWeight: 600,
                  }}
                >
                  {lang === 'mr' ? eventData.address.fullAddressMr : eventData.address.fullAddressEn}
                </p>
                <p style={{ fontSize: '0.95rem', color: '#F8F0DC', marginTop: '0.6rem', opacity: 0.8, whiteSpace: 'pre-line' }}>
                  {eventData.address.fullAddressEn}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <a
                href={eventData.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn"
                style={{ flex: 1, minWidth: '180px', whiteSpace: 'nowrap' }}
              >
                <Navigation size={18} />
                {t.viewMapBtn}
              </a>

              <button
                onClick={handleCopy}
                className="gold-btn-outline"
                style={{ minWidth: '150px' }}
                aria-label="Copy Address"
              >
                {copied ? <Check size={18} color="#4ADE80" /> : <Copy size={18} />}
                {copied ? t.addressCopied : t.copyAddressBtn}
              </button>
            </div>
          </motion.div>

          {/* Temple-Framed Embedded Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{
              position: 'relative',
              borderRadius: '12px',
              padding: '6px',
              background: 'linear-gradient(135deg, #E6C875 0%, #C99A3D 50%, #8E1B23 100%)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.85), 0 0 25px rgba(201, 154, 61, 0.25)',
              minHeight: '360px',
            }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                height: '100%',
                minHeight: '350px',
              }}
            >
              <iframe
                title="Mahajan Family Ganpati Mandap Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.2231551242858!2d73.0941757!3d19.2291039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795f6d0a2144b%3A0xeaf103411bb0a4f4!2sPandurang%20Tower!5e0!3m2!1sen!2sin!4v1788511006132!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '350px', filter: 'contrast(1.05)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
