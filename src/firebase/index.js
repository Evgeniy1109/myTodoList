
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUKIl0_8_qneCzEUfjHSbW0H0gqDtoiM8",
  authDomain: "mytodolist-da879.firebaseapp.com",
  projectId: "mytodolist-da879",
  storageBucket: "mytodolist-da879.appspot.com",
  messagingSenderId: "428150675044",
  appId: "1:428150675044:web:bd376c206b393613b13171",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}
