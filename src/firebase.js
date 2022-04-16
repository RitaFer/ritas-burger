// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, push, set, ref, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAo2cBpUtqZyQq-AMw90RKGAg0gqhnvdo",
  authDomain: "ritas-burger.firebaseapp.com",
  databaseURL: "https://ritas-burger-default-rtdb.firebaseio.com",
  projectId: "ritas-burger",
  storageBucket: "ritas-burger.appspot.com",
  messagingSenderId: "661956794540",
  appId: "1:661956794540:web:cca216ff969ce1d2ef2709"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const reference = ref(database, 'burguers/');

function setBurger(data) {
  set(reference, data)
}
function getBurgers() {
  return new Promise( resolve => {
    onValue(reference, (snapshot) => {
      resolve(snapshot.val())
    });
  })
}

export {
  setBurger,
  getBurgers,
  reference
}