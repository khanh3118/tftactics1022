import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/main";

async function getAllTeamComps() {
  const res = await getDocs(collection(db, "teamcomps"));
  return res.docs.map((doc) => doc.data());
}

const services = {
  getAllTeamComps,
};

export default services;
