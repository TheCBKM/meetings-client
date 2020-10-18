require("firebase/firestore");
import firebase from "firebase";
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyCpG6vccTIbjdwwgvRnW4sSDc_O4DiBLrU",
    authDomain: "onlinesesion-test.firebaseapp.com",
    databaseURL: "https://onlinesesion-test.firebaseio.com",
    projectId: "onlinesesion-test",
    storageBucket: "onlinesesion-test.appspot.com",
    messagingSenderId: "870978819779",
    appId: "1:870978819779:web:adb202ae739f3c54e8f476"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
export const auth = firebase.auth();
export const firestore = firebase.firestore;
export default db;
