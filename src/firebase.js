import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAG50dWjk8l8K8ElrHh0kszkoWbXI6P19c",
  authDomain: "sonar-6d420.firebaseapp.com",
  projectId: "sonar-6d420",
  storageBucket: "sonar-6d420.appspot.com",
  messagingSenderId: "840739221854",
  appId: "1:840739221854:web:464d856f672b8160dd9fcf",
  measurementId: "G-ZQT4TD1THM",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { auth, storage, db };
