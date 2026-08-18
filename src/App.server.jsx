import AppShell from './AppShell'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import DirectPrimaryCare from './pages/DirectPrimaryCare.jsx'
import InsuranceBasedPrimaryCare from './pages/InsuranceBasedPrimaryCare.jsx'
import MedicalWeightLoss from './pages/MedicalWeightLoss.jsx'
import ConciergeCare from './pages/ConciergeCare.jsx'
import Pricing from './pages/Pricing.jsx'
import Insurance from './pages/Insurance.jsx'
import Contact from './pages/Contact.jsx'
import Gambrills from './pages/Gambrills.jsx'
import NotFound from './pages/NotFound.jsx'

const pages = {
  Home,
  About,
  Services,
  DirectPrimaryCare,
  InsuranceBasedPrimaryCare,
  MedicalWeightLoss,
  ConciergeCare,
  Pricing,
  Insurance,
  Contact,
  Gambrills,
  NotFound,
}

function AppServer() {
  return <AppShell pages={pages} fallback={null} />
}

export default AppServer
