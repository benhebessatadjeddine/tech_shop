import propTypes from 'prop-types'
import { motion } from 'framer-motion'
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

export default function ManagerBox({ imageUrl, name, jobPosition }) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className='flex flex-col gap-4 group'
        >
            <div className='w-full h-[25rem] bg-[#0f1423] p-4 flex justify-center items-end rounded-none overflow-hidden glass border border-[#2df8c5]/30 relative'>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2df8c5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className='w-full h-full object-cover relative z-10 filter grayscale group-hover:grayscale-0 transition-all duration-500' 
                    src={imageUrl} 
                    alt={name} 
                />
            </div>
            <div>
                <h2 className='font-bold text-2xl font-mono text-white tracking-tight group-hover:text-[#2df8c5] transition-colors'>{name}</h2>
                <h6 className='mt-1 mb-3 text-slate-400 font-mono text-sm tracking-widest uppercase'>{jobPosition}</h6>
                <div className='flex items-center gap-4 text-slate-500'>
                    <motion.a whileHover={{ y: -3, color: '#2df8c5' }} className="cursor-pointer transition-colors" ><FaTwitter size={20} /></motion.a>
                    <motion.a whileHover={{ y: -3, color: '#ff0055' }} className="cursor-pointer transition-colors" ><FaInstagram size={20} /></motion.a>
                    <motion.a whileHover={{ y: -3, color: '#7d2df8' }} className="cursor-pointer transition-colors" ><FaLinkedinIn size={20} /></motion.a>
                </div>
            </div>
        </motion.div>
    )
}

ManagerBox.propTypes = {
    imageUrl: propTypes.string,
    name: propTypes.string,
    jobPosition: propTypes.string
}
