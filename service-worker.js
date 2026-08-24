const CACHE="neuro-matrix-v4";

const ASSETS=[
  "./",
  "index.html",
  "style.css",
  "data.js",
  "app.js",
  "manifest.json"
];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys().then(keys=>
      Promise.all(
        keys
          .filter(key=>key!==CACHE)
          .map(key=>caches.delete(key))
      )
    ).then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  event.respondWith(
    caches.match(event.request)
      .then(cached=>{
        return cached || fetch(event.request)
          .then(response=>{
            if(response.ok){
              const copy=response.clone();

              caches.open(CACHE)
                .then(cache=>cache.put(event.request,copy));
            }

            return response;
          })
          .catch(()=>{
            return caches.match("./index.html");
          });
      })
  );
});
