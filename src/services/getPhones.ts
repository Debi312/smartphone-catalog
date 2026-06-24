import type { Phone } from "../types/phone"
import { API_BASE_URL, API_KEY } from "../utils/env"
import { getApiErrorMessage } from "../utils/getApiErrorMessage"

type GetPhonesParams = {
  search?: string
  limit?: number
  offset?: number
}

export async function getPhones({
  search,
  limit = 20,
  offset = 0,
}: GetPhonesParams = {}): Promise<Phone[]> {
  const params = new URLSearchParams()

  params.set("limit", limit.toString())
  params.set("offset", offset.toString())

  if (search?.trim()) {
    params.set("search", search.trim())
  }

  const response = await fetch(
    `${API_BASE_URL}/products?${params.toString()}`,
    {
      headers: {
        "x-api-key": API_KEY,
      },
    },
  )

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return response.json()
}
