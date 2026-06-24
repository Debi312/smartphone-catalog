import type { ApiErrorResponse } from "../types/api"

export async function getApiErrorMessage(response: Response) {
  try {
    const errorData = (await response.json()) as ApiErrorResponse
      return errorData.message 
      
  } catch {
    return "Something went wrong"
  }
}
