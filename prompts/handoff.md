# Prompt: Handoff

Usa questo prompt per **passare il contesto da un agente AI a un altro** (Claude Code ↔ Codex ↔ GitHub Copilot) in modo compatto.

Obiettivo: il nuovo agente deve poter riprendere il lavoro **senza leggere la chat precedente**. Niente rumore, niente storia della conversazione, solo ciò che serve per continuare.

---

Genera un handoff compatto usando ESATTAMENTE questa struttura. Tieni ogni sezione breve (poche righe).

```
## Goal
<l'obiettivo dell'app / del task corrente, in 1-2 righe>

## Current state
<cosa funziona già, cosa è in corso, dove si è arrivati>

## Decisions made
<scelte già prese e da NON riaprire — rimanda a DECISIONS.md per i dettagli>

## Open questions
<dubbi irrisolti che il prossimo agente deve affrontare>

## Constraints
<vincoli attivi: tempo, stack, API, non-goals dall'MVP>

## Next step
<la prossima singola azione concreta da fare ORA>

## Context files
<file chiave da leggere: es. SPEC.md, TASKS.md, DECISIONS.md, file di codice rilevanti>
```

Regole:
- **Non riaprire decisioni già prese** in `DECISIONS.md` senza un motivo forte e nuovo; se lo fai, spiega perché.
- Escludi storia della chat, tentativi falliti irrilevanti e dettagli non azionabili.
- Sii specifico su "Next step": una sola azione, non una lista di intenzioni.
- L'handoff deve essere autosufficiente: leggendolo + i Context files, il nuovo agente parte subito.
