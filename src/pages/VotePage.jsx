import { useState } from "react";
import { getPoll, savePoll, uid, formatSlot } from "../store.js";

export default function VotePage({ pollId }) {
  const [poll] = useState(() => getPoll(pollId));
  const [name, setName] = useState("");
  const [picked, setPicked] = useState(new Set());
  const [error, setError] = useState("");

  if (!poll) {
    return (
      <main className="card reveal">
        <h1 className="display">Sondaggio non trovato.</h1>
        <p className="lede">
          Il link è giusto? Oppure <a href="#/">creane uno nuovo</a>.
        </p>
      </main>
    );
  }

  const toggle = (slotId) =>
    setPicked((prev) => {
      const next = new Set(prev);
      next.has(slotId) ? next.delete(slotId) : next.add(slotId);
      return next;
    });

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("Scrivi il tuo nome.");
    if (picked.size === 0) return setError("Seleziona almeno uno slot.");
    const fresh = getPoll(pollId);
    fresh.votes.push({ id: uid(), name: name.trim(), slotIds: [...picked] });
    savePoll(fresh);
    window.location.hash = `#/poll/${pollId}/results`;
  };

  return (
    <main className="card reveal">
      <p className="kicker">Stai votando per</p>
      <h1 className="display">{poll.title}</h1>
      <form onSubmit={submit}>
        <label className="field">
          <span className="field-label">Il tuo nome</span>
          <input
            type="text"
            value={name}
            placeholder="Es. Giulia"
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </label>

        <span className="field-label">Quando ti va bene?</span>
        <ul className="slot-list">
          {poll.slots.map((s, i) => (
            <li key={s.id} style={{ animationDelay: `${i * 60}ms` }} className="pop">
              <label className={`ticket ${picked.has(s.id) ? "ticked" : ""}`}>
                <input
                  type="checkbox"
                  checked={picked.has(s.id)}
                  onChange={() => toggle(s.id)}
                />
                <span className="tick" aria-hidden="true" />
                <span className="ticket-when">{formatSlot(s.datetime, s.end)}</span>
                {s.location && <span className="ticket-where">{s.location}</span>}
              </label>
            </li>
          ))}
        </ul>

        {error && <p className="error">{error}</p>}

        <div className="row between">
          <a className="btn btn-ghost" href={`#/poll/${pollId}/results`}>
            Vedi risultati
          </a>
          <button type="submit" className="btn btn-accent big">
            Invia il voto
          </button>
        </div>
      </form>
    </main>
  );
}
