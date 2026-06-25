import { Link } from "react-router-dom"
import type { Phone } from "../types/phone"
import { secureImageUrl } from "../utils/getSecureImageUrl"

export function PhoneCard({ phone }: { phone: Phone }) {
  return (
    <Link
      to={`/${phone.id}`}
      className="group relative block overflow-hidden border-r border-b border-black p-4 text-inherit no-underline before:absolute before:inset-x-0 before:bottom-0 before:h-0 before:bg-black before:transition-[height] before:duration-300 hover:before:h-full"
    >
      <article className="relative z-10 transition-colors duration-300 group-hover:text-white">
        <img
          src={secureImageUrl(phone.imageUrl)}
          alt={`${phone.brand} ${phone.name}`}
          className="h-56 w-full object-contain"
        />

        <div className="mt-4">
          <p className="text-xs uppercase text-muted transition-colors duration-300 group-hover:text-muted">
            {phone.brand}
          </p>

          <div className="mt-2 flex items-center justify-between gap-4">
            <h2 className="text-base">{phone.name}</h2>
            <p className="text-sm">{phone.basePrice} EUR</p>
          </div>
        </div>
      </article>
    </Link>
  )
}
