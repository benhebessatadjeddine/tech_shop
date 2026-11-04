import { useState } from "react";
import { FaTelegram } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";

export default function Footer() {
    const [email, setEmail] = useState("")
    const { triggerToast, t, lang } = useStore()

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            triggerToast(lang === 'it' ? "Inserisci un indirizzo email valido" : "Please enter a valid email address")
            return
        }
        triggerToast(lang === 'it' ? `Gli aggiornamenti hardware verranno inviati a ${email}` : `Hardware drops intelligence will be sent to ${email}`)
        setEmail("")
    }

    return (
        <footer className="bg-[#050508] text-slate-300 pt-20 pb-8 border-t border-[#2df8c5]/20 relative overflow-hidden mt-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#2df8c5]/50 to-transparent" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[40vw] h-[40vw] bg-[#7d2df8]/5 rounded-full blur-[150px] pointer-events-none" />
            
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-10 relative z-10">
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="flex items-center gap-2 font-black text-2xl tracking-tighter select-none">
                        <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                            <path d="M14 2L25.5 8.5V21L14 27.5L2.5 21V8.5L14 2Z" stroke="#2df8c5" strokeWidth="1.5" className="drop-shadow-[0_0_6px_rgba(45,248,197,0.8)]" />
                            <circle cx="14" cy="15" r="2" fill="#2df8c5" />
                        </svg>
                        <span><span className="text-[#2df8c5]">NEXUS</span><span className="text-white">RIG</span></span>
                    </div>
                    <p className="text-slate-400 font-mono text-sm leading-relaxed max-w-sm">
                        {t('footer.desc')}
                    </p>
                    <div className="flex flex-col gap-2 mt-2">
                        <span className="text-[#2df8c5] font-mono text-sm font-bold uppercase tracking-widest">{t('footer.subscribe')}</span>
                        <form onSubmit={handleSubscribe} className="flex border border-[#2df8c5]/30 focus-within:border-[#2df8c5] transition-colors max-w-sm">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-[#0c0f1a] w-full px-4 py-2 font-mono text-sm text-white outline-none placeholder:text-slate-600" 
                            />
                            <button type="submit" className="bg-[#2df8c5] text-black px-4 py-2 font-mono text-sm font-bold hover:bg-white transition-colors">
                                {t('footer.join')}
                            </button>
                        </form>
                    </div>
                </div>

                <nav className="flex flex-col gap-4">
                    <h6 className="text-lg font-bold text-white tracking-widest uppercase font-mono mb-2">{t('footer.support')}</h6>
                    <span className="text-sm text-slate-400 hover:text-[#2df8c5] transition-colors font-mono">{t('footer.address')}</span>
                    <span className="text-sm text-slate-400 hover:text-[#2df8c5] transition-colors font-mono">support@nexusrig.it</span>
                    <span className="text-sm text-slate-400 hover:text-[#2df8c5] transition-colors font-mono font-bold">+39 344 486 1409</span>
                </nav>

                <nav className="flex flex-col gap-4">
                    <h6 className="text-lg font-bold text-white tracking-widest uppercase font-mono mb-2">{t('footer.account')}</h6>
                    <Link to={'/products'} className="text-sm text-slate-400 hover:text-[#2df8c5] transition-colors font-mono">{t('nav.shop')}</Link>
                    <Link to={'/signUp'} className="text-sm text-slate-400 hover:text-[#2df8c5] transition-colors font-mono">{t('nav.signUp')}</Link>
                    <Link to={'/signUp'} className="text-sm text-slate-400 hover:text-[#2df8c5] transition-colors font-mono">{t('nav.login')}</Link>
                    <Link to={'/wishlist'} className="text-sm text-slate-400 hover:text-[#2df8c5] transition-colors font-mono">{t('wishlist.title')}</Link>
                </nav>

                <nav className="flex flex-col gap-4">
                    <h6 className="text-lg font-bold text-white tracking-widest uppercase font-mono mb-2">{t('footer.socials')}</h6>
                    <div className="flex items-center gap-5">
                        <motion.a href="https://t.me" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, color: '#2df8c5', filter: 'drop-shadow(0 0 8px #2df8c5)' }} className="cursor-pointer text-slate-500 transition-colors" aria-label="Telegram"><FaTelegram size={24} /></motion.a>
                        <motion.a href="https://instagram.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, color: '#2df8c5', filter: 'drop-shadow(0 0 8px #2df8c5)' }} className="cursor-pointer text-slate-500 transition-colors" aria-label="Instagram"><FaInstagram size={24} /></motion.a>
                        <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, color: '#2df8c5', filter: 'drop-shadow(0 0 8px #2df8c5)' }} className="cursor-pointer text-slate-500 transition-colors" aria-label="LinkedIn"><FaLinkedin size={24} /></motion.a>
                    </div>
                </nav>
            </div>

            <div className="container mx-auto px-4 mt-16 text-center text-sm text-slate-500 pt-8 font-mono relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#ff0055]/30 to-transparent"></div>
                &copy; {new Date().getFullYear()} NexusRig. {t('footer.rights')}
            </div>
        </footer>
    )
}
