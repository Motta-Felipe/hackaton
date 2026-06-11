# TASKS

Kanban leggero. Sposta i task tra le sezioni man mano che procedi. Tieni un solo task in **Doing** alla volta quando possibile.

**Priorità:** `P0` = serve per l'MVP / demo · `P1` = importante ma non bloccante · `P2` = nice-to-have

## Critical path
*La catena minima di task P0 che porta a una demo funzionante. Se sei in ritardo, fai solo questi.*

1. ~~Scaffolding Vite + React + store `localStorage` (Poll/Slot/Vote) + hash routing.~~ ✅
2. ~~`CreatePoll`: form titolo + N slot → salva e genera link `#/poll/:id`.~~ ✅
3. ~~`VotePage`: nome + selezione slot, salva i voti.~~ ✅
4. ~~`Results`: voti per slot + l'autore marca lo slot vincente.~~ ✅

---

## Todo

## Doing

- [ ]

## Done

- [x] `P0` Scaffolding: Vite + React (file scritti a mano, niente boilerplate), `npm run dev` parte
- [x] `P0` Store `localStorage`: `src/store.js` con load/save + modello Poll/Slot/Vote (vedi SPEC § Data model)
- [x] `P0` Hash routing in `App.jsx`: `#/` → crea, `#/poll/:id` → voto, `#/poll/:id/results` → risultati
- [x] `P0` `CreatePoll.jsx`: titolo + slot dinamici (data/ora, luogo opz.), valida ≥2 slot, salva e mostra link copiabile
- [x] `P0` `VotePage.jsx`: titolo poll, input nome, checkbox per slot, salva voto e porta ai risultati
- [x] `P0` `Results.jsx`: per ogni slot conteggio + nomi votanti + barra proporzionale
- [x] `P0` Selezione slot vincente in `Results.jsx` (toggle "Scegli questo" + badge "★ Slot scelto" + card evidenziata)
- [x] `P1` Stile: tema "carta e inchiostro" (Fraunces + Outfit, accento vermiglio), animazioni di reveal, responsive
- [x] `P1` Seed: sondaggio demo `#/poll/demo` ("Retrospettiva di team", 3 slot, 2 voti: Giulia e Marco)
- [x] `P1` Periodo slot: ora di fine (`Slot.end`, stesso giorno) in form, voto, risultati e seed; fallback per poll senza fine
- [x] Verifica end-to-end nel browser: crea → link → vota → risultati → slot vincente (tutti gli acceptance criteria passano)

## Blocked
*Task fermi + motivo del blocco + cosa serve per sbloccarli.*

- [ ] — bloccato da:

## Later
*Idee e migliorie post-MVP. Non toccare finché l'MVP non è in piedi.*

- [ ] `P2` Generazione invito calendario `.ics` o link `mailto:` (simulato)
- [ ] `P2` Condivisione reale multi-dispositivo (backend in-memory)
- [ ] `P2` Fuso orario, modifica/elimina sondaggio
