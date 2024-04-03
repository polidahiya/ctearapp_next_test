"use client";
import React from "react";
import { AppContextfn } from "../context/Index";

console.log("client comp");
function Clientcomp() {
  const { test, settest } = AppContextfn();
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
