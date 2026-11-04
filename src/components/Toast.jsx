import { useStore } from '../context/StoreContext'
import { AnimatePresence, motion } from 'framer-motion'
import { HiCheckCircle } from 'react-icons/hi'

export default function Toast() {
  const { toast } = useStore()
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3.5 font-mono text-sm text-black bg-[#2df8c5] shadow-[0_0_25px_rgba(45,248,197,0.5)] max-w-sm w-[90vw]"
        >
          <HiCheckCircle size={20} className="flex-shrink-0" />
          <span className="font-bold tracking-wide truncate">{toast}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
