// React Router brukes til å navigere mellom sider i appen uten å laste siden på nytt
import { Routes, Route } from 'react-router-dom'

// Importerer sidene som finnes i appen
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'

// Headeren er toppmenyen som vises på alle sider
import Header from './components/Header'

// Globale CSS-stiler for hele appen
import './App.css'

// Hovedkomponenten i appen
// Her setter vi opp layouten og bestemmer hvilke sider som skal vises basert på URL
export default function App() {
  return (
    // Fragment lar oss returnere flere elementer uten å legge til en ekstra div i HTML
    <>
      {/* Headeren ligger øverst og vises uansett hvilken side brukeren er på */}
      <Header />

      {/* Routes bestemmer hvilken komponent som skal vises basert på URL */}
      <Routes>
        {/* Forsiden av appen */}
        <Route path="/" element={<HomePage />} />

        {/* Filmsiden viser detaljer om en film basert på slug i URL */}
        <Route path="/:movie" element={<MoviePage />} />
      </Routes>
    </>
  )
}