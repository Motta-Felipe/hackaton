# DECISIONS

Decision log leggero (ADR semplificato). Serve a **non ridiscutere le stesse scelte** durante l'hackathon.
Aggiungi una voce solo per decisioni non ovvie (stack, dipendenze, trade-off, tagli di scope). Tieni tutto breve.

`Status`: Proposed · Accepted · Superseded

---

## Template

### <Titolo breve della decisione>
- **Status:** Accepted
- **Date:** YYYY-MM-DD
- **Context:** Perché serviva decidere; il problema o il vincolo.
- **Decision:** Cosa abbiamo scelto, in una frase.
- **Consequences:** Cosa comporta (pro/contro, cosa diventa più facile o difficile).
- **Alternatives considered:** Opzioni scartate + motivo in una riga.

---

## Decisioni

### Stack: Vite + React, niente backend
- **Status:** Accepted
- **Date:** 2026-06-11
- **Context:** ~45 min di sviluppo; serve uno stack su cui il team è fluente, con UI componibile in fretta.
- **Decision:** SPA con Vite + React (template `react`). Stato persistito in `localStorage`, routing via `location.hash` (`#/poll/:id`) senza react-router.
- **Consequences:** ~5 min di scaffolding/install ma componenti riusabili e demo via `npm run dev`. Link condivisibile solo sullo stesso browser/macchina (accettabile, vedi Risks in SPEC).
- **Alternatives considered:** HTML+JS vanilla (zero setup ma UI più lenta da comporre); Node/Express in-memory (multi-device vero ma è P2, costo troppo alto ora).

### Nome e identità: "Quadra"
- **Status:** Accepted
- **Date:** 2026-06-11
- **Context:** Serviva un nome memorabile per la demo, al posto del provvisorio "Quando?".
- **Decision:** L'app si chiama **Quadra** (da "trovare la quadra"): logo SVG con due tessere-calendario sovrapposte e spunta su quella scelta, riusato come favicon.
- **Consequences:** Brand coerente con il tema carta-e-inchiostro; la chiave `localStorage` è rinominata in `quadra.polls` (i dati di test sulla vecchia chiave vengono ignorati, il sondaggio demo si ri-seeda da solo).
- **Alternatives considered:** "Quando?" (descrittivo ma generico); "Slotto" (giocoso ma meno chiaro); "Incastro" (lungo, suona negativo).

### Invito calendario simulato lato client
- **Status:** Accepted
- **Date:** 2026-06-11
- **Context:** Dopo la scelta dello slot vincente serve una chiusura demo più realistica, senza backend o servizi email/calendario.
- **Decision:** Generiamo lato browser un file `.ics` e un link `mailto:` usando inizio/fine dello slot vincente.
- **Consequences:** Nessuna chiave o dipendenza esterna; l'invio resta simulato e dipende dal client email dell'utente.
- **Alternatives considered:** Integrazione Google/Outlook Calendar (troppo scope e richiede auth/API); durata fissa 60 minuti (superata perché ora lo slot ha anche `end`).

---

## Esempi

### Usare SQLite invece di un DB gestito
- **Status:** Accepted
- **Date:** 2026-06-11
- **Context:** Serve persistenza ma il tempo è poco e non c'è infra pronta.
- **Decision:** Usiamo SQLite su file locale per l'MVP.
- **Consequences:** Zero setup, niente credenziali; non adatto a multi-utente concorrente (accettabile per la demo).
- **Alternatives considered:** Postgres gestito (troppo setup); store in memoria (si perde tutto al riavvio).

### Niente autenticazione nell'MVP
- **Status:** Accepted
- **Date:** 2026-06-11
- **Context:** L'auth costa tempo e non è il cuore del problema da dimostrare.
- **Decision:** Nessun login; utente singolo implicito.
- **Consequences:** Demo più rapida; va dichiarato come non-goal nello SPEC.
- **Alternatives considered:** Login social (out of scope per ora).
