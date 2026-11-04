import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { CiHeart } from 'react-icons/ci'
import { HiOutlineShieldCheck, HiOutlineTruck } from 'react-icons/hi'
import { getProductById, PRODUCTS } from '../data/products'
import { useStore } from '../context/StoreContext'
import ProductBox from '../components/Home/ProductBox'
import SectionHeader from '../components/Home/SectionHeader'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addToCart, toggleWishlist, isWished } = useStore()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-400 font-mono">
        <p className="text-4xl font-black text-[#ff0055]">404</p>
        <p className="text-sm uppercase tracking-widest">Product not found</p>
        <Link to="/products" className="cyber-btn px-6 py-2.5 text-xs">Browse Catalog</Link>
      </div>
    )
  }

  const wished = isWished(product.id)
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(product.rating)) return 'full'
    if (i < product.rating) return 'half'
    return 'empty'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 py-8 space-y-24"
    >
      {/* Ambient orbs */}
      <div className="orb-cyan fixed top-[20%] left-[5%] w-[25vw] h-[25vw] bg-[#2df8c5]/6 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link to="/" className="hover:text-[#2df8c5] transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-[#2df8c5] transition-colors">Products</Link>
        <span>/</span>
        <span className="text-slate-300 truncate max-w-48">{product.title}</span>
      </nav>

      {/* Main product section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

        {/* Image panel */}
        <div className="glass border border-[#2df8c5]/20 p-8 flex items-center justify-center min-h-[360px] group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2df8c5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <img
            src={product.imageUrl}
            alt={product.title}
            className="max-h-72 object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.offPercent && (
            <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 bg-[#ff0055] text-white shadow-[0_0_12px_rgba(255,0,85,0.6)]">
              -{product.offPercent}% OFF
            </span>
          )}
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-5">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map(tag => (
              <span key={tag} className="text-xs font-mono px-2.5 py-1 border border-[#2df8c5]/25 text-[#2df8c5] uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight glitch-text" data-text={product.title}>
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {stars.map((s, i) => (
                s === 'full'  ? <FaStar key={i} className='text-[#2df8c5] w-4 h-4' /> :
                s === 'half'  ? <FaStarHalfAlt key={i} className='text-[#2df8c5] w-4 h-4' /> :
                                <FaRegStar key={i} className='text-slate-600 w-4 h-4' />
              ))}
            </div>
            <span className="font-mono text-sm text-slate-400">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-black text-white">{product.price.toLocaleString()} DA</span>
            {product.priceBeforeOff && (
              <span className="line-through text-slate-500 text-lg">{product.priceBeforeOff.toLocaleString()} DA</span>
            )}
            {product.offPercent && (
              <span className="text-[#ff0055] font-bold font-mono text-sm">Save {(product.priceBeforeOff - product.price).toLocaleString()} DA</span>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#2df8c5]/30 to-transparent" />

          {/* Description */}
          <p className="text-slate-300 font-mono text-sm leading-relaxed">{product.desc}</p>

          {/* Qty + Actions */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div className="flex items-center border border-[#2df8c5]/30">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-10 h-11 flex items-center justify-center text-[#2df8c5] hover:bg-[#2df8c5]/10 transition-colors font-bold"
              >-</button>
              <span className="w-10 text-center font-mono text-white">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="w-10 h-11 flex items-center justify-center text-[#2df8c5] hover:bg-[#2df8c5]/10 transition-colors font-bold"
              >+</button>
            </div>

            <button
              onClick={() => { for (let i = 0; i < qty; i++) addToCart(product) }}
              className="flex-1 cyber-btn py-3.5 text-sm min-w-[160px]"
            >
              Add to Cart
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`w-11 h-11 flex items-center justify-center border transition-colors duration-200 ${
                wished
                  ? 'bg-[#ff0055] border-[#ff0055] text-white'
                  : 'border-[#2df8c5]/30 text-[#2df8c5] hover:bg-[#ff0055]/10 hover:border-[#ff0055]/50 hover:text-[#ff0055]'
              }`}
              aria-label="Toggle wishlist"
            >
              <CiHeart size={22} />
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="flex items-center gap-3 p-3 bg-[#0c0f1a] border border-[#2df8c5]/10">
              <HiOutlineTruck className="text-[#2df8c5] flex-shrink-0" size={20} />
              <span className="font-mono text-xs text-slate-400">Free shipping on orders 20000 DA+</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#0c0f1a] border border-[#2df8c5]/10">
              <HiOutlineShieldCheck className="text-[#2df8c5] flex-shrink-0" size={20} />
              <span className="font-mono text-xs text-slate-400">2-Year warranty included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <SectionHeader flagName="You may also like" title="RELATED GEAR" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {related.map(p => <ProductBox key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </motion.div>
  )
}
