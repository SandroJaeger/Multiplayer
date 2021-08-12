self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/Multiplayer/',
          '/Multiplayer/index.html',
          '/css/main.min.css',
          '/css/main.min.css.map',
          '/odometer/odometer-theme-digital.css',
          '/odometer/odometer.min.js',
          '/Bilder/UserPhoto.gif',
          '/Bilder/tic-tac-toe.png',
          '/js/main.bundle.js',
          '/js/main.bundle.js.map',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function (response) {
          // response may be used only once
          // we need to save clone to put one copy in cache
          // and serve second one
          let responseClone = response.clone();
          
          caches.open('v1').then(function (cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        }).catch(function () {
          return caches.match('/Multiplayer/Bilder/tic-tac-toe.png');
        });
      }
    }));
  });

importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js');


var firebaseConfig = {

    apiKey: "AIzaSyDAs-cEPp31JPAmcwx0ikFOxo1lLWThi3g",

    projectId: "racegame-301b3",

    messagingSenderId: "11748553538",

    appId: "1:11748553538:web:2a6788f91386f1158a4edb"

  };

  // Initialize Firebase

firebase.initializeApp(firebaseConfig);

//const messaging = firebase.messaging();




// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});



