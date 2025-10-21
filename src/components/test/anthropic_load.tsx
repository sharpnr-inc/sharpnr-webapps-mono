import { useState } from 'react';

export default function AnthropicLoaderSecond() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: isDark ? '#0a0a2e' : '#f5f5f5',
      position: 'relative',
      overflow: 'hidden',
      gap: '40px',
      transition: 'background-color 0.3s ease'
    }}>
      {/* Circular loader container */}
      <div style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        backgroundColor: '#0a0a2e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: isDark ? '0 20px 60px rgba(255,255,255,0.1)' : '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Spinning ring outside */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          right: '-20px',
          bottom: '-20px',
          border: '3px solid transparent',
          borderTopColor: isDark ? 'rgba(255,255,255,0.6)' : '#1a4d8f',
          borderRightColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(26,77,143,0.5)',
          borderRadius: '50%',
          animation: 'spin 2s linear infinite'
        }} />
        
        {/* Counter-spinning ring */}
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '-15px',
          right: '-15px',
          bottom: '-15px',
          border: '2px solid transparent',
          borderBottomColor: isDark ? 'rgba(255,255,255,0.5)' : '#2563a8',
          borderLeftColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(37,99,168,0.4)',
          borderRadius: '50%',
          animation: 'counterSpin 3s linear infinite'
        }} />
        
        {/* Glowing rings behind triangle */}
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute',
            width: `${150 + i * 30}px`,
            height: `${150 + i * 30}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,255,255,${0.08 - i * 0.02}) 0%, transparent 70%)`,
            animation: `glow 3s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`
          }} />
        ))}
        
        {/* Triangle logo with glassmorphism */}
        <svg 
          width="160" 
          height="160" 
          viewBox="0 0 200 200"
          style={{ position: 'relative', zIndex: 10 }}
        >
          <defs>
            <mask id="trapezoidMask">
              <path d="M 100 40 L 160 160 L 40 160 Z" fill="white"/>
              <path d="M 80 145 L 120 145 L 130 160 L 70 160 Z" fill="black"/>
            </mask>
            <filter id="glass">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
              <feOffset dx="0" dy="2" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <g style={{
            transformOrigin: 'center',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            {/* Glass backdrop blur effect */}
            <path 
              d="M 100 40 L 160 160 L 40 160 Z" 
              fill="white"
              mask="url(#trapezoidMask)"
              opacity="0.15"
              filter="url(#glass)"
            />
            {/* Main white triangle */}
            <path 
              d="M 100 40 L 160 160 L 40 160 Z" 
              fill="white"
              mask="url(#trapezoidMask)"
            />
            {/* Glass highlight on top edge */}
            <path 
              d="M 100 40 L 160 160 L 40 160 Z" 
              fill="none"
              stroke="white"
              strokeWidth="1"
              mask="url(#trapezoidMask)"
              opacity="0.4"
            />
          </g>
        </svg>
      </div>
      
      {/* Theme toggle button */}
      <button
        onClick={() => setIsDark(!isDark)}
        style={{
          padding: '12px 32px',
          background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          border: `2px solid ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}`,
          color: isDark ? 'white' : '#0a0a2e',
          borderRadius: '50px',
          cursor: 'pointer',
          fontFamily: 'system-ui, sans-serif',
          fontSize: '14px',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.7;
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes counterSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes glow {
          0%, 100% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}