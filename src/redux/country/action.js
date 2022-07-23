import {
  SET_PHOTO,
  CAMERA_REQ,
  SET_REQUIREMENT,
  FACE_STATS,
  PROCESS_PHOTO,
  SET_PAGE,
  CAMERA_FACE,
  SET_MODE,
} from "./constant";

export const getCountryParams = (country) => async (dispatch) => {
  console.log("action");
  dispatch({ type: country, params: {} });
};

export const setPhoto = (image) => async (dispatch) => {
  dispatch({ type: SET_PHOTO, params: { image: image } });
};
export const setMode = (req) => async (dispatch) => {
  dispatch({ type: SET_MODE, params: { req: req } });
};
export const setProcessedPhoto = (image) => async (dispatch) => {
  dispatch({ type: PROCESS_PHOTO, params: { image: image } });
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
export const faceSmile = (req) => async (dispatch) => {
  dispatch({ type: FACE_STATS, params: { req: req } });
};
export const cameraFace = (req) => async (dispatch) => {
  dispatch({ type: CAMERA_FACE, params: { req: req } });
};
export const setPage = (req) => async (dispatch) => {
  dispatch({ type: SET_PAGE, params: { req: req } });
};
