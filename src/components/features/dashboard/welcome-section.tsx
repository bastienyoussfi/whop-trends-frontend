import { useTranslation } from 'react-i18next'

interface WelcomeSectionProps {
  userName: string
}

export function WelcomeSection({
  userName,
}: WelcomeSectionProps): React.ReactElement {
  const { t } = useTranslation('dashboard')

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold tracking-tight">
        {t('welcome.greeting', { name: userName })}
      </h1>
      <p className="text-lg text-muted-foreground">{t('welcome.subtitle')}</p>
      <p className="text-sm text-muted-foreground">{currentDate}</p>
    </div>
  )
}
