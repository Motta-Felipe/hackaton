import { useState } from "react";
import { loadPolls, getPoll, savePoll, formatSlot } from "../store.js";

const fmtCreated = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};

export default function AdminPage() {
  const [polls, setPolls] = useState(loadPolls);

  const list = Object.values(polls).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const toggleClosed = (id) => {
    const fresh = getPoll(id);
    fresh.closedAt = fresh.closedAt ? null : new Date().toISOString();
    savePoll(fresh);
    setPolls(loadPolls());
  };

  return (
    <main className="card reveal">
      <p className="kicker">Pannello admin</p>
      <h1 className="display">Tutti i sondaggi</h1>
      <p className="lede">
        {list.length === 0
          ? "Ancora nessun sondaggio."
          : `${list.length} ${list.length === 1 ? "sondaggio" : "sondaggi"} in questo browser. Un sondaggio chiuso non accetta più voti.`}
      </p>

      <ul className="slot-list">
        {list.map((p, i) => {
          const closed = !!p.closedAt;
          const winner = p.slots.find((s) => s.id === p.winningSlotId);
          return (
            <li key={p.id} style={{ animationDelay: `${i * 60}ms` }} className="pop">
              <div className={`result ${closed ? "closed" : ""}`}>
                {closed && <span className="closed-badge">Chiuso</span>}
                <div className="result-head">
                  <div>
                    <span className="ticket-when">{p.title}</span>
                    <span className="ticket-where">
                      {p.slots.length} slot · creato il {fmtCreated(p.createdAt)}
                      {winner && <> · ★ {formatSlot(winner.datetime, winner.end)}</>}
                    </span>
                  </div>
                  <span className="count">
                    {p.votes.length}
                    <small> {p.votes.length === 1 ? "voto" : "voti"}</small>
                  </span>
                </div>
                <div className="result-foot">
                  <span className="voters">
                    <a href={`#/poll/${p.id}`}>Vota</a>
                    {" · "}
                    <a href={`#/poll/${p.id}/results`}>Risultati</a>
                  </span>
                  <button
                    className={`btn ${closed ? "btn-ghost" : "btn-ink"} small`}
                    onClick={() => toggleClosed(p.id)}
                  >
                    {closed ? "Riapri" : "Chiudi sondaggio"}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="row end">
        <a className="btn btn-accent" href="#/">
          + Nuovo sondaggio
        </a>
      </div>
    </main>
  );
}
