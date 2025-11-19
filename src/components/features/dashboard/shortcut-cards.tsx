import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import {
  IconTrendingUp,
  IconSearch,
  IconChartBar,
  IconUsers,
} from '@tabler/icons-react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

const shortcuts = [
  {
    titleKey: 'trendingWhops.title',
    descriptionKey: 'trendingWhops.description',
    icon: IconTrendingUp,
    url: '/analyze/trending-whops',
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    titleKey: 'keywordTrends.title',
    descriptionKey: 'keywordTrends.description',
    icon: IconSearch,
    url: '/analyze/keyword-trends',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    titleKey: 'nicheAnalytics.title',
    descriptionKey: 'nicheAnalytics.description',
    icon: IconChartBar,
    url: '/analyze/niche-analytics',
    color: 'text-green-600 dark:text-green-400',
  },
  {
    titleKey: 'competitorTracking.title',
    descriptionKey: 'competitorTracking.description',
    icon: IconUsers,
    url: '/analyze/competitor-tracking',
    color: 'text-orange-600 dark:text-orange-400',
  },
]

export function ShortcutCards(): React.ReactElement {
  const { t } = useTranslation('dashboard')

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('shortcuts.title')}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shortcuts.map((shortcut) => (
          <Link key={shortcut.url} to={shortcut.url}>
            <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <shortcut.icon className={cn('size-6', shortcut.color)} />
                  <CardTitle className="text-base">
                    {t(`shortcuts.${shortcut.titleKey}`)}
                  </CardTitle>
                </div>
                <CardDescription>
                  {t(`shortcuts.${shortcut.descriptionKey}`)}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
