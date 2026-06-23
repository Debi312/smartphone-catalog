import type { Phone } from "../types/phone";
import { API_BASE_URL, API_KEY } from "../utils/env"

export async function getPhones(): Promise<Phone[]> {
    const response = await fetch(`${API_BASE_URL}/products`, {
        headers: {
            "x-api-key": API_KEY,
        },
    })

    if (!response.ok) {
        throw new Error("Error fetching phones");
    }

    return response.json()
}