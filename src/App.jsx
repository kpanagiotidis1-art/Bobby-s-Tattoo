import { RouterProvider } from 'react-router-dom'
import Providers from '@/app/Providers'
import { router } from '@/app/routes'

export default function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}
