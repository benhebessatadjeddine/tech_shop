import { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi'

export default function Checkout() {
  const { cart, cartTotal, cartCount, removeFromCart, changeQty, clearCart } = useStore()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', card: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!/^\d{16}$/.test(form.card.replace(/\s/g, ''))) e.card = '16-digit card number required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
    clearCart()
  }

  const field = (key, placeholder, type = 'text') => (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: '' })) }}
        className={`w-full bg-transparent border-b-2 py-3 px-1 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none transition-colors ${
          errors[key] ? 'border-[#ff0055]' : 'border-slate-700 focus:border-[#2df8c5]'
        }`}
      />
      {errors[key] && <span className="text-[#ff0055] text-xs font-mono">{errors[key]}</span>}
    </div>
  )

  if (submitted) return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-[#2df8c5]/15 flex items-center justify-center border-2 border-[#2df8c5] shadow-[0_0_30px_rgba(45,248,197,0.4)]">
        <FiShoppingBag className="text-[#2df8c5]" size={36} />
      </div>
      <h2 className="text-3xl font-extrabold text-white glitch-text" data-text="ORDER CONFIRMED">ORDER CONFIRMED</h2>
      <p className="text-slate-400 font-mono max-w-md">Your order has been placed successfully. You will receive a confirmation at <span className="text-[#2df8c5]">{form.email}</span></p>
      <Link to="/" className="cyber-btn px-8 py-3.5 text-sm">Back to Store</Link>
    </motion.div>
  )

  if (cart.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-400 font-mono">
      <FiShoppingBag size={48} className="opacity-25" />
      <p className="text-sm uppercase tracking-widest">Your cart is empty</p>
      <Link to="/products" className="cyber-btn px-6 py-2.5 text-xs">Browse Products</Link>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 py-8"
    >
      <div className="flex items-center gap-3 mb-10">
        <span className="block w-3 h-8 bg-[#ff0055] shadow-[0_0_12px_rgba(255,0,85,0.7)]" />
        <h1 className="text-3xl font-extrabold text-white tracking-tight">CHECKOUT</h1>
        <span className="ml-auto font-mono text-slate-400 text-sm">{cartCount} items</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Order details */}
        <div className="glass border border-[#2df8c5]/15 p-6 space-y-4">
          <h3 className="font-mono font-bold text-[#2df8c5] uppercase tracking-widest text-sm mb-4">Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 pb-4 border-b border-[#2df8c5]/8">
              <img src={item.imageUrl} alt={item.title} className="w-14 h-14 object-cover flex-shrink-0 bg-[#0c0f1a]" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono text-slate-200 line-clamp-1">{item.title}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <button onClick={() => changeQty(item.id, -1)} className="w-6 h-6 border border-[#2df8c5]/30 text-[#2df8c5] hover:bg-[#2df8c5]/10 text-xs flex items-center justify-center">
                    <FiMinus size={10} />
                  </button>
                  <span className="font-mono text-white text-xs w-5 text-center">{item.qty}</span>
                  <button onClick={() => changeQty(item.id, 1)} className="w-6 h-6 border border-[#2df8c5]/30 text-[#2df8c5] hover:bg-[#2df8c5]/10 text-xs flex items-center justify-center">
                    <FiPlus size={10} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeFromCart(item.id)} className="text-slate-600 hover:text-[#ff0055] transition-colors">
                  <FiTrash2 size={14} />
                </button>
                <span className="font-bold text-white font-mono text-sm">{(item.price * item.qty).toLocaleString()} DA</span>
              </div>
            </div>
          ))}
          <div className="flex justify-between pt-2">
            <span className="font-mono text-slate-400 uppercase tracking-widest text-sm">Shipping</span>
            <span className="font-mono text-[#2df8c5] text-sm">{cartTotal >= 20000 ? 'FREE' : '1500 DA'}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-[#2df8c5]/15">
            <span className="font-mono text-white font-bold uppercase tracking-widest">Total</span>
            <span className="font-black text-2xl text-white">
              {(cartTotal >= 20000 ? cartTotal : cartTotal + 1500).toLocaleString()} DA
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass border border-[#ff0055]/15 p-6 space-y-5">
          <h3 className="font-mono font-bold text-[#ff0055] uppercase tracking-widest text-sm mb-4">Shipping & Payment</h3>
          {field('name', 'Full Name')}
          {field('email', 'Email Address', 'email')}
          {field('address', 'Street Address')}
          {field('city', 'City & Zip Code')}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              maxLength={19}
              placeholder="Card Number (16 digits)"
              value={form.card.replace(/(\d{4})/g, '$1 ').trim()}
              onChange={e => { setForm(f => ({ ...f, card: e.target.value.replace(/\s/g, '') })); setErrors(er => ({ ...er, card: '' })) }}
              className={`w-full bg-transparent border-b-2 py-3 px-1 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none transition-colors ${
                errors.card ? 'border-[#ff0055]' : 'border-slate-700 focus:border-[#2df8c5]'
              }`}
            />
            {errors.card && <span className="text-[#ff0055] text-xs font-mono">{errors.card}</span>}
          </div>
          <p className="text-xs text-slate-600 font-mono">This is a demo. No real payment is processed.</p>
          <button type="submit" className="w-full cyber-btn py-4 text-sm mt-4">
            Place Order
          </button>
        </form>
      </div>
    </motion.div>
  )
}
