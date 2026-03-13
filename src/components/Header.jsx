import { Link } from 'react-router-dom' // Importerer Link for klient-side navigasjon i React Router

// Enkel toppnavigasjon med logo og merke
// Header-komponent som gir konsistent navigasjon på tvers av sider
export default function Header() {
  return (
    // Semantisk header-element for sidens toppseksjon
    <header>
      {/* Navigasjonselement for å gruppere lenker */}
      <nav>
        {/* Logo som lenke til hjemmesiden, bruker React Router for SPA-navigasjon */}
        <Link to="/" className="logo">
          SCENE<span>search</span>
        </Link>
        {/* Kreditering til OMDB API, med inline styles for spesifikk typografi */}
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Powered by OMDB
        </p>
      </nav>
    </header>
  )
}