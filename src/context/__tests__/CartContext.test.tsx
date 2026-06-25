import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CartProvider, useCart } from "../CartContext"

function TestComponent() {
  const { cartItems, addToCart, removeFromCart, cartCount, cartTotal } =
    useCart()

  const item = {
    cartItemId: "cart-123",
    phoneId: "phone-123",
    id: "phone-123",
    name: "iPhone 17",
    brand: "Apple",
    imageUrl: "/iphone.jpg",
    color: "Black",
    storage: "256GB",
    price: 1000,
  }

  return (
    <div>
      <p>Count: {cartCount}</p>
      <p>Total: {cartTotal}</p>
      <p>Items: {cartItems.length}</p>

      <button onClick={() => addToCart(item)}>añadir</button>
      <button onClick={() => removeFromCart("cart-123")}>eliminar</button>
    </div>
  )
}

describe("cart context", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("adds and removes cart items", async () => {
    const user = userEvent.setup()

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    )

    expect(screen.getByText("Count: 0")).toBeInTheDocument()
    expect(screen.getByText("Total: 0")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "añadir" }))

    expect(screen.getByText("Count: 1")).toBeInTheDocument()
    expect(screen.getByText("Total: 1000")).toBeInTheDocument()
    expect(screen.getByText("Items: 1")).toBeInTheDocument()
    expect(localStorage.getItem("cart")).toContain("iPhone 17")

    await user.click(screen.getByRole("button", { name: "eliminar" }))

    expect(screen.getByText("Count: 0")).toBeInTheDocument()
    expect(screen.getByText("Total: 0")).toBeInTheDocument()

  })

  it("load cart from localStorage", () => {
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          cartItemId: "cart-123",
          phoneId: "phone-123",
          name: "iPhone 17",
          brand: "Apple",
          imageUrl: "/iphone.jpg",
          color: "Black",
          storage: "256GB",
          price: 1000,
        },
      ]),
    )

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    )

    expect(screen.getByText("Count: 1")).toBeInTheDocument()

    expect(screen.getByText("Total: 1000")).toBeInTheDocument()
  })

  function ComponentWithoutProvider() {
    useCart()
    return null
  }

  it("throws an error when useCart is used outside CartProvider", () => {
    expect(() => render(<ComponentWithoutProvider />)).toThrow(
      "cart must be used inside CartProvider",
    )
  })
})
