import React from "react";
import { Getsimagedata } from "./getiamgedata";
import Publicpage from "./Publicpage";

async function page({ params }) {
  const imagedata = await Getsimagedata(params.preview);

  if (imagedata) {
    return (
      <>
        <Publicpage imagedata={imagedata} />
      </>
    );
  }
}

export default page;
