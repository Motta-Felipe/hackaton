# AGENTS.md

Guida operativa per agenti AI (Claude Code, Codex, GitHub Copilot) che lavorano in questa repo durante un hackathon.

## Scopo della repo

Questa repo è uno scaffolding leggero per costruire **una mini-app durante un hackathon di poche ore**.
Il brief non è ancora noto: la struttura è volutamente generica e va adattata appena arriva.

Il principio guida è **MVP-first**: l'obiettivo è una demo funzionante il prima possibile, riducendo rischio e overengineering.

## Come lavorare qui dentro

### Plan first, code second
Prima di scrivere codice, **chiarisci sempre**:
- **Obiettivo**: cosa deve fare l'app, in una frase.
- **Vincoli**: tempo, stack, API disponibili, dati, ambiente di demo.
- **MVP**: il taglio minimo che si può mostrare e che ha senso.
- **Non-goals**: cosa esplicitamente NON facciamo ora.

Se queste informazioni non sono in [SPEC.md](SPEC.md), chiedile o proponi una bozza prima di implementare.

### Lavora per task piccoli e isolati
- Un task = un cambiamento verificabile in pochi minuti.
- Niente task "fai tutto il modulo": scomponi in [TASKS.md](TASKS.md).
- Completa e verifica un task prima di passare al successivo.

### Minimizza la superficie di modifica
- Tocca il minor numero di file possibile.
- Non rifattorizzare codice non collegato al task.
- Non rinominare/riorganizzare file senza un motivo legato al task corrente.

### Tieni aggiornati i documenti
- Sposta i task in [TASKS.md](TASKS.md) man mano che procedi (Todo → Doing → Done).
- Registra le scelte non ovvie in [DECISIONS.md](DECISIONS.md).
- Aggiorna [SPEC.md](SPEC.md) se lo scope cambia.

## Convenzioni

- **Semplicità prima di tutto**: la soluzione più ovvia che funziona vince.
- **Leggibilità**: nomi chiari, funzioni corte, niente astrazioni speculative.
- **No overengineering**: niente layer, pattern o config "per il futuro".
- **No dipendenze premature**: aggiungi una libreria solo se risolve un problema reale e attuale. Annota il perché in [DECISIONS.md](DECISIONS.md).
- **Codice in inglese** (nomi, commenti tecnici); documentazione di progetto in italiano dove utile.
- **Commit piccoli** con messaggi chiari che descrivono il cambiamento.
- **Segreti fuori dal repo**: le chiavi vanno in `.env` (mai committato, è in `.gitignore`); documenta le variabili in [.env.example](.env.example). Mai hardcodare chiavi nel codice.

## Ruoli dei file

| File | Quando usarlo |
|------|---------------|
| `SPEC.md` | Definire problema, MVP, non-goals, acceptance criteria |
| `TASKS.md` | Scomporre e tracciare il lavoro |
| `DECISIONS.md` | Registrare scelte per non ridiscuterle |
| `prompts/` | Prompt pronti per planner, builder, reviewer, tester, demo, handoff |

## Guardrails for AI agents

- ❌ Non implementare prima di aver chiarito obiettivo, MVP e non-goals.
- ❌ Non introdurre framework, librerie o servizi senza motivo + nota in `DECISIONS.md`.
- ❌ Non riscrivere o "ripulire" architettura esistente di tua iniziativa.
- ❌ Non espandere lo scope oltre l'MVP concordato (no scope creep).
- ❌ Non inventare requisiti o dati: se manca un'informazione, chiedi o segnala l'assunzione.
- ❌ Non lasciare il lavoro a metà senza aggiornare `TASKS.md`.
- ❌ Non committare segreti reali (`.env`, chiavi API, token): usa [.env.example](.env.example) e dati fittizi per la demo.
- ❌ Dopo il **code freeze** (≈ ⅓ di tempo rimasto) non aggiungere nuove feature: solo fix che servono alla demo.
- ✅ Preferisci sempre il percorso che porta più in fretta a una demo mostrabile.
- ✅ Rendi ogni modifica piccola e facile da rivedere.
- ✅ Quando passi il lavoro a un altro agente, usa [prompts/handoff.md](prompts/handoff.md).

## Checklist prima della demo

- [ ] L'app si avvia con un comando documentato nel [README.md](README.md).
- [ ] Il flusso principale dell'MVP funziona end-to-end.
- [ ] Nessun crash sul percorso di demo (happy path testato).
- [ ] I dati/credenziali di demo sono pronti e non segreti reali.
- [ ] Nessun segreto reale committato (`.env` ignorato, solo `.env.example` versionato).
- [ ] Code freeze rispettato: dopo l'ultimo ⅓ di tempo solo stabilizzazione e prove demo.
- [ ] `SPEC.md` riflette ciò che è stato effettivamente costruito.
- [ ] `DECISIONS.md` contiene le scelte chiave.
- [ ] Esiste uno script o sequenza di demo (vedi [prompts/demo.md](prompts/demo.md)).
- [ ] Sai spiegare in 2 minuti **metodo** + **risultato**.
