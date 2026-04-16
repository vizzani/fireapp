// FireApp Service Worker — Cache-first per assets statici, network-first per API
const CACHE_NAME = 'fireapp-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/app.css',
  '/js/app.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// ---- INSTALL: pre-cache assets statici ----
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SW] Pre-cache parziale:', err);
      });
    })
  );
  self.skipWaiting();
});

// ---- ACTIVATE: rimuove cache vecchie ----
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ---- FETCH: strategia per tipo di richiesta ----
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Richieste Supabase (API) → Network first, nessun cache
  if (url.hostname.endsWith('.supabase.co')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(
          JSON.stringify({ error: 'Offline: dati non disponibili' }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Google Fonts → Network first con fallback cache
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Navigazione (HTML) → Network first, fallback su index.html (SPA)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Tutto il resto (CSS, JS, immagini) → Cache first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return res;
      });
    })
  );
});

// ---- BACKGROUND SYNC: salva checklist offline e sincronizza quando torna la rete ----
self.addEventListener('sync', event => {
  if (event.tag === 'sync-checklist') {
    event.waitUntil(syncPendingItems());
  }
});

async function syncPendingItems() {
  // Lettura da IndexedDB (gestita da app.js)
  console.log('[SW] Sincronizzazione dati offline...');
}
