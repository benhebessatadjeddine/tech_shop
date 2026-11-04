import propTypes from 'prop-types'
import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/signUp', label: 'Sign Up' },
]

const itemVariants = {
  open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
}

const NavLinks = memo(({ className, toggleMenu }) => {
  const { pathname } = useLocation()

  return (
    <nav>
      <ul className={className}>
        {LINKS.map(({ to, label }) => {
          const active = pathname === to
          return (
            <motion.li 
              variants={itemVariants}
              key={to} 
              onClick={() => toggleMenu?.()}
            >
              <Link
                to={to}
                className={`relative pb-0.5 transition-all duration-200 ${
                  active
                    ? 'text-[#ff0055] drop-shadow-[0_0_8px_rgba(255,0,85,0.7)]'
                    : 'hover:text-[#ff0055] hover:drop-shadow-[0_0_6px_rgba(255,0,85,0.6)]'
                }`}
              >
                {label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#ff0055] shadow-[0_0_6px_rgba(255,0,85,0.8)]" />
                )}
              </Link>
            </motion.li>
          )
        })}
      </ul>
    </nav>
  )
})

NavLinks.displayName = 'NavLinks'
NavLinks.propTypes = { className: propTypes.string, toggleMenu: propTypes.func }

export default NavLinks