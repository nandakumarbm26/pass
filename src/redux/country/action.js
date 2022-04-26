import {
  USA,
  UK,
  SET_PHOTO,
  CAMERA_REQ,
  SET_COUNTRY,
  SET_REQUIREMENT,
  FACE_STATS,
} from "./constant";

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

export const cameraReq = (req) => async (dispatch) => {
  dispatch({ type: CAMERA_REQ, params: { req: req } });
};
export const faceStats = (req) => async (dispatch) => {
  dispatch({ type: FACE_STATS, params: { req: req } });
};
