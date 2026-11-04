import { createContext, useContext, useReducer, useEffect } from 'react'
import propTypes from 'prop-types'

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

    case 'CART_OPEN':  return { ...state, cartOpen: true }
    case 'CART_CLOSE': return { ...state, cartOpen: false }

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
    cartOpen: false,
    toast: null,
  })

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('nexus_cart', JSON.stringify(state.cart)) }, [state.cart])
  useEffect(() => { localStorage.setItem('nexus_wish', JSON.stringify(state.wishlist)) }, [state.wishlist])

  // Auto-dismiss toast
  useEffect(() => {
    if (!state.toast) return
    const t = setTimeout(() => dispatch({ type: 'TOAST_CLEAR' }), 2800)
    return () => clearTimeout(t)
  }, [state.toast])

  const addToCart = (product) => {
    dispatch({ type: 'CART_ADD', product })
    dispatch({ type: 'CART_OPEN' })
    dispatch({ type: 'TOAST', msg: `${product.title} added to cart` })
  }

  const removeFromCart = (id) => dispatch({ type: 'CART_REMOVE', id })
  const changeQty = (id, delta) => dispatch({ type: 'CART_QTY', id, delta })
  const clearCart = () => dispatch({ type: 'CART_CLEAR' })
  const openCart = () => dispatch({ type: 'CART_OPEN' })
  const closeCart = () => dispatch({ type: 'CART_CLOSE' })
  const toggleWishlist = (product) => dispatch({ type: 'WISH_TOGGLE', product })
  const isWished = (id) => state.wishlist.some(i => i.id === id)

  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <StoreContext.Provider value={{
      cart: state.cart, wishlist: state.wishlist,
      cartOpen: state.cartOpen, toast: state.toast,
      cartCount, cartTotal,
      addToCart, removeFromCart, changeQty, clearCart,
      openCart, closeCart,
      toggleWishlist, isWished,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

StoreProvider.propTypes = { children: propTypes.node }

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(StoreContext)
