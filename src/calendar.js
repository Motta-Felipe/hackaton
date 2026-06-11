const DEFAULT_DURATION_MS = 60 * 60 * 1000;

function escapeIcsText(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function toIcsDate(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function getSlotDates(slot) {
  const start = new Date(slot.datetime);
  const parsedEnd = slot.end ? new Date(slot.end) : null;
  const end =
    parsedEnd && !Number.isNaN(parsedEnd.getTime()) && parsedEnd > start
      ? parsedEnd
      : new Date(start.getTime() + DEFAULT_DURATION_MS);
  return { start, end };
}

function formatPeriod(slot) {
  const { start, end } = getSlotDates(slot);
  const day = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(start);
  const time = new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${day.charAt(0).toUpperCase() + day.slice(1)}, ${time.format(start)} - ${time.format(end)}`;
}

export function buildIcs(poll, slot, pollLink) {
  const { start, end } = getSlotDates(slot);
  const description = `Invito generato da Quadra.\nSondaggio: ${pollLink}`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Quadra//Hackathon Agentico//IT",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${escapeIcsText(`${poll.id}-${slot.id}@quadra.local`)}`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeIcsText(poll.title)}`,
  ];

  if (slot.location) {
    lines.push(`LOCATION:${escapeIcsText(slot.location)}`);
  }

  lines.push(
    `DESCRIPTION:${escapeIcsText(description)}`,
    "END:VEVENT",
    "END:VCALENDAR"
  );

  return `${lines.join("\r\n")}\r\n`;
}

export function downloadIcs(filename, content) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function buildMailto(poll, slot, pollLink) {
  const lines = [
    "Ciao,",
    "",
    `la riunione "${poll.title}" e' stata fissata.`,
    `Quando: ${formatPeriod(slot)}`,
  ];

  if (slot.location) {
    lines.push(`Dove: ${slot.location}`);
  }

  lines.push(
    "",
    `Link sondaggio: ${pollLink}`,
    "",
    "Invito generato da Quadra. Invio simulato tramite client email."
  );

  return `mailto:?subject=${encodeURIComponent(`Invito: ${poll.title}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
