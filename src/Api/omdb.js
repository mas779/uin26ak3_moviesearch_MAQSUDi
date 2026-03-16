
// API-nøkkel for å autentisere forespørsler til OMDB
const API_KEY = '81a3f1cf'
// Basis-URL for OMDB API-et
const BASE_URL = 'https://www.omdbapi.com'

// Søke etter filmer basert på søketekst
// query: Strengen som brukes til å søke etter filmer
// Returnerer en liste med filmer eller en tom liste hvis ingen treff
export async function searchMovies(query) {
  // Bygg URL for søkeforespørselen med API-nøkkel, søketekst og type 'movie'
  const res = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`)
  // Parse JSON-responsen
  const data = await res.json()
  // OMDB returnerer Response: 'False' dersom ingen treff eller feil
  if (data.Response === 'False') return []
  // Returner søkeresultatene eller en tom liste
  return data.Search || []
}
 
// Hent detaljer om en film basert på tittel
// title: Tittelen på filmen
// Returnerer filmobjektet med fulle detaljer eller null hvis ikke funnet
export async function getMovieByTitle(title) {
  // Bygg URL for å hente film basert på tittel, med full plot-beskrivelse
  const res = await fetch(`${BASE_URL}/?apikey=${API_KEY}&t=${encodeURIComponent(title)}&plot=full`)
  // Parse JSON-responsen
  const data = await res.json()
  // Sjekk om responsen indikerer feil eller ingen treff
  if (data.Response === 'False') return null
  // Returner filmdataene
  return data
}
 
// Hent detaljer om en film basert på IMDB ID
// imdbId: IMDB ID-en til filmen (f.eks. "tt0468569")
// Returnerer filmobjektet med fulle detaljer eller null hvis ikke funnet
export async function getMovieById(imdbId) {
  // Bygg URL for å hente film basert på IMDB ID, med full plot-beskrivelse
  const res = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${imdbId}&plot=full`)
  // Parse JSON-responsen
  const data = await res.json()
  // Sjekk om responsen indikerer feil eller ingen treff
  if (data.Response === 'False') return null
  // Returner filmdataene
  return data
}
 