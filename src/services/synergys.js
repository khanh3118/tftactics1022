import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/main";

async function getAllSynergys() {
  let data = [];
  const res = await getDocs(collection(db, "synergys"));
  res.forEach((item) => {
    data.push(item.data());
  });
  return data;
}

const services = {
  getAllSynergys,
};

export default services;
