import {
  GET_PRODUCTS,
  ACTIVE_PRODUCT,
  LOADING,
  CAPTURE,
  RESETFACE,
  PREVIEW,
} from "./constants";

const initialState = {
  products: [],
  loading: true,
  activeProduct: {},
  next: {},
  previous: {},
  brands: [],
  face: "",
  preview:"",
};

export default function store(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: payload.products,
        loading: false,
      };

    case ACTIVE_PRODUCT:
      return {
        ...state,
        activeProduct: { ...payload.product },
        loading: false,
      };
    case CAPTURE:
      return {
        ...state,
        face: payload.face,
      };
    // case GET_BRANDS:
    //   return {
    //     ...state,
    //     brands: payload,
    //   };
    case RESETFACE:
      return {
        ...state,
        face: "",
      };
      
    case PREVIEW:
      return {
        ...state,
        preview:payload.preview,
      };
    default:
      return state;
  }
}
