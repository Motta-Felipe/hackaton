# Hackathon Starter Kit

Scaffolding leggero per costruire una mini-app durante un hackathon, lavorando con agenti AI (Claude Code, Codex, GitHub Copilot).
Principio guida: **MVP-first** — demo funzionante il prima possibile, niente overengineering.

## Cosa c'è qui

| File | A cosa serve |
|------|--------------|
| [AGENTS.md](AGENTS.md) | Regole operative complete per gli agenti AI (plan-first, guardrails, checklist demo) |
| [.github/copilot-instructions.md](.github/copilot-instructions.md) | Versione sintetica per GitHub Copilot |
| [SPEC.md](SPEC.md) | Template di specifica da compilare appena arriva il brief |
| [TASKS.md](TASKS.md) | Kanban dei task + priorità + critical path |
| [DECISIONS.md](DECISIONS.md) | Log delle decisioni (per non ridiscuterle) |
| [prompts/](prompts/) | Prompt pronti: planner, builder, reviewer, tester, demo, handoff |

## Come usarlo: dal brief alla demo

1. **Ricevi il brief** e incollalo nel prompt [prompts/planner.md](prompts/planner.md).
2. **Compila `SPEC.md`** con l'output del planner: MVP minimo e non-goals espliciti.
3. **Riempi `TASKS.md`**: task piccoli con priorità `P0/P1/P2` e un critical path chiaro.
4. **Implementa** un task alla volta con [prompts/builder.md](prompts/builder.md); aggiorna `TASKS.md` a ogni passo.
5. **Rivedi** i cambiamenti chiave con [prompts/reviewer.md](prompts/reviewer.md).
6. **Testa** il percorso di demo con [prompts/tester.md](prompts/tester.md).
7. **Prepara la demo** con [prompts/demo.md](prompts/demo.md), curando anche il racconto del metodo.
8. **Annota** lungo il percorso ogni scelta non ovvia in `DECISIONS.md`.

## AI Workflow

```
Brief
  ↓
planner
  ↓
SPEC
  ↓
TASKS
  ↓
builder
  ↓
reviewer
  ↓
tester
  ↓
demo
```

### Passare il contesto tra agenti (Claude Code ↔ Codex ↔ GitHub Copilot)

Gli agenti non condividono memoria. Per passare lavoro da uno all'altro usa [prompts/handoff.md](prompts/handoff.md): genera un blocco compatto (Goal, Current state, Decisions made, Open questions, Constraints, Next step, Context files) e incollalo nell'agente successivo. Così riprende **senza leggere la chat precedente**.

Tutti gli agenti leggono `AGENTS.md`; Copilot ha in più `.github/copilot-instructions.md`. I file `SPEC.md`, `TASKS.md` e `DECISIONS.md` sono la **memoria condivisa**: tienili aggiornati e ogni agente parte allineato.

### Quando usare handoff.md vs DECISIONS.md

- **`handoff.md`**: quando cambi agente o riprendi dopo una pausa. È contesto *temporaneo* per ripartire.
- **`DECISIONS.md`**: quando prendi una scelta che non vuoi ridiscutere (stack, dipendenza, taglio di scope, trade-off). È memoria *permanente* del progetto.

Regola pratica: l'handoff dice **dove sei e cosa fare ora**; le decisions dicono **cosa è già stato deciso e perché**. Non riaprire una decision senza un motivo forte.
