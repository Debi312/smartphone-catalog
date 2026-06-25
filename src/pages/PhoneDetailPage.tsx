import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { PhoneDetail } from "../types/phoneDetails"
import { getPhoneDetails } from "../services/getPhoneDetails"
import { useNavigate } from "react-router-dom"
import { PhoneCard } from "../components/PhoneCard"
import { useCart } from "../context/CartContext"
import { getSecureUrl } from "../utils/getSecureUrl"

export function PhoneDetailPage() {
  const { id } = useParams()

  const [phone, setPhone] = useState<PhoneDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [phoneColor, setPhoneColor] = useState<string | null>(null)
  const [phoneStorage, setPhoneStorage] = useState<string | null>(null)

  const navigate = useNavigate()

  const { addToCart } = useCart()

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
      .catch((error) => {
        setError(error.message)
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
    currentColorOption?.imageUrl ?? phone.colorOptions[0]?.imageUrl

  const currentPrice = currentStorageOption?.price ?? phone.basePrice

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

  function handleAddToCart() {
    if (!phoneColor || !phoneStorage) return
    if (!phone) return

    const cartItem = {
      cartItemId: `${phone.id}-${phoneColor}-${phoneStorage}`,
      phoneId: phone.id,
      name: phone.name,
      brand: phone.brand,
      imageUrl: currentImage,
      color: phoneColor,
      storage: phoneStorage,
      price: currentPrice,
    }

    addToCart(cartItem)
    navigate("/cart")
  }

  return (
    <main className=" md:px-16 py-8">
      {/* Button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm"
      >
        {"＜ BACK"}
      </button>

      {/* Phone Image and Details */}
      <section className="mx-auto grid  gap-30 md:grid-cols-2 md:items-center">
        {" "}
        <div className="flex justify-center">
          <img
            src={getSecureUrl(currentImage)}
            alt={`${phone.brand} ${phone.name}`}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-light uppercase">{phone.name}</h1>

            <p className="mt-2 font-light text-xl">
              {phoneStorage
                ? ` ${currentPrice} EUR`
                : `From ${currentPrice} EUR`}
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-sm uppercase">
              STORAGE ¿How much space do you need?
            </h2>

            <div className="flex flex-wrap mt-6">
              {phone.storageOptions.map((storage) => (
                <button
                  key={storage.capacity}
                  type="button"
                  onClick={() => setPhoneStorage(storage.capacity)}
                  className={` -ml-px border px-6 py-4 text-sm  ${
                    storage.capacity === phoneStorage
                      ? " relative z-10 border-black"
                      : "border-border"
                  }`}
                >
                  {storage.capacity}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-sm uppercase">
              Color. Pick your favourite
            </h2>

            <div className="flex gap-4">
              {phone.colorOptions.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setPhoneColor(color.name)}
                  className={`h-6 w-6 border border-white ring-1 ${
                    color.name === phoneColor ? "ring-black" : "ring-border"
                  }`}
                  style={{ backgroundColor: color.hexCode }}
                  aria-label={`Select color ${color.name}`}
                />
              ))}
            </div>

            {phoneColor && <p className="mt-2 text-sm">{phoneColor}</p>}
          </div>

          <button
            type="button"
            disabled={isAddToCartDisabled}
            onClick={handleAddToCart}
            className="mt-4 bg-black px-6 py-4 max-w-100 text-sm uppercase text-white disabled:bg-button-muted disabled:text-muted enabled:cursor-pointer hover:bg-gray-800"
          >
            Añadir
          </button>
        </div>
      </section>

      {/* Specifications */}
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

      {/* Similar items */}
      <section className="mt-20">
        <h2 className="mb-10 text-xl uppercase">Similar items</h2>

        <div className="flex overflow-x-auto border-t border-l ">
          {phone.similarProducts.map((similarProduct, index) => (
            <div key={similarProduct.id + index} className="shrink-0">
              <PhoneCard phone={similarProduct} />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
