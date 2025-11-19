import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { SiteHeader } from '@/components/site-header'

export const Route = createFileRoute('/analyze/competitor-tracking')({
  component: CompetitorTrackingPage,
})

function CompetitorTrackingPage(): React.ReactElement {
  const { t } = useTranslation('analyze')

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">
            {t('competitorTracking.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('competitorTracking.description')}
          </p>
          <div className="mt-8 rounded-lg border border-dashed p-8 text-center">
            <p className="text-lg text-muted-foreground">
              {t('competitorTracking.comingSoon')}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
