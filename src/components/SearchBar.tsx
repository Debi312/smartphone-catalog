type SearchBarProps = {
  value: string
  resultsCount: number
  onChange: (value: string) => void
}

export function SearchBar({ value, resultsCount, onChange }: SearchBarProps) {
  return (
    <section className="flex flex-col gap-2 pb-10">
      <input
        id="phone-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for a smartphone..."
        className="w-full font-light border-b border-black py-1 outline-none"
      />

      <p className="text-xs pt-4 uppercase">{resultsCount} results</p>
    </section>
  )
}
