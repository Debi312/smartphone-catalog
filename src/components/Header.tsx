import { Link } from "react-router-dom"
import logo from "../assets/logo.svg"
import emptyCart from "../assets/empty-cart.svg"
import filledCart from "../assets/filled-cart.svg"
import { useCart } from "../context/CartContext"
import { useLocation } from "react-router-dom"

export function Header() {
  const { cartCount } = useCart()

  const cartIcon = cartCount > 0 ? filledCart : emptyCart

  const location = useLocation()

  const isCartPage = location.pathname === "/cart"

  return (
    <header className="flex items-center justify-between px-6 py-5">
      <Link to="/">
        <img src={logo} alt="Home page" className="h-8" />
      </Link>

      {!isCartPage && (
        <Link to="/cart" className="flex items-center gap-2 text-sm">
          <img src={cartIcon} alt="Cart icon" className="h-6 w-6" />
          <span>{cartCount}</span>
        </Link>
      )}
    </header>
  )
}
