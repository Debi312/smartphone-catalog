import { createContext, useContext, useEffect, useState } from "react"
import type { CartItem } from "../types/cart"

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (cartItemId: string) => void
  cartCount: number
  cartTotal: number
}

const CartContext = createContext<CartContextType | null>(null)

const CART = "cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem(CART)

    if (!storedCart) return []

    return JSON.parse(storedCart)
  })

  useEffect(() => {
    localStorage.setItem(CART, JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(item: CartItem) {
    setCartItems((currentItems) => [...currentItems, item])
  }

  function removeFromCart(cartItemId: string ) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.cartItemId !== cartItemId),
    )
  }

  const cartCount = cartItems.length

  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0)

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, cartCount, cartTotal }}
    >
      {children}
      
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("cart must be used inside CartProvider")
  }
  return context
}
