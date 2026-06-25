import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { HomePage } from "../HomePage"
import { getPhones } from "../../services/getPhones"

jest.mock("../../services/getPhones")

const mockedGetPhones = getPhones as jest.Mock

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders phones returned by the API", async () => {
    mockedGetPhones.mockResolvedValue([
      {
        id: "phone-123",
        name: "iPhone 17",
        brand: "Apple",
        basePrice: 1000,
        imageUrl: "/iphone.jpg",
        },
      
      {
        id: "phone-456",
        name: "Galaxy S24",
        brand: "Samsung",
        basePrice: 900,
        imageUrl: "/samsung.jpg",
      },
    ])

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    expect(await screen.findByText("iPhone 17")).toBeInTheDocument()
    expect(await screen.findByText("Galaxy S24")).toBeInTheDocument()

    expect(screen.getByText("Apple")).toBeInTheDocument()
    expect(screen.getByText("Samsung")).toBeInTheDocument()
    expect(screen.getByText("2 results")).toBeInTheDocument()
  })

})
