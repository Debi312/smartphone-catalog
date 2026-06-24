import type { PhoneDetail } from "../types/phoneDetails"
import { API_BASE_URL, API_KEY } from "../utils/env"

export async function getPhoneDetails(id: string): Promise<PhoneDetail> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error("Error fetching phone details")
  }

  return response.json()
}
