import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/main";

async function getAllItems() {
  let data = [];
  const res = await getDocs(collection(db, "items"));
  res.forEach((item) => {
    data.push(item.data());
  });
  return data;
}

const services = {
  getAllItems,
};

export default services;
