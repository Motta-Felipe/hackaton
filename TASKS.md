# TASKS

Kanban leggero. Sposta i task tra le sezioni man mano che procedi. Tieni un solo task in **Doing** alla volta quando possibile.

**Priorità:** `P0` = serve per l'MVP / demo · `P1` = importante ma non bloccante · `P2` = nice-to-have

## Critical path
*La catena minima di task P0 che porta a una demo funzionante. Se sei in ritardo, fai solo questi.*

1. Scaffolding app + data model in memoria (Poll/Slot/Vote).
2. Form di creazione sondaggio (titolo + slot) → genera link `/poll/:id`.
3. Pagina di voto (nome + selezione slot) che salva i voti.
4. Vista risultati (voti per slot) + selezione slot vincente dall'autore.

---

## Todo
- [ ] `P0` Scaffolding app e stato locale (Poll/Slot/Vote)
- [ ] `P0` Form creazione sondaggio: titolo + N slot
- [ ] `P0` Generazione link condivisibile `/poll/:id`
- [ ] `P0` Pagina voto: nome + selezione slot, salva voto
- [ ] `P0` Vista risultati: conteggio + nomi per slot
- [ ] `P0` Autore marca lo slot vincente (evidenziato)
- [ ] `P1` Stile minimale leggibile (UI conta per la valutazione)
- [ ] `P1` Dati demo pre-caricati (seed di un sondaggio d'esempio)

## Doing
- [ ]

## Done

## Blocked
*Task fermi + motivo del blocco + cosa serve per sbloccarli.*
- [ ] — bloccato da:

## Later
*Idee e migliorie post-MVP. Non toccare finché l'MVP non è in piedi.*
- [ ] `P2` Generazione invito calendario `.ics` o link `mailto:` (simulato)
- [ ] `P2` Condivisione reale multi-dispositivo (backend in-memory)
- [ ] `P2` Luogo per slot, fuso orario, modifica/elimina sondaggio
