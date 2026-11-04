import { motion } from "framer-motion"
import { useState } from "react"
import { Link } from "react-router-dom"
import SiteBtn from "../components/SiteBtn"

export default function SignUp() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="min-h-[80vh] flex items-center justify-center relative z-10 py-20"
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
            <h3 className="text-3xl font-bold font-mono text-white tracking-widest uppercase text-gradient">{isLogin ? 'Initialize Login' : 'Create Access Key'}</h3>
            <p className="mt-3 text-slate-400 font-mono text-sm">{isLogin ? 'Enter your credentials to proceed.' : 'Register a new account on our mainframe.'}</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="USERNAME" 
                  className="w-full bg-transparent border-b-2 border-slate-700 py-3 px-2 text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-[#2df8c5] transition-colors"
                />
              </div>
            )}
            
            <div className="relative group">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b-2 border-slate-700 py-3 px-2 text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-[#2df8c5] transition-colors"
              />
            </div>
            
            <div className="relative group">
              <input 
                type="password" 
                placeholder="PASSWORD" 
                className="w-full bg-transparent border-b-2 border-slate-700 py-3 px-2 text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-[#ff0055] transition-colors"
              />
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <button className="w-full cyber-btn py-4 text-sm">
                {isLogin ? 'Access Account' : 'Register Account'}
              </button>
              
              <button 
                type="button"
                className="w-full border border-slate-700 bg-transparent text-slate-300 py-4 font-bold font-mono tracking-widest hover:border-[#7d2df8] hover:text-[#7d2df8] transition-all text-sm uppercase"
              >
                Sign In with Google
              </button>
            </div>
          </form>

          <div className="mt-10 text-center font-mono text-sm text-slate-500">
            {isLogin ? "Don't have access yet? " : "Already registered? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
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
