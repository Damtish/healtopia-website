import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { preloadPageFor } from './pages/index.js'

// Keep the prerendered HTML on screen until the current page's code is ready, so the
// first render doesn't flash the route loader (which caused a large layout shift).
preloadPageFor(window.location.pathname).finally(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
})

