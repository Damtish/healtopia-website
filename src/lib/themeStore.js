// The theme lives on <html data-theme> (set before first paint by the inline script in
// index.html). React reads it with useSyncExternalStore so hydration can use a stable server
// value ('light') and then switch to the real theme right after hydrating.

export function subscribeTheme(onChange) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

export function getThemeSnapshot() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function getServerThemeSnapshot() {
  return 'light'
}

export function setDocumentTheme(theme) {
  document.documentElement.dataset.theme = theme
}
