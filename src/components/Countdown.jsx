import React, { useState, useEffect } from 'react';
import { FEST_DATA } from '../data/festData';
import { Clock, Radio } from 'lucide-react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    // Parse target date in IST
    const target = new Date(FEST_DATA.targetDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isExpired: false,
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDigit = (num) => String(num).padStart(2, '0');

  const timeBlocks = [
    { label: 'DAYS', value: formatDigit(timeLeft.days) },
    { label: 'HOURS', value: formatDigit(timeLeft.hours) },
    { label: 'MINUTES', value: formatDigit(timeLeft.minutes) },
    { label: 'SECONDS', value: formatDigit(timeLeft.seconds) },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        margin: '2rem 0',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem',
          fontFamily: 'var(--font-heading)',
          color: timeLeft.isExpired ? '#34d399' : '#38bdf8',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        {timeLeft.isExpired ? (
          <>
            <Radio size={16} className="text-emerald-400 animate-pulse" />
            <span>FEST IS LIVE NOW</span>
          </>
        ) : (
          <>
            <Clock size={16} />
            <span>COUNTDOWN TO KICKOFF • 26 NOV 2026 (IST)</span>
          </>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(70px, 110px))',
          gap: 'clamp(0.6rem, 2vw, 1.2rem)',
        }}
      >
        {timeBlocks.map((block, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(11, 20, 44, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '16px',
              padding: 'clamp(0.8rem, 2vw, 1.4rem) 0.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 15px rgba(56, 189, 248, 0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top accent light */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '20%',
                right: '20%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)',
              }}
            />

            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 4vw, 2.8rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1,
                textShadow: '0 0 20px rgba(56, 189, 248, 0.5)',
              }}
            >
              {block.value}
            </span>

            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: '#94a3b8',
                marginTop: '0.5rem',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
