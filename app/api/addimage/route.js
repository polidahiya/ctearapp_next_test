import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
// import verifyToken from "@/app/components/Verifytoken";
import { cookies } from "next/headers";
import fs from "fs";
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

      const tempFilePath = await saveBufferToFile(
        buffer,
        Math.random() * 200 + image.name
      );

      // upload images
      const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
        folder: "ctearapp",
      });

      imagesnamearray.push(uploadResult.url);
      fs.unlinkSync(tempFilePath);
    }

    // add to mongodb
    // const updateproduct = await sitedata.updateOne(
    const updateproduct = await data.insertOne({
      images: imagesnamearray,
      tags: tags,
    });

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error", error, error });
  }
}

const saveBufferToFile = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, buffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(filename);
      }
    });
  });
};
