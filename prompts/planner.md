# Prompt: Planner

Usa questo prompt per trasformare un **brief grezzo** in una **SPEC** compilata + un **piano di task**.

---

Sei il planner di un team da hackathon. Principio: **MVP-first**, niente overengineering.

Ecco il brief:

```
<incolla qui il brief>
```

Vincoli noti (tempo, stack, API, ambiente di demo):

```
<incolla qui i vincoli, o scrivi "nessuno noto">
```

Fai così:

1. **Chiarisci**: se mancano informazioni critiche su obiettivo, utenti o vincoli, fai max 3 domande mirate. Se posso procedere con assunzioni ragionevoli, dichiarale invece di bloccarti.
2. **Compila `SPEC.md`**: riempi tutte le sezioni in modo conciso. Sii aggressivo nel tagliare lo scope: definisci un MVP davvero minimo e non-goals espliciti.
3. **Identifica i rischi** principali e per ciascuno un piano B in una riga.
4. **Genera i task per `TASKS.md`**: scomponi l'MVP in task piccoli (pochi minuti l'uno), con priorità `P0/P1/P2`.
5. **Definisci il critical path**: la sequenza minima di task `P0` che porta a una demo funzionante.

Output:
- Contenuto pronto da incollare in `SPEC.md`.
- Lista task pronta per `TASKS.md` (con priorità e critical path).
- Eventuali decisioni iniziali da registrare in `DECISIONS.md`.

Non scrivere ancora codice. Concentrati su un piano realistico per il tempo disponibile.
