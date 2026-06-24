import type { Phone } from "./phone"

export type PhoneSpecs = {
  screen: string
  resolution: string
  processor: string
  mainCamera: string
  selfieCamera: string
  battery: string
  os: string
  screenRefreshRate: string
}

export type ColorOption = {
  name: string
  hexCode: string
  imageUrl: string
}

export type StorageOption = {
  capacity: string
  price: number
}

export type PhoneDetail = Phone & {
  description: string
  rating: number
  specs: PhoneSpecs
  colorOptions: ColorOption[]
  storageOptions: StorageOption[]
  similarProducts: Phone[]
}