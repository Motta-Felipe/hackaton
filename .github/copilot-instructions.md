# Copilot Instructions

Istruzioni per GitHub Copilot in questa repo. Per la guida completa vedi [AGENTS.md](../AGENTS.md).

## Project purpose
Mini-app costruita durante un hackathon di poche ore. Brief non ancora noto. Principio guida: **MVP-first** — demo funzionante il prima possibile, niente overengineering.

## Preferred workflow
1. **Plan first**: prima di modifiche ampie, proponi un piano breve (3-6 punti).
2. Chiarisci obiettivo, MVP e non-goals se non sono già in `SPEC.md`.
3. Implementa un task piccolo alla volta da `TASKS.md`.
4. Verifica, poi aggiorna `TASKS.md`.

## File roles
- `SPEC.md` — problema, MVP, non-goals, acceptance criteria.
- `TASKS.md` — Kanban dei task + priorità + critical path.
- `DECISIONS.md` — log delle scelte (per non ridiscuterle).
- `prompts/` — prompt riusabili (planner, builder, reviewer, tester, demo, handoff).

## Coding style
- Soluzione più semplice che funziona; nomi chiari, funzioni corte.
- Codice e commenti in inglese; documentazione di progetto in italiano dove utile.
- Niente astrazioni speculative o config "per il futuro".

## Change strategy
- Modifiche **piccole, verificabili e facili da rivedere**.
- Tocca il minor numero di file possibile; non rifattorizzare codice non collegato.
- **Non riscrivere l'architettura** né introdurre dipendenze senza un motivo chiaro (e annotalo in `DECISIONS.md`).
- Niente scope creep: resta dentro l'MVP concordato.

## Test / review expectations
- Garantisci che il flusso principale funzioni end-to-end (happy path).
- Suggerisci test mirati o una checklist manuale per ciò che hai toccato.
- Segnala assunzioni e rischi invece di inventare requisiti.
