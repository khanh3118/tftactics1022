import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAADN2hQgDvRSAmPMbKWprz3u-R94UZqWo",
  authDomain: "tftactics-gg.firebaseapp.com",
  databaseURL:
    "https://tftactics-gg-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tftactics-gg",
  storageBucket: "tftactics-gg.appspot.com",
  messagingSenderId: "778823484552",
  appId: "1:778823484552:web:45f54cce819328caa44b3d",
};

const app = initializeApp(firebaseConfig);

const authServices = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export { authServices, db, storage };
