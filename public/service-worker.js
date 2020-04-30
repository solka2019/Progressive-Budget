const FILES_TO_CACHE = [
    "/",
    "/index.html",
<<<<<<< HEAD
    "/assets/images/pigicon-64x64.png",
    "/assets/images/pigicon-128x128.png",
    "/assets/images/pigicon-512x512.png",
    "/assets/js/db.js",
    "/assets/js/index.js",
    "/manifest.webmanifest",
    // "/favicon.ico",
=======
    "/assets/images/coin-64x64.png",
    "/assets/images/coin-128x128.png",
    "/assets/images/coin-512x512.png",
    "/assets/js/db.js",
    "/assets/js/index.js",
    "/manifest.webmanifest"
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
  ];
  
  const CACHE_NAME = "static-cache-v1";
  const DATA_CACHE_NAME = "data-cache-v1";
  
  // install
  self.addEventListener("install", function(evt) {
    evt.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log("Your files were pre-cached successfully!");
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  
    self.skipWaiting();
  });
  
<<<<<<< HEAD
  // self.addEventListener("activate", function(evt) {
  //   evt.waitUntil(
  //     caches.keys().then(keyList => {
  //       return Promise.all(
  //         keyList.map(key => {
  //           if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
  //             console.log("Removing old cache data", key);
  //             return caches.delete(key);
  //           }
  //         })
  //       );
  //     })
  //   );
  
    self.clients.claim();
  // });
  
  // fetch
  self.addEventListener("fetch", function(evt) {
    if (evt.request.url.includes("/API/")) {
      evt.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache => {
          return fetch(evt.request)
            .then(response => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
=======
  self.addEventListener("activate", function(evt) {
    evt.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log("Removing old cache data", key);
              return caches.delete(key);
            }
          })
        );
      })
    );
  
    self.clients.claim();
  });
  
  // fetch
  self.addEventListener("fetch", function(event) {
    if (event.request.url.includes("/api/")) {
      event.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache => {
          return fetch(event.request)
            .then(response => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(event.request.url, response.clone());
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
              }
  
              return response;
            })
            .catch(err => {
              // Network request failed, try to get it from the cache.
<<<<<<< HEAD
                return cache.match(evt.request);
=======
                return cache.match(event.request);
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
              
            });
        }).catch(err => {
          console.log(err)
        })
      );
  
      return;
    }
<<<<<<< HEAD
  
    evt.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(evt.request).then(response => {
          return response || fetch(evt.request);
=======
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request);
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
        });
      })
    );
  });
  