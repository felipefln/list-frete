import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add to secrets in env vars
const firebaseConfig = {
    apiKey: "AIzaSyBluLAU0GjtKGI5j6zdVYNAU2-UpMIjWa4",
  authDomain: "challenger-825e3.firebaseapp.com",
  projectId: "challenger-825e3",
  storageBucket: "challenger-825e3.appspot.com",
  messagingSenderId: "920226357933",
  appId: "1:920226357933:web:299e9fe83bf16049d71c24"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);