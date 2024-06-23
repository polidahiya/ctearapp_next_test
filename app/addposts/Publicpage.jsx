"use client";
import React, { useState, useEffect } from "react";

function Publicpage() {
  const [post, setPost] = useState({
    images: [],
    tags: "",
  });
  const [previews, setPreviews] = useState([]);
  const [uploadloading, setuploadloading] = useState(false);

  // Interchange function
  const interchange = (x, y) => {
    let newImages = [...post.images];
    [newImages[x], newImages[y]] = [newImages[y], newImages[x]];
    setPost((prevPost) => ({
      ...prevPost,
      images: newImages,
    }));

    let newPreview = [...previews];
    [newPreview[x], newPreview[y]] = [newPreview[y], newPreview[x]];
    setPreviews(newPreview);
  };

  useEffect(() => {
    const generatePreviews = async () => {
      const previewPromises = post.images.map((file) => {
        return new Promise((resolve, reject) => {
          if (typeof file === "object") {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          } else {
            resolve(null);
          }
        });
      });

      const previewUrls = await Promise.all(previewPromises);
      setPreviews(previewUrls);
    };
    if (post.images.length > 0) {
      generatePreviews();
    }
  }, [post.images]);

  return (
    <div className="flex flex-col items-center gap-[10px] mt-[50px]">
      <div className="relative w-fit px-[30px] py-[5px] cursor-pointer bg-sky-500 text-white rounded-[5px]">
        <input
          className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer z-10"
          type="file"
          name=""
          id=""
          multiple
          onInput={(e) => {
            const listOfImages = Array.from(e.target.files);
            if (listOfImages.length !== 3) {
              alert("Select 3 images");
              return;
            }
            setPost({ ...post, images: listOfImages });
          }}
        />
        <div className="pointer-events-none cursor-pointer">+ Add image</div>
      </div>
      {previews.length > 0 && (
        <div className="flex flex-col gap-[10px] border border-slate-300 p-[10px] rounded-[5px]">
          <div className="flex justify-center gap-[10px]">
            <div className="w-[100px] text-center">Normal</div>
            <div className="w-[100px] text-center">Bikini</div>
            <div className="w-[100px] text-center">Nude</div>
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            {previews.map((src, index) => (
              <img
                className="w-[100px] aspect-square object-contain border border-slate-300"
                key={index}
                src={src}
                alt={`Preview ${index}`}
              />
            ))}
          </div>
          <div className="flex justify-center gap-[10px]">
            <button
              className="border border-slate-300 rounded-full px-[20px]"
              onClick={() => interchange(0, 1)}
            >
              Interchange
            </button>
            <button
              className="border border-slate-300 rounded-full px-[20px]"
              onClick={() => interchange(1, 2)}
            >
              Interchange
            </button>
          </div>
        </div>
      )}
      {/* Tags */}
      <input
        type="text"
        value={post.tags}
        className="w-[90%] border border-slate-300 outline-none px-[10px] py-[5px] rounded-[5px]"
        onInput={(e) => setPost({ ...post, tags: e.target.value })}
        placeholder="Tags"
      />
      <button
        className="flex items-center justify-center gap-[10px] bg-green-600 text-white px-[10px] py-[5px] rounded-[5px]"
        onClick={() => {
          if (uploadloading) {
            return;
          }
          setuploadloading(true);

          if (post.images.length !== 3) {
            alert("Select 3 images");
            return;
          }

          const formData = new FormData();
          post.images.forEach((image, i) => {
            formData.append("image" + i, image);
          });
          formData.append("tags", post.tags);

          fetch("/api/addimage", {
            method: "post",
            body: formData,
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              if (res?.message) {
                console.log(res?.error);
                alert(res.message);
                setuploadloading(false);
                setPreviews([]);
                setPost({
                  images: [],
                  tags: "",
                });
              }
            });
        }}
      >
        {uploadloading && (
          <div className="uploadloader h-[20px] aspect-square rounded-full border-t-2 border-l-2 border-solid border-white"></div>
        )}
        Add post
      </button>
    </div>
  );
}

export default Publicpage;
