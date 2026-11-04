import { useState } from 'react'
import { motion } from 'framer-motion'
import { PiPhone } from "react-icons/pi"
import { MdOutlineMail } from "react-icons/md"
import { useStore } from '../context/StoreContext'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  // Use dispatch to show global toast
  const { addToCart } = useStore() // we just need the dispatch method
  void addToCart

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSent(true)
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 py-8"
    >
      <div className="flex items-center gap-3 mb-12">
        <span className="block w-3 h-8 bg-[#ff0055] shadow-[0_0_12px_rgba(255,0,85,0.7)]" />
        <h1 className="text-3xl font-extrabold text-white tracking-tight">CONTACT US</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-8 md:gap-6 lg:gap-10">
        {/* Info panel */}
        <div className="md:col-span-3 glass border border-[#2df8c5]/15 p-7 flex flex-col gap-8">
          <div className="flex flex-col gap-3 border-b border-[#2df8c5]/12 pb-7">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#ff0055] rounded-full shadow-[0_0_12px_rgba(255,0,85,0.5)]">
                <PiPhone className="text-white" size={20} />
              </div>
              <span className="font-mono font-bold text-white uppercase tracking-widest">Call Us</span>
            </div>
            <p className="text-slate-400 font-mono text-sm">24/7 support in Algiers.</p>
            <p className="text-[#2df8c5] font-mono text-sm">+213 550 00 00 00</p>
            <p className="text-[#2df8c5] font-mono text-sm">+213 770 00 00 00</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#ff0055] rounded-full shadow-[0_0_12px_rgba(255,0,85,0.5)]">
                <MdOutlineMail className="text-white" size={20} />
              </div>
              <span className="font-mono font-bold text-white uppercase tracking-widest">Email</span>
            </div>
            <p className="text-slate-400 font-mono text-sm">Oran & Algiers Hub</p>
            <p className="text-[#2df8c5] font-mono text-sm">contact@nexusrig.dz</p>
            <p className="text-[#2df8c5] font-mono text-sm">support@nexusrig.dz</p>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-4 glass border border-[#ff0055]/15 p-7 relative overflow-hidden">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="text-4xl">✓</div>
              <h3 className="font-mono font-bold text-[#2df8c5] text-xl uppercase tracking-widest">Message Sent</h3>
              <p className="text-slate-400 font-mono text-sm max-w-xs">We&apos;ll get back to you at <span className="text-[#2df8c5]">{form.email}</span> within 2 hours.</p>
              <button onClick={() => setSent(false)} className="cyber-btn px-6 py-2.5 text-xs mt-2">Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                {field('name', 'Your Name')}
                {field('phone', 'Phone (optional)')}
              </div>
              {field('email', 'Email Address', 'email')}
              <div className="flex flex-col gap-1">
                <textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: '' })) }}
                  rows={5}
                  className={`w-full bg-transparent border-b-2 py-3 px-1 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none transition-colors resize-none ${
                    errors.message ? 'border-[#ff0055]' : 'border-slate-700 focus:border-[#2df8c5]'
                  }`}
                />
                {errors.message && <span className="text-[#ff0055] text-xs font-mono">{errors.message}</span>}
              </div>
              <button type="submit" className="cyber-btn py-3.5 text-sm ml-auto px-8">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  )
}
