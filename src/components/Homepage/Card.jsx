import React from "react";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";

import TradeHub from "../../images/TradeHub.jpg";
import { Link } from "react-router-dom";
import { message } from "antd";
import { savedProducts, unSavedProduct } from "../../apicalls/product";

const Card = ({ product, saved, savedProduct }) => {
  const handleProductStatus = async (id) => {
    try {
      let res;
      if (saved) {
        res = await unSavedProduct(id);
      } else {
        res = await savedProducts(id);
      }
      if (res.isSuccess) {
        if (saved) {
          savedProduct();
        }
        message.success(res.message);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <div className={`${saved ? "basis-1/4" : "basis-1/2"} p-4 mb-4`}>
      {product.images[0] ? (
        <Link to={`/products/${product._id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-64 w-full object-fit rounded-md"
          />
        </Link>
      ) : (
        <Link to={`/products/${product._id}`}>
          <img src={TradeHub} alt={product.name} className="rounded-md" />
        </Link>
      )}
      <p className="text-white text-xs bg-blue-600 rounded-md font-medium my-2 p-1 w-fit">
        {product.category.toUpperCase().replaceAll("_", " ")}
      </p>
      <div className="flex items-center justify-between">
        <Link to={`/products/${product._id}`}>
          <p className="text-xl font-bold text-gray-700">{product.name}</p>
        </Link>
        {saved ? (
          <BookmarkSlashIcon
            width={20}
            height={30}
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              handleProductStatus(product._id);
            }}
          />
        ) : (
          <BookmarkIcon
            width={20}
            height={30}
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              handleProductStatus(product._id);
            }}
          />
        )}
      </div>
      <p className="text-gray-500 font-medium">
        {product.description.slice(1, 80)}
      </p>
      {product && product.seller && (
        <p className="mt-2">
          <span className="font-bold">Seller</span>: {product.seller.username}
        </p>
      )}
    </div>
  );
};

export default Card;
