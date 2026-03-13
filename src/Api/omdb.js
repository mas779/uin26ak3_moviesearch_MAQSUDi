// Enkelt API-tynnklient for OMDB (Open Movie Database)
// Husk å bytte ut API-nøkkelen med din egen om du har en
const API_KEY = '81a3f1cf' // <-- bytt ut med din OMDB API-nøkkel
const BASE_URL = 'https://www.omdbapi.com'

// Søke etter filmer basert på søketekst
export async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`)
  const data = await res.json()
  // OMDB returnerer Response: 'False' dersom ingen treff eller feil
  if (data.Response === 'False') return []
  return data.Search || []
}
 
// Hent detaljer om en film basert på tittel
export async function getMovieByTitle(title) {
  const res = await fetch(`${BASE_URL}/?apikey=${API_KEY}&t=${encodeURIComponent(title)}&plot=full`)
  const data = await res.json()
  if (data.Response === 'False') return null
  return data
}
 
// Hent detaljer om en film basert på IMDB ID
export async function getMovieById(imdbId) {
  const res = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${imdbId}&plot=full`)
  const data = await res.json()
  if (data.Response === 'False') return null
  return data
}
 