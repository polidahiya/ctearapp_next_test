import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
// import verifyToken from "@/app/components/Verifytoken";
// import { cookies } from "next/headers";
import { data } from "../../mongodb";

cloudinary.config({
  cloud_name: "dz5gmpfoe",
  api_key: "415767188726533",
  api_secret: "w_aUPryn85Cx0vr3GZZ2y1H-Efg",
});

export async function POST(req) {
  try {
    // const token = cookies().get("admintoken");

    // if (!token) {
    //   return NextResponse.json({ message: "Please login" });
    // }

    // const tokenres = await verifyToken(token.value);

    // if (tokenres.email != "admin@vishal.com") {
    //   return NextResponse.json({ message: "Invalid user" });
    // }

    const formData = await req.formData();

    const tags = formData.get("tags");

    let imagesnamearray = [];

    for (let i = 0; i < 3; i++) {
      const image = formData.get("image" + i);
      const buffer = Buffer.from(await image.arrayBuffer());

      // Directly upload the buffer to Cloudinary without saving to a temporary file
      const uploadResult = await cloudinary.uploader
        .upload_stream({ folder: "ctearapp" }, (error, result) => {
          if (error) {
            throw error;
          } else {
            imagesnamearray.push(result.url);
          }
        })
        .end(buffer);
    }

    // add to mongodb
    const updateproduct = await data.insertOne({
      images: imagesnamearray,
      tags: tags,
    });

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error", error });
  }
}
