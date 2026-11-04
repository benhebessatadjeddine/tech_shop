import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 font-black text-2xl tracking-tighter select-none group"
      aria-label="NexusRig - Go Home"
    >
      {/* Animated hex icon */}
      <svg
        width="28" height="28" viewBox="0 0 28 28" fill="none"
        className="transition-transform duration-300 group-hover:rotate-[30deg]"
        aria-hidden
      >
        <path
          d="M14 2L25.5 8.5V21L14 27.5L2.5 21V8.5L14 2Z"
          stroke="#2df8c5" strokeWidth="1.5" fill="none"
          className="drop-shadow-[0_0_6px_rgba(45,248,197,0.8)]"
        />
        <path
          d="M14 7L21 11V19L14 23L7 19V11L14 7Z"
          fill="#2df8c5" fillOpacity="0.15"
        />
        <circle cx="14" cy="15" r="2" fill="#2df8c5" />
      </svg>

      <span>
        <span className="text-[#2df8c5] drop-shadow-[0_0_8px_rgba(45,248,197,0.6)]">NEXUS</span>
        <span className="text-white">RIG</span>
      </span>
    </Link>
  )
}
