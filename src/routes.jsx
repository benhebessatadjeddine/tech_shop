import React from "react"
import { useLocation, useRoutes } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Home from "./pages/Home"
import Page404 from "./pages/Page404"
import About from "./pages/About"
import Contact from "./pages/Contact"
import SignUp from "./pages/SignUp"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Wishlist from "./pages/Wishlist"
import Checkout from "./pages/Checkout"

// Smooth page transition config
const pageVariants = {
  initial: { opacity: 0, y: 15, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -15, filter: "blur(8px)", transition: { duration: 0.3, ease: "easeIn" } }
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    className="w-full h-full"
  >
    {children}
  </motion.div>
)

export default function Routes() {
    const location = useLocation()
    const routes = useRoutes([
        { path: '/', element: <PageWrapper><Home /></PageWrapper> },
        { path: '/about', element: <PageWrapper><About /></PageWrapper> },
        { path: '/contact', element: <PageWrapper><Contact /></PageWrapper> },
        { path: '/signUp', element: <PageWrapper><SignUp /></PageWrapper> },
        { path: '/register', element: <PageWrapper><SignUp /></PageWrapper> },
        { path: '/login', element: <PageWrapper><SignUp /></PageWrapper> },
        { path: '/products', element: <PageWrapper><Products /></PageWrapper> },
        { path: '/product/:id', element: <PageWrapper><ProductDetail /></PageWrapper> },
        { path: '/wishlist', element: <PageWrapper><Wishlist /></PageWrapper> },
        { path: '/checkout', element: <PageWrapper><Checkout /></PageWrapper> },
        { path: '*', element: <PageWrapper><Page404 /></PageWrapper> }
    ])
    
    return (
      <AnimatePresence mode="wait">
        {routes && React.cloneElement(routes, { key: location.pathname })}
      </AnimatePresence>
    )
}