/* FireApp — app.js — v1.1 */

const SUPABASE_URL      = 'https://bclfpawguqpwypahmzbk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjbGZwYXdndXFwd3lwYWhtemJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyOTI1NjQsImV4cCI6MjA5MTg2ODU2NH0.ONgZu-n7oWJaQJ7V6P3MOpBD9eUYA0YimGDHyi7DLcI';

// ─── CHECKLISTS ────────────────────────────────────────────────────────────────
const CHECKLISTS = {
  estintori: [
    { id:'est_01', desc:'Verifica accessibilita e segnaletica di posizionamento', norm:'D.Lgs 81/2008 - Art.46', freq:'semestrale' },
    { id:'est_02', desc:'Ispezione integrita corpo, manometro e ugello', norm:'UNI 9994-1 - Tab.1', freq:'semestrale' },
    { id:'est_03', desc:'Verifica carica (peso per polvere, pressione per CO2)', norm:'UNI 9994-1 - p.5.1.2', freq:'semestrale' },
    { id:'est_04', desc:'Controllo valvola di erogazione e leva', norm:'UNI 9994-1 - p.5.1.3', freq:'semestrale' },
    { id:'est_05', desc:'Verifica sigillo e spilla di sicurezza integri', norm:'UNI 9994-1 - p.5.1.4', freq:'semestrale' },
    { id:'est_06', desc:'Ispezione cartellino di manutenzione e data scadenza', norm:'UNI 9994-1 - p.4.2', freq:'semestrale' },
    { id:'est_07', desc:'Revisione completa con ricarica o sostituzione agente', norm:'UNI 9994-1 - p.6', freq:'triennale' },
    { id:'est_08', desc:'Collaudo idrostatico del serbatoio', norm:'UNI 9994-1 - p.7', freq:'decennale' },
  ],
  idranti: [
    { id:'idr_01', desc:'Ispezione visiva tubazione flessibile e raccordi', norm:'UNI 10779 - p.9.1', freq:'semestrale' },
    { id:'idr_02', desc:'Prova di erogazione: verifica portata e pressione', norm:'UNI 10779 - p.9.2', freq:'semestrale' },
    { id:'idr_03', desc:'Controllo apertura e tenuta valvola di intercettazione', norm:'UNI 10779 - p.9.3', freq:'semestrale' },
    { id:'idr_04', desc:'Verifica cassetta naspo, lancia e accessori', norm:'UNI 10779 - p.9.4', freq:'semestrale' },
    { id:'idr_05', desc:'Prova segnalatore di flusso e allarme', norm:'UNI 10779 - p.9.5', freq:'annuale' },
    { id:'idr_06', desc:'Controllo serbatoio idrico e livelli (se presente)', norm:'UNI 10779 - p.9.6', freq:'annuale' },
  ],
  irai: [
    { id:'irai_01', desc:'Verifica funzionamento centrale: display, segnalazioni, log eventi', norm:'UNI 9795 - p.12.1 - UNI EN 54-2', freq:'semestrale' },
    { id:'irai_02', desc:'Test rivelatori automatici zona per zona (fumo, calore, fiamma)', norm:'UNI 9795 - p.12.2', freq:'semestrale' },
    { id:'irai_03', desc:'Test pulsanti di allarme manuale (PAM)', norm:'UNI 9795 - p.12.3 - UNI EN 54-11', freq:'semestrale' },
    { id:'irai_04', desc:'Verifica segnalatori ottici e acustici di allarme', norm:'UNI 9795 - p.12.4', freq:'semestrale' },
    { id:'irai_05', desc:'Controllo alimentazione principale e batterie di riserva', norm:'UNI 9795 - p.12.5 - UNI EN 54-4', freq:'semestrale' },
    { id:'irai_06', desc:'Verifica isolatori di linea e integrita cablaggio', norm:'UNI 9795 - p.12.6', freq:'semestrale' },
    { id:'irai_07', desc:'Controllo interfacce con EVAC, sprinkler e porte tagliafuoco', norm:'UNI 9795 - p.12.7', freq:'semestrale' },
    { id:'irai_08', desc:'Verifica libro log: falsi allarmi, guasti, manutenzioni', norm:'UNI 9795 - p.12.8', freq:'semestrale' },
  ],
  evac: [
    { id:'evac_01', desc:'Verifica centrale EVAC e alimentazioni (rete + batteria)', norm:'UNI EN 54-16 - p.6.1 - UNI ISO 7240-19', freq:'mensile' },
    { id:'evac_02', desc:'Test messaggi preregistrati di evacuazione zona per zona', norm:'UNI EN 54-16 - p.6.2', freq:'mensile' },
    { id:'evac_03', desc:'Verifica amplificatori e livelli di uscita (dBSPL)', norm:'UNI EN 54-16 - p.6.3', freq:'semestrale' },
    { id:'evac_04', desc:'Test microfono di emergenza e priorita messaggi', norm:'UNI EN 54-16 - p.6.4', freq:'semestrale' },
    { id:'evac_05', desc:'Misura intelligibilita del parlato STI/RASTI per zona (soglia >= 0.50)', norm:'UNI EN 54-16 - p.7', freq:'annuale' },
    { id:'evac_06', desc:'Verifica diffusori: integrita fisica e copertura acustica', norm:'UNI ISO 7240-19 - p.8.1', freq:'semestrale' },
    { id:'evac_07', desc:'Controllo segnalazione guasti alla centrale', norm:'UNI EN 54-16 - p.6.5', freq:'semestrale' },
    { id:'evac_08', desc:'Verifica autonomia batterie (min 24h standby + 30min allarme)', norm:'UNI EN 54-16 - p.6.6', freq:'semestrale' },
  ],
  sprinkler: [
    { id:'spr_01', desc:'Verifica visiva centrale idrica: pompe, manometri, pressostati e valvole di controllo', norm:'UNI EN 12845 - p.20.1', freq:'semestrale' },
    { id:'spr_02', desc:'Prova di avviamento automatico pompa principale e pompa di riserva', norm:'UNI EN 12845 - p.20.2', freq:'semestrale' },
    { id:'spr_03', desc:'Verifica livello serbatoio idrico e tenuta valvole di intercettazione', norm:'UNI EN 12845 - p.20.3', freq:'semestrale' },
    { id:'spr_04', desc:'Controllo integrita testine sprinkler: assenza corrosione, ostruzioni e vernice', norm:'UNI EN 12845 - p.20.4', freq:'semestrale' },
    { id:'spr_05', desc:'Verifica valvole di allarme, gong idraulico e segnalatori di flusso', norm:'UNI EN 12845 - p.20.5', freq:'semestrale' },
    { id:'spr_06', desc:'Test prova flusso: verifica portata e pressione di esercizio a valle', norm:'UNI EN 12845 - p.20.6', freq:'annuale' },
    { id:'spr_07', desc:'Controllo e pulizia filtri, strainer e scarichi in fognatura', norm:'UNI EN 12845 - p.20.7', freq:'annuale' },
    { id:'spr_08', desc:'Verifica etichettatura zone sprinkler e planimetria aggiornata in centrale', norm:'UNI EN 12845 - p.20.8', freq:'annuale' },
  ],
  porte_rei: [
    { id:'rei_01', desc:'Verifica integrita porta: anta, telaio, guarnizioni intumescenti e soglia', norm:'UNI EN 1634-1 - D.M. 03/08/2015', freq:'semestrale' },
    { id:'rei_02', desc:'Controllo funzionamento maniglione antipanico, serratura e scrocco', norm:'UNI EN 1634-1 - p.6.3 - UNI EN 179', freq:'semestrale' },
    { id:'rei_03', desc:'Verifica dispositivo di autochiusura (molla aerea o asta a pavimento)', norm:'UNI 11473 - p.5.1 - UNI EN 1154', freq:'semestrale' },
    { id:'rei_04', desc:'Test di chiusura: la porta si chiude completamente e il latch scatta senza assistenza', norm:'UNI 11473 - p.5.2', freq:'semestrale' },
    { id:'rei_05', desc:'Controllo cerniere, perni e controtelaio: assenza giochi, allentamenti o deformazioni', norm:'UNI 11473 - p.5.3', freq:'semestrale' },
    { id:'rei_06', desc:'Verifica marcatura CE, targhetta identificativa con classe REI e certificazione di prodotto', norm:'D.M. 03/08/2015 - art.4', freq:'annuale' },
    { id:'rei_07', desc:'Verifica dispositivo di coordinamento ante (se porta a due ante) e sequenza di chiusura', norm:'UNI EN 1158 - UNI 11473 - p.5.4', freq:'annuale' },
  ],
  p1_irai: [
    { id:'p1_01', desc:'Acquisizione e verifica progetto esecutivo impianto IRAI (planimetrie, schema a blocchi, relazione tecnica)', norm:'UNI 11224:2011 - p.5.2.1 - D.M. 1/9/2021', freq:'p1' },
    { id:'p1_02', desc:'Verifica Dichiarazione di Conformita (Di.Co.) ai sensi del D.M. 37/2008 con allegati tecnici', norm:'D.M. 37/2008 - art.7 - UNI 11224:2011 - p.5.2.2', freq:'p1' },
    { id:'p1_03', desc:'Verifica certificazioni CE dei componenti (centrale, rivelatori, PAM, segnalatori) secondo UNI EN 54', norm:'UNI EN 54 - UNI 11224:2011 - p.5.2.3', freq:'p1' },
    { id:'p1_04', desc:'Acquisizione manuale di uso e manutenzione della centrale IRAI e dei componenti principali', norm:'UNI 11224:2011 - p.5.2.4 - UNI EN 54-2', freq:'p1' },
    { id:'p1_05', desc:'Verifica registro dei controlli precedenti (log storico manutenzioni, falsi allarmi, guasti)', norm:'UNI 9795 - p.12.8 - UNI 11224:2011 - p.5.2.5', freq:'p1' },
    { id:'p1_06', desc:'Acquisizione verbale di collaudo iniziale firmato dall installatore', norm:'UNI 11224:2011 - p.5.2.6', freq:'p1' },
    { id:'p1_07', desc:'Verifica corrispondenza numero e tipologia rivelatori installati vs progetto', norm:'UNI 9795 - p.5 - UNI 11224:2011 - p.5.3.1', freq:'p1' },
    { id:'p1_08', desc:'Verifica posizionamento rivelatori: altezze, interdistanze e coperture conforme UNI 9795', norm:'UNI 9795 - p.5.4 - UNI 11224:2011 - p.5.3.2', freq:'p1' },
    { id:'p1_09', desc:'Verifica numero e posizionamento PAM rispetto al progetto', norm:'UNI 9795 - p.5.6 - UNI 11224:2011 - p.5.3.3', freq:'p1' },
    { id:'p1_10', desc:'Verifica suddivisione in zone di rivelazione rispetto a planimetrie di progetto', norm:'UNI 9795 - p.5.2 - UNI 11224:2011 - p.5.3.4', freq:'p1' },
    { id:'p1_11', desc:'Verifica centrale: modello, capacita linee, firmware e corrispondenza con progetto', norm:'UNI EN 54-2 - UNI 11224:2011 - p.5.3.5', freq:'p1' },
    { id:'p1_12', desc:'Verifica cablaggio: tipo di linea (singola/ad anello), sezione cavi, segregazione percorsi', norm:'UNI 9795 - p.6 - UNI 11224:2011 - p.5.3.6', freq:'p1' },
    { id:'p1_13', desc:'Verifica interfacce di comando: sgancio porte REI, spegnimento HVAC, attivazione EVAC', norm:'UNI 9795 - p.5.9 - UNI 11224:2011 - p.5.3.7', freq:'p1' },
    { id:'p1_14', desc:'Test funzionale completo: simulazione allarme zona per zona, verifica attuatori e temporizzazioni', norm:'UNI 9795 - p.12 - UNI 11224:2011 - p.5.4', freq:'p1' },
    { id:'p1_15', desc:'Compilazione verbale di presa in consegna con riserve (se presenti) e firma del responsabile', norm:'UNI 11224:2011 - p.6 - D.M. 1/9/2021', freq:'p1' },
  ],
};

