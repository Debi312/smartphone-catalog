import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SearchBar } from "../SearchBar"

describe("SearchBar", () => {
  it("renders value and results count", () => {
    render(
      <SearchBar
        value="iphone"
        resultsCount={5}
        onChange={() => {}}
      />
    )

    expect(screen.getByDisplayValue("iphone")).toBeInTheDocument()
    expect(screen.getByText("5 results")).toBeInTheDocument()
  })

  it("calls onChange when user types", async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()

    render(
      <SearchBar
        value=""
        resultsCount={0}
        onChange={onChange}
      />
    )

    const input = screen.getByRole("searchbox")

    await user.type(input, "iphone")

    expect(onChange).toHaveBeenCalledTimes(6)

  })
})
