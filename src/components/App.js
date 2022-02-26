import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setInit(true);
      //setUserObj(user);
      if (user) {
        setUserObj(filterUserData(user));
      } else {
        setUserObj(null);
      }
    });
  }, []);
  const refreshUser = () => {
    setUserObj(filterUserData(authService.currentUser));
  };
  const filterUserData = (user) => {
    return {
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    };
  };

  return (
    <>
      {init ? (
        <AppRouter userObj={userObj} refreshUser={refreshUser} />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
