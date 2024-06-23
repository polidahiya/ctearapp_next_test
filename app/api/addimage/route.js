import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { data } from "../../mongodb";

cloudinary.config({
  cloud_name: "dz5gmpfoe",
  api_key: "415767188726533",
  api_secret: "w_aUPryn85Cx0vr3GZZ2y1H-Efg",
});

export async function POST(req) {
  try {
    const formData = await req.formData();

    const tags = formData.get("tags");

    let imagesnamearray = [];

    // Helper function to upload a single image
    const uploadImage = (buffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "ctearapp" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.url);
            }
          }
        );
        uploadStream.end(buffer);
      });
    };

    for (let i = 0; i < 3; i++) {
      const image = formData.get("image" + i);
      const buffer = Buffer.from(await image.arrayBuffer());
      const imageUrl = await uploadImage(buffer);
      imagesnamearray.push(imageUrl);
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
