import AppShell from './AppShell'
import { pages } from './pages/index.js'

function App() {
  return <AppShell pages={pages} fallback={<div className="min-h-[35vh]" aria-hidden="true" />} />
}

export default App
