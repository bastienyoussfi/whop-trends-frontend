import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent(): React.ReactElement {
  return <Navigate to="/overview/dashboard" replace={true} />
}
