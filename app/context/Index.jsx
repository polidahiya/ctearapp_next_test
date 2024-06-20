"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext({});
export function Appwrapper({ children }) {
  const [fullnudemode, setfullnudemode] = useState(false);
  const [orientation, setorientation] = useState(true);
  return (
    <AppContext.Provider
      value={{ fullnudemode, setfullnudemode, orientation, setorientation}}
    >
      {children}
    </AppContext.Provider>
  );
}
export function AppContextfn() {
  return useContext(AppContext);
}
