// Persistenza minima su localStorage (vedi DECISIONS.md: niente backend).
// Modello: Poll { id, title, slots[], votes[], winningSlotId, createdAt }
//          Slot { id, datetime, end, location? } — end nello stesso giorno di datetime
//          Vote { id, name, slotIds[] }

const KEY = "quadra.polls";

export function loadPolls() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function savePolls(polls) {
  localStorage.setItem(KEY, JSON.stringify(polls));
}

export function getPoll(id) {
  return loadPolls()[id] || null;
}

export function savePoll(poll) {
  const polls = loadPolls();
  polls[poll.id] = poll;
  savePolls(polls);
}

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export function formatSlot(datetime, end) {
  const d = new Date(datetime);
  if (Number.isNaN(d.getTime())) return datetime;
  let s = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
  const e = new Date(end);
  if (end && !Number.isNaN(e.getTime())) {
    s += ` – ${new Intl.DateTimeFormat("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(e)}`;
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Sondaggio demo pre-caricato (TASKS P1: serve per il demo plan).
export function seedDemo() {
  const polls = loadPolls();
  // Ri-seeda anche un demo vecchio senza periodo (creato prima di Slot.end).
  if (polls["demo"]?.slots?.[0]?.end) return;
  const base = new Date();
  base.setDate(base.getDate() + 3);
  base.setHours(10, 0, 0, 0);
  const slot = (days, hours, location) => {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    d.setHours(hours, 0, 0, 0);
    return {
      id: uid(),
      datetime: d.toISOString(),
      end: new Date(d.getTime() + 3_600_000).toISOString(),
      location,
    };
  };
  const slots = [
    slot(0, 10, "Sala riunioni"),
    slot(1, 14, "Sala riunioni"),
    slot(2, 9, "Online"),
  ];
  polls["demo"] = {
    id: "demo",
    title: "Retrospettiva di team",
    slots,
    votes: [
      { id: uid(), name: "Giulia", slotIds: [slots[0].id, slots[2].id] },
      { id: uid(), name: "Marco", slotIds: [slots[2].id] },
    ],
    winningSlotId: null,
    createdAt: new Date().toISOString(),
  };
  savePolls(polls);
}
