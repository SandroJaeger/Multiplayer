
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



