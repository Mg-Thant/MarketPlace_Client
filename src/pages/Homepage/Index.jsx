import React, { useEffect, useState } from "react";
import Hero from "../../components/Homepage/Hero";
import Filter from "../../components/Homepage/Filter";
import Card from "../../components/Homepage/Card";
import { getProducts } from "../../apicalls/public";
import { message, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/slices/userSlice";
import { FadeLoader } from "react-spinners";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.reducer.user.loading);

  const getAllProduct = async () => {
    dispatch(setLoading(true));
    try {
      const res = await getProducts();
      if (res.isSuccess) {
        setProducts(res.products);
        setSuccess(true);
      } else {
        setSuccess(false);
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    dispatch(setLoading(false));
  };

  const getSearchValue = (value) => {
    setProductSearch(value);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <section>
      <Hero
        setProducts={setProducts}
        getAllProduct={getAllProduct}
        getSearchValue={getSearchValue}
        setSuccess={setSuccess}
      />
      <Filter
        setProducts={setProducts}
        getAllProduct={getAllProduct}
        getSearchValue={getSearchValue}
        setSuccess={setSuccess}
      />
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
          <div className="flex max-w-4xl mx-auto flex-wrap">
            {products && products.length > 0 && success && (
              <>
                {products.map((product) => (
                  <Card key={product._id} product={product} saved={false} />
                ))}
              </>
            )}
            {!products && !success && (
              <p className="text-center text-black font-bold text-3xl mx-auto mt-4">
                "{productSearch} is not found!!!"
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Index;
