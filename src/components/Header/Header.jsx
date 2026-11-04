import Logo from '../Logo'
import NavLinks from './NavLinks'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiHeart, FiUser, FiLogOut } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { useCallback, useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import FancySearch from './FancySearch';
import { useStore } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { cartCount, wishlist, openCart, user, logout } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      isScrolled
        ? 'bg-[#050508]/95 backdrop-blur-md border-b border-[#2df8c5]/30 shadow-[0_4px_24px_rgba(45,248,197,0.12)] py-2'
        : 'bg-[#050508]/70 backdrop-blur-sm border-b border-transparent py-3.5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center gap-4">
        {/* Logo */}
        <Logo />

        {/* Desktop nav */}
        <NavLinks className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-[#2df8c5]" />

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">

          {/* Search toggle */}
          <button
            type="button"
            onClick={() => setSearchOpen(v => !v)}
            className={`p-2.5 transition-colors ${searchOpen ? 'text-[#ff0055]' : 'text-[#2df8c5] hover:text-[#ff0055]'} hover:bg-white/5`}
            aria-label="Search"
          >
            <FaSearch size={15} />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => navigate('/wishlist')}
            className="relative p-2.5 text-[#2df8c5] hover:text-[#ff0055] hover:bg-white/5 transition-colors"
            aria-label="Wishlist"
          >
            <FiHeart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center bg-[#ff0055] text-white text-[9px] font-bold rounded-full shadow-[0_0_8px_rgba(255,0,85,0.7)]">
                {wishlist.length > 9 ? '9+' : wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative p-2.5 text-[#2df8c5] hover:text-[#ff0055] hover:bg-white/5 transition-colors"
            aria-label="Cart"
          >
            <AiOutlineShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center bg-[#ff0055] text-white text-[9px] font-bold rounded-full shadow-[0_0_8px_rgba(255,0,85,0.7)] animate-pulse">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {/* User Auth indicator */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2 pl-2">
              <div 
                onClick={() => navigate('/signUp')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2df8c5]/10 border border-[#2df8c5]/30 text-[#2df8c5] font-mono text-xs cursor-pointer hover:border-[#2df8c5]"
                title={user.email}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2df8c5] animate-pulse" />
                <span className="font-bold truncate max-w-[85px]">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="p-1.5 text-slate-500 hover:text-[#ff0055] transition-colors"
                title="Disconnect Account"
                aria-label="Logout"
              >
                <FiLogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/signUp')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#2df8c5] border border-[#2df8c5]/30 hover:bg-[#2df8c5]/10 transition-colors ml-1"
            >
              <FiUser size={13} />
              Login
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={toggleMenu}
            className="ml-1 md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 border border-[#2df8c5]/25 hover:border-[#2df8c5]/60 transition-colors"
            aria-label="Menu"
          >
            <span className={`block w-5 h-[1.5px] bg-[#2df8c5] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-[#2df8c5] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-[#2df8c5] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>

        <MobileMenu toggleMenu={toggleMenu} isOpen={isMobileMenuOpen} />
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 md:hidden" onClick={toggleMenu} />
      )}

      {/* Scroll scanline */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#2df8c5]/60 to-transparent pointer-events-none" />
      )}

      {/* Fancy Search Dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="search-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 right-0 z-50 flex justify-center py-6 bg-[#050508]/90 backdrop-blur-xl border-b border-[#2df8c5]/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          >
            <FancySearch onClose={() => setSearchOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
