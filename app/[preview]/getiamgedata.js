"use server";
import { data, ObjectId } from "../mongodb";

export const Getsimagedata = async (imageid) => {
  const objectId = new ObjectId(imageid);
  let datatoshow = await data.findOne(
    { _id: objectId },
    { projection: { images: 1 } }
  );
  datatoshow._id = datatoshow._id.toString();

  if (datatoshow) {
    return datatoshow;
  } else {
    return null;
  }
};
