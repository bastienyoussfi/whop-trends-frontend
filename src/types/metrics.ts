// Dashboard metrics types

export interface MetricValue {
  current: number
  previous: number
  percentageChange: number
  trend: 'up' | 'down' | 'neutral'
}

export interface HotNichesMetric extends MetricValue {
  topNiches: NicheData[]
}

export interface TrendingKeywordsMetric extends MetricValue {
  topKeywords: KeywordData[]
}

export interface NicheData {
  name: string
  count: number
  percentageChange: number
  trend: 'up' | 'down' | 'neutral'
}

export interface KeywordData {
  term: string
  searchCount: number
  percentageChange: number
  trend: 'up' | 'down' | 'neutral'
}

export interface DashboardMetrics {
  hotNiches: HotNichesMetric
  trendingKeywords: TrendingKeywordsMetric
  lastUpdated: Date
}

export interface TimeRange {
  start: Date
  end: Date
}

export type MetricPeriod = 'day' | 'week' | 'month' | 'quarter' | 'year'
