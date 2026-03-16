import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { getMovieById } from "../api/omdb";

// Liten stjerne-ikon brukt for IMDB-rating
function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

// Film-detaljside som viser informasjon om en film basert på imdbID i query-param
export default function MoviePage() {
  // Henter imdbID fra URL for å vite hvilken film som skal vises
  const [searchParams] = useSearchParams()
  const imdbId = searchParams.get('id')

  // Lokalt state for filmen vi henter, samt loading/feil status
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Henter filmdetaljer fra OMDB når imdbId endrer seg eller ved første render
  useEffect(() => {
    async function fetchMovie() {
      // Setter loading til true mens vi henter data
      setLoading(true)
      // Nullstill eventuelle gamle feil
      setError(null)

      try {
        // Henter filmdata fra OMDB hvis ID finnes
        const data = imdbId
          ? await getMovieById(imdbId)
          : null

        if (!data) {
          // Hvis API returnerer tomt, vis feilmelding
          setError('Filmen ble ikke funnet.')
        } else {
          // Lagrer filmdata i state
          setMovie(data)
        }
      } catch {
        // Ved nettverks- eller API-feil, vis feilmelding
        setError('Noe gikk galt ved henting av filmen.')
      } finally {
        // Uansett resultat, avslutt loading-tilstand
        setLoading(false)
      }
    }

    fetchMovie()
  }, [imdbId])


  // Viser spinner mens vi henter data fra OMDB
  if (loading) {
    return (
      <section className="status-box" aria-live="polite">
        <section className="spinner" aria-hidden="true" />
        <p>Laster film…</p>
      </section>
    )
  }

  // Viser feilmelding og tilbake-knapp hvis det er feil eller ingen filmdata
  if (error || !movie) {
    return (
      <section className="status-box" role="alert">
        <p>{error || 'Filmen ble ikke funnet.'}</p>
        {/* Tilbake-knapp går til forsiden */}
        <Link to="/" className="detail-back" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
          ← Tilbake til forsiden
        </Link>
      </section>
    )
  }

  // Viser filmdetaljer når data er klare
  // Deler opp sjangre til en liste hvis tilgjengelig
  const genres = movie.Genre !== 'N/A' ? movie.Genre.split(', ') : []
  // Henter IMDB-rating hvis tilgjengelig
  const imdbRating = movie.imdbRating !== 'N/A' ? movie.imdbRating : null

  // Returnerer JSX for detaljsiden til filmen
  return (
    <article>
      {/* Tilbake-lenke til forsiden */}
      <Link to="/" className="detail-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Tilbake
      </Link>

      {/* Hovedseksjon for filmens plakat og informasjon */}
      <section className="detail-hero">
        {/* Filmplakat og fallback hvis ikke tilgjengelig */}
        <aside className="detail-poster">
          {/* Vis plakat hvis tilgjengelig, ellers fallback */}
          {movie.Poster && movie.Poster !== 'N/A'
            ? <img src={movie.Poster} alt={`Plakat for ${movie.Title}`} />
            : (
              <section style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                Ingen plakat
              </section>
            )
          }
        </aside>

        {/* Seksjon for filminformasjon */}
        <section className="detail-info">
          {/* Viser sjangre som liste hvis tilgjengelig */}
          {genres.length > 0 && (
            <ul className="detail-genre-list" aria-label="Sjangre">
              {genres.map((g) => <li key={g}>{g}</li>)}
            </ul>
          )}

          {/* Viser filmtittel */}
          <h1 className="detail-title">{movie.Title}</h1>

          {/* Viser IMDB-rating hvis tilgjengelig */}
          {imdbRating && (
            <p className="rating-badge">
              <StarIcon />
              {imdbRating} / 10 &nbsp;·&nbsp; IMDB
            </p>
          )}

          {/* Viser meta-data: år, runtime, aldersgrense */}
          <section className="detail-meta" aria-label="Filminformasjon">
            {/* Viser år, runtime og aldersgrense dersom disse finnes */}
            {movie.Year !== 'N/A' && <p><strong>{movie.Year}</strong></p>}
            {movie.Runtime !== 'N/A' && <p>{movie.Runtime}</p>}
            {movie.Rated !== 'N/A' && <p>Aldersgrense: <strong>{movie.Rated}</strong></p>}
          </section>

          {/* Viser filmens plot hvis tilgjengelig */}
          {movie.Plot !== 'N/A' && (
            <p className="detail-plot">{movie.Plot}</p>
          )}

          {/* Flere detaljer i et definisjonslistelayout (<dl>) */}
          {/* <dl> brukes for å strukturere nøkkel/verdi-data, der <dt> er navnet på feltet og <dd> er verdien. 
          Dette gir god semantikk og hjelper skjermlesere. */}
          <dl className="detail-grid">
            {/* Viser regissørnavn hvis tilgjengelig */}
            {movie.Director !== 'N/A' && (
              <section className="detail-stat">
                <dt>Regi</dt>
                <dd>{movie.Director}</dd>
              </section>
            )}

            {/* Viser manusforfatter hvis tilgjengelig */}
            {movie.Writer !== 'N/A' && (
              <section className="detail-stat">
                <dt>Manus</dt>
                <dd>{movie.Writer}</dd>
              </section>
            )}

            {/* Viser viktige skuespillere hvis tilgjengelig */}
            {movie.Actors !== 'N/A' && (
              <section className="detail-stat">
                <dt>Skuespillere</dt>
                <dd>{movie.Actors}</dd>
              </section>
            )}

            {/* Viser språk filmen er spilt inn på hvis tilgjengelig */}
            {movie.Language !== 'N/A' && (
              <section className="detail-stat">
                <dt>Språk</dt>
                <dd>{movie.Language}</dd>
              </section>
            )}

            {/* Opprinnelsesland */}
            {movie.Country !== 'N/A' && (
              <section className="detail-stat">
                <dt>Land</dt>
                <dd>{movie.Country}</dd>
              </section>
            )}

            {/* Inntekter fra billettsalg */}
            {movie.BoxOffice !== 'N/A' && movie.BoxOffice && (
              <section className="detail-stat">
                <dt>Box Office</dt>
                <dd>{movie.BoxOffice}</dd>
              </section>
            )}
          </dl>
        </section>
      </section>
    </article>
  )
}