const FREQ_MONTHS = {
  mensile: 1, bimestrale: 2, trimestrale: 3,
  semestrale: 6, annuale: 12, biennale: 24,
  triennale: 36, quinquennale: 60, decennale: 120,
};

const EQ_TYPE_LABELS = {
  estintori: 'Estintori', idranti: 'Idranti', irai: 'IRAI',
  evac: 'EVAC', sprinkler: 'Sprinkler', porte_rei: 'Porte REI',
};

// ─── SUPABASE ──────────────────────────────────────────────────────────────────
const { createClient } = window.supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  }
});

// ─── STATE ────────────────────────────────────────────────────────────────────
let state = {
  user: null,
  profile: null,
  org: null,
  clients: [],
  currentClientId: null,
  currentInterventionId: null,
  currentInterventionType: null,
  currentEquipmentTypes: [],
  currentTab: 'estintori',
  currentEquipment: [],   // equipment del cliente aperto
  checklistResponses: {},
  scadenze: [],
  filter: 'all',
  navHistory: [],          // stack di navigazione per goBack()
};

function el(id) { return document.getElementById(id); }

// ─── INIT ─────────────────────────────────────────────────────────────────────
async function init() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(console.warn);
  setupOfflineBanner();
  const params = new URLSearchParams(location.search);
  if (params.get('action') === 'new-intervention') window._pendingAction = 'new-intervention';

  const { data: { session } } = await db.auth.getSession();
  if (session?.user) {
    state.user = session.user;
    await loadProfile();
    showApp();
    await loadDashboard();
  } else {
    showLogin();
  }

  db.auth.onAuthStateChange(async (event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      // Mostra modal per impostare la nuova password
      showApp();
      showPasswordUpdateModal();
    } else if (event === 'SIGNED_IN' && session?.user && !state.user) {
      state.user = session.user;
      await loadProfile();
      showApp();
      await loadDashboard();
    } else if (event === 'TOKEN_REFRESHED' && session?.user) {
      state.user = session.user;
      if (!state.org) await loadProfile();
    } else if (event === 'SIGNED_OUT') {
      state.user = null; state.profile = null; state.org = null;
      showLogin();
    }
  });
}

// ─── OFFLINE BANNER ───────────────────────────────────────────────────────────
function setupOfflineBanner() {
  const banner = document.createElement('div');
  banner.id = 'offline-banner';
  banner.textContent = 'Modalita offline — i dati saranno sincronizzati al rientro in rete';
  banner.style.cssText = 'display:none;position:fixed;top:64px;left:0;right:0;z-index:90;background:#f59e0b;color:#78350f;font-size:13px;font-weight:600;text-align:center;padding:8px 16px;';
  document.body.appendChild(banner);
  function update() { banner.style.display = navigator.onLine ? 'none' : 'block'; }
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
async function loadProfile() {
  const { data, error } = await db.from('profiles').select('*, organizations(*)').eq('id', state.user.id).single();
  if (error || !data) return;
  state.profile = data;
  state.org = data.organizations;
  const badge = el('user-badge');
  if (badge && data.full_name) badge.textContent = data.full_name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  // Mostra tab Team solo agli admin
  const teamNavItem = document.querySelector('.nav-item[data-screen="team"]');
  if (teamNavItem) teamNavItem.style.display = data.role === 'admin' ? '' : 'none';
}

function showLogin() {
  el('page-login').style.display = 'flex';
  el('app').classList.add('hidden');
}

function showApp() {
  el('page-login').style.display = 'none';
  el('app').classList.remove('hidden');
  if (window._pendingAction === 'new-intervention') {
    window._pendingAction = null;
    setTimeout(showNewInterventionModal, 500);
  }
}

el('form-login')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = el('input-email').value.trim();
  const password = el('input-password').value;
  const errEl = el('login-error');
  const btn = el('btn-login');
  btn.disabled = true;
  btn.textContent = 'Accesso in corso...';
  errEl.textContent = '';
  const { error } = await db.auth.signInWithPassword({ email, password });
  if (error) {
    errEl.textContent = 'Email o password errati. Riprovare.';
    btn.disabled = false;
    btn.textContent = 'Accedi';
  }
});

el('user-badge')?.addEventListener('click', () => {
  showModal(`
    <div class="modal-handle"></div>
    <div class="modal-title">Account</div>
    <p style="font-size:14px;color:var(--gray-600);margin-bottom:20px">
      ${state.profile?.full_name || state.user?.email}<br>
      <span style="font-size:12px">${state.org?.name || 'Organizzazione non configurata'}</span>
    </p>
    <button class="btn-danger" style="width:100%" onclick="signOut()">Esci</button>
  `);
});

async function signOut() {
  closeModal();
  await db.auth.signOut();
}

// ─── RESET PASSWORD ───────────────────────────────────────────────────────────
function showResetPasswordModal() {
  showModal(`
    <div class="modal-handle"></div>
    <div class="modal-title">Password dimenticata</div>
    <p style="font-size:14px;color:var(--gray-600);margin-bottom:18px">Inserisci la tua email. Ti invieremo un link per reimpostare la password.</p>
    <div class="form-field">
      <label>Email</label>
      <input id="reset-email" type="email" placeholder="tecnico@azienda.it">
    </div>
    <div id="reset-msg" style="font-size:13px;color:var(--green-600);margin-bottom:12px;display:none"></div>
    <button class="btn-primary" onclick="sendResetPassword()">Invia link di reset</button>
    <button class="btn-outline" onclick="closeModal()">Annulla</button>
  `);
}

async function sendResetPassword() {
  const email = el('reset-email')?.value.trim();
  if (!email) { showToast('Inserisci la tua email', 'error'); return; }
  const btn = document.querySelector('#modal-content .btn-primary');
  if (btn) { btn.disabled = true; btn.textContent = 'Invio in corso...'; }
  const { error } = await db.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/index.html',
  });
  if (btn) { btn.disabled = false; btn.textContent = 'Invia link di reset'; }
  if (error) { showToast('Errore: ' + error.message, 'error'); return; }
  const msg = el('reset-msg');
  if (msg) { msg.textContent = '✓ Email inviata! Controlla la tua casella (anche lo spam).'; msg.style.display = 'block'; }
}

function showPasswordUpdateModal() {
  showModal(`
    <div class="modal-handle"></div>
    <div class="modal-title">Imposta nuova password</div>
    <p style="font-size:14px;color:var(--gray-600);margin-bottom:18px">Inserisci la nuova password per il tuo account.</p>
    <div class="form-field">
      <label>Nuova password</label>
      <input id="new-pwd" type="password" placeholder="Minimo 8 caratteri">
    </div>
    <div class="form-field">
      <label>Conferma password</label>
      <input id="new-pwd2" type="password" placeholder="Ripeti la password">
    </div>
    <div id="pwd-update-msg" style="font-size:13px;margin-bottom:10px;display:none"></div>
    <button class="btn-primary" onclick="updatePassword()">Salva nuova password</button>
  `);
}

