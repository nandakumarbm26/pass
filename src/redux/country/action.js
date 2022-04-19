import { USA, UK, SET_PHOTO } from "./constant";

export const getCountryParams = (country) => async (dispatch) => {
  dispatch({ action: country, params: {} });
};

export const setPhoto = (image) => async (dispatch) => {
  console.log(image);
  dispatch({ type: SET_PHOTO, params: { image: image } });
};
