import propTypes from 'prop-types'
import { motion } from 'framer-motion'

export default function OurServicesItem({ Icon, title, desc }) {
    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className='flex flex-col justify-center items-center text-center p-6 rounded-none glass border border-[#2df8c5]/20 hover:shadow-[0_0_20px_rgba(45,248,197,0.3)] transition-shadow duration-300 w-full sm:w-auto max-w-sm'
        >
            <div className='relative mb-8'>
                <div className='absolute inset-0 bg-[#2df8c5] rounded-full blur-xl opacity-40' />
                <Icon className='relative bg-[#07090f] text-[#2df8c5] rounded-full p-3 shadow-lg ring-2 ring-[#2df8c5]/50' size={64} />
            </div>
            <h5 className='font-bold font-mono text-lg text-white tracking-widest uppercase'>{title}</h5>
            <p className='mt-2 text-slate-400 font-mono text-sm'>{desc}</p>
        </motion.div>
    )
}

OurServicesItem.propTypes = {
    Icon: propTypes.func,
    title: propTypes.string,
    desc: propTypes.string
}
