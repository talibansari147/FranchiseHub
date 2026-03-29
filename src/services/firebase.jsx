import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUL43KdROvm2EcZV17k3MLivDFPhHsSHM",
  authDomain: "database-project-6dc6f.firebaseapp.com",
  databaseURL: "https://database-project-6dc6f-default-rtdb.firebaseio.com",
  projectId: "database-project-6dc6f",
  storageBucket: "database-project-6dc6f.firebasestorage.app",
  messagingSenderId: "261342199035",
  appId: "1:261342199035:web:01572d733aa2929203445e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);