async function updatePassword() {
  const p1 = el('new-pwd')?.value;
  const p2 = el('new-pwd2')?.value;
  const msg = el('pwd-update-msg');
  if (!p1 || p1.length < 8) { showToast('Password minimo 8 caratteri', 'error'); return; }
  if (p1 !== p2) {
    if (msg) { msg.style.display = 'block'; msg.style.color = '#dc2626'; msg.textContent = 'Le password non coincidono.'; }
    return;
  }
  showLoading(true);
  const { error } = await db.auth.updateUser({ password: p1 });
  showLoading(false);
  if (error) { showToast('Errore: ' + error.message, 'error'); return; }
  closeModal();
  showToast('Password aggiornata. Rieffettua il login.', 'success');
  setTimeout(() => db.auth.signOut(), 1500);
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
const SCREEN_TITLES = {
  dashboard: 'Dashboard', clienti: 'Clienti',
  intervento: 'Intervento', scadenzario: 'Scadenzario',
  verbali: 'Verbali', team: 'Team',
};

function navigate(screen, pushHistory = true) {
  const currentScreen = document.querySelector('.screen.active')?.id?.replace('screen-', '');
  if (pushHistory && currentScreen && currentScreen !== screen) {
    state.navHistory.push(currentScreen);
    if (state.navHistory.length > 10) state.navHistory.shift();
  }
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const target = el('screen-' + screen);
  if (target) target.classList.add('active');
  const navItem = document.querySelector(`.nav-item[data-screen="${screen}"]`);
  if (navItem) navItem.classList.add('active');
  el('topbar-title').textContent = SCREEN_TITLES[screen] || '';
  el('topbar-subtitle').textContent = '';
  el('btn-back').classList.toggle('hidden', state.navHistory.length === 0);
  if (screen === 'clienti') loadClienti();
  if (screen === 'scadenzario') loadScadenzario();
  if (screen === 'verbali') loadVerbali();
  if (screen === 'team') loadTeam();
  // Mostra il tab Team solo agli admin
  const teamNavItem = document.querySelector('.nav-item[data-screen="team"]');
  if (teamNavItem) teamNavItem.style.display = state.profile?.role === 'admin' ? '' : 'none';
}

function goBack() {
  const prev = state.navHistory.pop();
  if (prev) {
    navigate(prev, false);
  } else {
    navigate('dashboard', false);
  }
  el('btn-back').classList.toggle('hidden', state.navHistory.length === 0);
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
async function loadDashboard() {
  showLoading(true);
  try {
    const today = new Date().toISOString().split('T')[0];
    const clientIds = await getOrgClientIds();
    const [{ data: todayInterv }, { data: scadenze }, { data: anomalies }, { count: clientiCount }] = await Promise.all([
      db.from('interventions').select('*, clients(name, city)').eq('date', today).eq('organization_id', state.org?.id),
      db.from('schedules').select('*').lte('next_date', addDays(today, 30)).eq('organization_id', state.org?.id).eq('status', 'scheduled'),
      clientIds.length ? db.from('anomalies').select('*').eq('resolved', false).in('client_id', clientIds) : Promise.resolve({ data: [] }),
      db.from('clients').select('*', { count: 'exact', head: true }).eq('organization_id', state.org?.id),
    ]);
    el('kpi-oggi').textContent = todayInterv?.length ?? 0;
    el('kpi-scadenze').textContent = scadenze?.length ?? 0;
    el('kpi-anomalie').textContent = anomalies?.length ?? 0;
    el('kpi-clienti').textContent = clientiCount ?? 0;
    const h = new Date().getHours();
    const greeting = h < 12 ? 'Buongiorno' : h < 18 ? 'Buon pomeriggio' : 'Buonasera';
    el('greeting').textContent = greeting + (state.profile?.full_name ? ', ' + state.profile.full_name.split(' ')[0] : '');
    renderDashboardAlerts(scadenze, anomalies, today);
    renderTodayInterventions(todayInterv || []);
    state.clients = await fetchClients();
  } catch (err) {
    console.error('Dashboard error:', err);
    showToast('Errore nel caricamento dati', 'error');
  } finally {
    showLoading(false);
  }
}

function renderDashboardAlerts(scadenze, anomalies, today) {
  const cont = el('alerts-container');
  cont.innerHTML = '';
  const overdue = (scadenze || []).filter(s => s.next_date < today);
  if (overdue.length > 0) cont.innerHTML += '<div class="alert alert-red" style="cursor:pointer" onclick="navigate(\'scadenzario\')"><strong>Manutenzioni scadute (' + overdue.length + ')</strong> — tocca per vedere</div>';
  const critical = (anomalies || []).filter(a => a.severity === 'critical' || a.severity === 'high');
  if (critical.length > 0) cont.innerHTML += '<div class="alert alert-purple"><strong>Anomalie urgenti aperte (' + critical.length + ')</strong></div>';
  const soon = (scadenze || []).filter(s => { const d = daysBetween(today, s.next_date); return d >= 0 && d <= 7; });
  if (soon.length > 0 && overdue.length === 0) cont.innerHTML += '<div class="alert alert-amber" style="cursor:pointer" onclick="navigate(\'scadenzario\')"><strong>Scadenze entro 7 giorni (' + soon.length + ')</strong> — tocca per vedere</div>';
}

function renderTodayInterventions(interventions) {
  const cont = el('today-interventions');
  if (!interventions.length) {
    cont.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><p>Nessun intervento programmato per oggi</p></div>';
    return;
  }
  cont.innerHTML = interventions.map(inv => {
    const tags = (inv.equipment_types || []).map(t => '<span class="badge badge-blue">' + (EQ_TYPE_LABELS[t] || t) + '</span>').join('');
    return '<div class="card" onclick="openIntervention(\'' + inv.id + '\')">' +
      '<div class="card-header"><div><div class="card-title">' + (inv.clients?.name || '—') + '</div>' +
      '<div class="card-sub">' + (inv.clients?.city || '') + ' - ' + inv.type + '</div></div>' +
      statusBadge(inv.status) + '</div>' +
      '<div class="card-tags">' + tags + '</div></div>';
  }).join('');
}

// ─── CLIENTI ──────────────────────────────────────────────────────────────────
async function fetchClients() {
  const { data } = await db.from('clients').select('*').eq('organization_id', state.org?.id).order('name');
  return data || [];
}

async function loadClienti() {
  showLoading(true);
  state.clients = await fetchClients();
  renderClienti(state.clients);
  showLoading(false);
}

function renderClienti(clients) {
  const cont = el('clienti-list');
  if (!clients.length) {
    cont.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><p>Nessun cliente ancora.<br>Aggiungine uno con il pulsante +</p></div>';
    return;
  }
  cont.innerHTML = '<div class="row-list">' + clients.map(c => {
    const icon = categoryIcon(c.category);
    return '<div class="row-item" onclick="openClient(\'' + c.id + '\')">' +
      '<div class="row-icon" style="background:' + icon.bg + '">' + icon.svg + '</div>' +
      '<div class="row-body"><div class="row-title">' + c.name + '</div>' +
      '<div class="row-desc">' + [c.address, c.city].filter(Boolean).join(' - ') + '</div></div>' +
      '<div class="row-right"><svg class="row-chevron" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div></div>';
  }).join('') + '</div>';
}

function filterClienti(query) {
  const q = query.toLowerCase();
  renderClienti(state.clients.filter(c => c.name.toLowerCase().includes(q) || (c.city || '').toLowerCase().includes(q)));
}

// ─── APRI CLIENTE (modal con info + impianti + interventi) ────────────────────
async function openClient(clientId) {
  state.currentClientId = clientId;
  let client = state.clients.find(c => c.id === clientId);
  if (!client) {
    const { data } = await db.from('clients').select('*').eq('id', clientId).single();
    client = data;
  }
  if (!client) return;
  showLoading(true);
  const [{ data: equip }, { data: lastInterv }] = await Promise.all([
    db.from('equipment').select('*').eq('client_id', clientId).order('type'),
    db.from('interventions').select('*').eq('client_id', clientId).order('date', { ascending: false }).limit(5),
  ]);
  showLoading(false);
  state.currentEquipment = equip || [];
  renderClientModal(client, equip || [], lastInterv || []);
}

function renderClientModal(client, equip, interventions) {
  const equipHtml = equip.length
    ? equip.map(e => {
        const isP6 = e.installation_date && isOlderThan(e.installation_date, 12);
        const dateStr = e.installation_date ? ' · Inst. ' + formatDate(e.installation_date) : '';
        const p6badge = isP6 ? '<span class="badge badge-red" style="margin-left:6px">P6</span>' : '';
        const brandStr = [e.brand, e.model].filter(Boolean).join(' ');
        return '<div class="equip-item">' +
          '<div class="equip-info">' +
          '<div class="equip-name"><strong>' + (EQ_TYPE_LABELS[e.type] || e.type) + '</strong> &times; ' + e.quantity + p6badge + '</div>' +
          '<div style="font-size:12px;color:var(--gray-500)">' + [brandStr, e.location, dateStr].filter(Boolean).join(' · ') + '</div>' +
          '</div>' +
          '<div class="equip-actions">' +
          '<button class="btn-icon" onclick="showEditEquipmentModal(\'' + e.id + '\',\'' + client.id + '\')" title="Modifica">' +
          '<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:var(--gray-500);fill:none;stroke-width:2;stroke-linecap:round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>' +
          '</button>' +
          '<button class="btn-icon btn-icon-red" onclick="deleteEquipment(\'' + e.id + '\',\'' + client.id + '\')" title="Elimina">' +
          '<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:var(--red-500,#dc2626);fill:none;stroke-width:2;stroke-linecap:round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>' +
          '</button>' +
          '</div></div>';
      }).join('')
    : '<div style="font-size:13px;color:var(--gray-500);padding:8px 0">Nessun impianto configurato</div>';

  const intervHtml = interventions.length
    ? interventions.map(i =>
        '<div class="row-item" onclick="closeModal();openIntervention(\'' + i.id + '\')">' +
        '<div class="row-body"><div class="row-title">' + formatDate(i.date) + ' — ' + capitalize(i.type) + '</div>' +
        '<div class="row-desc">n. ' + (i.report_number || 'Bozza') + '</div></div>' +
        statusBadge(i.outcome || i.status) + '</div>'
      ).join('')
    : '<div style="padding:10px 0;font-size:13px;color:var(--gray-500)">Nessun intervento registrato</div>';

  const infoLine = [client.address, client.city, client.province].filter(Boolean).join(', ');

  showModal(
    '<div class="modal-handle"></div>' +
    '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:4px">' +
    '<div class="modal-title" style="margin-bottom:0">' + client.name + '</div>' +
    '<button class="btn-secondary" style="padding:6px 12px;font-size:12px;flex-shrink:0;margin-left:10px" onclick="showEditClientModal(\'' + client.id + '\')">Modifica</button>' +
    '</div>' +
    '<p style="font-size:13px;color:var(--gray-500);margin-bottom:18px">' + (infoLine || 'Indirizzo non inserito') + (client.email ? ' · ' + client.email : '') + '</p>' +

    '<div class="section-header" style="margin-bottom:10px">' +
    '<span>Impianti installati</span>' +
    '<button class="btn-text" onclick="showAddEquipmentModal(\'' + client.id + '\')">+ Aggiungi</button>' +
    '</div>' +
    '<div id="equip-list-modal">' + equipHtml + '</div>' +

    '<div class="section-header" style="margin-top:18px;margin-bottom:8px"><span>Ultimi interventi</span></div>' +
    '<div class="row-list" style="margin-bottom:14px">' + intervHtml + '</div>' +

    '<button class="btn-primary" onclick="closeModal();showNewInterventionModal(\'' + client.id + '\')">+ Nuovo intervento</button>' +
    '<button class="btn-secondary" style="width:100%;margin-top:8px" onclick="showPresaInCaricoModal(\'' + client.id + '\')">Prendi in carico impianti (P1)</button>' +
    '<button class="btn-outline" onclick="closeModal()">Chiudi</button>'
  );
}

// ─── MODIFICA CLIENTE ─────────────────────────────────────────────────────────
function showEditClientModal(clientId) {
  const client = state.clients.find(c => c.id === clientId) || {};
  const cats = ['commerciale','industriale','civile','scuola','ospedale','albergo'];
  const catLabels = { commerciale:'Commerciale', industriale:'Industriale', civile:'Civile / Condominio', scuola:'Scuola / Ufficio pubblico', ospedale:'Ospedale / Sanitario', albergo:'Albergo / Ricettivo' };
  showModal(
    '<div class="modal-handle"></div>' +
    '<div class="modal-title">Modifica cliente</div>' +
    '<div class="form-field"><label>Ragione sociale *</label><input id="ec-name" value="' + esc(client.name) + '" placeholder="Es. Supermercato Rossi Srl"></div>' +
    '<div class="form-field"><label>Indirizzo</label><input id="ec-address" value="' + esc(client.address) + '" placeholder="Via Roma 1"></div>' +
    '<div class="form-field"><label>Citta</label><input id="ec-city" value="' + esc(client.city) + '" placeholder="Pescara"></div>' +
    '<div class="form-field"><label>Telefono</label><input type="tel" id="ec-phone" value="' + esc(client.phone) + '" placeholder="+39 085 000000"></div>' +
    '<div class="form-field"><label>Email</label><input type="email" id="ec-email" value="' + esc(client.email) + '" placeholder="info@cliente.it"></div>' +
    '<div class="form-field"><label>Categoria</label><select id="ec-cat">' +
    cats.map(c => '<option value="' + c + '"' + (client.category === c ? ' selected' : '') + '>' + catLabels[c] + '</option>').join('') +
    '</select></div>' +
    '<div class="form-field"><label>Note</label><textarea id="ec-notes" rows="2" placeholder="Informazioni aggiuntive...">' + esc(client.notes) + '</textarea></div>' +
    '<button class="btn-primary" onclick="saveEditClient(\'' + clientId + '\')">Salva modifiche</button>' +
    '<button class="btn-outline" onclick="openClient(\'' + clientId + '\')">Annulla</button>'
  );
}

async function saveEditClient(clientId) {
  const name = el('ec-name')?.value.trim();
  if (!name) { showToast('Il nome e obbligatorio', 'error'); return; }
  showLoading(true);
  const { error } = await db.from('clients').update({
    name,
    address: el('ec-address')?.value.trim() || null,
    city: el('ec-city')?.value.trim() || null,
    phone: el('ec-phone')?.value.trim() || null,
    email: el('ec-email')?.value.trim() || null,
    category: el('ec-cat')?.value || 'commerciale',
    notes: el('ec-notes')?.value.trim() || null,
  }).eq('id', clientId);
  showLoading(false);
  if (error) { showToast('Errore nel salvataggio', 'error'); return; }
  // Aggiorna lo state locale
  const idx = state.clients.findIndex(c => c.id === clientId);
  if (idx >= 0) {
    state.clients[idx] = { ...state.clients[idx], name, address: el('ec-address')?.value.trim(), city: el('ec-city')?.value.trim(), email: el('ec-email')?.value.trim() };
  }
  showToast('Cliente aggiornato', 'success');
  await openClient(clientId);
}

// ─── GESTIONE EQUIPMENT ───────────────────────────────────────────────────────
function showAddEquipmentModal(clientId) {
  const types = Object.keys(EQ_TYPE_LABELS);
  showModal(
    '<div class="modal-handle"></div>' +
    '<div class="modal-title">Aggiungi impianto</div>' +
    '<div class="form-field"><label>Tipo impianto *</label><select id="eq-type">' +
    types.map(t => '<option value="' + t + '">' + EQ_TYPE_LABELS[t] + '</option>').join('') +
    '</select></div>' +
    '<div class="form-field"><label>Quantita</label><input type="number" id="eq-qty" value="1" min="1"></div>' +
    '<div class="form-field"><label>Marca</label><input id="eq-brand" placeholder="Es. Sicurit"></div>' +
    '<div class="form-field"><label>Modello</label><input id="eq-model" placeholder="Es. ABC-200"></div>' +
    '<div class="form-field"><label>Posizione / Zona</label><input id="eq-loc" placeholder="Es. Piano terra, locale caldaia"></div>' +
    '<div class="form-field"><label>Data installazione</label><input type="date" id="eq-date"></div>' +
    '<div class="form-field"><label>Note</label><textarea id="eq-notes" rows="2" placeholder="Informazioni aggiuntive..."></textarea></div>' +
    '<button class="btn-primary" onclick="saveEquipment(\'' + clientId + '\', null)">Aggiungi impianto</button>' +
    '<button class="btn-outline" onclick="openClient(\'' + clientId + '\')">Annulla</button>'
  );
}

function showEditEquipmentModal(equipId, clientId) {
  const eq = state.currentEquipment.find(e => e.id === equipId);
  if (!eq) { showToast('Impianto non trovato', 'error'); return; }
  const types = Object.keys(EQ_TYPE_LABELS);
  showModal(
    '<div class="modal-handle"></div>' +
    '<div class="modal-title">Modifica impianto</div>' +
    '<div class="form-field"><label>Tipo impianto *</label><select id="eq-type">' +
    types.map(t => '<option value="' + t + '"' + (eq.type === t ? ' selected' : '') + '>' + EQ_TYPE_LABELS[t] + '</option>').join('') +
    '</select></div>' +
    '<div class="form-field"><label>Quantita</label><input type="number" id="eq-qty" value="' + (eq.quantity || 1) + '" min="1"></div>' +
    '<div class="form-field"><label>Marca</label><input id="eq-brand" value="' + esc(eq.brand) + '" placeholder="Es. Sicurit"></div>' +
    '<div class="form-field"><label>Modello</label><input id="eq-model" value="' + esc(eq.model) + '" placeholder="Es. ABC-200"></div>' +
    '<div class="form-field"><label>Posizione / Zona</label><input id="eq-loc" value="' + esc(eq.location) + '" placeholder="Es. Piano terra, locale caldaia"></div>' +
    '<div class="form-field"><label>Data installazione</label><input type="date" id="eq-date" value="' + (eq.installation_date || '') + '"></div>' +
    '<div class="form-field"><label>Note</label><textarea id="eq-notes" rows="2">' + esc(eq.notes) + '</textarea></div>' +
    '<button class="btn-primary" onclick="saveEquipment(\'' + clientId + '\', \'' + equipId + '\')">Salva modifiche</button>' +
    '<button class="btn-outline" onclick="openClient(\'' + clientId + '\')">Annulla</button>'
  );
}

async function saveEquipment(clientId, equipId) {
  const type = el('eq-type')?.value;
  const qty = parseInt(el('eq-qty')?.value || '1');
  if (!type) { showToast('Seleziona il tipo impianto', 'error'); return; }
  showLoading(true);
  const payload = {
    client_id: clientId,
    type,
    quantity: qty || 1,
    brand: el('eq-brand')?.value.trim() || null,
    model: el('eq-model')?.value.trim() || null,
    location: el('eq-loc')?.value.trim() || null,
    installation_date: el('eq-date')?.value || null,
    notes: el('eq-notes')?.value.trim() || null,
  };
  let error;
  if (equipId) {
    ({ error } = await db.from('equipment').update(payload).eq('id', equipId));
  } else {
    ({ error } = await db.from('equipment').insert(payload));
  }
  showLoading(false);
  if (error) { showToast('Errore nel salvataggio', 'error'); return; }
  showToast(equipId ? 'Impianto aggiornato' : 'Impianto aggiunto', 'success');
  await openClient(clientId);
}

async function deleteEquipment(equipId, clientId) {
  if (!confirm('Eliminare questo impianto? L\'operazione non e reversibile.')) return;
  showLoading(true);
  const { error } = await db.from('equipment').delete().eq('id', equipId);
  showLoading(false);
  if (error) { showToast('Errore nell\'eliminazione', 'error'); return; }
  showToast('Impianto eliminato', 'success');
  await openClient(clientId);
}

// ─── AGGIUNGI CLIENTE ─────────────────────────────────────────────────────────
function showAddClientModal() {
  showModal(
    '<div class="modal-handle"></div>' +
    '<div class="modal-title">Nuovo cliente</div>' +
    '<div class="form-field"><label>Ragione sociale *</label><input id="f-name" placeholder="Es. Supermercato Rossi Srl"></div>' +
    '<div class="form-field"><label>Indirizzo</label><input id="f-address" placeholder="Via Roma 1"></div>' +
    '<div class="form-field"><label>Citta</label><input id="f-city" placeholder="Pescara"></div>' +
    '<div class="form-field"><label>Telefono</label><input type="tel" id="f-phone" placeholder="+39 085 000000"></div>' +
    '<div class="form-field"><label>Email</label><input type="email" id="f-email" placeholder="info@cliente.it"></div>' +
    '<div class="form-field"><label>Categoria</label><select id="f-cat">' +
    '<option value="commerciale">Commerciale</option><option value="industriale">Industriale</option>' +
    '<option value="civile">Civile / Condominio</option><option value="scuola">Scuola / Ufficio pubblico</option>' +
    '<option value="ospedale">Ospedale / Sanitario</option><option value="albergo">Albergo / Ricettivo</option>' +
    '</select></div>' +
    '<button class="btn-primary" onclick="saveNewClient()">Salva cliente</button>' +
    '<button class="btn-outline" onclick="closeModal()">Annulla</button>'
  );
}

async function saveNewClient() {
  const name = el('f-name')?.value.trim();
  if (!name) { showToast('Il nome e obbligatorio', 'error'); return; }
  showLoading(true);
  const { error } = await db.from('clients').insert({
    organization_id: state.org.id,
    name,
    address: el('f-address')?.value.trim() || null,
    city: el('f-city')?.value.trim() || null,
    phone: el('f-phone')?.value.trim() || null,
    email: el('f-email')?.value.trim() || null,
    category: el('f-cat')?.value || 'commerciale',
  });
  showLoading(false);
  if (error) { showToast('Errore nel salvataggio', 'error'); return; }
  closeModal();
  showToast('Cliente aggiunto', 'success');
  await loadClienti();
}

// ─── NUOVO INTERVENTO ─────────────────────────────────────────────────────────
function showNewInterventionModal(preselectedClientId = null) {
  const clientOptions = state.clients.map(c =>
    '<option value="' + c.id + '"' + (c.id === preselectedClientId ? ' selected' : '') + '>' + c.name + '</option>'
  ).join('');
  const eqTypes = Object.keys(EQ_TYPE_LABELS);
  const eqCheckboxes = eqTypes.map(t =>
    '<label class="checkbox-label"><input type="checkbox" name="eq" value="' + t + '"' +
    (['estintori', 'idranti'].includes(t) ? ' checked' : '') + '> ' + EQ_TYPE_LABELS[t] + '</label>'
  ).join('');
  showModal(
    '<div class="modal-handle"></div>' +
    '<div class="modal-title">Nuovo intervento</div>' +
    '<div class="form-field"><label>Cliente *</label><select id="fi-client">' + (clientOptions || '<option value="">— Nessun cliente —</option>') + '</select></div>' +
    '<div class="form-field"><label>Data intervento</label><input type="date" id="fi-date" value="' + new Date().toISOString().split('T')[0] + '"></div>' +
    '<div class="form-field"><label>Tipo</label><select id="fi-type">' +
    '<option value="semestrale">Semestrale</option>' +
    '<option value="annuale">Annuale</option>' +
    '<option value="triennale">Triennale</option>' +
    '<option value="decennale">Decennale</option>' +
    '<option value="straordinario">Straordinario</option>' +
    '<option value="p1">Presa in Consegna (P1) - UNI 11224</option>' +
    '</select></div>' +
    '<div class="form-field"><label>Impianti da verificare</label><div class="checkbox-group">' + eqCheckboxes + '</div></div>' +
    '<button class="btn-primary" onclick="createIntervention()">Avvia intervento</button>' +
    '<button class="btn-outline" onclick="closeModal()">Annulla</button>'
  );
}

async function createIntervention() {
  const clientId = el('fi-client')?.value;
  const date = el('fi-date')?.value;
  const type = el('fi-type')?.value;
  const checked = [...document.querySelectorAll('input[name="eq"]:checked')].map(i => i.value);
  if (!clientId || !date) { showToast('Selezionare cliente e data', 'error'); return; }
  if (!checked.length) { showToast('Selezionare almeno un impianto', 'error'); return; }
  showLoading(true);
  const { data: reportNum } = await db.rpc('generate_report_number', { org_id: state.org.id });
  const { data, error } = await db.from('interventions').insert({
    organization_id: state.org.id,
    client_id: clientId,
    technician_id: state.user.id,
    date,
    type,
    equipment_types: checked,
    status: 'in_progress',
    report_number: reportNum,
  }).select().single();
  showLoading(false);
  if (error || !data) { showToast('Errore nella creazione', 'error'); return; }
  closeModal();
  await openIntervention(data.id);
}

// ─── APRI INTERVENTO ──────────────────────────────────────────────────────────
async function openIntervention(interventionId) {
  showLoading(true);
  state.currentInterventionId = interventionId;
  state.checklistResponses = {};
  const [{ data: inv }, { data: responses }] = await Promise.all([
    db.from('interventions').select('*, clients(name, city, address)').eq('id', interventionId).single(),
    db.from('checklist_responses').select('*').eq('intervention_id', interventionId),
  ]);
  showLoading(false);
  if (!inv) return;
  state.currentInterventionType = inv.type;
  state.currentEquipmentTypes = inv.equipment_types || [];
  (responses || []).forEach(r => {
    state.checklistResponses[r.item_id] = { status: r.status, note: r.note || '', photo_path: r.photo_url || '' };
  });
  navigate('intervento');
  el('topbar-title').textContent = inv.clients?.name || 'Intervento';
  el('topbar-subtitle').textContent = formatDate(inv.date) + ' - ' + inv.type;
  el('btn-back').classList.remove('hidden');
  const total = state.currentEquipmentTypes.flatMap(t => CHECKLISTS[t] || []).length;
  const done = Object.values(state.checklistResponses).filter(r => r.status !== 'pending').length;
  el('interv-header-name').textContent = inv.clients?.name || '';
  el('interv-header-date').textContent = formatDate(inv.date) + ' - n. ' + inv.report_number;
  updateProgress(done, total);
  el('intervento-tabs').innerHTML = inv.equipment_types.map((t, i) =>
    '<button class="tab-btn' + (i === 0 ? ' active' : '') + '" data-tab="' + t + '" onclick="switchTab(this,\'' + t + '\')">' +
    (EQ_TYPE_LABELS[t] || t) + '</button>'
  ).join('');
  state.currentTab = inv.equipment_types[0];
  renderChecklist(state.currentTab);
  el('btn-complete-interv').classList.remove('hidden');
}

function switchTab(btn, tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.currentTab = tab;
  renderChecklist(tab);
}

function renderChecklist(tab) {
  const isP1 = state.currentInterventionType === 'p1';
  const items = isP1 ? (CHECKLISTS['p1_irai'] || []) : (CHECKLISTS[tab] || []);
  const content = document.querySelector('#screen-intervento .checklist-area');
  if (!content) return;
  if (isP1 && tab !== 'irai') {
    content.innerHTML = '<div style="background:#fffbeb;border-left:3px solid #f59e0b;border-radius:0 10px 10px 0;padding:10px 13px;margin-bottom:12px;font-size:13px;color:#78350f"><strong>Presa in Consegna (P1) - UNI 11224</strong><br>Seleziona la tab IRAI per compilare la checklist P1.</div>';
    return;
  }
  if (!items.length) {
    content.innerHTML = '<div style="padding:24px;text-align:center;font-size:14px;color:var(--gray-500)">Nessuna voce checklist per questo tipo di impianto.</div>';
    return;
  }
  content.innerHTML = items.map(item => {
    const r = state.checklistResponses[item.id] || { status: 'pending', note: '', photo_path: '' };
    const itemCls = r.status !== 'pending' ? 'status-' + r.status : '';
    const noteVis = r.status === 'anomaly' ? 'visible' : '';
    const freqCls = item.freq === 'p1' ? 'freq-p1' : 'freq-' + item.freq;
    const freqLbl = item.freq === 'p1' ? 'Presa in consegna' : item.freq;
    const photoPreview = r.photo_path ? '<div id="photo-preview-' + item.id + '" style="margin-top:6px"><span style="font-size:11px;color:var(--green-500)">Foto allegata</span></div>' : '<div id="photo-preview-' + item.id + '"></div>';
    return '<div class="cl-item ' + itemCls + '" id="cl-' + item.id + '">' +
      '<div class="cl-body">' +
      '<div class="cl-desc">' + item.desc + '</div>' +
      '<div class="cl-norm">' + item.norm + '</div>' +
      '<span class="cl-freq ' + freqCls + '">' + freqLbl + '</span>' +
      '<div class="cl-note ' + noteVis + '" id="note-' + item.id + '">' +
      '<textarea rows="2" placeholder="Descrivi l anomalia riscontrata..." onchange="saveNote(\'' + item.id + '\', this.value)">' + (r.note || '') + '</textarea>' +
      '<div style="margin-top:6px;display:flex;align-items:center;gap:8px">' +
      '<label style="font-size:12px;color:var(--gray-500);display:flex;align-items:center;gap:6px;cursor:pointer">' +
      '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:var(--green-500);fill:none;stroke-width:2;stroke-linecap:round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>' +
      'Allega foto anomalia' +
      '<input type="file" accept="image/*" capture="environment" style="display:none" onchange="uploadAnomalyPhoto(\'' + item.id + '\', this)">' +
      '</label>' +
      '<span id="photo-status-' + item.id + '" style="font-size:11px;color:var(--green-500)"></span>' +
      '</div>' +
      photoPreview +
      '</div></div>' +
      '<div class="cl-actions">' +
      '<button class="cl-action-btn btn-ok' + (r.status === 'ok' ? ' active' : '') + '" onclick="setStatus(\'' + item.id + '\',\'ok\')">OK</button>' +
      '<button class="cl-action-btn btn-anomaly' + (r.status === 'anomaly' ? ' active' : '') + '" onclick="setStatus(\'' + item.id + '\',\'anomaly\')">Anomalia</button>' +
      '<button class="cl-action-btn btn-na' + (r.status === 'na' ? ' active' : '') + '" onclick="setStatus(\'' + item.id + '\',\'na\')">N/A</button>' +
      '</div></div>';
  }).join('');
}

async function setStatus(itemId, status) {
  const prev = state.checklistResponses[itemId] || { status: 'pending', note: '', photo_path: '' };
  state.checklistResponses[itemId] = { ...prev, status };
  const row = el('cl-' + itemId);
  const note = el('note-' + itemId);
  if (row) {
    row.className = 'cl-item status-' + status;
    row.querySelectorAll('.cl-action-btn').forEach(b => b.classList.remove('active'));
    row.querySelector('.btn-' + status)?.classList.add('active');
  }
  if (note) note.classList.toggle('visible', status === 'anomaly');
  // Calcola totale corretto per questa specifica lista impianti
  const equipTypes = state.currentInterventionType === 'p1' ? ['p1_irai'] : state.currentEquipmentTypes;
  const total = equipTypes.flatMap(t => CHECKLISTS[t] || []).length;
  const done = Object.values(state.checklistResponses).filter(r => r.status !== 'pending').length;
  updateProgress(done, total);
  await db.from('checklist_responses').upsert({
    intervention_id: state.currentInterventionId,
    item_id: itemId,
    equipment_type: state.currentTab,
    status,
    note: state.checklistResponses[itemId].note,
    photo_url: state.checklistResponses[itemId].photo_path || null,
  }, { onConflict: 'intervention_id,item_id' });
  if (status === 'anomaly') {
    const item = Object.values(CHECKLISTS).flat().find(i => i.id === itemId);
    const clientId = await getClientIdForIntervention();
    await db.from('anomalies').upsert({
      intervention_id: state.currentInterventionId,
      client_id: clientId,
      item_id: itemId,
      equipment_type: state.currentTab,
      description: item?.desc || itemId,
      severity: 'medium',
    }, { onConflict: 'intervention_id,item_id' }).catch(() => {});
  }
}

async function saveNote(itemId, note) {
  if (state.checklistResponses[itemId]) state.checklistResponses[itemId].note = note;
  await db.from('checklist_responses').upsert({
    intervention_id: state.currentInterventionId,
    item_id: itemId,
    equipment_type: state.currentTab,
    status: state.checklistResponses[itemId]?.status || 'anomaly',
    note,
    photo_url: state.checklistResponses[itemId]?.photo_path || null,
  }, { onConflict: 'intervention_id,item_id' });
}

async function uploadAnomalyPhoto(itemId, input) {
  const file = input.files[0];
  if (!file) return;
  const statusEl = el('photo-status-' + itemId);
  const previewEl = el('photo-preview-' + itemId);
  if (statusEl) statusEl.textContent = 'Caricamento...';
  try {
    const resized = await resizeImage(file, 1200);
    const ext = file.name.split('.').pop() || 'jpg';
    const path = state.org.id + '/' + state.currentInterventionId + '/' + itemId + '.' + ext;
    const { error } = await db.storage.from('reports').upload(path, resized, { upsert: true, contentType: resized.type });
    if (error) throw error;
    state.checklistResponses[itemId] = { ...state.checklistResponses[itemId], photo_path: path };
    await db.from('checklist_responses').upsert({
      intervention_id: state.currentInterventionId,
      item_id: itemId,
      equipment_type: state.currentTab,
      status: state.checklistResponses[itemId]?.status || 'anomaly',
      note: state.checklistResponses[itemId]?.note || '',
      photo_url: path,
    }, { onConflict: 'intervention_id,item_id' });
    if (statusEl) statusEl.textContent = 'Foto allegata';
    if (previewEl) previewEl.innerHTML = '<span style="font-size:11px;color:var(--green-500)">Foto allegata correttamente</span>';
    showToast('Foto caricata', 'success');
  } catch (err) {
    console.error('Photo upload error:', err);
    if (statusEl) statusEl.textContent = 'Errore upload';
    showToast('Errore nel caricamento foto', 'error');
  }
}

function resizeImage(file, maxPx) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const ratio = Math.min(maxPx / img.width, maxPx / img.height, 1);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * ratio);
      canvas.height = Math.round(img.height * ratio);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.82);
    };
    img.src = url;
  });
}

