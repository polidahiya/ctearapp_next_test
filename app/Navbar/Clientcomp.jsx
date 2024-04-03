"use client";
import React from "react";
import { useAppContext } from "../context/index";

console.log("client comp");
function Clientcomp() {
  const { test, settest } = useAppContext();
  return (
    <div>
      i am client comp form nav
      <br />
      {test}
      <button
        onClick={() => {
          settest("go");
        }}
      >
        click me
      </button>
    </div>
  );
}

export default Clientcomp;
