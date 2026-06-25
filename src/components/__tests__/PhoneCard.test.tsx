import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { PhoneCard } from "../PhoneCard"

describe("PhoneCard", () => {
  it("renders phone information", () => {
    const phone = {
      id: "123",
      name: "iPhone 17",
      brand: "Apple",
      basePrice: 1000,
      imageUrl: "/iphone.jpg",
    }

    render(
      <MemoryRouter>
        <PhoneCard phone={phone} />
      </MemoryRouter>,
    )

    expect(screen.getByText("Apple")).toBeInTheDocument()
    expect(screen.getByText("iPhone 17")).toBeInTheDocument()
    expect(screen.getByText("1000 EUR")).toBeInTheDocument()

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/123")

    const image = screen.getByRole("img")
    expect(image).toHaveAttribute("src", "/iphone.jpg")
    expect(image).toHaveAttribute("alt", "Apple iPhone 17")
  })
})
