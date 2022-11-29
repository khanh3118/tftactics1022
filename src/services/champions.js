import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/main";

async function getAllChampions() {
  const res = await getDocs(collection(db, "champions"));
  return res.docs.map((doc) => doc.data());
}

const services = {
  getAllChampions,
};

export default services;