function updateProgress(done, total) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  const bar = el('interv-progress-bar');
  const lbl = el('interv-progress-label');
  if (bar) bar.style.width = pct + '%';
  if (lbl) lbl.textContent = 'Completato ' + done + '/' + total + ' controlli';
}

// ─── FIRMA E COMPLETAMENTO ────────────────────────────────────────────────────
async function completeIntervention() {
  showSignatureModal();
}

function showSignatureModal() {
  showModal(
    '<div class="modal-handle"></div>' +
    '<div class="modal-title">Firma del cliente</div>' +
    '<p style="font-size:13px;color:var(--gray-500);margin-bottom:14px">Il cliente firma direttamente sullo schermo per approvare il verbale.</p>' +
    '<canvas id="sig-canvas" class="sig-canvas" width="400" height="160"></canvas>' +
    '<div class="sig-label">Firma qui sopra con il dito</div>' +
    '<div style="display:flex;gap:8px;margin-top:12px">' +
    '<button class="btn-secondary" style="flex:1" onclick="clearSignature()">Cancella</button>' +
    '<button class="btn-primary" style="flex:1;margin-top:0" onclick="confirmSignatureAndComplete()">Conferma e genera verbale</button>' +
    '</div>' +
    '<button class="btn-outline" onclick="skipSignature()">Salta firma</button>'
  );
  setTimeout(initSignaturePad, 50);
}

