"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const cardData = new Array(180).fill(undefined);

  return (
    <>
      <nav className="sticky top-0 z-20 bg-blue-600 text-white h-[50px] flex items-center justify-center">
        XX view through
      </nav>
      <div className="flex flex-wrap gap-[20px] justify-center mt-[20px]">
        {cardData.map((item, i) => {
          return (
            <Link
              href={`/${i + 1}`}
              key={i}
              className=" cards w-[100px]  aspect-[3/5] shadow-xl rounded-[10px] overflow-hidden cursor-pointer md:w-[150px] md:rounded-[15px] lg:w-[200px] lg:rounded-[20px] "
            >
              <Image
                src={`/files/nude${i + 1}.jpg`}
                alt="hello"
                width={100}
                height={100}
                className="h-full w-full  object-cover scale-[1.1] hover:scale-[1] duration-300"
                placeholder="blur"
                blurDataURL="/spinner.gif"
              ></Image>
              {/* https://encrypted-vtbn0.gstatic.com/video?q=tbn:ANd9GcS58QNPeYtCnZOAlqeqiD1jPghuHDpgm1QnzQ */}
            </Link>
          );
        })}
      </div>
    </>
  );
}
