import React, { useState } from 'react';
import { GOOGLE_FORM_URL, FEST_DATA } from '../data/festData';
import { QrCode, X, Copy, Check, Download, ExternalLink, Sparkles } from 'lucide-react';

export default function QrCodeModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'site'
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const siteUrl = window.location.origin;
  const targetUrl = activeTab === 'form' ? GOOGLE_FORM_URL : siteUrl;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
    targetUrl
  )}&bgcolor=ffffff&color=070b19&margin=12`;

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(3, 7, 18, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '460px',
          width: '100%',
          backgroundColor: '#0a1024',
          border: '1px solid rgba(0, 212, 255, 0.4)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 212, 255, 0.25)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          aria-label="Close QR Modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#38bdf8',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}
        >
          <QrCode size={16} />
          <span>OFFICIAL FEST SCANNER</span>
        </div>

        <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.4rem' }}>
          Scan to Access
        </h3>

        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Display this on posters, notices, or share with fellow delegates.
        </p>

        {/* Toggle between Google Form QR and Website QR */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.4rem',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '0.3rem',
            borderRadius: '10px',
            width: '100%',
            marginBottom: '1.5rem',
          }}
        >
          <button
            onClick={() => setActiveTab('form')}
            style={{
              padding: '0.55rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'form' ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
              border: activeTab === 'form' ? '1px solid #00d4ff' : 'none',
              color: activeTab === 'form' ? '#00d4ff' : '#94a3b8',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Google Form QR
          </button>

          <button
            onClick={() => setActiveTab('site')}
            style={{
              padding: '0.55rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'site' ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
              border: activeTab === 'site' ? '1px solid #00d4ff' : 'none',
              color: activeTab === 'site' ? '#00d4ff' : '#94a3b8',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Website QR
          </button>
        </div>

        {/* QR Code Container */}
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0, 212, 255, 0.25)',
            marginBottom: '1.25rem',
          }}
        >
          <img
            src={qrImageUrl}
            alt="TECHNO VISTA 2K26 QR Code"
            style={{
              width: '200px',
              height: '200px',
              display: 'block',
              borderRadius: '8px',
            }}
          />
        </div>

        {/* URL Display */}
        <div
          style={{
            fontSize: '0.8rem',
            color: '#94a3b8',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginBottom: '1.25rem',
            padding: '0.35rem 0.8rem',
            borderRadius: '6px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            width: '100%',
          }}
        >
          {targetUrl}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%' }}>
          <button
            onClick={handleCopy}
            className="btn-secondary"
            style={{
              padding: '0.65rem',
              fontSize: '0.85rem',
              borderRadius: '10px',
              width: '100%',
            }}
          >
            {copied ? (
              <>
                <Check size={16} className="text-emerald-400" />
                <span style={{ color: '#34d399' }}>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy URL</span>
              </>
            )}
          </button>

          <a
            href={qrImageUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={`TECHNO_VISTA_2K26_${activeTab === 'form' ? 'Registration_Form' : 'Website'}_QR.png`}
            className="btn-primary"
            style={{
              padding: '0.65rem',
              fontSize: '0.85rem',
              borderRadius: '10px',
              width: '100%',
            }}
          >
            <Download size={16} />
            <span>Save QR Image</span>
          </a>
        </div>
      </div>
    </div>
  );
}
