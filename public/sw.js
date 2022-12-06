//Create a service worker
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-cache').then(function(cache) {
        // Cache a json file
        return cache.add('./merkle.ts');
      })
    );
  });
  
  //Create a loading screen
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      //Show loading screen
      caches.match('./loading.html').then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  
  //Redirect to another page after the file is done caching
  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(keys) {
        return Promise.all(keys.map(function(key, i) {
          if (key === 'my-cache') {
            // Redirect to another page
            return window.location.replace('/dashboard');
          }
        }));
      })
    );
  });