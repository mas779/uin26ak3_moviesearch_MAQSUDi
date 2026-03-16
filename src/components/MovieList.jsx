import MovieCard from './MovieCard'

// Komponent som viser en liste med filmer i et rutenett
// movies: array av filmobjekter fra OMDB API
// label: tekst som vises over listen
export default function MovieList({ movies, label }) {
  return (
    // Semantisk seksjon for å gruppere filmlisten med en overskrift
    <section>
      {/* Enkel overskrift/label for seksjonen */}
      <p className="section-label">{label}</p>
      {/* Vis hver film som et kort i rutenettet */}
      {/* listStyle: none fjerner standard punktmerking for ul */}
      <ul className="movie-grid" style={{ listStyle: 'none' }}>
        {movies.map((movie) => (
          // Bruk imdbID som unik key for sikker re-rendering
          <li key={movie.imdbID}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </section>
  )
}