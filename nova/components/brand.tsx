/** Terek brand mark — the zigzag band from the company logo. */
export const MARK_PATH =
  "M0 0H10V10L21 0H45V10L57 0H81V10L94 0H115V23H106V9H96L84 23H71V9H60L47 23H35V9H25L12 23H0Z";

export function TerekMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 115 23" className={className} fill="currentColor" aria-hidden>
      <path d={MARK_PATH} />
    </svg>
  );
}

/** Full logo: mark above the "terek" wordmark, as on the company's profile picture. */
export function TerekLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 115 52" className={className} fill="currentColor" role="img" aria-label="Terek">
      <path d={MARK_PATH} />
      <text
        x="57.5"
        y="50"
        textAnchor="middle"
        textLength="115"
        lengthAdjust="spacingAndGlyphs"
        style={{ font: "600 28px var(--font-display), Montserrat, sans-serif" }}
      >
        terek
      </text>
    </svg>
  );
}
