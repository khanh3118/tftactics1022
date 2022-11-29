import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/main";

async function getAllSynergys() {
  const res = await getDocs(collection(db, "synergys"));
  return res.docs.map((doc) => doc.data());
}

const services = {
  getAllSynergys,
};

export default services;
