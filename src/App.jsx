// React Router brukes for klient-side ruting mellom sider
import { Routes, Route } from 'react-router-dom'

// Sider i appen
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'

// Felles toppnavigasjon
import Header from './components/Header'

// Globale CSS-stiler for appen
import './App.css'

// Rotkomponenten for appen
// Setter opp felles layout + routing for alle sider
export default function App() {
  return (
    // Fragment brukes for å avgrense flere sibling-elementer uten ekstra DOM-noder
    <>
      {/* Toppnavigasjon som vises på alle sider */}
      <Header />

      {/* Ruting: velger hvilken side som vises basert på URL */}
      <Routes>
        {/* Hjemmesiden (søkegrensesnitt) */}
        <Route path="/" element={<HomePage />} />
        {/* Filmside som viser detaljer basert på slug + query param */}
        <Route path="/:movie" element={<MoviePage />} />
      </Routes>
    </>
  )
}