function initSignaturePad() {
  const canvas = el('sig-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let drawing = false;
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  ctx.scale(ratio, ratio);
  ctx.strokeStyle = '#073524';
  ctx.lineWidth = 2.2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  function getPos(e) {
    const r = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - r.left, y: src.clientY - r.top };
  }
  function start(e) { e.preventDefault(); drawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); }
  function move(e) { e.preventDefault(); if (!drawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(p.x, p.y); }
  function stop(e) { e.preventDefault(); drawing = false; }
  canvas.addEventListener('mousedown', start, { passive: false });
  canvas.addEventListener('mousemove', move, { passive: false });
  canvas.addEventListener('mouseup', stop, { passive: false });
  canvas.addEventListener('touchstart', start, { passive: false });
  canvas.addEventListener('touchmove', move, { passive: false });
  canvas.addEventListener('touchend', stop, { passive: false });
}

function clearSignature() {
  const canvas = el('sig-canvas');
  if (!canvas) return;
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.getContext('2d').clearRect(0, 0, rect.width * ratio, rect.height * ratio);
}

async function skipSignature() {
  closeModal();
  await finalizeIntervention(null);
}

async function confirmSignatureAndComplete() {
  const canvas = el('sig-canvas');
  let signatureData = null;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    if (pixels.some((v, i) => i % 4 === 3 && v > 0)) signatureData = canvas.toDataURL('image/png');
  }
  closeModal();
  await finalizeIntervention(signatureData);
}

