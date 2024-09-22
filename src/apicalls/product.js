import { axiosInstance } from "./axiosInstance";

// sell product
export const sellProduct = async (payload) => {
  console.log(payload);
  try {
    const res = await axiosInstance.post("/create-product", payload, {
      validateStatus: () => true,
    });

    return res.data;
  } catch (err) {
    return err.message;
  }
};

// get products
export const getProducts = async () => {
  try {
    const res = await axiosInstance.get("/products", {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Get old data product
export const getOldDataProduct = async (id) => {
  try {
    const res = await axiosInstance.get(`/product/${id}`, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Update Product
export const updateProduct = async (payload) => {
  try {
    const res = await axiosInstance.post("/update-product", payload, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Delete Product
export const deleteProduct = async (id) => {
  try {
    const res = await axiosInstance.delete(`/product/${id}`, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Upload Image
export const UploadProductImages = async (payload) => {
  try {
    const res = await axiosInstance.post("/upload-image", payload, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};
