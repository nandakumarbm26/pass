import { USA, UK, SET_PHOTO, SET_COUNTRY, SET_REQUIREMENT } from "./constant";

export const getCountryParams = (country) => async (dispatch) => {
  console.log("action");
  dispatch({ type: country, params: {} });
};

export const setPhoto = (image) => async (dispatch) => {
  console.log(image);
  dispatch({ type: SET_PHOTO, params: { image: image } });
};

export const setRequiremnets = (req) => async (dispatch) => {
  dispatch({ type: SET_REQUIREMENT, params: { req: req } });
};
