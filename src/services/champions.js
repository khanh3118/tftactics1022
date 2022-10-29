import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/main";

async function getAllChampions() {
  let data = [];
  const res = await getDocs(collection(db, "champions"));
  res.forEach((item) => {
    data.push(item.data());
  });
  return data;
}

const services = {
  getAllChampions,
};

export default services;