async function finalizeIntervention(signatureData) {
  const anomalies = Object.values(state.checklistResponses).filter(r => r.status === 'anomaly').length;
  const outcome = anomalies > 0 ? 'anomalie' : 'conforme';
  showLoading(true);
  await generateSchedules();
  await db.from('interventions').update({
    status: 'completed',
    outcome,
    client_signature: signatureData,
    completed_at: new Date().toISOString(),
  }).eq('id', state.currentInterventionId);
  showLoading(false);
  showToast('Intervento completato', 'success');
  navigate('verbali');
  loadVerbali();
}

async function generateSchedules() {
  const { data: inv } = await db.from('interventions').select('*').eq('id', state.currentInterventionId).single();
  if (!inv) return;
  const toInsert = [];
  for (const eqType of inv.equipment_types) {
    const items = CHECKLISTS[eqType] || [];
    const freqs = [...new Set(items.map(i => i.freq).filter(f => f !== 'p1'))];
    for (const freq of freqs) {
      toInsert.push({
        client_id: inv.client_id,
        organization_id: inv.organization_id,
        equipment_type: eqType,
        maintenance_type: freq,
        last_date: inv.date,
        next_date: addMonths(inv.date, FREQ_MONTHS[freq] || 6),
        intervention_id: inv.id,
        status: 'scheduled',
      });
    }
  }
  if (toInsert.length) await db.from('schedules').insert(toInsert);
}

// ─── SCADENZARIO ──────────────────────────────────────────────────────────────
async function loadScadenzario() {
  showLoading(true);
  const { data } = await db.from('schedules').select('*, clients(name, city)').eq('organization_id', state.org?.id).neq('status', 'completed').order('next_date');
  showLoading(false);
  state.scadenze = data || [];
  renderScadenzario(state.scadenze, state.filter);
}

function filterScadenze(btn, filter) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  state.filter = filter;
  renderScadenzario(state.scadenze, filter);
}

function renderScadenzario(scadenze, filter) {
  const today = new Date().toISOString().split('T')[0];
  const in30 = addDays(today, 30);
  let filtered = scadenze;
  if (filter === 'expired') filtered = scadenze.filter(s => s.next_date < today);
  if (filter === 'soon') filtered = scadenze.filter(s => s.next_date >= today && s.next_date <= in30);
  if (filter === 'ok') filtered = scadenze.filter(s => s.next_date > in30);
  const cont = el('scadenzario-list');
  if (!filtered.length) {
    cont.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg><p>Nessuna scadenza in questa categoria</p></div>';
    return;
  }
  const groups = {};
  filtered.forEach(s => { const k = s.next_date.slice(0, 7); if (!groups[k]) groups[k] = []; groups[k].push(s); });
  cont.innerHTML = Object.entries(groups).map(([month, items]) => {
    const [year, m] = month.split('-');
    const label = new Date(year, m - 1).toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
    return '<div class="month-group"><div class="month-label">' + label + '</div>' +
      items.map(s => {
        const isOver = s.next_date < today;
        const dotCls = isOver ? 'dot-red' : s.next_date <= in30 ? 'dot-amber' : 'dot-green';
        const dateStr = new Date(s.next_date).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' });
        return '<div class="scad-item"><div class="scad-dot ' + dotCls + '"></div>' +
          '<div class="scad-body"><div class="scad-title">' + (s.clients?.name || '—') + ' - ' + capitalize(s.equipment_type) + '</div>' +
          '<div class="scad-sub">' + capitalize(s.maintenance_type) + ' - ' + (s.clients?.city || '') + '</div></div>' +
          '<div class="scad-date' + (isOver ? ' overdue' : '') + '">' + dateStr + '</div></div>';
      }).join('') + '</div>';
  }).join('');
}

// ─── VERBALI ──────────────────────────────────────────────────────────────────
async function loadVerbali() {
  showLoading(true);
  const { data } = await db.from('interventions').select('*, clients(name, city, email)').eq('organization_id', state.org?.id).in('status', ['completed', 'signed']).order('date', { ascending: false });
  showLoading(false);
  const cont = el('verbali-list');
  if (!data?.length) {
    cont.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><p>Nessun verbale ancora.<br>Completa un intervento per generarlo.</p></div>';
    return;
  }
  cont.innerHTML = data.map(inv =>
    '<div class="verbale-item" onclick="showVerbaleDetail(\'' + inv.id + '\')">' +
    '<div class="verbale-header"><div>' +
    '<div class="verbale-number">Verbale n. ' + (inv.report_number || '—') + '</div>' +
    '<div class="verbale-date">' + formatDate(inv.date) + ' - ' + inv.type + '</div>' +
    '</div>' + statusBadge(inv.outcome || inv.status) + '</div>' +
    '<div class="verbale-client">' + (inv.clients?.name || '—') + '</div>' +
    '<div class="verbale-footer">' +
    '<span style="font-size:12px;color:var(--gray-500)">' + (inv.equipment_types || []).map(t => EQ_TYPE_LABELS[t] || t).join(', ') + '</span>' +
    '<button class="btn-text" onclick="event.stopPropagation();generatePDF(\'' + inv.id + '\')">Scarica PDF</button>' +
    '</div></div>'
  ).join('');
}

// ─── DETTAGLIO VERBALE ────────────────────────────────────────────────────────
async function showVerbaleDetail(interventionId) {
  showLoading(true);
  const [{ data: inv }, { data: anom }] = await Promise.all([
    db.from('interventions').select('*, clients(name, address, city, email), profiles(full_name, cert_number)').eq('id', interventionId).single(),
    db.from('anomalies').select('*').eq('intervention_id', interventionId),
  ]);
  showLoading(false);
  if (!inv) return;

  const clientEmail = inv.clients?.email || '';
  const impianti = (inv.equipment_types || []).map(t => EQ_TYPE_LABELS[t] || t).join(', ');
  const anomHtml = anom?.length
    ? '<div style="background:#fef2f2;border-left:3px solid #dc2626;border-radius:0 8px 8px 0;padding:10px 12px;margin-top:14px">' +
      '<div style="font-size:12px;font-weight:700;color:#dc2626;margin-bottom:8px">Anomalie rilevate (' + anom.length + ')</div>' +
      anom.map(a => {
        const sevLabel = { critical:'Critica', high:'Alta', medium:'Media', low:'Bassa' }[a.severity] || '';
        return '<div style="font-size:12px;color:var(--gray-700);padding:4px 0;border-bottom:1px solid #fecaca">' +
          '<strong>' + capitalize(a.equipment_type) + '</strong> · ' + sevLabel + '<br>' +
          '<span style="color:var(--gray-600)">' + a.description + '</span>' +
          '</div>';
      }).join('') + '</div>'
    : '';

  showModal(
    '<div class="modal-handle"></div>' +
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">' +
    '<div class="modal-title" style="margin-bottom:0">Verbale n. ' + (inv.report_number || '—') + '</div>' +
    statusBadge(inv.outcome || inv.status) +
    '</div>' +
    '<p style="font-size:13px;color:var(--gray-500);margin-bottom:16px">' + formatDate(inv.date) + ' · ' + capitalize(inv.type) + '</p>' +

    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">' +
    infoRow('Cliente', inv.clients?.name || '—') +
    infoRow('Indirizzo', [inv.clients?.address, inv.clients?.city].filter(Boolean).join(', ') || '—') +
    infoRow('Tecnico', inv.profiles?.full_name || '—') +
    infoRow('Cert. VVF', inv.profiles?.cert_number || '—') +
    infoRow('Impianti', impianti) +
    infoRow('Esito', outcomeLabel(inv.outcome)) +
    '</div>' +
    anomHtml +

    '<div style="display:flex;gap:8px;margin-top:18px">' +
    '<button class="btn-primary" style="flex:1" onclick="generatePDF(\'' + interventionId + '\')">Scarica PDF</button>' +
    '<button class="btn-secondary" style="flex:1;margin-top:0" onclick="showSendEmailModal(\'' + interventionId + '\',\'' + esc(clientEmail) + '\')">Invia via email</button>' +
    '</div>' +
    '<button class="btn-outline" onclick="closeModal()">Chiudi</button>'
  );
}

function infoRow(label, value) {
  return '<div style="background:var(--gray-50,#f9fafb);border-radius:8px;padding:8px 10px">' +
    '<div style="font-size:11px;color:var(--gray-500);margin-bottom:2px">' + label + '</div>' +
    '<div style="font-size:13px;font-weight:600;color:var(--gray-800)">' + (value || '—') + '</div>' +
    '</div>';
}

