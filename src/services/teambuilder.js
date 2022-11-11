import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/main";

async function saveTeam(team) {
  let id;
  try {
    const docRef = await addDoc(collection(db, "teambuilders"), {
      members: team
    });
    console.log("Document written with ID: ", docRef.id);
    id = docRef.id
  } catch (error) {
    throw new Error(error);
  }
  return id;
}

async function getTeamById(id) {
  let data = [];
  try {
    const docSnap  = await getDoc(doc(db, "teambuilders", id));
    data = docSnap.data().members;
    console.log("Document data:", docSnap.data());
  } catch (error) {
    throw new Error(error);
  }
  return data
}


const services = {
  saveTeam,
  getTeamById
};

export default services;
