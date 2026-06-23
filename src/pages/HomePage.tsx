import { useEffect, useState } from "react";
import { getPhones } from "../services/getPhones";
import type { Phone } from "../types/phone";
import { PhoneCard } from "../components/PhoneCard";

export function HomePage() {
    const [phones, setPhones] = useState<Phone[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getPhones()
            .then((data) => {
                setPhones(data)
            })
            .catch(() => {
                setError("Unable to load phones. Please try again later.")
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])

    if (isLoading) return <p className="p-6">Loading...</p>
    if (error) return <p className="p-6">{error}</p>

    return (
        <main className="px-6 py-8">
            <input
                type="text"
                placeholder="Search for a smartphone..."
                className="mb-4 w-full py-2"
            />
            <p className="mb-4 text-sm">{phones.length} RESULTS</p>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {phones.map((phone) => (
                    <PhoneCard key={phone.id} phone={phone} />
                ))}
            </section>
        </main>
    )
}