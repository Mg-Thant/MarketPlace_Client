import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { getProductDetails } from "../../apicalls/public";
import TradeHub from "../../images/TradeHub.jpg";
import { setLoading } from "../../store/slices/userSlice";
import { FadeLoader } from "react-spinners";

const Details = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.reducer.user.loading);

  const productDetails = async () => {
    dispatch(setLoading(true));
    const { id } = params;
    try {
      const res = await getProductDetails(id);
      if (res.isSuccess) {
        setProduct(res.product);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      navigate("/");
      message.error(err.message);
    }
    dispatch(setLoading(false))
  };

  useEffect(() => {
    productDetails();
  }, []);

  return (
    <section className="flex items-center justify-between mt-20">
      {loading ? (
        <FadeLoader
          color={"#0000ff"}
          loading={loading}
          size={15}
          speedMultiplier={1}
          className="mx-auto mt-44"
        />
      ) : (
        <>
          {product && product.category && product.seller && (
            <>
              <div className="w-1/3 ml-4">
                {product && product.images && product.images.length > 0 ? (
                  <>
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-[380px] object-cover object-center rounded-md overflow-hidden"
                    />
                    <div className="flex items-center gap-3 mt-3">
                      {product.images.map((image, index) => (
                        <div
                          key={index}
                          className={`border-2 overflow-hidden border-blue-400 rounded-lg p-2 ${
                            selectedImage === index && "border-dashed"
                          }`}
                        >
                          <img
                            src={image}
                            alt={product.name}
                            className=" w-24 h-24 object-cover cursor-pointer"
                            onClick={() => setSelectedImage(index)}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={TradeHub}
                      alt={product.name}
                      className="w-full h-96 object-fill object-center rounded-xl overflow-hidden"
                    />
                    <p className=" font-medium my-2 text-red-600">
                      This product does not include images.
                    </p>
                  </>
                )}
              </div>
              <div className="w-2/3 px-20">
                <h1 className=" text-4xl font-bold my-1">{product.name}</h1>
                <p className=" text-gray-500 font-medium leading-6 mb-4">
                  {product.description}
                </p>
                <hr />
                <h1 className="text-2xl font-semibold my-2">Infomations</h1>
                <div className="flex justify-between mb-4">
                  <div className=" font-medium space-y-2">
                    <p>Type</p>
                    <p>Used On</p>
                  </div>
                  <div className=" text-gray-600 space-y-2 text-right">
                    <p>{product.category.toUpperCase().replaceAll("_", " ")}</p>
                    <p>{product.usedOn}</p>
                  </div>
                </div>
                <hr />
                <div className=" mb-4">
                  <h1 className="text-2xl font-semibold my-2">Details</h1>
                  {product.details.map((data, index) => (
                    <div className="flex justify-between" key={index}>
                      <div className=" font-medium space-y-2">
                        <p>{data}</p>
                      </div>
                      <div className=" text-gray-600 space-y-2">
                        <p>Include</p>
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
                <h1 className="text-2xl font-semibold my-2">
                  Seller Infomation
                </h1>
                <div className="flex justify-between mb-4">
                  <div className=" font-medium space-y-2">
                    <p>Name</p>
                    <p>E-mail</p>
                  </div>
                  <div className=" text-gray-600 space-y-2 text-right">
                    <p>{product.seller.username}</p>
                    <p>{product.seller.email}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Details;
