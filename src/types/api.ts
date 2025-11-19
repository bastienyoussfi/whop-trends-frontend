// API response types

import type { DashboardMetrics } from './metrics'
import type { SearchEvent, TransactionEvent } from './events'

export interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

export interface ApiError {
  status: number
  message: string
  code?: string
  details?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type DashboardMetricsResponse = ApiResponse<DashboardMetrics>
export type SearchEventsResponse = ApiResponse<PaginatedResponse<SearchEvent>>
export type TransactionEventsResponse = ApiResponse<
  PaginatedResponse<TransactionEvent>
>
