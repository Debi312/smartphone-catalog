import { getPhoneDetails } from "../getPhoneDetails"

describe("getPhoneDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("fetches phone details", async () => {
    const phone = {
      id: "phone-123",
      name: "iphone 17",
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(phone),
    })

    const result = await getPhoneDetails("phone-123")

    expect(fetch).toHaveBeenCalled()
    expect(result).toEqual(phone)
  })

  it("throws an error when request fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({
        error: "NOT-FOUND",
        message: "Product not found",
      }),
    })

    await expect(getPhoneDetails("phone-123")).rejects.toThrow(
      "Product not found",
    )
  })
})