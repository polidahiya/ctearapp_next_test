"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext({
  hello: "world",
});
export function Appwrapper({ children }) {
  const [fullnudemode, setfullnudemode] = useState(false);
  const [orientation, setorientation] = useState(true);
  const [test, settest] = useState("hello");
  return (
    <AppContext.Provider
      value={{ fullnudemode, setfullnudemode, orientation, setorientation,test, settest }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function AppContextfn() {
  return useContext(AppContext);
}
