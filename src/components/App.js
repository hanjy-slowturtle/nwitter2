import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setInit(true);
      setUserObj(user);
    });
  }, []);
  return <>{init ? <AppRouter userObj={userObj} /> : "Initializing..."}</>;
}

export default App;
