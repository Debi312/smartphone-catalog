import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { CartPage } from "../CartPage"
import { useCart } from "../../context/CartContext"

jest.mock("../../context/CartContext", () => ({
  useCart: jest.fn(),
}))

const mockedUseCart = useCart as jest.Mock

describe("CartPage", () => {
  it("renders empty cart state", () => {
    mockedUseCart.mockReturnValue({
      cartItems: [],
      removeFromCart: jest.fn(),
      cartTotal: 0,
    })

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    )

    expect(screen.getByText("Cart (0)")).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "Continue shopping" }),
    ).toHaveAttribute("href", "/")
  })

  it("renders cart items and removes an item", async () => {
    const user = userEvent.setup()
    const removeFromCart = jest.fn()

    mockedUseCart.mockReturnValue({
      cartItems: [
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
      ],
      removeFromCart,
      cartTotal: 1000,
    })

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    )

    expect(screen.getByText("Cart (1)")).toBeInTheDocument()
    expect(screen.getByText("iPhone 17")).toBeInTheDocument()
    expect(screen.getByText(/256GB/)).toBeInTheDocument()
    expect(screen.getByText(/Black/)).toBeInTheDocument()
    expect(screen.getAllByText("1000 EUR")[0]).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Eliminar" }))

    expect(removeFromCart).toHaveBeenCalledWith("cart-123")
  })
})
