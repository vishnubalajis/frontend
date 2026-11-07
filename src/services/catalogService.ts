import api from './api'
import type { Category, Product } from '../types'

export const catalogService = {
  async getCategories(): Promise<Category[]> {
    const response = await api.get<Category[]>('/categories')
    return response.data
  },

  async getProducts(params?: {
    categoryId?: number
    search?: string
    featured?: boolean
  }): Promise<Product[]> {
    const response = await api.get<Product[]>('/products', { params })
    return response.data
  }
}
