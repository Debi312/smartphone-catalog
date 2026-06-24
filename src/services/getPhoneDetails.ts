import type { PhoneDetail } from "../types/phoneDetails"
import { API_BASE_URL, API_KEY } from "../utils/env"
import { getApiErrorMessage } from "../utils/getApiErrorMessage"

export async function getPhoneDetails(id: string): Promise<PhoneDetail> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response))
  }

  return response.json()
}
