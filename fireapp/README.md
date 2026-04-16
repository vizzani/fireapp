# FireApp — Guida al Deploy

## Struttura del progetto

```
fireapp/
├── index.html          ← App principale (PWA shell)
├── manifest.json       ← Configurazione installazione PWA
├── sw.js               ← Service Worker (funzionalità offline)
├── css/
│   └── app.css         ← Tutti gli stili
├── js/
│   └── app.js          ← Logica applicazione + Supabase
├── icons/              ← Icone app (aggiungere manualmente)
│   ├── icon-192.png
│   └── icon-512.png
└── schema.sql          ← Schema database Supabase
```

---

## PASSO 1 — Crea il progetto su Supabase (gratis)

1. Vai su **https://supabase.com** e registrati (gratis)
2. Clicca **New Project**
3. Dai un nome (es. "fireapp-prod") e scegli una password sicura
4. Seleziona la regione più vicina (es. eu-central-1 per l'Europa)
5. Aspetta ~2 minuti che il progetto venga creato

### 1a. Esegui lo schema SQL

1. Nel progetto Supabase → vai su **SQL Editor** (icona database a sinistra)
2. Clicca **New Query**
3. Incolla tutto il contenuto di `schema.sql`
4. Clicca **Run** (o Ctrl+Enter)
5. Dovresti vedere "Success" per ogni istruzione

### 1b. Crea il bucket per i PDF

1. Vai su **Storage** (icona cartella a sinistra)
2. Clicca **New Bucket**
3. Nome: `reports`
4. Lascia **Public: OFF** (i verbali sono privati)
5. Clicca **Save**

### 1c. Copia le tue credenziali

1. Vai su **Settings** → **API**
2. Copia:
   - **Project URL** (es. `https://abcdefgh.supabase.co`)
   - **anon public key** (stringa lunga che inizia con `eyJ...`)
3. Apri il file `js/app.js` e sostituisci le righe 8-9:

```javascript
const SUPABASE_URL      = 'https://TUO-PROGETTO.supabase.co';   // <-- incolla qui
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.XXXXX'; // <-- incolla qui
```

---

## PASSO 2 — Crea il primo utente admin

1. In Supabase → vai su **Authentication** → **Users**
2. Clicca **Invite User** (oppure **Add User** → Create New User)
3. Inserisci email e password del primo tecnico/admin
4. Clicca **Create**

### 2a. Collega l'utente all'organizzazione

Esegui questa query SQL in Supabase SQL Editor (sostituisci i valori):

```sql
-- Prima crea l'organizzazione
INSERT INTO organizations (name, vat_number, address, city, email)
VALUES ('Nome Tua Azienda', 'IT01234567890', 'Via Roma 1', 'Pescara', 'info@tuaazienda.it');

-- Poi collega l'utente (prendi l'UUID dall'Authentication > Users)
UPDATE profiles 
SET organization_id = (SELECT id FROM organizations WHERE name = 'Nome Tua Azienda'),
    full_name = 'Mario Rossi',
    role = 'admin',
    cert_number = 'VVF-12345'
WHERE id = 'UUID-UTENTE-DA-AUTHENTICATION';
```

---

## PASSO 3 — Deploy su Vercel (gratis)

### Metodo A — Drag & Drop (più semplice, nessun account GitHub necessario)

1. Vai su **https://vercel.com** e registrati con Google o GitHub
2. Clicca **Add New Project** → **Browse** (o trascina la cartella `fireapp`)
3. Vercel rileva automaticamente il progetto
4. Clicca **Deploy**
5. In ~30 secondi ricevi un URL tipo `fireapp-xyz.vercel.app`

### Metodo B — Via GitHub (consigliato per aggiornamenti automatici)

1. Crea un repository su **https://github.com** (gratuito)
2. Carica tutti i file della cartella `fireapp`
3. Su Vercel → **Add New Project** → **Import Git Repository**
4. Seleziona il tuo repository → **Deploy**
5. Da quel momento: ogni modifica su GitHub → deploy automatico in 30 secondi

---

## PASSO 4 — Collega il tuo dominio

1. In Vercel → **Settings** → **Domains**
2. Inserisci il tuo dominio (es. `fireapp.tuaazienda.it`)
3. Vercel ti mostra i record DNS da aggiungere
4. Accedi al pannello del tuo provider di dominio e aggiungi i record
5. Aspetta 5-10 minuti → HTTPS automatico incluso

---

## PASSO 5 — Installa la PWA sul telefono

**iPhone/Safari:**
1. Apri il sito nel browser Safari
2. Tocca il pulsante Condividi (□↑)
3. Scorri e tocca "Aggiungi a schermata Home"
4. L'app appare come icona nativa

**Android/Chrome:**
1. Apri il sito in Chrome
2. Il browser mostra automaticamente "Aggiungi a schermata Home"
3. Oppure: menu (⋮) → "Aggiungi a schermata Home"

---

## PASSO 6 — Aggiungere un nuovo tecnico (cliente SaaS)

Per ogni nuova azienda cliente che acquista il SaaS:
1. Crea un nuovo progetto Supabase (hai 2 gratis, poi 25€/mese/progetto)
2. Esegui di nuovo `schema.sql` nel nuovo progetto
3. Aggiorna le costanti in `app.js` con le nuove credenziali
4. Fai deploy su Vercel con un sottodominio diverso (es. `cliente2.tuaazienda.it`)

**Alternativa (avanzata):** usa un singolo progetto Supabase con multi-tenancy — 
ogni organizzazione ha i propri dati isolati grazie a Row Level Security. 
Contattami per implementare questo approccio.

---

## Icone app (da creare)

Servono due immagini PNG:
- `icons/icon-192.png` — 192×192 px
- `icons/icon-512.png` — 512×512 px

Puoi crearle gratuitamente su **https://www.canva.com** o **https://favicon.io**
con il logo della tua azienda o l'icona 🔥 su sfondo verde (#073524).

---

## Costi finali stimati

| Servizio       | Piano gratuito                          | Quando upgradare        |
|---------------|----------------------------------------|-------------------------|
| Supabase      | 2 progetti, 500MB DB, 1GB storage      | Oltre 2 clienti SaaS    |
| Vercel        | Illimitato per progetti statici/PWA    | Quasi mai necessario    |
| Dominio       | Non incluso (~10-15€/anno)             | Subito, ne hai già uno  |
| **Totale**    | **0€/mese** fino a 2 clienti SaaS      | ~25€/mese per progetto Supabase aggiuntivo |

---

## Supporto

Per domande sul deploy o personalizzazioni:
- Documentazione Supabase: https://supabase.com/docs
- Documentazione Vercel: https://vercel.com/docs
- Per modifiche all'app, riapri questa chat con Claude

---

*Generato da FireApp — versione MVP 1.0*
