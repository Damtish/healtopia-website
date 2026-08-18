import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { createServer } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')

const routesToPrerender = [
  '/',
  '/about',
  '/services',
  '/direct-primary-care',
  '/insurance-based-primary-care',
  '/medical-weight-loss',
  '/concierge-care',
  '/pricing',
  '/insurance',
  '/contact',
  '/gambrills',
]

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function buildHeadTags(seo) {
  const canonicalTag = seo.canonical ? `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />` : ''
  const jsonLd = seo.jsonLd ? JSON.stringify(seo.jsonLd) : ''

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${escapeHtml(seo.robots)}" />`,
    `<meta property="og:type" content="${escapeHtml(seo.ogType)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(seo.ogSiteName || 'Healtopia')}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.ogDescription)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.ogUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(seo.ogImage)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(seo.ogImageAlt || seo.ogTitle)}" />`,
    `<meta name="twitter:card" content="${escapeHtml(seo.twitterCard)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.twitterTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.twitterDescription)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.twitterImage)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(seo.twitterImageAlt || seo.twitterTitle)}" />`,
    canonicalTag,
    jsonLd ? `<script id="healtopia-jsonld" type="application/ld+json">${jsonLd}</script>` : '',
  ]
    .filter(Boolean)
    .join('\n    ')
}

function stripFallbackSeo(template) {
  return template
    .replace(/<title>.*?<\/title>/s, '')
    .replace(/\s*<meta name="description"[^>]*>\s*/g, '')
    .replace(/\s*<meta name="robots"[^>]*>\s*/g, '')
    .replace(/\s*<link rel="canonical"[^>]*>\s*/g, '')
    .replace(/\s*<meta property="og:[^"]+"[^>]*>\s*/g, '')
    .replace(/\s*<meta name="twitter:[^"]+"[^>]*>\s*/g, '')
}

function injectHead(template, headTags) {
  return stripFallbackSeo(template).replace('</head>', `    ${headTags}\n  </head>`)
}

function injectAppHtml(template, appHtml) {
  return template.replace(/<div id="root"\s*><\/div>/, `<div id="root">${appHtml}</div>`)
}

async function renderRoute(App, getSeoMeta, template, pathname, outputPath) {
  const seo = getSeoMeta(pathname)
  const appHtml = renderToString(
    React.createElement(StaticRouter, { location: pathname }, React.createElement(App)),
  )
  const htmlWithApp = injectAppHtml(template, appHtml)
  const html = injectHead(htmlWithApp, buildHeadTags(seo))
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, html)
}

async function main() {
  const vite = await createServer({
    root: rootDir,
    appType: 'custom',
    server: { middlewareMode: true },
    logLevel: 'error',
  })

  try {
    const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8')
    const { getSeoMeta } = await vite.ssrLoadModule('/src/lib/seo.js')
    const { default: App } = await vite.ssrLoadModule('/src/App.server.jsx')

    for (const pathname of routesToPrerender) {
      const outputPath =
        pathname === '/'
          ? path.join(distDir, 'index.html')
          : path.join(distDir, pathname.replace(/^\//, ''), 'index.html')

      await renderRoute(App, getSeoMeta, template, pathname, outputPath)
    }

    const notFoundPath = '/__not-found__'
    const notFoundSeo = getSeoMeta(notFoundPath)
    const notFoundHtml = renderToString(
      React.createElement(StaticRouter, { location: notFoundPath }, React.createElement(App)),
    )
    const notFoundOutput = injectHead(injectAppHtml(template, notFoundHtml), buildHeadTags(notFoundSeo))
    await fs.writeFile(path.join(distDir, '404.html'), notFoundOutput)
  } finally {
    await vite.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
