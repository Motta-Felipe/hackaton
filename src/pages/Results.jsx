import { useState } from "react";
import { getPoll, savePoll, formatSlot } from "../store.js";
import { buildIcs, buildMailto, downloadIcs } from "../calendar.js";

export default function Results({ pollId }) {
  const [poll, setPoll] = useState(() => getPoll(pollId));
  const [copied, setCopied] = useState(false);

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

  const votersFor = (slotId) =>
    poll.votes.filter((v) => v.slotIds.includes(slotId)).map((v) => v.name);
  const maxVotes = Math.max(1, ...poll.slots.map((s) => votersFor(s.id).length));

  const pickWinner = (slotId) => {
    const fresh = getPoll(pollId);
    fresh.winningSlotId = fresh.winningSlotId === slotId ? null : slotId;
    savePoll(fresh);
    setPoll({ ...fresh });
  };

  const link = `${window.location.origin}${window.location.pathname}#/poll/${pollId}`;
  const winningSlot = poll.slots.find((s) => s.id === poll.winningSlotId);
  const mailto = winningSlot ? buildMailto(poll, winningSlot, link) : "";

  return (
    <main className="card reveal">
      <p className="kicker">Risultati di</p>
      <h1 className="display">{poll.title}</h1>
      <p className="lede">
        {poll.votes.length === 0
          ? "Ancora nessun voto. Condividi il link!"
          : `${poll.votes.length} ${poll.votes.length === 1 ? "persona ha" : "persone hanno"} votato.`}
      </p>

      <ul className="slot-list">
        {poll.slots.map((s, i) => {
          const voters = votersFor(s.id);
          const isWinner = poll.winningSlotId === s.id;
          return (
            <li key={s.id} style={{ animationDelay: `${i * 60}ms` }} className="pop">
              <div className={`result ${isWinner ? "winner" : ""}`}>
                {isWinner && <span className="winner-badge">★ Slot scelto</span>}
                <div className="result-head">
                  <div>
                    <span className="ticket-when">{formatSlot(s.datetime, s.end)}</span>
                    {s.location && <span className="ticket-where">{s.location}</span>}
                  </div>
                  <span className="count">
                    {voters.length}
                    <small> {voters.length === 1 ? "voto" : "voti"}</small>
                  </span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar"
                    style={{ width: `${(voters.length / maxVotes) * 100}%` }}
                  />
                </div>
                <div className="result-foot">
                  <span className="voters">
                    {voters.length ? voters.join(", ") : "—"}
                  </span>
                  <button
                    className={`btn ${isWinner ? "btn-ink" : "btn-ghost"} small`}
                    onClick={() => pickWinner(s.id)}
                  >
                    {isWinner ? "Annulla scelta" : "Scegli questo"}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {winningSlot && (
        <section className="invite-panel pop">
          <p className="kicker">Invito</p>
          <h2>Finalizza la riunione</h2>
          <p className="invite-copy">
            Slot scelto: <strong>{formatSlot(winningSlot.datetime, winningSlot.end)}</strong>
            {winningSlot.location ? ` - ${winningSlot.location}` : ""}
          </p>
          <div className="linkbox invite-actions">
            <button
              className="btn btn-accent"
              onClick={() =>
                downloadIcs("quadra-invito.ics", buildIcs(poll, winningSlot, link))
              }
            >
              Scarica .ics
            </button>
            <a className="btn btn-ink" href={mailto}>
              Prepara email
            </a>
          </div>
        </section>
      )}

      <div className="row between">
        <a className="btn btn-ghost" href={`#/poll/${pollId}`}>
          ← Torna al voto
        </a>
        <button
          className="btn btn-ink"
          onClick={() => {
            navigator.clipboard.writeText(link);
            setCopied(true);
          }}
        >
          {copied ? "Copiato ✓" : "Copia link sondaggio"}
        </button>
      </div>
    </main>
  );
}
