import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { secureImageUrl } from "../utils/getSecureImageUrl"

export function CartPage() {
  const { cartItems, removeFromCart, cartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <main className="flex flex-col justify-between min-h-[calc(100vh-120px)]  px-6 py-8">
        <h1 className="mb-8 text-lg uppercase">{"Cart (0)"}</h1>

        <Link
          to="/"
          className=" border block w-full border-black px-8 py-4 text-center text-sm uppercase text-black md:w-64"
        >
          Continue shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="flex min-h-[calc(100vh-120px)] flex-col lg:px-6 py-8">
      <h1 className="mb-8 text-lg uppercase">Cart ({cartItems.length})</h1>

      <section className="flex flex-col gap-8">
        {cartItems.map((item) => (
          <article
            key={item.cartItemId}
            className="grid  pb-8 justify-evenly md:grid-cols-[324px_1fr_auto] grid-cols-[200px_1fr_auto]"
          >
            <img
              src={secureImageUrl(item.imageUrl)}
              alt={`${item.brand} ${item.name}`}
              className="w-full object-contain"
            />
            <div className="flex flex-col justify-between items-start text-left md:py-12 py-6">
              <div>
                <h2 className="text-lg uppercase">{item.name}</h2>
                <p className="text-sm uppercase ">
                  {item.storage}| {item.color}{" "}
                </p>
                <p className="mt-4 text-sm">{item.price} EUR</p>
              </div>

              <button
                type="button"
                onClick={() => removeFromCart(item.cartItemId)}
                className="text-sm font-light text-delete"
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-auto flex flex-col gap-8  pt-8">
        <p className="flex justify-between text-lg uppercase md:hidden">
          <span>Total</span>
          <span>{cartTotal} EUR</span>
        </p>

        <div className="flex gap-4 justify-between md:grid md:grid-cols-3 md:items-center">
          <Link
            to="/"
            className="flex-1 border border-black px-2 py-4 text-center text-sm uppercase text-black  md:flex-none md:justify-self-start md:w-66"
          >
            Continue shopping
          </Link>

          <p className="hidden text-lg uppercase md:flex md:gap-8 md:justify-self-center justify-center ">
            <span>Total</span>
            <span>{cartTotal} EUR</span>
          </p>

          <button
            type="button"
            className="flex-1 bg-black px-2 py-4 text-sm uppercase text-white  md:flex-none  md:justify-self-end md:w-66"
            
          >
            Pay
          </button>
        </div>
      </section>
    </main>
  )
}
