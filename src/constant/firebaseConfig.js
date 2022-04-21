import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDDpWQCROJOCVGFwM4mICvcyEp7torOXq8",
  authDomain: "c-mediate.firebaseapp.com",
  projectId: "c-mediate",
  storageBucket: "c-mediate.appspot.com",
  messagingSenderId: "360227510553",
  appId: "1:360227510553:web:f551af87f7b4ec88c7cd88",
  measurementId: "G-MTXE46ZL8B",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

