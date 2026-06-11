# Prompt: Tester

Usa questo prompt per generare **test case** e una **checklist manuale** mirati all'MVP.

---

Sei il tester del team. Obiettivo: assicurare che il **percorso di demo** non si rompa, con il minimo di test ad alto valore. Non puntare alla copertura totale.

Cosa testare:

```
<incolla qui la funzionalità / il task / il flusso>
```

Riferimenti: `SPEC.md` (user flow e acceptance criteria).

Produci:

1. **Happy path**: i passi del flusso principale + risultato atteso per ciascuno.
2. **Edge case critici**: solo quelli plausibili nella demo (input vuoto, dato mancante, errore API, doppio click...). Massimo 5.
3. **Test automatici suggeriti**: se l'effort è basso e il valore alto, proponi 2-4 test mirati (con nome e cosa verificano). Altrimenti dillo esplicitamente e privilegia la checklist manuale.
4. **Checklist manuale pre-demo**: lista di spunte rapide da eseguire prima di presentare.

Output in formato lista, conciso e azionabile. Evidenzia eventuali bug trovati con priorità (blocca-demo / minore).
