import { XCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { UploadProductImages } from "../apicalls/product";
import { message } from "antd";

const Upload = ({ editProductId, setActiveTabKey }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);

  const handleOnChange = (e) => {
    setImages((prevImg) => [...prevImg, ...e.target.files]);
    const selectedImagesArray = Array.from(e.target.files);
    const previewImagesArray = selectedImagesArray.map((image) =>
      URL.createObjectURL(image)
    );
    setPreviewImages((prevImages) => [...prevImages, ...previewImagesArray]);
  };

  const removeHandler = (image) => {
    const removedImageIndex = previewImages.indexOf(image);
    setPreviewImages(previewImages.filter((img) => img !== image));
    URL.revokeObjectURL(image);

    const updatedImages = images.filter((img, index) => {
      return index !== removedImageIndex;
    });

    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("product_images", images[i]);
    }
    formData.append("product_id", editProductId);
    try {
      const res = await UploadProductImages(formData);
      if (res.message) {
        message.success(res.message);
        setActiveTabKey("1");
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upload Product Image</h1>
      <form
        action=""
        method="post"
        encType="multipart/form-data"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label
          htmlFor="upload"
          className="p-2 rounded-md border-dashed border-2 border-blue-600 font-medium my-4 text-blue-600 cursor-pointer"
        >
          Upload From Device
        </label>
        <input
          type="file"
          hidden
          id="upload"
          name="product_image"
          multiple
          accept="image/png, image/jpg, image/jpeg"
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <div className="m-4 flex items-center justify-center gap-4 flex-wrap">
          {previewImages.length > 0 &&
            previewImages.map((image, index) => {
              return (
                <div key={index} className="w-80 h-56 my-4 basis-1/4 relative">
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="bg-black w-6 h-6 absolute z-20 -top-2 -right-3 cursor-pointer rounded-full">
                    <XCircleIcon
                      width={25}
                      height={25}
                      className="text-red-600 w-full h-full"
                      onClick={() => {
                        removeHandler(image);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <button className="block my-4 text-white bg-blue-600 rounded-md px-3 py-2 font-medium">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
