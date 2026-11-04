import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStore } from "../context/StoreContext"

export default function SignUp() {
  const [isLogin, setIsLogin] = useState(false)
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { login } = useStore()
  const navigate = useNavigate()

  const validate = () => {
    const errs = {}
    if (!isLogin && !form.username.trim()) errs.username = 'Username is required'
    if (!form.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = 'Invalid email address'
    }
    if (!form.password) {
      errs.password = 'Password is required'
    } else if (form.password.length < 6) {
      errs.password = 'Must be at least 6 characters'
    }
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const user = {
        name: isLogin ? form.email.split('@')[0] : form.username,
        email: form.email,
        level: 'LEVEL 4 CLEARANCE'
      }
      login(user)
      navigate('/')
    }, 600)
  }

  const handleGoogleAuth = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      login({
        name: 'NexusOperator',
        email: 'operator@nexusrig.dz',
        level: 'LEVEL 4 CLEARANCE'
      })
      navigate('/')
    }, 500)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="min-h-[80vh] flex items-center justify-center relative z-10 py-16"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#2df8c5]/5 blur-[150px] -z-10 rounded-full" />
      
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-none glass border border-[#2df8c5]/30 overflow-hidden shadow-[0_0_50px_rgba(45,248,197,0.15)] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2df8c5] via-[#7d2df8] to-[#ff0055]" />
        
        {/* Image Section */}
        <div className="hidden md:block relative bg-[#07090f]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity filter grayscale hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#080b12]" />
          <div className="absolute bottom-10 left-10 right-10">
            <h2 className="text-3xl font-extrabold text-white glitch-effect tracking-tighter" data-text="JOIN THE NEXUS">JOIN THE NEXUS</h2>
            <p className="mt-4 text-slate-300 font-mono text-sm leading-relaxed">
              Gain Level 4 access to exclusive hardware drops, early pre-orders, and custom builder forums. 
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-[#080b12]/90 backdrop-blur-xl">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-bold font-mono text-white tracking-widest uppercase text-gradient">
              {isLogin ? 'Initialize Login' : 'Create Access Key'}
            </h3>
            <p className="mt-3 text-slate-400 font-mono text-sm">
              {isLogin ? 'Enter your credentials to proceed.' : 'Register a new account on our mainframe.'}
            </p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative group flex flex-col gap-1">
                <input 
                  type="text" 
                  placeholder="USERNAME" 
                  value={form.username}
                  onChange={e => {
                    setForm(f => ({ ...f, username: e.target.value }))
                    setErrors(er => ({ ...er, username: '' }))
                  }}
                  className="w-full bg-transparent border-b-2 border-slate-700 py-3 px-2 text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-[#2df8c5] transition-colors"
                />
                {errors.username && <span className="text-[#ff0055] text-xs font-mono">{errors.username}</span>}
              </div>
            )}
            
            <div className="relative group flex flex-col gap-1">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                value={form.email}
                onChange={e => {
                  setForm(f => ({ ...f, email: e.target.value }))
                  setErrors(er => ({ ...er, email: '' }))
                }}
                className="w-full bg-transparent border-b-2 border-slate-700 py-3 px-2 text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-[#2df8c5] transition-colors"
              />
              {errors.email && <span className="text-[#ff0055] text-xs font-mono">{errors.email}</span>}
            </div>
            
            <div className="relative group flex flex-col gap-1">
              <input 
                type="password" 
                placeholder="PASSWORD" 
                value={form.password}
                onChange={e => {
                  setForm(f => ({ ...f, password: e.target.value }))
                  setErrors(er => ({ ...er, password: '' }))
                }}
                className="w-full bg-transparent border-b-2 border-slate-700 py-3 px-2 text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-[#ff0055] transition-colors"
              />
              {errors.password && <span className="text-[#ff0055] text-xs font-mono">{errors.password}</span>}
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full cyber-btn py-4 text-sm disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Access Account' : 'Register Account')}
              </button>
              
              <button 
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full border border-slate-700 bg-transparent text-slate-300 py-4 font-bold font-mono tracking-widest hover:border-[#7d2df8] hover:text-[#7d2df8] transition-all text-sm uppercase disabled:opacity-50"
              >
                Sign In with Google
              </button>
            </div>
          </form>

          <div className="mt-10 text-center font-mono text-sm text-slate-500">
            {isLogin ? "Don't have access yet? " : "Already registered? "}
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setErrors({})
              }} 
              className="text-[#2df8c5] font-bold hover:text-[#ff0055] transition-colors uppercase border-b border-transparent hover:border-[#ff0055] ml-2"
            >
              {isLogin ? 'Register Now' : 'Login Here'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
