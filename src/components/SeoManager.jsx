import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_ORIGIN } from '../constants/site'
import { getSeoMeta } from '../lib/seo'

function ensureTag(selector, createTag) {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = createTag()
    document.head.appendChild(tag)
  }
  return tag
}

function setMetaProperty(property, content) {
  const tag = ensureTag(`meta[property="${property}"]`, () => {
    const el = document.createElement('meta')
    el.setAttribute('property', property)
    return el
  })
  tag.setAttribute('content', content)
}

function setMetaName(name, content) {
  const tag = ensureTag(`meta[name="${name}"]`, () => {
    const el = document.createElement('meta')
    el.setAttribute('name', name)
    return el
  })
  tag.setAttribute('content', content)
}

function removeTag(selector) {
  document.head.querySelectorAll(selector).forEach((tag) => tag.remove())
}

function setStructuredData(pathname) {
  const id = 'healtopia-jsonld'
  document.getElementById(id)?.remove()
  const structuredData = getSeoMeta(pathname).jsonLd

  if (!structuredData) return

  const script = document.createElement('script')
  script.id = id
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(structuredData)
  document.head.appendChild(script)
}

function SeoManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = getSeoMeta(pathname)

    document.title = meta.title
    setMetaName('description', meta.description)
    setMetaName('robots', meta.robots)
    setMetaProperty('og:type', 'website')
    setMetaProperty('og:title', meta.title)
    setMetaProperty('og:description', meta.description)
    setMetaProperty('og:url', meta.ogUrl)
    setMetaProperty('og:image', `${SITE_ORIGIN}/images/clinic/building-exterior-optimized.jpg`)
    setMetaName('twitter:card', 'summary_large_image')
    setMetaName('twitter:title', meta.title)
    setMetaName('twitter:description', meta.description)
    setMetaName('twitter:image', `${SITE_ORIGIN}/images/clinic/building-exterior-optimized.jpg`)
    if (meta.canonical) {
      const tag = ensureTag('link[rel="canonical"]', () => {
        const el = document.createElement('link')
        el.setAttribute('rel', 'canonical')
        return el
      })
      tag.setAttribute('href', meta.canonical)
    } else {
      removeTag('link[rel="canonical"]')
    }
    setStructuredData(pathname)
  }, [pathname])

  return null
}

export default SeoManager
