import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { PhoneDetail } from "../types/phoneDetails"
import { getPhoneDetails } from "../services/getPhoneDetails"
import { useNavigate } from "react-router-dom"

export function PhoneDetailPage() {
  const { id } = useParams()

  const [phone, setPhone] = useState<PhoneDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [phoneColor, setPhoneColor] = useState<string | null>(null)
  const [phoneStorage, setPhoneStorage] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    setError("")
    setPhone(null)
    setPhoneColor(null)
    setPhoneStorage(null)

    if (!id) {
      setError("No phone ID provided.")
      setIsLoading(false)
      return
    }

    getPhoneDetails(id)
      .then((data) => {
        setPhone(data)
      })
      .catch(() => {
        setError("Unable to load phone details.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  if (isLoading) {
    return <main>Loading...</main>
  }

  if (error) {
    return <main>{error}</main>
  }

  if (!phone) {
    return <main>Phone not found.</main>
  }

  const currentColorOption = phoneColor
    ? phone.colorOptions.find((option) => option.name === phoneColor)
    : phone.colorOptions[0]

  const currentStorageOption = phoneStorage
    ? phone.storageOptions.find((option) => option.capacity === phoneStorage)
    : phone.storageOptions[0]

  const currentImage =
    currentColorOption?.imageUrl || phone.colorOptions[0]?.imageUrl

  const currentPrice = currentStorageOption?.price || phone.basePrice

  const isAddToCartDisabled = !phoneColor || !phoneStorage

    const specifications = [
  
    { label: "BRAND", value: phone.brand },
    { label: "NAME", value: phone.name },
    { label: "DESCRIPTION", value: phone.description },
    { label: "SCREEN", value: phone.specs.screen },
    { label: "RESOLUTION", value: phone.specs.resolution },
    { label: "PROCESSOR", value: phone.specs.processor },
    { label: "MAIN CAMERA", value: phone.specs.mainCamera },
    { label: "SELFIE CAMERA", value: phone.specs.selfieCamera },
    { label: "BATTERY", value: phone.specs.battery },
    { label: "OS", value: phone.specs.os },
    { label: "SCREEN REFRESH RATE", value: phone.specs.screenRefreshRate },
  ]

  return (
    <main className="px-6 py-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm"
      >
        {"＜ BACK"}
      </button>

      <section className="grid gap-10 md:grid-cols-2">
        <div className="flex justify-center">
          <img
            src={currentImage}
            alt={`${phone.brand} ${phone.name}`}
            className="max-h-125 object-contain"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-medium uppercase">{phone.name}</h1>
            <p className="mt-2 text-sm uppercase text-gray-600">
              {phone.brand}
            </p>
            <p className="mt-4 text-xl">
              {phoneStorage
                ? ` ${currentPrice} EUR`
                : `From ${currentPrice} EUR`}
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-sm uppercase">
              STORAGE ¿How much space do you need?
            </h2>

            <div className="flex flex-wrap">
              {phone.storageOptions.map((storage) => (
                <button
                  key={storage.capacity}
                  type="button"
                  onClick={() => setPhoneStorage(storage.capacity)}
                  className={`border px-6 py-4 text-sm ${
                    storage.capacity === phoneStorage
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  {storage.capacity}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm uppercase">
              Color. Pick your favourite
            </h2>

            <div className="flex gap-3">
              {phone.colorOptions.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setPhoneColor(color.name)}
                  className={`h-8 w-8 border ${
                    color.name === phoneColor
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.hexCode }}
                  aria-label={`Select color ${color.name}`}
                />
              ))}
            </div>

            {phoneColor && (
              <p className="mt-3 text-sm text-gray-600">{phoneColor}</p>
            )}
          </div>

          <button
            type="button"
            disabled={isAddToCartDisabled}
            className="mt-4 bg-black px-6 py-4 text-sm uppercase text-white disabled:bg-gray-300 disabled:text-gray-500"
          >
            Añadir
          </button>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="mb-10 text-xl uppercase">Specifications</h2>

        <div className="border-t ">
          {specifications.map((specification) => (
            <div
              key={specification.label}
              className="grid gap-6 border-b py-5 text-sm md:grid-cols-[300px_1fr] grid-cols-[150px_1fr]"
            >
              <p className="uppercase">{specification.label}</p>
              <p>{specification.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        {/* TODO: completar similar items */}
        <h2 className="mb-10 text-xl">SIMILAR ITEMS</h2>
      </section>
    </main>
  )
}