// ─── INVIO EMAIL VERBALE ──────────────────────────────────────────────────────
function showSendEmailModal(interventionId, prefilledEmail) {
  showModal(
    '<div class="modal-handle"></div>' +
    '<div class="modal-title">Invia verbale via email</div>' +
    '<p style="font-size:14px;color:var(--gray-600);margin-bottom:16px">Il PDF del verbale verra generato e inviato all\'indirizzo indicato.</p>' +
    '<div class="form-field"><label>Email destinatario *</label><input id="send-email-addr" type="email" value="' + esc(prefilledEmail) + '" placeholder="cliente@azienda.it"></div>' +
    '<div id="email-send-msg" style="font-size:13px;margin-bottom:10px;display:none"></div>' +
    '<button class="btn-primary" onclick="sendVerbaleEmail(\'' + interventionId + '\')">Invia</button>' +
    '<button class="btn-outline" onclick="showVerbaleDetail(\'' + interventionId + '\')">Annulla</button>'
  );
}

async function sendVerbaleEmail(interventionId) {
  const emailAddr = el('send-email-addr')?.value.trim();
  if (!emailAddr || !emailAddr.includes('@')) { showToast('Inserisci un\'email valida', 'error'); return; }
  const msgEl = el('email-send-msg');

  // 1. Genera PDF in memoria e carica su Storage
  showLoading(true);
  try {
    const pdfBlob = await generatePDFBlob(interventionId);
    if (!pdfBlob) throw new Error('PDF non generato');

    // Carica su Supabase Storage
    const storagePath = state.org.id + '/verbali/' + interventionId + '.pdf';
    await db.storage.from('reports').upload(storagePath, pdfBlob, { upsert: true, contentType: 'application/pdf' });

    // Aggiorna pdf_url nel DB
    await db.from('interventions').update({ pdf_url: storagePath }).eq('id', interventionId);

    // 2. Chiama la Edge Function (se deployata)
    const { error: fnError } = await db.functions.invoke('send-verbale-email', {
      body: { intervention_id: interventionId, recipient_email: emailAddr, pdf_storage_path: storagePath }
    });
    showLoading(false);

    if (fnError) {
      // Edge Function non ancora deployata: scarica comunque il PDF
      if (msgEl) {
        msgEl.style.display = 'block';
        msgEl.style.color = '#d97706';
        msgEl.innerHTML = '⚠️ Funzione email non ancora configurata sul server.<br>' +
          'Il PDF e stato caricato — <strong>scaricalo e invialo manualmente</strong> al cliente.';
      }
      // Scarica il PDF in locale come fallback
      await generatePDF(interventionId);
    } else {
      if (msgEl) {
        msgEl.style.display = 'block';
        msgEl.style.color = 'var(--green-600)';
        msgEl.textContent = 'Email inviata correttamente a ' + emailAddr;
      }
      showToast('Email inviata', 'success');
    }
  } catch (err) {
    showLoading(false);
    console.error('Send email error:', err);
    showToast('Errore. Scarica il PDF e invialo manualmente.', 'error');
  }
}

// ─── GENERAZIONE PDF ──────────────────────────────────────────────────────────
// Versione che ritorna un Blob (usata dall'invio email)
async function generatePDFBlob(interventionId) {
  const [{ data: inv }, { data: responses }, { data: anom }] = await Promise.all([
    db.from('interventions').select('*, clients(*), profiles(full_name, cert_number)').eq('id', interventionId).single(),
    db.from('checklist_responses').select('*').eq('intervention_id', interventionId),
    db.from('anomalies').select('*').eq('intervention_id', interventionId),
  ]);
  return buildPDFDoc(inv, responses, anom);
}

// Versione che scarica il PDF (usata dal bottone Scarica)
async function generatePDF(interventionId) {
  showLoading(true);
  try {
    const [{ data: inv }, { data: responses }, { data: anom }] = await Promise.all([
      db.from('interventions').select('*, clients(*), profiles(full_name, cert_number)').eq('id', interventionId).single(),
      db.from('checklist_responses').select('*').eq('intervention_id', interventionId),
      db.from('anomalies').select('*').eq('intervention_id', interventionId),
    ]);
    const blob = await buildPDFDoc(inv, responses, anom);
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'verbale_' + (inv.report_number?.replace('/', '_') || interventionId) + '.pdf';
      a.click();
      URL.revokeObjectURL(url);
      showToast('PDF scaricato', 'success');
    }
  } catch (err) {
    console.error('PDF error:', err);
    showToast('Errore generazione PDF', 'error');
  } finally {
    showLoading(false);
  }
}

async function buildPDFDoc(inv, responses, anom) {
  if (!inv) return null;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210, M = 15;

  // Header
  doc.setFillColor(7, 53, 36);
  doc.rect(0, 0, W, 32, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18); doc.setFont('helvetica', 'bold');
  doc.text('VERBALE DI MANUTENZIONE ANTINCENDIO', M, 13);
  doc.setFontSize(10); doc.setFont('helvetica', 'normal');
  doc.text('n. ' + (inv.report_number || '—') + '  -  ' + formatDate(inv.date), M, 22);
  doc.text(state.org?.name || '', W - M, 22, { align: 'right' });
  doc.setTextColor(0, 0, 0);
  let y = 40;

  // Dati intervento
  doc.setFontSize(11); doc.setFont('helvetica', 'bold');
  doc.text('DATI INTERVENTO', M, y); y += 7;
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  const details = [
    ['Cliente', inv.clients?.name || '—'],
    ['Indirizzo', [inv.clients?.address, inv.clients?.city].filter(Boolean).join(', ') || '—'],
    ['Data', formatDate(inv.date)],
    ['Tipo', capitalize(inv.type)],
    ['Tecnico', inv.profiles?.full_name || '—'],
    ['Cert. VVF', inv.profiles?.cert_number || '—'],
    ['Impianti', (inv.equipment_types || []).map(t => EQ_TYPE_LABELS[t] || capitalize(t)).join(', ')],
    ['Esito', outcomeLabel(inv.outcome)],
  ];
  details.forEach(([k, v]) => {
    doc.setFont('helvetica', 'bold'); doc.text(k + ':', M, y);
    doc.setFont('helvetica', 'normal'); doc.text(v, M + 38, y);
    y += 6;
  });
  y += 4;
  doc.setLineWidth(0.3); doc.setDrawColor(220, 220, 220);
  doc.line(M, y, W - M, y); y += 6;

  // Checklist per impianto
  for (const eqType of inv.equipment_types) {
    const items = CHECKLISTS[eqType] || [];
    if (!items.length) continue;
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text((EQ_TYPE_LABELS[eqType] || eqType).toUpperCase(), M, y); y += 6;
    for (const item of items) {
      if (y > 250) { doc.addPage(); y = 20; }
      const r = responses?.find(r => r.item_id === item.id);
      const statusTxt = r?.status === 'ok' ? 'OK' : r?.status === 'anomaly' ? 'AN' : r?.status === 'na' ? 'N/A' : '---';
      const statusCol = r?.status === 'ok' ? [22, 160, 94] : r?.status === 'anomaly' ? [220, 38, 38] : [107, 114, 128];
      doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(0, 0, 0);
      const lines = doc.splitTextToSize(item.desc, 138);
      doc.text(lines, M + 5, y);
      doc.setFont('helvetica', 'italic'); doc.setTextColor(120, 120, 120);
      doc.text(item.norm, M + 5, y + lines.length * 4);
      doc.setFillColor(...statusCol);
      doc.roundedRect(W - M - 18, y - 4, 18, 8, 2, 2, 'F');
      doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(7);
      doc.text(statusTxt, W - M - 9, y + 0.5, { align: 'center' });
      doc.setTextColor(0, 0, 0);
      if (r?.note) {
        doc.setFont('helvetica', 'italic'); doc.setFontSize(8); doc.setTextColor(180, 50, 50);
        doc.text('Nota: ' + r.note, M + 5, y + lines.length * 4 + 4);
        y += 5;
      }
      // Foto anomalia: genera URL firmato fresco
      if (r?.photo_url) {
        try {
          const { data: freshUrl } = await db.storage.from('reports').createSignedUrl(r.photo_url, 300);
          if (freshUrl?.signedUrl) {
            const imgData = await fetchImageAsBase64(freshUrl.signedUrl);
            if (imgData) {
              if (y > 220) { doc.addPage(); y = 20; }
              doc.addImage(imgData, 'JPEG', M + 5, y + lines.length * 4 + 6, 60, 40);
              y += 46;
            }
          }
        } catch (e) { /* foto non disponibile */ }
      }
      y += lines.length * 4 + 9;
    }
    y += 3;
  }

  // Anomalie
  if (anom?.length) {
    if (y > 230) { doc.addPage(); y = 20; }
    doc.setDrawColor(220, 38, 38); doc.setLineWidth(0.5);
    doc.line(M, y, W - M, y); y += 6;
    doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(180, 30, 30);
    doc.text('ANOMALIE RILEVATE', M, y); y += 6;
    doc.setTextColor(0, 0, 0);
    anom.forEach((a, idx) => {
      if (y > 265) { doc.addPage(); y = 20; }
      const sev = { critical: 'CRITICA', high: 'ALTA', medium: 'MEDIA', low: 'BASSA' }[a.severity] || '';
      doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
      doc.text((idx + 1) + '. ' + (EQ_TYPE_LABELS[a.equipment_type] || capitalize(a.equipment_type)) + ' - Gravita: ' + sev, M, y); y += 5;
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
      const lines = doc.splitTextToSize(a.description, W - M * 2);
      doc.text(lines, M, y); y += lines.length * 4 + 4;
    });
  }

  // Footer con numero pagina
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(150, 150, 150);
    doc.text('Pagina ' + p + '/' + pageCount + '  -  Generato da FireApp  -  ' + new Date().toLocaleDateString('it-IT'), W / 2, 292, { align: 'center' });
  }

  // Firma
  const lastPage = doc.getNumberOfPages();
  doc.setPage(lastPage);
  doc.setDrawColor(180, 180, 180); doc.setLineWidth(0.3);
  doc.line(M, 275, 100, 275);
  doc.line(115, 275, W - M, 275);
  doc.setFontSize(8); doc.setTextColor(120, 120, 120);
  doc.text('Firma tecnico', M, 280);
  doc.text('Firma cliente / referente', 115, 280);
  if (inv.client_signature) {
    try { doc.addImage(inv.client_signature, 'PNG', 115, 255, 70, 18); } catch (e) { /* firma non valida */ }
  }

  return doc.output('blob');
}

