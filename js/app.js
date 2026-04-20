/* FireApp — app.js */

const SUPABASE_URL      = 'https://bclfpawguqpwypahmzbk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjbGZwYXdndXFwd3lwYWhtemJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyOTI1NjQsImV4cCI6MjA5MTg2ODU2NH0.ONgZu-n7oWJaQJ7V6P3MOpBD9eUYA0YimGDHyi7DLcI';

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

const { createClient } = window.supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  }
});

let state = {
  user: null,
  profile: null,
  org: null,
  clients: [],
  currentClientId: null,
  currentInterventionId: null,
  currentInterventionType: null,
  currentTab: 'estintori',
  checklistResponses: {},
  scadenze: [],
  filter: 'all',
};

function el(id) { return document.getElementById(id); }

async function init() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(console.warn);
  const params = new URLSearchParams(location.search);
  if (params.get('action') === 'new-intervention') window._pendingAction = 'new-intervention';

  // Controlla sessione esistente al primo caricamento
  const { data: { session } } = await db.auth.getSession();
  if (session?.user) {
    state.user = session.user;
    await loadProfile();
    showApp();
    await loadDashboard();
  } else {
    showLogin();
  }

  // Ascolta solo eventi significativi, non ogni refresh token
  db.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user && !state.user) {
      state.user = session.user;
      await loadProfile();
      showApp();
      await loadDashboard();
    } else if (event === 'TOKEN_REFRESHED' && session?.user) {
      state.user = session.user;
      if (!state.org) await loadProfile();
    } else if (event === 'SIGNED_OUT') {
      state.user = null;
      state.profile = null;
      state.org = null;
      showLogin();
    }
  });
}

