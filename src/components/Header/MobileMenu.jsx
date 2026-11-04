import NavLinks from "./NavLinks"
import propTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from "react-router-dom"
import { FiHeart, FiShoppingCart } from "react-icons/fi"
import { useStore } from "../../context/StoreContext"

export default function MobileMenu({ isOpen, toggleMenu }) {
  const { cartCount, wishlist, openCart } = useStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-0 right-0 h-[calc(100vh-60px)] z-40 md:hidden bg-[#050508]/95 backdrop-blur-xl border-t border-[#2df8c5]/20 flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
        >
          <div className="flex-1 overflow-y-auto px-6 py-10 flex flex-col justify-between">
            {/* Links section */}
            <motion.div
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="flex flex-col gap-6"
            >
              <NavLinks
                toggleMenu={toggleMenu}
                className="flex flex-col gap-6 text-2xl font-black uppercase tracking-widest text-slate-200"
              />
            </motion.div>

            {/* Bottom Actions section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="border-t border-[#2df8c5]/10 pt-8 flex flex-col gap-5 mt-10"
            >
              <Link
                to="/wishlist"
                onClick={toggleMenu}
                className="flex items-center justify-between p-4 bg-[#0c0f1a] border border-[#2df8c5]/20 font-mono text-sm uppercase tracking-widest text-[#2df8c5]"
              >
                <div className="flex items-center gap-3">
                  <FiHeart size={20} />
                  <span>Wishlist</span>
                </div>
                {wishlist.length > 0 && <span className="text-[#ff0055] font-bold">{wishlist.length}</span>}
              </Link>

              <button
                onClick={() => { toggleMenu(); setTimeout(openCart, 300) }}
                className="flex items-center justify-between p-4 bg-[#2df8c5] font-mono text-sm font-bold uppercase tracking-widest text-black"
              >
                <div className="flex items-center gap-3">
                  <FiShoppingCart size={20} />
                  <span>Cart</span>
                </div>
                {cartCount > 0 && <span className="bg-black text-[#2df8c5] px-2 py-0.5">{cartCount}</span>}
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

MobileMenu.propTypes = {
  isOpen: propTypes.bool,
  toggleMenu: propTypes.func
}
