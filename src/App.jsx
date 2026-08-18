import { lazy } from 'react'
import AppShell from './AppShell'

const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const DirectPrimaryCare = lazy(() => import('./pages/DirectPrimaryCare.jsx'))
const InsuranceBasedPrimaryCare = lazy(() => import('./pages/InsuranceBasedPrimaryCare.jsx'))
const MedicalWeightLoss = lazy(() => import('./pages/MedicalWeightLoss.jsx'))
const ConciergeCare = lazy(() => import('./pages/ConciergeCare.jsx'))
const Pricing = lazy(() => import('./pages/Pricing.jsx'))
const Insurance = lazy(() => import('./pages/Insurance.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Gambrills = lazy(() => import('./pages/Gambrills.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

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

function App() {
  return <AppShell pages={pages} fallback={<div className="min-h-[35vh]" aria-hidden="true" />} />
}

export default App
