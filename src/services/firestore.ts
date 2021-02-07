
// @ts-nocheck
import firebase from 'firebase/app'
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

export const updateCoffee = (name: string, fields: any) => {
  db.collection("coffee").doc(name).update({...fields})
}

export const createCoffee = (name:  string) =>  {
  db.collection("coffee").doc(name).set({
    value: name,
    label: name,
    v60_setting: 0,
    aeropress_setting: 0,
    available_at_home: true
  })
}