import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { getTranslation } from '../data/translations'
import { formatPrice } from '../data/products'

const StoreContext = createContext(null)

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback }
  catch { return fallback }
}

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD': {
      const exists = state.cart.find(i => i.id === action.product.id)
      const cart = exists
        ? state.cart.map(i => i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state.cart, { ...action.product, qty: 1 }]
      return { ...state, cart }
    }
    case 'CART_REMOVE':
      return { ...state, cart: state.cart.filter(i => i.id !== action.id) }
    case 'CART_QTY': {
      const cart = state.cart.map(i =>
        i.id === action.id ? { ...i, qty: Math.max(1, i.qty + action.delta) } : i
      )
      return { ...state, cart }
    }
    case 'CART_CLEAR':
      return { ...state, cart: [] }

    case 'WISH_TOGGLE': {
      const inList = state.wishlist.some(i => i.id === action.product.id)
      const wishlist = inList
        ? state.wishlist.filter(i => i.id !== action.product.id)
        : [...state.wishlist, action.product]
      return { ...state, wishlist }
    }
    case 'WISH_CLEAR':
      return { ...state, wishlist: [] }

    case 'CART_OPEN':  return { ...state, cartOpen: true }
    case 'CART_CLOSE': return { ...state, cartOpen: false }

    case 'USER_SET':
      return { ...state, user: action.user }
    case 'USER_LOGOUT':
      return { ...state, user: null }

    case 'LANG_SET':
      return { ...state, lang: action.lang }

    case 'TOAST':
      return { ...state, toast: action.msg }
    case 'TOAST_CLEAR':
      return { ...state, toast: null }

    default: return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    cart: load('nexus_cart', []),
    wishlist: load('nexus_wish', []),
    user: load('nexus_user', null),
    lang: load('nexus_lang', 'it'), // Default to Italian per user request
    cartOpen: false,
    toast: null,
  })

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('nexus_cart', JSON.stringify(state.cart)) }, [state.cart])
  useEffect(() => { localStorage.setItem('nexus_wish', JSON.stringify(state.wishlist)) }, [state.wishlist])
  useEffect(() => { localStorage.setItem('nexus_lang', JSON.stringify(state.lang)) }, [state.lang])
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('nexus_user', JSON.stringify(state.user))
    } else {
      localStorage.removeItem('nexus_user')
    }
  }, [state.user])

  // Auto-dismiss toast
  useEffect(() => {
    if (!state.toast) return
    const t = setTimeout(() => dispatch({ type: 'TOAST_CLEAR' }), 2800)
    return () => clearTimeout(t)
  }, [state.toast])

  const setLang = (lang) => {
    dispatch({ type: 'LANG_SET', lang })
    dispatch({ type: 'TOAST', msg: lang === 'it' ? 'Lingua impostata su Italiano' : 'Language set to English' })
  }

  const t = useCallback((path, fallback) => {
    return getTranslation(state.lang, path, fallback)
  }, [state.lang])

  const addToCart = (product) => {
    dispatch({ type: 'CART_ADD', product })
    dispatch({ type: 'CART_OPEN' })
    dispatch({ type: 'TOAST', msg: `${product.title} ${state.lang === 'it' ? 'aggiunto al carrello' : 'added to cart'}` })
  }

  const removeFromCart = (id) => dispatch({ type: 'CART_REMOVE', id })
  const changeQty = (id, delta) => dispatch({ type: 'CART_QTY', id, delta })
  const clearCart = () => dispatch({ type: 'CART_CLEAR' })
  const openCart = () => dispatch({ type: 'CART_OPEN' })
  const closeCart = () => dispatch({ type: 'CART_CLOSE' })
  const toggleWishlist = (product) => dispatch({ type: 'WISH_TOGGLE', product })
  const clearWishlist = () => {
    dispatch({ type: 'WISH_CLEAR' })
    dispatch({ type: 'TOAST', msg: state.lang === 'it' ? 'Lista desideri svuotata' : 'Wishlist cleared' })
  }
  const isWished = (id) => state.wishlist.some(i => i.id === id)

  const login = (userData) => {
    dispatch({ type: 'USER_SET', user: userData })
    dispatch({ type: 'TOAST', msg: state.lang === 'it' ? `Accesso consentito: Benvenuto, ${userData.name || 'OPERATORE'}` : `Access Granted: Welcome, ${userData.name || 'OPERATOR'}` })
  }

  const logout = () => {
    dispatch({ type: 'USER_LOGOUT' })
    dispatch({ type: 'TOAST', msg: state.lang === 'it' ? 'Sessione terminata' : 'Session terminated' })
  }

  const triggerToast = (msg) => dispatch({ type: 'TOAST', msg })

  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <StoreContext.Provider value={{
      cart: state.cart, wishlist: state.wishlist, user: state.user,
      lang: state.lang, setLang, t, formatPrice,
      cartOpen: state.cartOpen, toast: state.toast,
      cartCount, cartTotal,
      addToCart, removeFromCart, changeQty, clearCart,
      openCart, closeCart,
      toggleWishlist, clearWishlist, isWished,
      login, logout, triggerToast,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

StoreProvider.propTypes = { children: propTypes.node }

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(StoreContext)
