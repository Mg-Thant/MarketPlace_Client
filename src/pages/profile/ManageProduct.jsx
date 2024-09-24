import { Tabs } from "antd";
import ProductForm from "../../components/ProductForm";
import { useState } from "react";
import Upload from "../../components/Upload";

const ManageProduct = ({
  setActiveTabKey,
  getAllProduct,
  editMode,
  editProductId,
  manageTabKey
}) => {
  const [productActiveTabKey, setProductActiveTabKey] = useState("1");
  const items = [
    {
      key: "1",
      label: "Product Details",
      children: (
        <ProductForm
          setActiveTabKey={setActiveTabKey}
          getAllProduct={getAllProduct}
          editMode={editMode}
          editProductId={editProductId}
        />
      ),
    },
    editMode
      ? {
          key: "2",
          label: "Product Images",
          children: (
            <Upload
              editProductId={editProductId}
              setActiveTabKey={setActiveTabKey}
            />
          ),
        }
      : null,
  ];

  const handleOnChange = (key) => {
    setProductActiveTabKey(key);
  };

  return (
    <Tabs
      defaultActiveKey={manageTabKey}
      items={items}
    />
  );
};

export default ManageProduct;
