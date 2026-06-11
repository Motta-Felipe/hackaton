import { useEffect, useState } from "react";
import Logo from "./Logo.jsx";
import CreatePoll from "./pages/CreatePoll.jsx";
import VotePage from "./pages/VotePage.jsx";
import Results from "./pages/Results.jsx";

// Routing minimale via location.hash (DECISIONS.md: niente react-router).
//   #/                  → crea sondaggio
//   #/poll/:id          → pagina di voto
//   #/poll/:id/results  → risultati
function parseRoute() {
  const hash = window.location.hash || "#/";
  const m = hash.match(/^#\/poll\/([^/]+)(\/results)?/);
  if (m) return { page: m[2] ? "results" : "vote", pollId: m[1] };
  return { page: "create", pollId: null };
}

export default function App() {
  const [route, setRoute] = useState(parseRoute);

  useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="shell">
      <header className="masthead">
        <a href="#/" className="brand">
          <Logo className="brand-logo" />
          Quadra<span className="brand-mark">.</span>
        </a>
        <span className="tagline">l'ora che mette tutti d'accordo</span>
      </header>
      {route.page === "create" && <CreatePoll />}
      {route.page === "vote" && <VotePage pollId={route.pollId} />}
      {route.page === "results" && <Results pollId={route.pollId} />}
      <footer className="colophon">Hackathon Agentico · demo locale</footer>
    </div>
  );
}
