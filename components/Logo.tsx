import React from 'react'

const Logo: React.FC = () => {
  return (
    <div className="w-12 h-12 relative">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1a365d', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#2c5282', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#grad1)" stroke="#d4af37" strokeWidth="4" />
        <path
          d="M25 65 Q50 25 75 65"
          fill="none"
          stroke="#d4af37"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="35" cy="70" r="8" fill="#d4af37" />
        <circle cx="65" cy="70" r="8" fill="#d4af37" />
      </svg>
    </div>
  )
}

export default Logo

