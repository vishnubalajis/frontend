export interface Category {
  id: number
  name: string
  description: string
  imageUrl: string
}

export interface ProductVariant {
  id: number
  name: string
  price: number
  isAvailable: boolean
}

export interface Product {
  id: number
  name: string
  description: string
  origin: string
  imageUrl: string
  price: number
  unit: string
  isAvailable: boolean
  isFeatured: boolean
  categoryId: number
  categoryName: string
  variants: ProductVariant[]
}
