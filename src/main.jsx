import { StrictMode, startTransition } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './styles/page-styles.css'
import App from './App.jsx'
import { preloadPageFor } from './pages/index.js'

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Load the current page's code first so the first client render matches the prerendered HTML.
preloadPageFor(window.location.pathname).finally(() => {
  const container = document.getElementById('root')

  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  // Only hydrate markup that was prerendered for this URL. If a host serves another page's
  // HTML (e.g. an SPA fallback), render from scratch instead of hydrating mismatched markup.
  if (container.hasChildNodes() && container.dataset.prerenderedPath === path) {
    // Prerendered page: hydrate (adopt the existing DOM) instead of re-creating it. The page
    // stays painted, so LCP is the first paint. Hydrating inside a transition makes React
    // attach in small, yielding chunks instead of one long task.
    startTransition(() => {
      hydrateRoot(container, app)
    })
    return
  }

  // No prerendered markup (e.g. dev server): render in a transition so it is time-sliced.
  const root = createRoot(container)
  startTransition(() => {
    root.render(app)
  })
})
