import { getPhones } from "../getPhones"

describe("getPhones", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("fetches phones with default params", async () => {
    const phones = [
      {
        id: "phone-123",
        name: "iPhone 17",
        brand: "Apple",
        basePrice: 1000,
        imageUrl: "/iphone.jpg",
      },
    ]

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(phones),
    })

    const result = await getPhones()

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/products?limit=20&offset=0"),
      expect.objectContaining({
        headers: expect.objectContaining({
          "x-api-key": expect.any(String),
        }),
      }),
    )

    expect(result).toEqual(phones)
  })

  it("adds search param when search is provided", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    })

    await getPhones({ search: " iphone " })
    await getPhones({ search: "sam" })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("search=iphone"),
      expect.any(Object),
    )
    
  })

  it("throws an error when request fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({
        error: "NOT-FOUND",
        message: "Unable to load phones",
      }),
    })

    await expect(getPhones()).rejects.toThrow("Unable to load phones")
  })
})
