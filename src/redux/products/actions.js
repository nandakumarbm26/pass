import api from "../utils/api";
import {
  GET_PRODUCTS,
  LOADING,
  ACTIVE_PRODUCT,
  CAPTURE,
  RESETFACE,
  PREVIEW,
} from "./constants";

// Get All Products
export const getProducts = (type) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const res = await api.post(
      `/shopify/products/filter?type=vendor&vendor=BOLON`
    );
    dispatch({ type: GET_PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const setPreview = (preview) => async (dispatch) => {
  try {
    dispatch({ type: PREVIEW, payload: { preview } });
  } catch (err) {
    console.log(err);
  }
};

export const getProductsFilterd = (type) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const res = await api.get(`shopify/filter?${type}`);

    dispatch({ type: GET_PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
// Get All Products
// export const getProductPage = (type) => async (dispatch) => {
//   dispatch({ type: LOADING });
//   try {
//     const res = await api.get(`shopify/products/page?${type}`);

//     dispatch({ type: GET_PRODUCTS, payload: res.data });
//   } catch (err) {
//     console.log(err);
//   }
// };
//Set face image
export const setFaceImage = (face) => async (dispatch) => {
  try {
    dispatch({ type: CAPTURE, payload: { face } });
  } catch (err) {
    console.log(err);
  }
};
export const resetFace = () => async (dispatch) => {
  dispatch({ type: RESETFACE });
};
//Set Active Product
export const setActiveProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: ACTIVE_PRODUCT, payload: { product } });
  } catch (err) {
    console.log(err);
  }
};
