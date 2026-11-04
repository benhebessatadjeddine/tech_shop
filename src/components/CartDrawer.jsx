import { useStore } from '../context/StoreContext'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function CartDrawer() {
  const { cart, cartOpen, cartTotal, closeCart, removeFromCart, changeQty, clearCart } = useStore()

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[101] flex flex-col"
            style={{ background: 'rgba(8,11,18,0.97)', borderLeft: '1px solid rgba(45,248,197,0.2)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#2df8c5]/15">
              <div className="flex items-center gap-3">
                <HiOutlineShoppingCart className="text-[#2df8c5]" size={22} />
                <span className="font-mono font-bold text-white uppercase tracking-widest">
                  Cart <span className="text-[#2df8c5]">({cart.length})</span>
                </span>
              </div>
              <button onClick={closeCart} className="text-slate-400 hover:text-white transition-colors p-1">
                <IoClose size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
                  <HiOutlineShoppingCart size={48} className="opacity-30" />
                  <p className="font-mono text-sm uppercase tracking-widest">Your cart is empty</p>
                  <button
                    onClick={closeCart}
                    className="cyber-btn px-6 py-2.5 text-xs"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-3 bg-[#0c0f1a] border border-[#2df8c5]/10 group">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 object-cover flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono text-slate-200 line-clamp-1 mb-1">{item.title}</p>
                      <p className="text-[#ff0055] font-bold text-sm">{item.price.toLocaleString()} DA</p>
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => changeQty(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center border border-[#2df8c5]/30 text-[#2df8c5] hover:bg-[#2df8c5] hover:text-black transition-colors"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="font-mono text-white w-6 text-center text-sm">{item.qty}</span>
                        <button
                          onClick={() => changeQty(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center border border-[#2df8c5]/30 text-[#2df8c5] hover:bg-[#2df8c5] hover:text-black transition-colors"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-600 hover:text-[#ff0055] transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                      <p className="text-white font-bold text-sm font-mono">{(item.price * item.qty).toLocaleString()} DA</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-[#2df8c5]/15 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-slate-400 uppercase tracking-widest text-sm">Total</span>
                  <span className="font-black text-2xl text-white font-mono">{cartTotal.toLocaleString()} DA</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="block w-full cyber-btn py-4 text-center text-sm"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full py-2.5 text-xs text-slate-500 hover:text-[#ff0055] font-mono uppercase tracking-widest transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
