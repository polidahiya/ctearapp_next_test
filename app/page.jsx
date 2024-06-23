import Link from "next/link";
import { data } from "./mongodb";
import { redirect } from "next/navigation";

export default async function page({ searchParams }) {
  if (!searchParams.page) {
    redirect("?page=1");
  }
  const datatoshow = await data
    .find({}, { projection: { tags: 0, images: { $slice: 1 } } })
    .limit(searchParams?.page * 10)
    .skip(searchParams?.page * 10 - 10)
    .toArray();

  datatoshow.forEach((item) => {
    item._id = item._id.toString();
  });

  const totalposts = await data.countDocuments({});
  const pages = new Array(Math.ceil(totalposts / 10)).fill(null);

  return (
    <>
      <nav className="sticky top-0 z-20 bg-blue-600 text-white h-[50px] flex items-center justify-center">
        XX view through
      </nav>
      <div className="flex flex-wrap gap-[20px] justify-center mt-[20px]">
        {datatoshow?.map((item, i) => {
          return (
            <Link
              href={`/${item._id}`}
              key={i + new Date().getMilliseconds()}
              className=" cards w-[100px]  aspect-[3/5] shadow-xl rounded-[10px] overflow-hidden cursor-pointer md:w-[150px] md:rounded-[15px] lg:w-[200px] lg:rounded-[20px] "
            >
              <img
                src={item.images[0]}
                alt="hello"
                width={100}
                height={100}
                className="h-full w-full  object-cover scale-[1.1] hover:scale-[1] duration-300"
              ></img>
            </Link>
          );
        })}
      </div>

      {/* next and previous */}
      <div className="flex justify-center flex-wrap gap-[10px] pt-[50px]">
        {Number(searchParams.page) != 1 && (
          <Link
            href={`?page=${Number(searchParams.page) - 1}`}
            className="bg-blue-700 text-white py-[3px] px-[20px] rounded-full"
          >
            Previous
          </Link>
        )}
        {Number(searchParams.page) != pages.length && (
          <Link
            href={`?page=${Number(searchParams.page) + 1}`}
            className="bg-blue-700 text-white py-[3px] px-[20px] rounded-full"
          >
            Next
          </Link>
        )}
      </div>

      <div className="flex justify-center flex-wrap gap-[10px] py-[50px]">
        {pages.map((item, i) => {
          return (
            <Link
              key={i}
              href={`?page=${i + 1}`}
              className="bg-blue-700 text-white py-[3px] px-[20px] rounded-full"
            >
              page{i + 1}
            </Link>
          );
        })}
      </div>
    </>
  );
}
