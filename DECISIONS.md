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
