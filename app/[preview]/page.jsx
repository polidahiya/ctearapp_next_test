"use client";
import React, { useEffect, useRef, useState } from "react";
import { AppContextfn } from "../context/Index";

import Image from "next/image";
import Link from "next/link";

import Bikini from "./(svg)/Bikini";
import Nude from "./(svg)/Nude";
import Home from "./(svg)/Home";
import Arrow from "./(svg)/Arrow";
import Arrowright from "./(svg)/Arrowright";

function Page({ params }) {
  const [maskpos, setmaskpos] = useState([-250, -250]);
  const { fullnudemode, setfullnudemode } = AppContextfn();
  const { orientation, setorientation } = AppContextfn();
  const mainDivRef = useRef(null);

  const masksize = 200;
  useEffect(() => {
    const movemask = (e) => {
      e.preventDefault();
      let leftbounding = mainDivRef.current.getBoundingClientRect().left;
      let topbounding = mainDivRef.current.getBoundingClientRect().top;

      if (e.touches) {
        if (orientation) {
          setmaskpos([
            e.touches[0].pageX - leftbounding - masksize,
            e.touches[0].pageY - topbounding - masksize,
          ]);
        } else {
          setmaskpos([
            e.touches[0].pageX - leftbounding,
            e.touches[0].pageY - topbounding - masksize,
          ]);
        }
        return;
      } else {
        setmaskpos([
          e.pageX - leftbounding - masksize / 2,
          e.pageY - topbounding - masksize / 2,
        ]);
      }
    };

    mainDivRef.current.addEventListener("touchmove", movemask, {
      passive: false,
    });
    mainDivRef.current.addEventListener("mousemove", movemask, {
      passive: false,
    });

    return () => {
      if (mainDivRef.current) {
        mainDivRef.current.removeEventListener("touchmove", movemask);
        mainDivRef.current.removeEventListener("mousemove", movemask);
      }
    };
  }, [orientation]);

  return (
    <div className="bg-gray-900 select-none" ref={mainDivRef}>
      <div className="h-[100svh] relative">
        {/* i button */}
        <button
          className="absolute top-5 left-5 h-[30px] aspect-square rounded-full bg-white block lg:hidden z-10"
          onClick={() => {
            setorientation(!orientation);
          }}
        >
          i
        </button>
        {/* c */}
        <Image
          className="absolute h-full w-full object-contain top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          src={`/files/nude${params.preview}.jpg`}
          alt={`/files/nude${params.preview}.jpg`}
          width={2000}
          height={2000}
          placeholder="blur"
          blurDataURL="/spinner.gif"
        ></Image>
        {/* bik */}
        <Image
          className="absolute h-full w-full object-contain top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          src={
            fullnudemode
              ? `/files/nude${params.preview}nudefull.jpg`
              : `/files/nude${params.preview}nude.jpg`
          }
          alt={`/files/nude${params.preview}nude.jpg`}
          width={2000}
          height={2000}
          style={{
            maskImage: "radial-gradient(black 0 75px, transparent 75px 30px)",
            maskSize: masksize + "px " + masksize + "px",
            maskRepeat: "no-repeat",
            maskPosition: maskpos[0] + "px " + maskpos[1] + "px",
          }}
          placeholder="blur"
          blurDataURL="/spinner.gif"
        ></Image>
      </div>
      <div className="controls absolute flex gap-[10px] p-[20px] portrait:bottom-0 portrait:translate-x-[-50%] portrait:left-[50%] portrait:w-full landscape:top-[50%] landscape:left-0 landscape:translate-y-[-50%] landscape:flex-col">
        <Link
          href="/"
          style={{ animationDelay: "0.1s" }}
          className=" w-[100px] h-[50px] text-white opacity-0 bg-white bg-opacity-[0.5] rounded-[5px] flex items-center justify-center p-[5px] portrait:w-full landscape:w-[50px] hover:bg-opacity-[0.2] animate-spin"
        >
          <Home />
        </Link>
        <button
          style={{ animationDelay: "0.2s" }}
          className=" w-[100px] h-[50px] text-white opacity-0 bg-white bg-opacity-[0.5] rounded-[5px] flex items-center justify-center p-[5px] portrait:w-full landscape:w-[50px] hover:bg-opacity-[0.2] animate-spin"
          onClick={() => {
            setfullnudemode(!fullnudemode);
          }}
        >
          {fullnudemode ? <Nude /> : <Bikini />}
        </button>
        <Link
          href={`/${parseInt(params.preview) - 1}`}
          style={{ animationDelay: "0.3s" }}
          className=" w-[100px] h-[50px] text-white opacity-0 bg-white bg-opacity-[0.5] rounded-[5px] flex items-center justify-center p-[5px] portrait:w-full landscape:w-[50px] hover:bg-opacity-[0.2] animate-spin"
        >
          <Arrow />
        </Link>
        <Link
          href={`/${parseInt(params.preview) + 1}`}
          style={{ animationDelay: "0.4s" }}
          className=" w-[100px] h-[50px] text-white opacity-0 bg-white bg-opacity-[0.5] rounded-[5px] flex items-center justify-center p-[5px] portrait:w-full landscape:w-[50px] hover:bg-opacity-[0.2] animate-spin"
        >
          <Arrowright />
        </Link>
      </div>
    </div>
  );
}

export default Page;
