import { useId } from 'react';

export function Logo({ className = 'size-8' }: { className?: string }) {
  const gradientId = useId();

  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#863bff" />
          <stop offset="100%" stopColor="#47bfff" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#${gradientId})`} />
      <rect x="8" y="20" width="6" height="14" rx="2" fill="#fff" fillOpacity="0.35" />
      <rect x="17" y="14" width="6" height="20" rx="2" fill="#fff" fillOpacity="0.35" />
      <rect x="26" y="24" width="6" height="10" rx="2" fill="#fff" fillOpacity="0.35" />
      <path
        d="M6 23c3-7 7-7 10 0s7 7 10 0 7-7 10 0"
        fill="none"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
