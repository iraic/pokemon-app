import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCRhjvCwd2xl6XKCryzOn5hHylSg36Ir4A",
  authDomain: "pokemon-ea13b.firebaseapp.com",
  projectId: "pokemon-ea13b",
  storageBucket: "pokemon-ea13b.appspot.com",
  messagingSenderId: "858911786518",
  appId: "1:858911786518:web:03732eaa520d026a539737",
  measurementId: "G-DZ517JZ3FE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }