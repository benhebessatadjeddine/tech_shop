import { useEffect, useRef } from 'react'

const COLORS = ['#2df8c5', '#2df8c5', '#2df8c5', '#ff0055', '#7d2df8']

// Inject keyframes once into document
const injectStyles = () => {
  if (typeof document === 'undefined') return
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
      animation: cursor-spark 0.45s ease-out forwards;
    }
  `
  document.head.appendChild(style)
}

export default function CursorTrail() {
  const containerRef = useRef(null)
  const throttleRef = useRef(0)

  useEffect(() => {
    // Only enable cursor sparks on desktop devices with fine pointer (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return

    injectStyles()
    const container = containerRef.current
    if (!container) return

    const onMove = (e) => {
      const now = Date.now()
      // Throttle: only spawn a particle every ~45ms (approx 20 per second max)
      if (now - throttleRef.current < 45) return
      throttleRef.current = now

      // Cap max particles in DOM to avoid accumulation
      if (container.children.length > 25) {
        container.removeChild(container.firstChild)
      }

      const size = 3 + Math.random() * 5
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const duration = 380 + Math.random() * 150

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

      setTimeout(() => {
        if (dot.parentNode === container) {
          container.removeChild(dot)
        }
      }, duration)
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
