;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_garcia',
  urlsToCache = [
    './',
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap',
    'https://fonts.googleapis.com/css?family=Rubik:500,700,900&display=swap',
    './css/style.css',
    './css/skins/blue.css',
    './css/skins/green.css',
    './css/skins/orange.css',
    './css/skins/pink.css',
    './css/skins/yellow.css',
    './js/script.js',
    './images/favicon_io/android-chrome-192x192.png',
    './images/favicon_io/android-chrome-512x512.png',
    './images/favicon_io/apple-touch-icon.png',
    './images/favicon_io/favicon-16x16.png',
    './images/favicon_io/favicon-32x32.png',
    './images/favicon_io/favicon.ico.png',
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})
