export default function Logo({ size = 38, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <rect
        x="9" y="11" width="36" height="36" rx="9"
        fill="#fffdf8" stroke="#221c15" strokeWidth="3.5"
        transform="rotate(-10 27 29)"
      />
      <rect
        x="20" y="20" width="37" height="37" rx="9"
        fill="#d9480f" stroke="#221c15" strokeWidth="3.5"
        transform="rotate(6 38.5 38.5)"
      />
      <path
        d="M30 39.5l6.5 6.5L48 32"
        fill="none" stroke="#fffdf8" strokeWidth="5.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}
