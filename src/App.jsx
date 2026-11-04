import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Routes from './routes'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Toast from './components/Toast'
import { StoreProvider } from './context/StoreContext'
import BootScreen from './components/BootScreen'
import CursorTrail from './components/CursorTrail'

// Only show boot once per tab session
const hasBooted = sessionStorage.getItem('nexus_booted')

function App() {
  const [booted, setBooted] = useState(!!hasBooted)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  const handleBootComplete = () => {
    sessionStorage.setItem('nexus_booted', '1')
    setBooted(true)
  }

  return (
    <StoreProvider>
      {/* Cursor trail — always active */}
      <CursorTrail />

      {/* Boot screen — once per session */}
      {!booted && <BootScreen onComplete={handleBootComplete} />}

      {/* Global Animated Noise Overlay */}
      <div className="noise-overlay" />

      <div
        className="min-h-screen flex flex-col relative overflow-x-hidden"
        style={{ opacity: booted ? 1 : 0, transition: 'opacity 0.5s ease 0.2s' }}
      >
        <Header />
        <CartDrawer />
        <Toast />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-12 z-10">
          <Routes />
        </main>
        <Footer />
      </div>
    </StoreProvider>
  )
}

export default App
