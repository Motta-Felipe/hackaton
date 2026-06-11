import { useState } from "react";
import { savePoll, uid } from "../store.js";

const emptySlot = () => ({ key: uid(), datetime: "", end: "", location: "" });

export default function CreatePoll() {
  const [title, setTitle] = useState("");
  const [slots, setSlots] = useState([emptySlot(), emptySlot()]);
  const [error, setError] = useState("");
  const [createdId, setCreatedId] = useState(null);
  const [copied, setCopied] = useState(false);

  const updateSlot = (key, field, value) =>
    setSlots((s) => s.map((x) => (x.key === key ? { ...x, [field]: value } : x)));

  const removeSlot = (key) => setSlots((s) => s.filter((x) => x.key !== key));

  const submit = (e) => {
    e.preventDefault();
    const valid = slots.filter((s) => s.datetime);
    if (!title.trim()) return setError("Dai un titolo alla riunione.");
    if (valid.length < 2) return setError("Servono almeno 2 slot con data e ora.");
    if (valid.some((s) => !s.end))
      return setError("Indica anche l'ora di fine per ogni slot.");
    if (valid.some((s) => s.end <= s.datetime.slice(11, 16)))
      return setError("L'ora di fine deve essere dopo l'inizio.");
    const poll = {
      id: uid(),
      title: title.trim(),
      slots: valid.map((s) => ({
        id: uid(),
        datetime: s.datetime,
        end: s.datetime.slice(0, 10) + "T" + s.end,
        location: s.location.trim() || null,
      })),
      votes: [],
      winningSlotId: null,
      createdAt: new Date().toISOString(),
    };
    savePoll(poll);
    setCreatedId(poll.id);
  };

  if (createdId) {
    const link = `${window.location.origin}${window.location.pathname}#/poll/${createdId}`;
    return (
      <main className="card reveal">
        <h1 className="display">Fatto, il sondaggio è pronto.</h1>
        <p className="lede">Condividi questo link con i partecipanti:</p>
        <div className="linkbox">
          <code>{link}</code>
          <button
            className="btn btn-ink"
            onClick={() => {
              navigator.clipboard.writeText(link);
              setCopied(true);
            }}
          >
            {copied ? "Copiato ✓" : "Copia link"}
          </button>
        </div>
        <div className="row gap">
          <a className="btn btn-accent" href={`#/poll/${createdId}`}>
            Apri la pagina di voto →
          </a>
          <a className="btn btn-ghost" href={`#/poll/${createdId}/results`}>
            Vedi risultati
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="card reveal">
      <h1 className="display">Proponi gli orari,<br />lascia votare il resto.</h1>
      <p className="lede">
        Crea un sondaggio, condividi il link, scegli lo slot vincente.
        Prova quello <a href="#/poll/demo">demo</a> se vai di fretta.
      </p>
      <form onSubmit={submit}>
        <label className="field">
          <span className="field-label">Titolo della riunione</span>
          <input
            type="text"
            value={title}
            placeholder="Es. Retrospettiva di team"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </label>

        <span className="field-label">Slot proposti (almeno 2)</span>
        <ul className="slot-list">
          {slots.map((s, i) => (
            <li key={s.key} className="slot-edit">
              <span className="slot-num">{i + 1}</span>
              <input
                type="datetime-local"
                value={s.datetime}
                aria-label="Inizio"
                onChange={(e) => updateSlot(s.key, "datetime", e.target.value)}
              />
              <input
                type="time"
                value={s.end}
                aria-label="Fine"
                title="Ora di fine"
                onChange={(e) => updateSlot(s.key, "end", e.target.value)}
              />
              <input
                type="text"
                value={s.location}
                placeholder="Luogo (opzionale)"
                onChange={(e) => updateSlot(s.key, "location", e.target.value)}
              />
              {slots.length > 2 && (
                <button
                  type="button"
                  className="btn-x"
                  aria-label="Rimuovi slot"
                  onClick={() => removeSlot(s.key)}
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setSlots((s) => [...s, emptySlot()])}
        >
          + Aggiungi slot
        </button>

        {error && <p className="error">{error}</p>}

        <div className="row end">
          <button type="submit" className="btn btn-accent big">
            Crea il sondaggio
          </button>
        </div>
      </form>
    </main>
  );
}
