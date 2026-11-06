import React from 'react';
import { Sparkles } from 'lucide-react';

export default function SectionTitle({
  tag,
  title,
  subtitle,
  centered = true,
  className = '',
}) {
  return (
    <div
      className={`section-header ${className}`}
      style={{
        textAlign: centered ? 'center' : 'left',
        marginLeft: centered ? 'auto' : 0,
        marginRight: centered ? 'auto' : 0,
        marginBottom: '3rem',
      }}
    >
      {tag && (
        <div
          className="section-tag"
          style={{
            justifyContent: centered ? 'center' : 'flex-start',
            color: '#38bdf8',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem',
            background: 'rgba(56, 189, 248, 0.08)',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            border: '1px solid rgba(56, 189, 248, 0.25)',
          }}
        >
          <Sparkles size={14} className="text-cyan-400" />
          <span>{tag}</span>
        </div>
      )}

      {title && (
        <h2
          style={{
            fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '0.85rem',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
      )}

      {subtitle && (
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            maxWidth: centered ? '700px' : '100%',
            marginLeft: centered ? 'auto' : 0,
            marginRight: centered ? 'auto' : 0,
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

