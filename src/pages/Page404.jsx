import { motion } from 'framer-motion'
import SiteBtn from '../components/SiteBtn'
import { useStore } from '../context/StoreContext'

export default function Page404() {
  const { lang } = useStore()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-[65vh] flex flex-col items-center justify-center text-center py-16 relative z-10"
    >
      <div className="absolute w-72 h-72 bg-[#ff0055]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <span className="text-[#ff0055] font-mono tracking-widest text-sm uppercase mb-2">
        {lang === 'it' ? 'ERRORE 404 // NODO NON RAGGIUNGIBILE' : 'ERROR 404 // NODE UNREACHABLE'}
      </span>
      <h1 className="text-6xl sm:text-8xl font-black font-mono text-white glitch-text tracking-tighter" data-text={lang === 'it' ? 'SEGNALE PERSO' : 'SIGNAL LOST'}>
        {lang === 'it' ? 'SEGNALE PERSO' : 'SIGNAL LOST'}
      </h1>
      <p className="mt-4 text-slate-400 font-mono text-sm max-w-md leading-relaxed">
        {lang === 'it' 
          ? 'Il cluster hardware o l&apos;indirizzo richiesto non è presente nella directory del mainframe.'
          : 'The hardware cluster or page address you requested does not exist in our mainframe directory.'}
      </p>
      <div className="mt-8">
        <SiteBtn text={lang === 'it' ? "Torna al Mainframe" : "Return to Mainframe"} to="/" />
      </div>
    </motion.div>
  )
}
