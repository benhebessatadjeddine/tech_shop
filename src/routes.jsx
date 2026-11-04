import React, { lazy, Suspense } from "react"
import { useLocation, useRoutes } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import propTypes from "prop-types"
import Home from "./pages/Home"

// Code-splitting routes for optimal performance and Lighthouse scores
const About = lazy(() => import("./pages/About"))
const Contact = lazy(() => import("./pages/Contact"))
const SignUp = lazy(() => import("./pages/SignUp"))
const Products = lazy(() => import("./pages/Products"))
const ProductDetail = lazy(() => import("./pages/ProductDetail"))
const Wishlist = lazy(() => import("./pages/Wishlist"))
const Checkout = lazy(() => import("./pages/Checkout"))
const Page404 = lazy(() => import("./pages/Page404"))

// Cyberpunk loading fallback for split chunks
const PageFallback = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
    <div className="w-8 h-8 border-2 border-[#2df8c5]/20 border-t-[#2df8c5] rounded-full animate-spin" />
    <span className="font-mono text-xs uppercase tracking-widest text-slate-500">Decrypting Node...</span>
  </div>
)

// Smooth page transition config
const pageVariants = {
  initial: { opacity: 0, y: 15, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -15, filter: "blur(8px)", transition: { duration: 0.25, ease: "easeIn" } }
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    className="w-full h-full"
  >
    <Suspense fallback={<PageFallback />}>
      {children}
    </Suspense>
  </motion.div>
)

PageWrapper.propTypes = {
  children: propTypes.node.isRequired
}

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
