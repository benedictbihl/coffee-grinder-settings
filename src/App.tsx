import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import Div100vh from "react-div-100vh";
import CoffeeListProvider from "./store/CoffeeListContext";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import Sidebar from "./components/Sidebar";
import ResponsiveTable from "./components/ResponsiveTable";
import TastingNotes from "./components/TastingNotes";

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

function App() {
  const [isSignedIn, setIsSignedIn] = useState(true); //assume true
  const [showTable, setShowTable] = useState(false);
  const [showTastingNotes, setShowTastingNotes] = useState(false);
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <CoffeeListProvider>
      {!isSignedIn && (
        <div
          style={{ backgroundColor: "rgb(0 0 0 / 65%)" }}
          className="absolute h-screen w-screen flex items-center justify-center z-50"
        >
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      )}
      <Div100vh className="overflow-hidden flex flex-col items-center justify-center text-white bg-gradient-to-br from-gray-200 via-teal-300 to-gray-400">
        <Sidebar
          onInfoClick={() => setShowTastingNotes(true)}
          onTableClick={() => setShowTable(true)}
          onSignOutClick={() => {
            firebase.auth().signOut();
          }}
          className="absolute h-1/2 right-0 top-0 mr-2 mt-6 flex flex-col justify-between z-30"
        />
        <TastingNotes
          onCloseClick={() => setShowTastingNotes(false)}
          className={`styled-tasting-notes ${
            showTastingNotes ? "block" : "hidden"
          }`}
        />
        <ResponsiveTable
          className={`styled-table ${showTable ? "block" : "hidden"}`}
          onCloseClick={() => setShowTable(false)}
        />
        <Main />
      </Div100vh>
    </CoffeeListProvider>
  );
}

export default App;
