import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/main";

async function getAllItems() {
  const res = await getDocs(collection(db, "items"));
  return res.docs.map((doc) => doc.data());
}

const services = {
  getAllItems,
};

export default services;
