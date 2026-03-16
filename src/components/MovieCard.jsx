// For navigasjon mellom sider i React Router
import { Link } from 'react-router-dom' // For navigasjon mellom sider i React Router

// Komponent som viser en fallback når filmen ikke har en plakat
// Vises når filmen ikke har plakat i OMDB
function NoPoster() {
  return (
    <section className="no-poster">
      {/* SVG-ikon som representerer et kamera/bilde */}
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span>Ingen plakat</span>
    </section>
  )
}
// Hovedkomponent for å vise et filmkort
// Props: movie er objekt med filmdata fra OMDB API
export default function MovieCard({ movie }) {
  // Lag en liten «slug» basert på tittelen for URL-en
  // Erstatter mellomrom med bindestrek og gjør til små bokstaver for URL-vennlighet
  const slug = encodeURIComponent(movie.Title.toLowerCase().replace(/\s+/g, '-'))

  return (
    // Semantisk article-element for hver film
    <article>
      {/* Naviger til detaljside for filmen */}
      <Link to={`/${slug}?id=${movie.imdbID}`} className="movie-card">
        {/* Semantisk figure-element som grupperer bilde og tekst */}
        <figure>
          {/* Sjekker om filmen har en gyldig plakat; hvis ikke, viser NoPoster-komponenten */}
          {/* Bilde av filmplakaten med lazy loading for ytelse og tilgjengelighet */}
          {movie.Poster && movie.Poster !== 'N/A'
            ? <img src={movie.Poster} alt={`Plakat for ${movie.Title}`} loading="lazy" />
            : <NoPoster />
          }
          {/* Bildetekst som inneholder filmens tittel og utgivelsesår */}
          <figcaption>
            {/* Filmens tittel som hovedtekst */}
            <p className="movie-card-title">{movie.Title}</p>
            {/* Udgivelsesåret for filmen */}
            <p className="movie-card-year">{movie.Year}</p>
          </figcaption>
        </figure>
      </Link>
    </article>
  )
}