async function fetchImageAsBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// ─── UTILITY ──────────────────────────────────────────────────────────────────
function formatDate(d) {
  if (!d) return '—';
  return new Date(d + 'T12:00:00').toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function capitalize(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');
}

function esc(v) {
  if (v === null || v === undefined) return '';
  return String(v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function addMonths(dateStr, months) {
  const d = new Date(dateStr + 'T12:00:00');
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split('T')[0];
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

function isOlderThan(dateStr, years) {
  if (!dateStr) return false;
  const d = new Date(dateStr + 'T12:00:00');
  const limit = new Date();
  limit.setFullYear(limit.getFullYear() - years);
  return d < limit;
}

function statusBadge(status) {
  const map = {
    draft: ['badge-gray', 'Bozza'],
    in_progress: ['badge-amber', 'In corso'],
    completed: ['badge-green', 'Completato'],
    signed: ['badge-green', 'Firmato'],
    conforme: ['badge-green', 'Conforme'],
    anomalie: ['badge-amber', 'Con anomalie'],
    non_conforme: ['badge-red', 'Non conforme'],
    pending: ['badge-gray', 'In corso'],
  };
  const [cls, label] = map[status] || ['badge-gray', status || '—'];
  return '<span class="badge ' + cls + '">' + label + '</span>';
}

function outcomeLabel(o) {
  const map = { conforme: 'Conforme', anomalie: 'Conforme con anomalie', non_conforme: 'Non conforme', pending: 'In corso' };
  return map[o] || '—';
}

function categoryIcon(cat) {
  const icons = {
    commerciale: { bg: '#e1f5ee', col: '#0f6e56', path: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
    industriale: { bg: '#faeeda', col: '#854f0b', path: 'M2 20h20M4 20V8h16v12M9 20v-6h6v6' },
    scuola: { bg: '#e6f1fb', col: '#185fa5', path: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
    ospedale: { bg: '#fce7f3', col: '#9d174d', path: 'M12 2v20M2 12h20' },
    albergo: { bg: '#eef2ff', col: '#4338ca', path: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
  };
  const ico = icons[cat] || icons.commerciale;
  return {
    bg: ico.bg,
    svg: '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:' + ico.col + ';fill:none;stroke-width:1.8;stroke-linecap:round"><path d="' + ico.path + '"/></svg>',
  };
}

async function getOrgClientIds() {
  if (state.clients.length) return state.clients.map(c => c.id);
  const { data } = await db.from('clients').select('id').eq('organization_id', state.org?.id);
  return (data || []).map(c => c.id);
}

async function getClientIdForIntervention() {
  const { data } = await db.from('interventions').select('client_id').eq('id', state.currentInterventionId).single();
  return data?.client_id;
}

function showModal(html) {
  el('modal-content').innerHTML = html;
  el('modal-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  el('modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

let toastTimer;
function showToast(msg, type) {
  const toast = el('toast');
  toast.textContent = msg;
  toast.className = 'toast' + (type ? ' ' + type : '');
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 2800);
}

function showLoading(show) {
  el('loading').classList.toggle('hidden', !show);
}

document.addEventListener('DOMContentLoaded', init);

// ─── TEAM / GESTIONE TECNICI ──────────────────────────────────────────────────
async function loadTeam() {
  showLoading(true);
  const { data: members } = await db
    .from('profiles')
    .select('id, full_name, role, cert_number, phone, created_at')
    .eq('organization_id', state.org?.id)
    .order('role').order('full_name');
  showLoading(false);
  renderTeam(members || []);
}

function renderTeam(members) {
  const cont = el('team-list');
  if (!cont) return;
  const isAdmin = state.profile?.role === 'admin';
  if (!members.length) {
    cont.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><p>Nessun membro del team.<br>Invita il primo tecnico.</p></div>';
    return;
  }
  cont.innerHTML = '<div class="row-list">' + members.map(m => {
    const initials = (m.full_name || 'NN').split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
    const roleBadge = m.role === 'admin' ? 'badge-amber' : 'badge-blue';
    const roleLabel = m.role === 'admin' ? 'Admin' : 'Tecnico';
    const isMe = m.id === state.user?.id;
    const editBtn = (isAdmin && !isMe)
      ? '<button class="btn-text" style="font-size:12px" onclick="showEditTeamMemberModal(\'' + m.id + '\',\'' + esc(m.full_name||'') + '\',\'' + m.role + '\')">Modifica</button>'
      : '';
    const avatarBg = m.role === 'admin' ? '#0d6040' : '#2563eb';
    return '<div class="row-item">' +
      '<div style="width:36px;height:36px;font-size:13px;flex-shrink:0;background:' + avatarBg + ';color:white;display:flex;align-items:center;justify-content:center;border-radius:50%;font-weight:700">' + initials + '</div>' +
      '<div class="row-body">' +
        '<div class="row-title">' + esc(m.full_name || 'Senza nome') + (isMe ? ' <span style="font-size:11px;color:var(--gray-400)">(tu)</span>' : '') + '</div>' +
        '<div class="row-desc">' + [m.cert_number ? 'Cert. '+m.cert_number : '', m.phone || ''].filter(Boolean).join(' · ') + '</div>' +
      '</div>' +
      '<div class="row-right" style="display:flex;align-items:center;gap:8px">' +
        '<span class="badge ' + roleBadge + '">' + roleLabel + '</span>' + editBtn +
      '</div></div>';
  }).join('') + '</div>';
}

function showEditTeamMemberModal(memberId, name, currentRole) {
  showModal(
    '<div class="modal-handle"></div>' +
    '<div class="modal-title">Modifica — ' + esc(name) + '</div>' +
    '<div class="form-field"><label>Ruolo</label><select id="tm-role">' +
    '<option value="technician"' + (currentRole === 'technician' ? ' selected' : '') + '>Tecnico</option>' +
    '<option value="admin"' + (currentRole === 'admin' ? ' selected' : '') + '>Admin (gestisce il team e i dati)</option>' +
    '</select></div>' +
    '<button class="btn-primary" onclick="saveTeamMemberRole(\'' + memberId + '\')">Salva ruolo</button>' +
    '<button class="btn-danger" style="width:100%;margin-top:8px" onclick="removeTeamMember(\'' + memberId + '\',\'' + esc(name) + '\')">Rimuovi dal team</button>' +
    '<button class="btn-outline" onclick="closeModal()">Annulla</button>'
  );
}

async function saveTeamMemberRole(memberId) {
  const role = el('tm-role')?.value;
  showLoading(true);
  const { error } = await db.from('profiles').update({ role }).eq('id', memberId);
  showLoading(false);
  if (error) { showToast('Errore nel salvataggio', 'error'); return; }
  closeModal();
  showToast('Ruolo aggiornato', 'success');
  loadTeam();
}

async function removeTeamMember(memberId, name) {
  if (!confirm('Rimuovere ' + name + ' dal team?\nPerdra accesso all\'app ma i suoi dati (interventi, verbali) rimarranno conservati.')) return;
  showLoading(true);
  const { error } = await db.from('profiles').update({ organization_id: null, role: 'technician' }).eq('id', memberId);
  showLoading(false);
  if (error) { showToast('Errore', 'error'); return; }
  closeModal();
  showToast(name + ' rimosso dal team', 'success');
  loadTeam();
}

function showInviteTechModal() {
  const base = window.location.origin;
  const inviteUrl = base + '/signup.html?join=' + (state.org?.id || '');
  showModal(
    '<div class="modal-handle"></div>' +
    '<div class="modal-title">Invita tecnico</div>' +
    '<p style="font-size:14px;color:var(--gray-600);margin-bottom:16px">Condividi questo link con il tecnico. Dopo la registrazione il suo account sara collegato automaticamente al tuo team.</p>' +
    '<div class="form-field"><label>Link di invito</label>' +
    '<div style="display:flex;gap:8px"><input id="invite-url" value="' + inviteUrl + '" readonly style="font-size:11px;color:var(--gray-500)">' +
    '<button class="btn-secondary" style="flex-shrink:0;white-space:nowrap" onclick="copyInviteLink()">Copia</button></div>' +
    '</div>' +
    '<div style="background:#fffbeb;border-left:3px solid #f59e0b;padding:10px 12px;border-radius:0 8px 8px 0;font-size:12px;color:#78350f;margin-bottom:16px">' +
    'Il link e univoco per la tua organizzazione — condividilo solo alle persone di fiducia.' +
    '</div>' +
    '<button class="btn-outline" onclick="closeModal()">Chiudi</button>'
  );
}

function copyInviteLink() {
  const input = el('invite-url');
  if (!input) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(input.value).then(() => showToast('Link copiato', 'success'));
  } else {
    input.select(); document.execCommand('copy');
    showToast('Link copiato', 'success');
  }
}

// ─── PRESA IN CARICO (P1 / UNI 11224) ────────────────────────────────────────
function showPresaInCaricoModal(clientId) {
  const client = state.clients.find(c => c.id === clientId);
  if (!client) return;
  const allTypes = Object.keys(EQ_TYPE_LABELS);
  const defaultP1 = ['irai','evac','sprinkler','porte_rei'];
  const checkboxes = allTypes.map(t =>
    '<label class="checkbox-label"><input type="checkbox" name="p1-eq" value="' + t + '"' +
    (defaultP1.includes(t) ? ' checked' : '') + '> ' + EQ_TYPE_LABELS[t] + '</label>'
  ).join('');
  showModal(
    '<div class="modal-handle"></div>' +
    '<div style="background:var(--green-50,#f0fdf4);border-left:3px solid #16a05e;padding:10px 13px;border-radius:0 8px 8px 0;margin-bottom:16px;font-size:13px;color:#065f46">' +
    '<strong>Presa in Consegna P1 — UNI 11224:2011</strong><br>Verifica documentale e funzionale completa degli impianti antincendio di <strong>' + esc(client.name) + '</strong>.</div>' +
    '<div class="form-field"><label>Data intervento</label><input type="date" id="p1-date" value="' + new Date().toISOString().split('T')[0] + '"></div>' +
    '<div class="form-field"><label>Impianti da prendere in carico</label><div class="checkbox-group">' + checkboxes + '</div></div>' +
    '<button class="btn-primary" onclick="createPresaInCarico(\'' + clientId + '\')">Avvia presa in carico</button>' +
    '<button class="btn-outline" onclick="openClient(\'' + clientId + '\')">Annulla</button>'
  );
}

async function createPresaInCarico(clientId) {
  const date = el('p1-date')?.value || new Date().toISOString().split('T')[0];
  const checked = [...document.querySelectorAll('input[name="p1-eq"]:checked')].map(i => i.value);
  if (!checked.length) { showToast('Seleziona almeno un impianto', 'error'); return; }
  showLoading(true);
  const { data: reportNum } = await db.rpc('generate_report_number', { org_id: state.org.id });
  const { data, error } = await db.from('interventions').insert({
    organization_id: state.org.id,
    client_id: clientId,
    technician_id: state.user.id,
    date,
    type: 'p1',
    equipment_types: checked,
    status: 'in_progress',
    report_number: reportNum,
  }).select().single();
  showLoading(false);
  if (error || !data) { showToast('Errore nella creazione', 'error'); return; }
  closeModal();
  showToast('Presa in carico avviata', 'success');
  await openIntervention(data.id);
}
