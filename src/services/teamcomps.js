import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/main";

async function getAllTeamComps() {
  let data = [];
  const res = await getDocs(collection(db, "teamcomps"));
  res.forEach((item) => {
    data.push(item.data());
  });
  return data;
}

const services = {
  getAllTeamComps,
};

export default services;
