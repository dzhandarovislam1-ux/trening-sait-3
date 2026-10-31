type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const ArrowUpRight = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowRight = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Phone = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

export const WhatsApp = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m.01 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.23 3.7 8.23 8.24 0 4.55-3.7 8.24-8.23 8.24m4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28" />
  </svg>
);

export const AtSign = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </svg>
);

export const Pin = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const Clock = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Plus = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Close = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Menu = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export const Check = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const School = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z" />
    <path d="M7 11.5V16c0 1.4 2.2 3 5 3s5-1.6 5-3v-4.5M21 9.5V15" />
  </svg>
);

export const Mosque = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <path d="M7 20v-6a5 5 0 0 1 10 0v6M4 20h16M12 6V3M12 9a3 3 0 0 0-3-3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3 3ZM3 20v-8l1-2 1 2v8M19 20v-8l1-2 1 2v8M10 20v-3a2 2 0 0 1 4 0v3" />
  </svg>
);

export const Blocks = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <rect x="3" y="12" width="8" height="8" rx="1" />
    <rect x="13" y="12" width="8" height="8" rx="1" />
    <path d="M12 3.5 16.5 10h-9L12 3.5Z" />
  </svg>
);

export const Tree =({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <path d="M12 21v-6M8 17h8M12 3a5 5 0 0 0-4.6 7A4 4 0 0 0 9 17h6a4 4 0 0 0 1.6-7A5 5 0 0 0 12 3Z" />
  </svg>
);

export const Window = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <rect x="4" y="3" width="16" height="18" rx="1.5" />
    <path d="M12 3v18M4 12h16" />
  </svg>
);

export const Door = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M3 21h18M14.5 12h.01" />
  </svg>
);

export const Walls = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="1.5" />
    <path d="M3 10h9V3M12 14h9M12 10v11" />
  </svg>
);

export const Home = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <path d="M3 10.5 12 3l9 7.5M5 9v11h14V9M10 20v-6h4v6" />
  </svg>
);

export const Coins = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <ellipse cx="9" cy="7" rx="6" ry="3" />
    <path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7M9 15v2c0 1.7 2.7 3 6 3s6-1.3 6-3v-5c0-1.6-2.4-2.9-5.5-3" />
  </svg>
);

export const Calendar = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M3 10h18M8 3v4M16 3v4M8 15h3" />
  </svg>
);

export const Wallet = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5" />
    <path d="M16.5 14h.01" />
  </svg>
);

export const Family =({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <circle cx="8" cy="6" r="2.5" />
    <circle cx="16" cy="6" r="2.5" />
    <circle cx="12" cy="13" r="2" />
    <path d="M4 20v-5a4 4 0 0 1 8 0M12 20v-3M20 20v-5a4 4 0 0 0-8 0" />
  </svg>
);
