import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { prefetchRoute } from './routePrefetch'

/**
 * Internal link clicks paint first, then navigate.
 *
 * Rendering a new page (React commit + style/layout/paint) costs hundreds of milliseconds on
 * slower phones. If that work starts before the click's frame is painted, the click feels
 * frozen (poor INP). We intercept plain left-clicks on same-site links in the capture phase,
 * let the browser paint the immediate feedback (e.g. the nav link highlight), and start the
 * route change right after that paint.
 *
 * Modified clicks (new tab etc.), target="_blank", downloads, external links and same-page
 * hash links keep their default behaviour.
 */
export default function usePaintFirstNavigation() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // The new page is showing: drop the temporary "pending" highlight.
  useEffect(() => {
    document.querySelectorAll('[data-nav-pending]').forEach((el) => el.removeAttribute('data-nav-pending'))
  }, [pathname])

  useEffect(() => {
    let pending = 0
    let fallback = 0

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null
      if (!anchor || anchor.hasAttribute('download') || anchor.dataset.paintFirst === 'off') return
      const target = anchor.getAttribute('target')
      if (target && target !== '_self') return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      // Same page (including in-page hash links): leave to the default handlers.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return

      // Stops React Router's <Link> handler (it skips default-prevented clicks); React onClick
      // handlers on the link still run, so the nav highlight and menu closing happen now.
      event.preventDefault()
      // Immediate feedback without a React render: CSS styles [data-nav-pending] like the active link.
      document.querySelectorAll('[data-nav-pending]').forEach((el) => el.removeAttribute('data-nav-pending'))
      anchor.setAttribute('data-nav-pending', 'true')
      prefetchRoute(url.pathname)

      cancelAnimationFrame(pending)
      window.clearTimeout(fallback)
      let done = false
      const go = () => {
        if (done) return
        done = true
        cancelAnimationFrame(pending)
        window.clearTimeout(fallback)
        navigate(url.pathname + url.search + url.hash)
      }
      pending = requestAnimationFrame(() => {
        // rAF runs just before the paint; the timeout runs just after it.
        window.setTimeout(go, 0)
      })
      // Frames don't run in hidden/background tabs: never let navigation depend on one.
      fallback = window.setTimeout(go, 150)
    }

    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      cancelAnimationFrame(pending)
      window.clearTimeout(fallback)
    }
  }, [navigate])
}
