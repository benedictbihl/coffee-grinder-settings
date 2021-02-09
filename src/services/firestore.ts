
// @ts-nocheck
import firebase from 'firebase/app'
import { Coffee } from "../types";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const getCoffeeList = ( observer) => {
  return db.collection('coffee')
      .onSnapshot(observer);
};

export const updateCoffee = (id: string, fields: any) => {
  db.collection("coffee").doc(id).update({...fields})
}

export const updateTastingNotes = (id: string, tasting_notes: string) => {
  db.collection("coffee").doc(id).update({tasting_notes: tasting_notes})
}

export const removeCoffee = (id: string, cb: Dispatch<void>) => {
  db.collection("coffee").doc(id).delete().then(() => cb(null))
}

export const createCoffee = (name:  string, cb: Dispatch<void>) =>  {
  const newCoffeeTemplate: Coffee = {
    value: name,
    label: name,
    v60_setting: 1,
    aeropress_setting: 1,
    available_at_home: true,
    tasting_notes: "",
  }

  db.collection("coffee").add(newCoffeeTemplate).then((docref) => cb({...newCoffeeTemplate, id: docref.id }))
}