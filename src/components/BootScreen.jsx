import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import propTypes from 'prop-types'

const BOOT_LINES = [
  { text: '> NEXUSRIG_OS v2.077 — kernel loaded', delay: 0 },
  { text: '> Hardware registry scan... complete      [OK]', delay: 650 },
  { text: '> GPU catalog: 13 units indexed          [OK]', delay: 1300 },
  { text: '> Peripherals database: online           [OK]', delay: 1950 },
  { text: '> Secure payment gateway: connected      [OK]', delay: 2550 },
  { text: '> User session initialized               [OK]', delay: 3100 },
  { text: '> Welcome, OPERATOR. All systems go.', delay: 3700 },
]

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  const startExit = useCallback(() => {
    setExiting(true)
    setTimeout(onComplete, 900)
  }, [onComplete])

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line.text])
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100))
        if (i === BOOT_LINES.length - 1) {
          setTimeout(startExit, 1600)
        }
      }, line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [startExit])

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#02040a] overflow-hidden select-none"
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(45,248,197,0.03) 2px, rgba(45,248,197,0.03) 4px)',
            }}
          />

          {/* Radial glow behind logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full bg-[#2df8c5]/4 blur-[140px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-lg px-6">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center gap-3"
            >
              <svg width="60" height="60" viewBox="0 0 28 28" fill="none">
                <motion.path
                  d="M14 2L25.5 8.5V21L14 27.5L2.5 21V8.5L14 2Z"
                  stroke="#2df8c5" strokeWidth="1.5" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M14 7L21 11V19L14 23L7 19V11L14 7Z"
                  fill="#2df8c5" fillOpacity="0"
                  animate={{ fillOpacity: 0.15 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                />
                <motion.circle
                  cx="14" cy="15" r="2" fill="#2df8c5"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: 'spring', stiffness: 300 }}
                />
              </svg>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="font-black text-3xl tracking-tighter"
              >
                <span className="text-[#2df8c5] drop-shadow-[0_0_16px_rgba(45,248,197,0.8)]">NEXUS</span>
                <span className="text-white">RIG</span>
              </motion.div>
            </motion.div>

            {/* Terminal output */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full bg-[#050810] border border-[#2df8c5]/20 p-5 font-mono text-xs space-y-2 min-h-[180px]"
            >
              {visibleLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={line.includes('[OK]') ? 'text-[#2df8c5]' : line.includes('Welcome') ? 'text-white font-bold' : 'text-slate-400'}
                >
                  {line}
                  {i === visibleLines.length - 1 && visibleLines.length < BOOT_LINES.length && (
                    <span className="inline-block w-2 h-3 bg-[#2df8c5] ml-1 animate-pulse" />
                  )}
                </motion.p>
              ))}
            </motion.div>

            {/* Progress bar */}
            <div className="w-full space-y-2">
              <div className="flex justify-between font-mono text-xs text-slate-500 uppercase tracking-widest">
                <span>Initializing</span>
                <span className="text-[#2df8c5]">{progress}%</span>
              </div>
              <div className="w-full h-[3px] bg-[#0c0f1a] overflow-hidden">
                <motion.div
                  className="h-full bg-[#2df8c5] shadow-[0_0_10px_rgba(45,248,197,0.8)]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Skip button */}
            <button
              onClick={startExit}
              className="text-slate-600 hover:text-slate-400 font-mono text-xs uppercase tracking-widest transition-colors"
            >
              skip →
            </button>
          </div>
        </motion.div>
      ) : (
        /* Curtain slides up to reveal site */
        <motion.div
          key="curtain"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] bg-[#02040a] pointer-events-none"
        />
      )}
    </AnimatePresence>
  )
}

BootScreen.propTypes = { onComplete: propTypes.func.isRequired }
