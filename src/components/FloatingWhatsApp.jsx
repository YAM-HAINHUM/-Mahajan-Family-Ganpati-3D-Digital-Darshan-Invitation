import React from 'react';
import { MessageCircle } from 'lucide-react';
import { eventData } from '../data/eventData';

export default function FloatingWhatsApp({ lang = 'mr', isMusicMinimized = false }) {
  const contact = eventData.contacts.find((person) => person.name === 'Yash Anil Mahajan');
  const message = lang === 'mr'
    ? 'नमस्कार, गणपती उत्सवाबाबत माहिती हवी आहे.'
    : 'Hello, I would like more information about the Ganpati celebration.';
  const whatsappUrl = `https://wa.me/91${contact.phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`floating-whatsapp${isMusicMinimized ? ' is-music-minimized' : ''}`}
      aria-label={lang === 'mr' ? 'यश अनिल महाजन यांना व्हॉट्सॲपवर संपर्क करा' : 'Contact Yash Anil Mahajan on WhatsApp'}
      title={lang === 'mr' ? 'यश अनिल महाजन यांना व्हॉट्सॲप करा' : 'WhatsApp Yash Anil Mahajan'}
    >
      <MessageCircle size={26} strokeWidth={2.25} />
    </a>
  );
}
