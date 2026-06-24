type SearchBarProps = {
  value: string
  resultsCount: number
  onChange: (value: string) => void
}

export function SearchBar({ value, resultsCount, onChange }: SearchBarProps) {
  return (
    <section className="flex flex-col gap-2 my-8">
      <input
        id="phone-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for a smartphone..."
        className="w-full border-b border-black py-3 outline-none"
      />

      <p className="text-xs ">{resultsCount} RESULTS</p>
    </section>
  )
}
