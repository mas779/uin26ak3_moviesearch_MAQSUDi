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

export default function MoviePage() {
  // Hent query-parametere fra URL (f.eks. ?id=tt1234567)
  const [searchParams] = useSearchParams()
  const imdbId = searchParams.get('id')

  // Data-tilstand for filmdetaljer
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Hent filmdata fra OMDB når imdbId endrer seg
  useEffect(() => {
    async function fetchMovie() {
      setLoading(true)
      setError(null)
      try {
        const data = imdbId
          ? await getMovieById(imdbId)
          : null
        if (!data) {
          setError('Filmen ble ikke funnet.')
        } else {
          setMovie(data)
        }
      } catch {
        setError('Noe gikk galt ved henting av filmen.')
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [imdbId])

  // Vis loader mens vi venter på API-respons
  if (loading) {
    return (
      <section className="status-box" aria-live="polite">
        <section className="spinner" aria-hidden="true" />
        <p>Laster film…</p>
      </section>
    )
  }

  // Vis feilmelding dersom noe gikk galt eller vi ikke har filmdata
  if (error || !movie) {
    return (
      <section className="status-box" role="alert">
        <p>{error || 'Filmen ble ikke funnet.'}</p>
        <Link to="/" className="detail-back" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
          ← Tilbake til forsiden
        </Link>
      </section>
    )
  }

  // Del opp sjangre i en liste om vi har data
  const genres = movie.Genre !== 'N/A' ? movie.Genre.split(', ') : []
  // Bruk ratingen bare hvis den finnes i API-responsen
  const imdbRating = movie.imdbRating !== 'N/A' ? movie.imdbRating : null

  return (
    <article>
      <Link to="/" className="detail-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Tilbake
      </Link>

      <section className="detail-hero">
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

        <section className="detail-info">
          {/* Vis sjangrer hvis vi har noen */}
          {genres.length > 0 && (
            <ul className="detail-genre-list" aria-label="Sjangre">
              {genres.map((g) => <li key={g}>{g}</li>)}
            </ul>
          )}

          <h1 className="detail-title">{movie.Title}</h1>

          {imdbRating && (
            <p className="rating-badge">
              <StarIcon />
              {imdbRating} / 10 &nbsp;·&nbsp; IMDB
            </p>
          )}

          <section className="detail-meta" aria-label="Filminformasjon">
            {movie.Year !== 'N/A' && <p><strong>{movie.Year}</strong></p>}
            {movie.Runtime !== 'N/A' && <p>{movie.Runtime}</p>}
            {movie.Rated !== 'N/A' && <p>Aldersgrense: <strong>{movie.Rated}</strong></p>}
          </section>

          {movie.Plot !== 'N/A' && (
            <p className="detail-plot">{movie.Plot}</p>
          )}

          <dl className="detail-grid">
            {movie.Director !== 'N/A' && (
              <section className="detail-stat">
                <dt>Regi</dt>
                <dd>{movie.Director}</dd>
              </section>
            )}
            {movie.Writer !== 'N/A' && (
              <section className="detail-stat">
                <dt>Manus</dt>
                <dd>{movie.Writer}</dd>
              </section>
            )}
            {movie.Actors !== 'N/A' && (
              <section className="detail-stat">
                <dt>Skuespillere</dt>
                <dd>{movie.Actors}</dd>
              </section>
            )}
            {movie.Language !== 'N/A' && (
              <section className="detail-stat">
                <dt>Språk</dt>
                <dd>{movie.Language}</dd>
              </section>
            )}
            {movie.Country !== 'N/A' && (
              <section className="detail-stat">
                <dt>Land</dt>
                <dd>{movie.Country}</dd>
              </section>
            )}
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