async function loadProfile() {
  const { data, error } = await db.from('profiles').select('*, organizations(*)').eq('id', state.user.id).single();
  if (error || !data) return;
  state.profile = data;
  state.org = data.organizations;
  const badge = el('user-badge');
  if (badge && data.full_name) badge.textContent = data.full_name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
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

const SCREEN_TITLES = { dashboard: 'Dashboard', clienti: 'Clienti', intervento: 'Intervento', scadenzario: 'Scadenzario', verbali: 'Verbali' };

function navigate(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const target = el('screen-' + screen);
  if (target) target.classList.add('active');
  const navItem = document.querySelector(`.nav-item[data-screen="${screen}"]`);
  if (navItem) navItem.classList.add('active');
  el('topbar-title').textContent = SCREEN_TITLES[screen] || '';
  el('topbar-subtitle').textContent = '';
  el('btn-back').classList.add('hidden');
  if (screen === 'clienti') loadClienti();
  if (screen === 'scadenzario') loadScadenzario();
  if (screen === 'verbali') loadVerbali();
}

function goBack() { navigate('dashboard'); }

async function loadDashboard() {
  showLoading(true);
  try {
    const today = new Date().toISOString().split('T')[0];
    const [{ data: todayInterv }, { data: scadenze }, { data: anomalies }, { count: clientiCount }] = await Promise.all([
      db.from('interventions').select('*, clients(name, city)').eq('date', today).eq('organization_id', state.org?.id),
      db.from('schedules').select('*').lte('next_date', addDays(today, 30)).eq('organization_id', state.org?.id).eq('status', 'scheduled'),
      db.from('anomalies').select('*').eq('resolved', false).in('client_id', await getOrgClientIds()),
      db.from('clients').select('*', { count: 'exact', head: true }).eq('organization_id', state.org?.id),
    ]);
    el('kpi-oggi').textContent = todayInterv?.length ?? 0;
    el('kpi-scadenze').textContent = scadenze?.length ?? 0;
    el('kpi-anomalie').textContent = anomalies?.length ?? 0;
    el('kpi-clienti').textContent = clientiCount ?? 0;
    const h = new Date().getHours();
    const greeting = h < 12 ? 'Buongiorno' : h < 18 ? 'Buon pomeriggio' : 'Buonasera';
    el('greeting').textContent = greeting + (state.profile?.full_name ? ', ' + state.profile.full_name.split(' ')[0] : '');
    renderDashboardAlerts(scadenze, anomalies);
    renderTodayInterventions(todayInterv || []);
    state.clients = await fetchClients();
  } catch (err) {
    console.error('Dashboard error:', err);
    showToast('Errore nel caricamento dati', 'error');
  } finally {
    showLoading(false);
  }
}

function renderDashboardAlerts(scadenze, anomalies) {
  const cont = el('alerts-container');
  cont.innerHTML = '';
  const today = new Date().toISOString().split('T')[0];
  const overdue = (scadenze || []).filter(s => s.next_date < today);
  if (overdue.length > 0) cont.innerHTML += '<div class="alert alert-red"><strong>Manutenzioni scadute (' + overdue.length + ')</strong></div>';
  const critical = (anomalies || []).filter(a => a.severity === 'critical' || a.severity === 'high');
  if (critical.length > 0) cont.innerHTML += '<div class="alert alert-purple"><strong>Anomalie urgenti aperte (' + critical.length + ')</strong></div>';
  const soon = (scadenze || []).filter(s => { const d = daysBetween(today, s.next_date); return d >= 0 && d <= 7; });
  if (soon.length > 0 && overdue.length === 0) cont.innerHTML += '<div class="alert alert-amber"><strong>Scadenze entro 7 giorni (' + soon.length + ')</strong></div>';
}

function renderTodayInterventions(interventions) {
  const cont = el('today-interventions');
  if (!interventions.length) {
    cont.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><p>Nessun intervento programmato per oggi</p></div>';
    return;
  }
  cont.innerHTML = interventions.map(inv => {
    const tags = (inv.equipment_types || []).map(t => '<span class="badge badge-blue">' + t + '</span>').join('');
    return '<div class="card" onclick="openIntervention(\'' + inv.id + '\')">' +
      '<div class="card-header"><div><div class="card-title">' + (inv.clients?.name || '—') + '</div>' +
      '<div class="card-sub">' + (inv.clients?.city || '') + ' - ' + inv.type + '</div></div>' +
      statusBadge(inv.status) + '</div>' +
      '<div class="card-tags">' + tags + '</div></div>';
  }).join('');
}

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

async function openClient(clientId) {
  state.currentClientId = clientId;
  const client = state.clients.find(c => c.id === clientId);
  if (!client) return;
  const [{ data: equip }, { data: lastInterv }] = await Promise.all([
    db.from('equipment').select('*').eq('client_id', clientId),
    db.from('interventions').select('*').eq('client_id', clientId).order('date', { ascending: false }).limit(5),
  ]);
  const equipTags = (equip || []).map(e => {
    const isP6 = e.installation_date && isOlderThan(e.installation_date, 12);
    const cls = isP6 ? 'badge badge-red' : 'badge badge-blue';
    return '<span class="' + cls + '">' + e.type + ' (' + e.quantity + ')' + (isP6 ? ' - Rev. P6 scaduta' : '') + '</span>';
  }).join('');
  const intervList = (lastInterv || []).map(i =>
    '<div class="row-item" onclick="openIntervention(\'' + i.id + '\')">' +
    '<div class="row-body"><div class="row-title">' + formatDate(i.date) + ' - ' + i.type + '</div>' +
    '<div class="row-desc">' + (i.report_number || 'Bozza') + '</div></div>' +
    statusBadge(i.status) + '</div>'
  ).join('');
  showModal(
    '<div class="modal-handle"></div>' +
    '<div class="modal-title">' + client.name + '</div>' +
    '<p style="font-size:13px;color:var(--gray-600);margin-bottom:14px">' + [client.address, client.city, client.province].filter(Boolean).join(', ') + '</p>' +
    '<div class="card-tags" style="margin-bottom:14px">' + (equipTags || '<span style="color:var(--gray-500);font-size:13px">Nessun impianto configurato</span>') + '</div>' +
    '<div class="section-header"><span>Ultimi interventi</span></div>' +
    '<div class="row-list" style="margin-bottom:14px">' + (intervList || '<div style="padding:14px;font-size:13px;color:var(--gray-500)">Nessun intervento registrato</div>') + '</div>' +
    '<button class="btn-primary" onclick="closeModal();showNewInterventionModal(\'' + clientId + '\')">+ Nuovo intervento</button>' +
    '<button class="btn-outline" onclick="closeModal()">Chiudi</button>'
  );
}

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

function showNewInterventionModal(preselectedClientId = null) {
  const clientOptions = state.clients.map(c =>
    '<option value="' + c.id + '"' + (c.id === preselectedClientId ? ' selected' : '') + '>' + c.name + '</option>'
  ).join('');
  const eqTypes = ['estintori', 'idranti', 'irai', 'evac', 'sprinkler', 'porte_rei'];
  const eqCheckboxes = eqTypes.map(t =>
    '<label class="checkbox-label"><input type="checkbox" name="eq" value="' + t + '"' +
    (['estintori', 'idranti'].includes(t) ? ' checked' : '') + '> ' +
    t.charAt(0).toUpperCase() + t.slice(1).replace('_', ' ') + '</label>'
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
  (responses || []).forEach(r => {
    state.checklistResponses[r.item_id] = { status: r.status, note: r.note || '', photo_path: r.photo_url || '' };
  });
  navigate('intervento');
  el('topbar-title').textContent = inv.clients?.name || 'Intervento';
  el('topbar-subtitle').textContent = formatDate(inv.date) + ' - ' + inv.type;
  el('btn-back').classList.remove('hidden');
  const total = inv.equipment_types.flatMap(t => CHECKLISTS[t] || []).length;
  const done = Object.values(state.checklistResponses).filter(r => r.status !== 'pending').length;
  el('interv-header-name').textContent = inv.clients?.name || '';
  el('interv-header-date').textContent = formatDate(inv.date) + ' - n. ' + inv.report_number;
  updateProgress(done, total);
  el('intervento-tabs').innerHTML = inv.equipment_types.map((t, i) =>
    '<button class="tab-btn' + (i === 0 ? ' active' : '') + '" data-tab="' + t + '" onclick="switchTab(this,\'' + t + '\')">' +
    t.charAt(0).toUpperCase() + t.slice(1).replace('_', ' ') + '</button>'
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
  const done = Object.values(state.checklistResponses).filter(r => r.status !== 'pending').length;
  updateProgress(done, Object.values(CHECKLISTS).flat().length);
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
    await db.from('anomalies').upsert({
      intervention_id: state.currentInterventionId,
      client_id: await getClientIdForIntervention(),
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
    // Salva il percorso fisico (non l'URL firmato che scade)
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

async function loadVerbali() {
  showLoading(true);
  const { data } = await db.from('interventions').select('*, clients(name, city)').eq('organization_id', state.org?.id).in('status', ['completed', 'signed']).order('date', { ascending: false });
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
    '<span style="font-size:12px;color:var(--gray-500)">' + (inv.equipment_types || []).join(', ') + '</span>' +
    '<button class="btn-text" onclick="event.stopPropagation();generatePDF(\'' + inv.id + '\')">Scarica PDF</button>' +
    '</div></div>'
  ).join('');
}

async function generatePDF(interventionId) {
  showLoading(true);
  try {
    const [{ data: inv }, { data: responses }, { data: anom }] = await Promise.all([
      db.from('interventions').select('*, clients(*), profiles(full_name, cert_number)').eq('id', interventionId).single(),
      db.from('checklist_responses').select('*').eq('intervention_id', interventionId),
      db.from('anomalies').select('*').eq('intervention_id', interventionId),
    ]);
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = 210, M = 15;

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
      ['Impianti', (inv.equipment_types || []).map(capitalize).join(', ')],
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

    for (const eqType of inv.equipment_types) {
      const items = CHECKLISTS[eqType] || [];
      if (!items.length) continue;
      doc.setFontSize(11); doc.setFont('helvetica', 'bold');
      doc.text(capitalize(eqType).toUpperCase(), M, y); y += 6;
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
        // Foto anomalia: genera URL firmato fresco dal percorso fisico salvato
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
          } catch (e) { /* foto non disponibile, continua */ }
        }
        y += lines.length * 4 + 9;
      }
      y += 3;
    }

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
        doc.text((idx + 1) + '. ' + capitalize(a.equipment_type) + ' - Gravita: ' + sev, M, y); y += 5;
        doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
        const lines = doc.splitTextToSize(a.description, W - M * 2);
        doc.text(lines, M, y); y += lines.length * 4 + 4;
      });
    }

    const pageCount = doc.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
      doc.setPage(p);
      doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(150, 150, 150);
      doc.text('Pagina ' + p + '/' + pageCount + '  -  Generato da FireApp  -  ' + new Date().toLocaleDateString('it-IT'), W / 2, 292, { align: 'center' });
    }

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

    doc.save('verbale_' + (inv.report_number?.replace('/', '_') || interventionId) + '.pdf');
    showToast('PDF scaricato', 'success');

  } catch (err) {
    console.error('PDF error:', err);
    showToast('Errore generazione PDF', 'error');
  } finally {
    showLoading(false);
  }
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

function formatDate(d) {
  if (!d) return '—';
  return new Date(d + 'T12:00:00').toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function capitalize(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');
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

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', init);
