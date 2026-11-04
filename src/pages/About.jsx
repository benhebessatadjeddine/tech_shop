import StatisticItem from "../components/About/StatisticItem"
import { CiShop } from "react-icons/ci";
import { PiCurrencyCircleDollarLight } from "react-icons/pi";
import { IoGiftSharp } from "react-icons/io5";
import { FaSackDollar } from "react-icons/fa6";
import ManagerBox from "../components/About/ManagerBox";
import OurServices from '../components/OurServices/OurServices'
import { motion } from "framer-motion"

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="relative z-10"
    >
      <div className="absolute top-[20%] left-0 w-64 h-64 bg-[#7d2df8]/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-[60%] right-0 w-64 h-64 bg-[#2df8c5]/10 blur-[120px] rounded-full -z-10" />

      {/* our story section */}
      <div className="grid grid-cols-2 gap-10 mt-10">
        <div className="flex flex-col justify-center col-span-2 sm:col-span-1 order-1">
          <div className="flex items-center gap-4 mb-4">
              <span className="w-3 h-8 rounded-sm bg-[#ff0055] shadow-[0_0_15px_rgba(255,0,85,0.6)] block"></span>
              <span className="text-[#ff0055] font-mono tracking-widest font-bold uppercase">Our Protocol</span>
          </div>
          <h1 className="font-extrabold text-4xl tracking-tighter text-white glitch-effect" data-text="THE NEXUS STORY">THE NEXUS STORY</h1>
          <p className="mt-5 text-slate-300 font-mono">Launched in 2026, NexusRig is the premier destination for elite PC hardware and custom cooling loops. Born from a passion for extreme overclocking and cyberpunk aesthetics, we have scaled to become the most trusted hardware vendor in the digital underground.</p>
          <p className="mt-5 text-slate-300 font-mono">With over 5,000 custom builds shipped globally, we provide hardware enthusiasts with unrestricted access to the most powerful components on the market. From AI-accelerated GPUs to custom mechanical switches, NexusRig equips you for the future.</p>
        </div>
        <div className="col-span-2 sm:col-span-1 sm:order-3 relative group">
          <div className="absolute inset-0 bg-[#2df8c5]/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <img className="w-full h-full object-cover rounded-none glass border border-[#2df8c5]/30 relative z-10 filter grayscale group-hover:grayscale-0 transition-all duration-700" src="https://images.unsplash.com/photo-1587202372744-0de96bab0b1e?q=80&w=800&auto=format&fit=crop" alt="NexusRig Facility" />
        </div>
      </div>


      {/* statistics */}
      <div className="grid grid-cols-12 mt-32 gap-5 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2df8c5]/5 to-transparent border-y border-[#2df8c5]/20 -mx-4 px-4 py-10 -z-10" />
        <div className="col-span-6 md:col-span-4 lg:col-span-3 hover-lift" ><StatisticItem number={5} desc={'Active Master Builders'} Icon={CiShop} /></div>
        <div className="col-span-6 md:col-span-4 lg:col-span-3 hover-lift" ><StatisticItem number={300} desc={'Monthly Custom Rigs'} Icon={PiCurrencyCircleDollarLight} /></div>
        <div className="col-span-6 md:col-span-4 lg:col-span-3 hover-lift" ><StatisticItem number={45.5} desc={'K Active Users'} Icon={IoGiftSharp} /></div>
        <div className="col-span-6 md:col-span-4 lg:col-span-3 hover-lift" ><StatisticItem number={12} desc={'M Annual Revenue'} Icon={FaSackDollar} /></div>
      </div>




      {/* services */}
      <div className="mb-20 mt-32 pt-10 border-t border-[#ff0055]/20 bg-gradient-to-t from-[#ff0055]/5 to-transparent">
        <OurServices />
      </div>

    </motion.div>
  )
}
