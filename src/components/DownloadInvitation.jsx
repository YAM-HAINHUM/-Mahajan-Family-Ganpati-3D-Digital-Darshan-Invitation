import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Image, FileText, Loader2, Sparkles, Check } from 'lucide-react';
import { eventData } from '../data/eventData';

export default function DownloadInvitation({ t, lang = 'mr' }) {
  const cardRef = useRef(null);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsGeneratingImg(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2.5, // 2.5x resolution for print clarity
        useCORS: true,
        backgroundColor: '#35070C',
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Ganpati_Invitation_Mahajan_Family_${lang.toUpperCase()}.png`;
      link.href = dataUrl;
      link.click();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error generating image invitation:', err);
    } finally {
      setIsGeneratingImg(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!cardRef.current) return;
    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#35070C',
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      // Portrait A5/Letter card format
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a5',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Ganpati_Invitation_Mahajan_Family_${lang.toUpperCase()}.pdf`);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error generating PDF invitation:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

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
        {/* Section Header */}
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

        {/* Clean Standalone Card Template to be Rendered and Downloaded */}
        <div
          style={{
            maxWidth: '540px',
            margin: '0 auto 2.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={cardRef}
            style={{
              background: 'radial-gradient(ellipse at 50% 20%, #5E0D16 0%, #36070C 60%, #1D0306 100%)',
              border: '4px double #E6C875',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              color: '#FFF8E8',
              fontFamily: 'var(--font-marathi)',
              position: 'relative',
            }}
          >
            {/* Traditional Corner Filigree */}
            <div className="corner-ornament corner-tl" />
            <div className="corner-ornament corner-tr" />
            <div className="corner-ornament corner-bl" />
            <div className="corner-ornament corner-br" />

            {/* Sacred Salutation */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <img src="/assets/images/diya.svg" alt="Diya" style={{ width: '36px', height: '36px' }} />
            </div>

            <h3
              style={{
                fontSize: '1.85rem',
                fontWeight: 700,
                color: '#FFF3D1',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                marginBottom: '0.5rem',
              }}
            >
              {t.title}
            </h3>

            {/* Ganpati Idol Frame in Standalone Card */}
            <div
              style={{
                width: '180px',
                height: '180px',
                margin: '1rem auto 1.25rem',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #E6C875',
                boxShadow: '0 6px 20px rgba(0,0,0,0.8), 0 0 20px rgba(230, 200, 117, 0.4)',
              }}
            >
              <img
                src="/assets/images/ganpati.jpg"
                alt="Shri Ganpati"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <h4 style={{ fontSize: '1.45rem', color: '#E6C875', fontWeight: 700, marginBottom: '0.75rem' }}>
              {lang === 'mr' ? eventData.familyNameMr : eventData.familyName}
            </h4>

            <p style={{ fontSize: '1rem', color: '#F8F0DC', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              {t.card.insideInvite}
            </p>

            {/* Ceremony Info Box */}
            <div
              style={{
                background: 'rgba(26, 4, 7, 0.75)',
                border: '1px solid rgba(230, 200, 117, 0.35)',
                borderRadius: '8px',
                padding: '1rem',
                margin: '1rem 0',
              }}
            >
              <div style={{ fontSize: '1.05rem', color: '#FFF8E8', fontWeight: 600, marginBottom: '4px' }}>
                📅 {lang === 'mr' ? eventData.sthapana.dateMr : eventData.sthapana.date}
              </div>
              <div style={{ fontSize: '0.95rem', color: '#E6C875', marginBottom: '4px' }}>
                🌸 {lang === 'mr' ? eventData.sthapana.timeMr : eventData.sthapana.time}
              </div>
            </div>

            {/* Address */}
            <p style={{ fontSize: '0.9rem', color: '#F8F0DC', opacity: 0.9, marginBottom: '1rem' }}>
              📍 {lang === 'mr' ? eventData.address.fullAddressMr : eventData.address.fullAddressEn}
            </p>

            <div style={{ fontSize: '1.15rem', color: '#E6C875', fontWeight: 700 }}>
              {t.morya}
            </div>
          </div>
        </div>

        {/* Large Premium Download Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            justifyContent: 'center',
            maxWidth: '620px',
            margin: '0 auto',
          }}
        >
          <button
            onClick={handleDownloadImage}
            disabled={isGeneratingImg}
            className="gold-btn"
            style={{ flex: 1, minWidth: '240px', padding: '1rem 1.8rem', fontSize: '1.05rem' }}
          >
            {isGeneratingImg ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                {t.download.generating}
              </>
            ) : (
              <>
                <Image size={20} />
                {t.download.asImage}
              </>
            )}
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="gold-btn-outline"
            style={{ flex: 1, minWidth: '240px', padding: '1rem 1.8rem', fontSize: '1.05rem' }}
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                {t.download.generating}
              </>
            ) : (
              <>
                <FileText size={20} />
                {t.download.asPdf}
              </>
            )}
          </button>
        </div>

        {downloadSuccess && (
          <div
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              color: '#4ADE80',
              fontFamily: 'var(--font-marathi)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Check size={20} />
            <span>आमंत्रण पत्रिका यशस्वीरीत्या डाऊनलोड झाली! / Download Successful!</span>
          </div>
        )}
      </div>
    </section>
  );
}
