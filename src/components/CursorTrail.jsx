import { useEffect, useRef } from 'react'

const COLORS = ['#2df8c5', '#2df8c5', '#2df8c5', '#ff0055', '#7d2df8']

// Inject keyframes once into document
const injectStyles = () => {
  if (document.getElementById('cursor-trail-styles')) return
  const style = document.createElement('style')
  style.id = 'cursor-trail-styles'
  style.textContent = `
    @keyframes cursor-spark {
      0%   { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    }
    .cursor-spark {
      position: fixed;
      pointer-events: none;
      border-radius: 50%;
      z-index: 9999;
      animation: cursor-spark 0.55s ease-out forwards;
    }
  `
  document.head.appendChild(style)
}

export default function CursorTrail() {
  const containerRef = useRef(null)
  const throttleRef = useRef(0)

  useEffect(() => {
    injectStyles()

    const container = containerRef.current

    const onMove = (e) => {
      const now = Date.now()
      // Throttle: only spawn a particle every ~30ms (≈33 per second max)
      if (now - throttleRef.current < 30) return
      throttleRef.current = now

      const size = 4 + Math.random() * 6
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const duration = 450 + Math.random() * 200

      const dot = document.createElement('div')
      dot.className = 'cursor-spark'
      dot.style.cssText = `
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        box-shadow: 0 0 ${size * 2}px ${color};
        animation-duration: ${duration}ms;
      `

      container.appendChild(dot)

      // Auto-remove after animation completes
      setTimeout(() => {
        if (dot.parentNode === container) {
          container.removeChild(dot)
        }
      }, duration + 50)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
      aria-hidden
    />
  )
}
