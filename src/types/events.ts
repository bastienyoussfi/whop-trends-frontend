// Types based on Prisma schema for search and transaction events

export interface SearchEvent {
  id: number
  type: string
  searchTerm: string
  timestamp: Date
}

export interface TransactionEvent {
  id: number
  productId: string | null
  productSlug: string | null
  productName: string | null
  description: string | null
  imageUrl: string | null
  seller: string | null
  timestamp: Date
  rawData: Record<string, string | number | boolean | null> | null
}

export interface SearchEventFilters {
  searchTerm?: string
  startDate?: Date
  endDate?: Date
  limit?: number
}

export interface TransactionEventFilters {
  productId?: string
  productSlug?: string
  seller?: string
  startDate?: Date
  endDate?: Date
  limit?: number
}
