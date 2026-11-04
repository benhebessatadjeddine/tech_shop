import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import ProductBox from '../components/Home/ProductBox'
import SectionHeader from '../components/Home/SectionHeader'
import { FiHeart } from 'react-icons/fi'

export default function Wishlist() {
  const { wishlist, toggleWishlist, clearWishlist, t } = useStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 py-8 space-y-12"
    >
      <SectionHeader
        flagName={`${wishlist.length} ${t('wishlist.saved')}`}
        title={t('wishlist.title')}
        isNeedViewAllBtn={wishlist.length > 0}
        viewAllTo="/products"
      />

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-6 text-slate-500">
          <FiHeart size={56} className="opacity-25" />
          <p className="font-mono text-sm uppercase tracking-widest">{t('wishlist.empty')}</p>
          <Link to="/products" className="cyber-btn px-6 py-3 text-xs">
            {t('wishlist.discover')}
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {wishlist.map(product => (
              <div key={product.id} className="relative">
                <ProductBox product={product} />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-2 right-2 z-30 bg-[#ff0055] text-white rounded-full p-1.5 shadow-[0_0_10px_rgba(255,0,85,0.5)] hover:scale-110 transition-transform text-xs font-mono"
                  aria-label="Remove from wishlist"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={clearWishlist}
              className="border border-[#ff0055]/40 text-[#ff0055] font-mono text-xs px-6 py-3 uppercase tracking-widest hover:bg-[#ff0055]/10 transition-colors"
            >
              {t('wishlist.clear')}
            </button>
          </div>
        </>
      )}
    </motion.div>
  )
}
