import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { authServices } from "../firebase/main";

export function login(email, password) {
  return signInWithEmailAndPassword(authServices, email, password);
}

export default { login };
