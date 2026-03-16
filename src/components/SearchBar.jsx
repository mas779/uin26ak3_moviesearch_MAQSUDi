// Søkefelt-komponent som sender søketeksten tilbake til forelderen via onChange
// Props:
// value: Gjeldende søketekst som vises i feltet
// onChange: Funksjon som kalles når brukeren skriver, for å oppdatere søket
export default function SearchBar({ value, onChange }) {
  return (
    <section className="search-wrap">
      {/* Forstørrelsesglass-ikon ved siden av søkefeltet */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        // Bruker type="search" for bedre tilgjengelighet og mobilopplevelse
        type="search"
        className="search-input"
        // Placeholder-tekst som guider brukeren
        placeholder="Søk etter filmtittel…"
        // Kontrollerer verdien av input-feltet
        value={value}
        // Når brukeren skriver, sender vi søkestrengen tilbake til forelderen
        onChange={(e) => onChange(e.target.value)}
        // Tilgjengelighets-etikett for skjermlesere
        aria-label="Søk etter film"
      />
    </section>
  )
}