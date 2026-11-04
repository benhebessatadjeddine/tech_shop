import { memo, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { HiOutlineComputerDesktop } from "react-icons/hi2"
import { BsMotherboard } from "react-icons/bs"
import { CiMonitor } from "react-icons/ci"
import { BsMouse } from "react-icons/bs"
import { CiHeadphones } from "react-icons/ci"
import { LuGamepad } from "react-icons/lu"
import { FaAngleRight } from "react-icons/fa6"

const MENU = [
  {
    id: 1, name: 'PCs', cat: 'prebuilts',
    Icon: HiOutlineComputerDesktop,
    subs: ['Entry Level', 'Enthusiast Rigs', 'Custom Watercooled', 'Mini ITX'],
  },
  {
    id: 2, name: 'Keyboards', cat: 'keyboards',
    Icon: BsMotherboard,
    subs: ['Mechanical', 'Optical', 'Barebones', 'Custom Keycaps', 'Switches'],
  },
  {
    id: 3, name: 'Mouses', cat: 'mouses',
    Icon: BsMouse,
    subs: ['Wireless', 'Wired', 'Ultra-lightweight', 'MMO/MOBA', 'Mousepads'],
  },
  {
    id: 4, name: 'Headsets', cat: 'headsets',
    Icon: CiHeadphones,
    subs: ['Wireless Headsets', 'Wired Headsets', 'In-Ear Monitors', 'Studio Microphones'],
  },
  {
    id: 5, name: 'Monitors', cat: 'monitors',
    Icon: CiMonitor,
    subs: ['1080p 240Hz+', '1440p 165Hz', '4K 144Hz', 'Ultrawide', 'OLED Gaming'],
  },
  {
    id: 6, name: 'Components', cat: 'components',
    Icon: LuGamepad,
    subs: ['Graphics Cards (GPU)', 'Processors (CPU)', 'Motherboards', 'RAM / Memory'],
  },
]

export default memo(function HomeMenu() {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <nav className="relative h-full z-50">
      <div className="flex flex-col h-full bg-[#050508]/60 backdrop-blur-md border border-[#2df8c5]/20 rounded-xl shadow-[0_0_30px_rgba(45,248,197,0.05)] overflow-hidden relative">
        
        {/* Glow effect inside menu */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#2df8c5]/10 blur-[50px] pointer-events-none" />

        <ul className="flex flex-col flex-1 py-3 relative z-10" onMouseLeave={() => setHoveredId(null)}>
          {MENU.map((item) => (
            <li
              key={item.id}
              className="relative group/item px-3 py-1"
              onMouseEnter={() => setHoveredId(item.id)}
            >
              {hoveredId === item.id && (
                <motion.div
                  layoutId="menu-hover-bg"
                  className="absolute inset-0 mx-3 rounded-lg bg-gradient-to-r from-[#2df8c5]/20 to-[#2df8c5]/5 border border-[#2df8c5]/30 shadow-[0_0_15px_rgba(45,248,197,0.1)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <Link
                to={`/products?category=${item.cat}`}
                className="relative flex items-center justify-between px-4 py-3 rounded-lg z-10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.Icon
                    size={18}
                    className={`transition-colors duration-300 ${
                      hoveredId === item.id ? "text-[#2df8c5]" : "text-slate-500"
                    }`}
                  />
                  <span
                    className={`font-mono text-sm transition-colors duration-300 ${
                      hoveredId === item.id ? "text-white" : "text-slate-400"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                <FaAngleRight
                  size={12}
                  className={`transition-all duration-300 ${
                    hoveredId === item.id
                      ? "text-[#2df8c5] translate-x-1"
                      : "text-slate-600"
                  }`}
                />
              </Link>

              {/* Flyout submenu */}
              <AnimatePresence>
                {hoveredId === item.id && item.subs?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-full top-0 ml-4 w-64 z-50 rounded-xl bg-[#080b12]/95 backdrop-blur-xl border border-[#2df8c5]/30 shadow-[0_0_40px_rgba(45,248,197,0.15)] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2df8c5]/5 to-transparent pointer-events-none" />
                    <div className="p-3 relative z-10">
                      {item.subs.map((sub, i) => (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          key={i}
                        >
                          <Link
                            to={`/products?category=${item.cat}`}
                            className="group/sub flex items-center px-4 py-2.5 rounded-lg text-sm font-mono text-slate-400 hover:text-[#2df8c5] hover:bg-[#2df8c5]/10 transition-all duration-200"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2df8c5]/40 mr-3 group-hover/sub:bg-[#2df8c5] group-hover/sub:shadow-[0_0_8px_rgba(45,248,197,0.8)] transition-all" />
                            {sub}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
})