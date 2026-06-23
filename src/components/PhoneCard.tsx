import { Link } from "react-router-dom";
import type { Phone } from "../types/phone";

interface PhoneCardProps {
    phone: Phone
}

export function PhoneCard({ phone }: PhoneCardProps) {
    return (
        <Link
            to={`/phone/${phone.id}`}
            className="block border border-neutral-300 p-4 text-inherit no-underline"
        >
            <article>
                <img
                    src={phone.imageUrl}
                    alt={`${phone.brand} ${phone.name}`}
                    className="h-56 w-full object-contain"
                />

                <div className="mt-4">
                    <p className="text-xs uppercase text-neutral-500">{phone.brand}</p>

                    <div className="mt-2 flex items-center justify-between gap-4">
                        <h2 className="text-base font-normal">{phone.name}</h2>
                        <p className="text-sm">{phone.basePrice} EUR</p>
                    </div>
                </div>
            </article>
        </Link>
    )
}