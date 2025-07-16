import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from './ui/ErrorPage.jsx'
import { inject } from '@vercel/analytics'

inject()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
