import propTypes from 'prop-types'
import { motion } from 'framer-motion'

export default function NewArrivalBox({ title, desc, imageUrl, imageRight }) {
    return (
        <motion.div 
            whileHover={{ scale: 1.02 }}
            className={`flex w-full h-full relative group overflow-hidden ${imageRight ? 'flex-row-reverse' : 'flex-col'} items-center justify-between p-6 md:p-8 cursor-pointer`}
        >
            <div className='absolute inset-0 bg-gradient-to-t from-[#07090f] via-transparent to-transparent z-10' />
            
            <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className='w-[80%] h-auto object-contain z-0 drop-shadow-[0_0_20px_rgba(45,248,197,0.2)]' 
                src={imageUrl} 
                alt={title} 
            />

            <div className='flex flex-col gap-3 relative z-20 w-full mt-auto'>
                <h3 className='text-2xl font-mono font-bold text-white tracking-tight group-hover:text-[#2df8c5] transition-colors'>{title}</h3>
                <p className='text-sm text-slate-300 font-mono'>{desc}</p>
                <button className='text-[#2df8c5] font-bold text-sm tracking-widest uppercase border-b-2 border-transparent hover:border-[#2df8c5] self-start mt-2 transition-all group-hover:text-[#ff0055] group-hover:hover:border-[#ff0055] pb-1'>
                    Pre-Order Now
                </button>
            </div>
        </motion.div>
    )
}

NewArrivalBox.propTypes = {
    title: propTypes.string,
    desc: propTypes.string,
    imageUrl: propTypes.string,
    imageRight: propTypes.bool
}