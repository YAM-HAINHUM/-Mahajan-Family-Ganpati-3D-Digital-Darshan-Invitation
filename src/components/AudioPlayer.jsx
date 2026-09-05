import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Sliders } from 'lucide-react';

export default function AudioPlayer({ autoPlay = false, t }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Play audio after user enters mandap
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log('Audio autoplay prevented by browser policy, awaiting user gesture:', err);
      });
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.log('Audio play error:', e));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && duration > 0) {
      setProgress((audioRef.current.currentTime / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoaded(true);
      audioRef.current.volume = volume;
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = pos * duration;
      setProgress(pos * 100);
    }
  };

  return (
    <div className="audio-floater">
      <audio
        ref={audioRef}
        src="/assets/audio/vakratunda-mahakarya.mp3"
        loop
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Rotating Diya / Disc Emblem */}
      <motion.div
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ width: '28px', height: '28px', flexShrink: 0, cursor: 'pointer' }}
        onClick={togglePlay}
      >
        <img
          src="/assets/images/diya.svg"
          alt="Audio Diya"
          style={{
            width: '100%',
            height: '100%',
            filter: isPlaying ? 'drop-shadow(0 0 8px rgba(230, 200, 117, 0.9))' : 'none',
          }}
        />
      </motion.div>

      {/* Audio Title */}
      <div 
        onClick={() => setShowControls(!showControls)}
        style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
      >
        <span
          className="marathi-text"
          style={{
            fontSize: '0.85rem',
            color: '#FFF8E8',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            lineHeight: 1.2,
          }}
        >
          {t.audioTitle}
        </span>
        <span style={{ fontSize: '0.7rem', color: '#E6C875', opacity: 0.8 }}>
          {isPlaying ? t.audioPlaying : t.audioPaused}
        </span>
      </div>

      {/* Mini Progress Bar Bar */}
      <div
        onClick={handleSeek}
        style={{
          width: '50px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '2px',
          cursor: 'pointer',
          overflow: 'hidden',
          display: 'block',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #C99A3D, #FFF3D1)',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* Main Play/Pause Button */}
      <button
        onClick={togglePlay}
        style={{
          background: 'rgba(201, 154, 61, 0.25)',
          border: '1px solid #E6C875',
          color: '#FFF3D1',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'var(--transition-smooth)',
        }}
        aria-label={isPlaying ? 'Pause chant' : 'Play chant'}
      >
        {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: '2px' }} />}
      </button>

      {/* Mute Toggle */}
      <button
        onClick={toggleMute}
        style={{
          background: 'transparent',
          border: 'none',
          color: isMuted ? '#C99A3D' : '#FFF3D1',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
        }}
        aria-label={isMuted ? t.unmute : t.mute}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* Popover Controls on Desktop */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              right: 0,
              marginBottom: '10px',
              background: 'linear-gradient(135deg, #35070C, #2A1712)',
              border: '1px solid #C99A3D',
              borderRadius: '8px',
              padding: '12px 16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              zIndex: 90,
            }}
          >
            <span style={{ fontSize: '0.75rem', color: '#E6C875', whiteSpace: 'nowrap' }}>Volume:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                accentColor: '#E6C875',
                width: '80px',
                cursor: 'pointer',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
