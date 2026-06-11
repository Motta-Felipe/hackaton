# SPEC

Brief: **Hackathon Agentico — App di sondaggio per accordarsi sulle riunioni** (stile Doodle / Calendly).
Tempo totale ~1h30 (5 min intro · 45 min sviluppo · 40 min condivisione). Focus: funzionalità del prodotto + **il COME** (tool e metodologie con AI). Demo finale 3 min/team.

> Le sezioni qui sotto sono compilate con un'ipotesi MVP-first. Affinale, non riscriverle da capo.

## Problem
*Che problema risolviamo? Per chi è un problema reale?*

- Mettere d'accordo più persone su data/ora di una riunione è lento: troppi messaggi avanti e indietro. Serve un modo rapido per proporre slot e raccogliere preferenze.

## Users
*Chi usa l'app? Un solo tipo di utente o più ruoli?*

- **Autore/organizzatore**: crea il sondaggio e sceglie lo slot vincente.
- **Partecipante**: apre il link e vota gli slot che gli vanno bene. Nessun account richiesto (basta un nome).

## Goal
*In una frase: cosa deve fare l'app per dirsi riuscita?*

- Permettere di creare un sondaggio con più slot, condividerlo via link, far votare i partecipanti e far scegliere all'autore lo slot finale.

## MVP scope
*Qual è il taglio minimo mostrabile? Cosa entra DAVVERO nella prima demo?*

- Creare un sondaggio: titolo riunione + N slot temporali (data/ora, luogo opzionale).
- Ottenere un **link condivisibile** al sondaggio.
- Pagina di voto: il partecipante inserisce il nome e seleziona gli slot che gli vanno bene.
- Vista risultati: per ogni slot quante e quali persone hanno votato.
- L'autore seleziona lo slot vincente (evidenziato).

## Non-goals
*Cosa NON facciamo ora, anche se sarebbe bello? (taglia aggressivamente)*

- Autenticazione / login (vietato dalle regole: niente auth avanzata).
- Invio reale di email o invito calendario: al massimo **simulato** (link `mailto:` o file `.ics` generato) come stretch P1, non nell'MVP.
- Backend complessi, microservizi, deployment enterprise (vietati dalle regole).
- Modifica/cancellazione sondaggi, notifiche, fuso orario avanzato, multi-lingua.

## Assumptions
*Cosa diamo per scontato? (dati disponibili, API, ambiente, utenti)*

- Demo locale (un'istanza, una macchina). Pochi partecipanti.
- Identità = solo un nome digitato, nessuna verifica.
- Persistenza minima sufficiente per la durata della demo (storage semplice o in-memory).

## Risks
*Cosa può farci perdere tempo o bloccarci? Qual è il piano B?*

- **Tempo (solo ~45 min di sviluppo)** → piano B: stato in memoria o `localStorage`, niente DB.
- Link condivisibile reale tra dispositivi → piano B: stesso browser/istanza locale, ID sondaggio nell'URL.
- Real-time sui voti → piano B: refresh manuale della pagina risultati.

## User flow
*I 3-6 passi che l'utente compie nel percorso principale.*

1. L'autore crea un sondaggio: titolo + alcuni slot temporali.
2. L'app genera un link condivisibile.
3. Il partecipante apre il link, inserisce il nome e vota gli slot ok.
4. La vista risultati mostra i voti per slot.
5. L'autore sceglie lo slot vincente, che viene evidenziato.

## Architecture sketch
*Componenti principali e come comunicano. Bastano 2-3 righe o uno schema testuale.*

- App web a pagina singola con stato locale. Routing per ID sondaggio nell'URL (`/poll/:id`).
- Persistenza leggera: `localStorage` (MVP) o piccolo backend in-memory se serve la condivisione multi-dispositivo.
- Stack concreto = scelta del team: tienilo leggero (vedi `DECISIONS.md`).

## Data model
*Quali entità/dati servono? Campi minimi indispensabili.*

- `Poll { id, title, slots[], createdAt }`
- `Slot { id, datetime, end, location? }` (inizio e fine nello stesso giorno)
- `Vote { pollId, slotId, participantName }`
- `winningSlotId` sul Poll (impostato dall'autore).

## External dependencies
*API, librerie, servizi, chiavi. Quali servono ORA? (vedi DECISIONS.md per il perché)*

- Nessuna obbligatoria per l'MVP. Eventuale generazione `.ics` lato client (stretch). Niente servizi che richiedano chiavi/segreti.

## Acceptance criteria
*Come capiamo che l'MVP è "fatto"? Criteri verificabili.*

- [ ] Posso creare un sondaggio con titolo e almeno 2 slot.
- [ ] Ottengo un link al sondaggio.
- [ ] Da quel link posso votare uno o più slot inserendo un nome.
- [ ] La vista risultati mostra i voti per ciascuno slot.
- [ ] L'autore può marcare lo slot vincente e questo è evidenziato.

## Demo plan
*Cosa mostriamo, in che ordine, con quali dati. Vedi prompts/demo.md.*

1. Creo "Retrospettiva di team" con 3 slot.
2. Apro il link e voto come 2 partecipanti diversi (nomi pre-pensati).
3. Mostro i risultati e scelgo lo slot vincente.
4. Racconto in <60s il metodo: planner → SPEC → TASKS → builder, e l'uso degli agenti AI.
