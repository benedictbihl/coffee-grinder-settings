import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import Div100vh from "react-div-100vh";
import CoffeeListProvider from "./store/CoffeeListContext";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";

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
        <Main />
      </Div100vh>
    </CoffeeListProvider>
  );
}

export default App;
