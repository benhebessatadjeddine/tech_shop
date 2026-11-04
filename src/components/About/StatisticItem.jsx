import propTypes from 'prop-types'
import { motion } from 'framer-motion'

export default function StatisticItem({ Icon, number, desc }) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className='group flex flex-col justify-center items-center text-center p-6 border border-[#2df8c5]/20 rounded-none glass hover:bg-[#2df8c5] transition-colors duration-300 w-full h-full min-h-56 shadow-[0_0_15px_rgba(45,248,197,0.1)]'
        >
            <div className='relative mb-4'>
                <div className='absolute inset-0 bg-[#07090f] rounded-full blur-sm group-hover:bg-white/20 transition-colors duration-300' />
                <Icon className='relative bg-[#07090f] text-[#2df8c5] rounded-full p-3 shadow-lg ring-2 ring-[#2df8c5]/50 group-hover:bg-white group-hover:text-black group-hover:ring-white transition-all duration-300' size={64} />
            </div>
            <h5 className='font-bold font-mono text-3xl text-white group-hover:text-black tracking-tighter mt-2'>{number}</h5>
            <p className='mt-2 text-slate-400 font-mono text-sm group-hover:text-slate-800 uppercase tracking-widest'>{desc}</p>
        </motion.div>
    )
}

StatisticItem.propTypes = {
    Icon: propTypes.func,
    number: propTypes.number,
    desc: propTypes.string
}