import { Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { getProducts } from "../../apicalls/product";

import Products from "./Products";
import ManageProduct from "./ManageProduct";
import General from "./General";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const getAllProduct = async () => {
    try {
      const res = await getProducts();
      if (!res.isSuccess) {
        throw new Error(res.message);
      } else {
        setProducts(res.products);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, [activeTabKey]);

  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products products={products} setActiveTabKey={setActiveTabKey} setEditMode={setEditMode} setEditProductId={setEditProductId} getAllProduct={getAllProduct} />,
    },
    {
      key: "2",
      label: "Manage Products",
      children: <ManageProduct setActiveTabKey={setActiveTabKey}  getAllProduct={getAllProduct} editMode={editMode} editProductId={editProductId} />,
    },
    {
      key: "3",
      label: "Notifications",
      children: "Content of Tab Pane 2",
    },
    {
      key: "4",
      label: "General",
      children: <General />,
    },
  ];

  const handleOnChange = (key) => {
    setActiveTabKey(key);
    setEditMode(false);
  }

  return (
    <Tabs
      activeKey={activeTabKey}
      onChange={(key) => handleOnChange(key)}
      items={items}
      tabPosition="left"
      size="large"
    />
  );
};

export default Index;
