import propTypes from 'prop-types'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { useStore } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function ProductBox({ product }) {
  const { title, price, priceBeforeOff, offPercent, isNew, imageUrl, id, rating, badge } = product
  const { addToCart, toggleWishlist, isWished } = useStore()
  const navigate = useNavigate()
  const wished = isWished(id)

  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) return 'full'
    if (i < rating) return 'half'
    return 'empty'
  })

  // 3D Hover State
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for buttery rotation
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  // Map mouse position to rotation angle (max 15 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className='group flex flex-col gap-4 cursor-pointer relative z-10'>
      {/* 3D Perspective Wrapper */}
      <div 
        className="w-full relative" 
        style={{ perspective: "1000px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(`/product/${id}`)}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className='relative flex items-center justify-center p-6 h-52 min-[550px]:h-60 md:h-52 lg:h-56
            bg-[#0c0f1a] border border-[#2df8c5]/12 overflow-hidden
            transition-colors duration-300 rounded-xl
            group-hover:border-[#2df8c5]/40 group-hover:shadow-[0_0_30px_rgba(45,248,197,0.15)]'
        >
          {/* Internal Glow on Hover */}
          <div 
            className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
            style={{ 
              background: 'radial-gradient(circle at center, rgba(45,248,197,0.1) 0%, transparent 70%)',
              transform: 'translateZ(-1px)'
            }} 
          />

          {/* Product Image popping out in Z-axis */}
          <div 
            className="h-full w-full relative flex justify-center items-center pointer-events-none"
            style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
          >
            <img
              className='h-full object-contain relative z-10 transition-all duration-500 drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] group-hover:scale-110'
              src={imageUrl}
              alt={title}
              loading="lazy"
            />
          </div>

          {/* Action buttons (Popped out further) */}
          <div 
            className='flex flex-col gap-2 absolute top-3 right-3 z-30 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            style={{ transform: "translateZ(60px)" }}
          >
            <button
              onClick={e => { e.stopPropagation(); toggleWishlist(product) }}
              className={`rounded-full p-2 border transition-all duration-200 ${
                wished
                  ? 'bg-[#ff0055] border-[#ff0055] text-white shadow-[0_0_15px_rgba(255,0,85,0.4)]'
                  : 'bg-[#0c0f1a]/80 backdrop-blur-sm border-[#2df8c5]/40 text-[#2df8c5] hover:bg-[#ff0055] hover:border-[#ff0055] hover:text-white'
              }`}
              aria-label="Toggle wishlist"
            >
              <CiHeart size={18} />
            </button>
            <button
              onClick={e => { e.stopPropagation(); navigate(`/product/${id}`) }}
              className='bg-[#0c0f1a]/80 backdrop-blur-sm border border-[#2df8c5]/40 text-[#2df8c5] rounded-full p-2 hover:bg-[#2df8c5] hover:text-black hover:shadow-[0_0_15px_rgba(45,248,197,0.4)] transition-all duration-200'
              aria-label="Quick view"
            >
              <IoEyeOutline size={18} />
            </button>
          </div>

          {/* Badges (Popped out) */}
          <div style={{ transform: "translateZ(30px)" }} className="absolute top-3 left-3 z-20">
            {offPercent && (
              <span className='text-xs font-bold px-2 py-1 bg-[#ff0055] text-white shadow-[0_0_15px_rgba(255,0,85,0.4)] rounded-sm'>
                -{offPercent}%
              </span>
            )}
            {!offPercent && (badge || isNew) && (
              <span className='text-xs font-bold px-2 py-1 bg-[#2df8c5] text-black shadow-[0_0_15px_rgba(45,248,197,0.4)] rounded-sm'>
                {badge || 'NEW'}
              </span>
            )}
          </div>

          {/* Add to cart bar */}
          <button
            onClick={e => { e.stopPropagation(); addToCart(product) }}
            className='absolute bottom-0 left-0 right-0 py-3 bg-[#2df8c5] text-black text-xs font-bold uppercase tracking-widest z-20 translate-y-0 md:translate-y-full group-hover:translate-y-0 transition-transform duration-300'
            style={{ transform: "translateZ(20px)" }}
          >
            Add to Cart
          </button>
        </motion.div>
      </div>

      {/* Info section below card */}
      <div className='px-1 space-y-1 relative z-10' onClick={() => navigate(`/product/${id}`)}>
        <h3 className='font-semibold font-mono text-slate-200 text-sm tracking-tight line-clamp-1 group-hover:text-[#2df8c5] transition-colors duration-200'>
          {title}
        </h3>
        <div className='flex items-center gap-3'>
          <span className='text-[#ff0055] font-bold'>{price.toLocaleString()} DA</span>
          {priceBeforeOff && (
            <span className='line-through text-slate-500 text-sm'>{priceBeforeOff.toLocaleString()} DA</span>
          )}
        </div>
        <div className='flex items-center gap-0.5'>
          {stars.map((s, i) => (
            s === 'full'  ? <FaStar key={i} className='text-[#2df8c5] w-3 h-3' /> :
            s === 'half'  ? <FaStarHalfAlt key={i} className='text-[#2df8c5] w-3 h-3' /> :
                            <FaRegStar key={i} className='text-slate-600 w-3 h-3' />
          ))}
          <span className='text-xs text-slate-500 ml-1 font-mono'>({product.reviews || 0})</span>
        </div>
      </div>
    </div>
  )
}

ProductBox.propTypes = {
  product: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
    price: propTypes.number,
    priceBeforeOff: propTypes.number,
    offPercent: propTypes.number,
    isNew: propTypes.bool,
    badge: propTypes.string,
    imageUrl: propTypes.string,
    rating: propTypes.number,
    reviews: propTypes.number,
  }).isRequired
}