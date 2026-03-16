// React-hooks for lokal state og kjøring av sideeffekter
import { useState, useEffect, useCallback } from 'react'

// Hjelpefunksjon som snakker med OMDB API for å finne filmer
import { searchMovies } from '../api/omdb'

// UI-komponenter brukt på forsiden:
// - MovieList: viser filmer i et responsivt rutenett
// - SearchBar: kontrollerer søkeordet ("query")
import MovieList from '../components/MovieList'
import SearchBar from '../components/SearchBar'

// Hovedsiden hvor brukeren kan søke etter filmer og se resultater
export default function HomePage() {
  // Søkestreng fra inputfeltet
  const [query, setQuery] = useState('')
  // Liste over søkresultater
  const [results, setResults] = useState([])
  // Viser James Bond filmer før bruker søker
  const [bondMovies, setBondMovies] = useState([])
  // Laster status
  const [loading, setLoading] = useState(false)
  // Feilmelding dersom noe går galt
  const [error, setError] = useState(null)

  // Hent noen faste filmer (James Bond) første gang komponenten mountes
  // Dette gir visning av noe innhold før brukeren begynner å søke
  useEffect(() => {
    async function fetchBond() {
      const data = await searchMovies('James Bond')
      setBondMovies(data)
    }

    // Kjør asynkront kall og sett stanser med resultatene
    fetchBond()
  }, []) // Tom avhengighetsliste betyr: kjør kun én gang

  // Søkefunksjon som kalles når søkestrengen endrer seg
  // Bruk useCallback for å unngå at funksjonen skapes på nytt ved hver render
  const handleSearch = useCallback(async (value) => {
    // Vi søker først når brukeren har skrevet minst 3 tegn
    // Dette reduserer antall API-kall ved korte/feilaktige input
    if (value.length < 3) {
      setResults([])
      setError(null)
      return
    }

    // Vis loading-indikator
    setLoading(true)
    // Nullstill eventuelle tidligere feil
    setError(null)

    // Prøv å søke etter filmer og håndter resultatet
    try {
      // Hent søkeresultater fra API-et basert på søkeverdien
      const data = await searchMovies(value)
      // Oppdater state med de hentede resultatene
      setResults(data)
      // Hvis ingen filmer ble funnet, sett en passende feilmelding
      if (data.length === 0) setError('Ingen filmer funnet for dette søket.')
    } catch {
      // Fange opp nettverksfeil eller API-feil og vis en generisk feilmelding
      setError('Noe gikk galt. Prøv igjen.')
    } finally {
      // Skjul loading-indikatoren uansett om søket lyktes eller feilet
      setLoading(false)
    }
  }, [])

  // Debounce: vent litt før vi kjører søket (bruker 400ms timeout)
  // Dette gjør at vi ikke sender kall til API for hvert tastetrykk, noe som reduserer belastningen
  useEffect(() => {
    // Sett en timer som kjører søkefunksjonen etter 400ms
    const timer = setTimeout(() => handleSearch(query), 400)
    // Rydd opp timeout hvis query endrer seg før tiden er ute (for å unngå unødvendige kall)
    return () => clearTimeout(timer)
  }, [query, handleSearch])

  // Bruker dette flagget for å vite om brukeren faktisk søker
  // (vi ignorerer søkestrenger som er for korte, som når brukeren skriver)
  const isSearching = query.length >= 3

  // Tegn opp komponenten
  return (
    <>
      {/* Hovedseksjon med tittel og søkefelt */}
      <section className="hero">
        <h1 id= "overskrift">Finn din neste <em>favorittfilm</em></h1>
        <p>Søk blant tusenvis av filmer fra OMDB-databasen</p>
        {/* Kontrollert komponent: SearchBar sender endringer tilbake til query-state */}
        <SearchBar value={query} onChange={setQuery} />
      </section>

      {/* Vis en loading-status mens søket pågår */}
      {loading && (
        <section className="status-box" aria-live="polite">
          {/* Spinneren er dekorativ, så aria-hidden er satt til true */}
          <section className="spinner" aria-hidden="true" />
          <p>Søker…</p>
        </section>
      )}

      {/* Vis feilmelding når noe går galt, men ikke samtidig som loading */}
      {error && !loading && (
        <section className="status-box" role="alert">
          <p>{error}</p>
        </section>
      )}

      {/* Vis resultatliste når vi har søkt og fått treff */}
      {!loading && !error && isSearching && results.length > 0 && (
        <MovieList movies={results} label={`${results.length} resultater for "${query}"`} />
      )}

      {/* Når brukeren ikke søker, vis en standardliste f.eks. James Bond */}
      {!isSearching && bondMovies.length > 0 && (
        <MovieList movies={bondMovies} label="James Bond — klassiske filmer" />
      )}
    </>
  )
}