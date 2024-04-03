"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const cardData = new Array(180).fill(undefined);
  return (
    <>
      <nav className="bg-blue-600 text-white h-[50px] flex items-center justify-center">
        view through
      </nav>
      <div className="flex flex-wrap gap-[20px] justify-center mt-[20px]">
        {cardData.map((item, i) => {
          return (
            <Link
              href={`/${i + 1}`}
              key={i}
              className="cards w-[200px] aspect-[3/5] shadow-xl rounded-[20px] overflow-hidden cursor-pointer"
            >
              <Image
                src={`/files/nude${i + 1}.jpg`}
                alt="hello"
                width={100}
                height={100}
                className="h-full w-full  object-cover scale-[1.1] hover:scale-[1] duration-300"
              ></Image>
            </Link>
          );
        })}
      </div>
    </>
  );
}
