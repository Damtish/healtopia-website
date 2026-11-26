import { createElement, lazy } from 'react'

/**
 * React.lazy with a `preload()` that resolves the module ahead of the first render.
 * Once preloaded, the page renders synchronously (no Suspense fallback), which stops the
 * prerendered HTML from collapsing to the loader and back on first load.
 */
export function lazyPage(factory) {
  let Loaded = null
  const LazyPage = lazy(factory)

  function Page(props) {
    return createElement(Loaded || LazyPage, props)
  }

  Page.preload = () =>
    factory().then((module) => {
      Loaded = module.default
      return module
    })

  return Page
}
