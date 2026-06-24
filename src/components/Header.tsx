import { Link } from "react-router-dom"
import logo from "../assets/logo.svg"
import emptyCart from "../assets/empty-cart.svg"
import filledCart from "../assets/filled-cart.svg"

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5">
      <Link to="/">
        <img src={logo} alt="Home page" className="h-8" />
      </Link>

      <Link to="/cart" className="text-sm">
        <img src={emptyCart} alt="Cart" className="h-6 w-6 inline-block mr-2" />
        Cart (0)
      </Link>
    </header>
  )
}
