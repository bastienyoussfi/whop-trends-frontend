import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { queryKeys } from './queryKeys'
import { fetchTransactionEvents } from '@/api/mockApi'
import type { TransactionEventsResponse } from '@/types/api'
import type { TransactionEventFilters } from '@/types/events'

export function useTransactionEvents(
  filters: TransactionEventFilters = {},
): UseQueryResult<TransactionEventsResponse, Error> {
  return useQuery({
    queryKey: queryKeys.transactionEvents.list(filters),
    queryFn: () => fetchTransactionEvents(filters),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  })
}
