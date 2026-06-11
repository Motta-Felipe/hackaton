# Stack & UI — Quadra

> Quadra — *"l'ora che mette tutti d'accordo"*: app di sondaggio per accordarsi sulle riunioni (stile Doodle / Calendly).

## Tecnologie

| Ambito | Scelta | Note |
|--------|--------|------|
| **UI framework** | React 18 | Componenti funzionali + hooks (`useState`, `useEffect`) |
| **Build / dev server** | Vite 5 | `npm run dev` / `build` / `preview`, plugin `@vitejs/plugin-react` |
| **Linguaggio** | JavaScript (JSX) | Nessun TypeScript, niente step di compilazione extra |
| **Routing** | `location.hash` fatto a mano | Niente `react-router` (vedi `DECISIONS.md`). Rotte: `#/`, `#/poll/:id`, `#/poll/:id/results`, `#/admin` |
| **Persistenza** | `localStorage` | Nessun backend: modello `Poll / Slot / Vote` serializzato in JSON (`src/store.js`) |
| **Date/orari** | `Intl.DateTimeFormat` (locale `it-IT`) | Formattazione slot nativa, zero dipendenze |
| **Stili** | CSS puro (`src/styles.css`) | Variabili CSS custom, nessun framework CSS |
| **Font** | Google Fonts: **Fraunces** (display/serif) + **Outfit** (testo/sans) | Caricati via `<link>` in `index.html` |
| **Dipendenze runtime** | solo `react` + `react-dom` | Footprint minimo, MVP-first |

### Principi
- **MVP-first**: niente backend, niente auth, niente dipendenze speculative.
- **Superficie minima**: routing e storage scritti a mano per evitare librerie.
- Codice e commenti in inglese/italiano misto, funzioni corte e leggibili.

## Stile UI

Estetica **editoriale "carta e inchiostro"** con un accento vermiglio: richiama un biglietto/ticket stampato, look neo-brutalista soft.

### Palette (CSS variables)
| Token | Valore | Uso |
|-------|--------|-----|
| `--paper` | `#f7f1e5` | Sfondo carta |
| `--paper-deep` | `#efe6d3` | Sfondo gradiente / stati chiusi |
| `--ink` | `#221c15` | Testo e bordi (inchiostro) |
| `--ink-soft` | `#6b6052` | Testo secondario |
| `--accent` | `#d9480f` | Vermiglio: call-to-action, focus, link |
| `--accent-soft` | `#fde3d3` | Riempimenti accento, errori |
| `--win` | `#f5c518` | Badge "vincitore" |
| `--line` | `#d8cdb8` | Linee di separazione |

### Tipografia
- **Fraunces** (serif, peso 700–900): titoli, brand "Quadra", numeri slot.
- **Outfit** (sans, 400–700): corpo testo, label, bottoni.
- Label in **maiuscoletto** con `letter-spacing` e `text-transform: uppercase`.

### Linguaggio visivo
- **Bordi spessi** `2px solid var(--ink)` su card, input, bottoni, ticket.
- **Ombre hard** offset (`6px 6px 0`) senza blur → effetto stampa/neo-brutalista.
- **Raggi** morbidi (`--radius: 14px`), angoli arrotondati.
- Sfondo a **trama puntinata** (radial-gradient) + gradiente carta.
- **Micro-interazioni**: hover che "solleva" gli elementi (`translate(-2px,-2px)` + ombra), focus che sposta l'input, animazione `rise` in entrata.

### Componenti chiave
- **`.card`** — foglio principale su sfondo crema.
- **`.btn`** (varianti `accent`, `ink`, `ghost`, `big`, `small`) — bottoni con ombra hard al hover.
- **`.ticket`** — riga di voto come biglietto con checkbox custom (`.tick` ✓), stato `ticked` evidenziato in accento.
- **`.result`** + **`.winner-badge`** — barre risultati, slot vincente in giallo con badge.
- **`.linkbox`** — box tratteggiato per il link condivisibile.
- Layout centrato `.shell` (max 680px), masthead con logo + tagline, colophon in fondo.

### Tono
Editoriale, artigianale, "fatto a mano" ma curato — adatto a una demo che deve risaltare per UI oltre che per funzionamento.
