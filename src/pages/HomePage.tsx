import { useEffect, useState } from "react"
import { getPhones } from "../services/getPhones"
import type { Phone } from "../types/phone"
import { PhoneCard } from "../components/PhoneCard"
import { SearchBar } from "../components/SearchBar"
import { useDebounce } from "../utils/useDebounce"

export function HomePage() {
  const [phones, setPhones] = useState<Phone[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [error, setError] = useState("")
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    setIsLoading(true)
    setError("")
    getPhones({ search: debouncedSearch })
      .then((data) => {
        setPhones(data)
      })
      .catch(() => {
        setError("Unable to load phones. Please try again later.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [debouncedSearch])

  return (
    <main className="px-6 py-8">
      <SearchBar
        value={search}
        resultsCount={phones.length}
        onChange={setSearch}
          />
          
      {isLoading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!isLoading && !error &&  phones.length > 0 && (
        <section className="grid grid-cols-1 border-black border-t border-l sm:grid-cols-2 lg:grid-cols-4">
          {phones.map((phone, index) => (
            <PhoneCard key={`${phone.id}-${index}`} phone={phone} />
          ))}
        </section>
      )}

      {!isLoading && !error && phones.length === 0 && <p>No results found.</p>}
    </main>
  )
}
