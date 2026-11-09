import { Moon, Sun } from 'lucide-react'

function ThemeToggle({ theme, onToggle }) {
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      className="theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-100 bg-white text-ht-navy shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ht-cyan focus-visible:ring-offset-2"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  )
}

export default ThemeToggle
