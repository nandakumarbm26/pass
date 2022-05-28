import { USA, UK, SET_COUNTRY, SET_REQUIREMENT, FACE_SMILE } from "./constant";
import {
  USAParams,
  UKParams,
  LOADING,
  FACE_STATS,
  SET_PHOTO,
  CAMERA_REQ,
  PROCESS_PHOTO,
} from "./constant";
import { getCountryParams } from "./action";

const initialState = {
  country: USA,
  countryParams: {
    ...USAParams,
  },
  requirement: "passport",
  photo: "",
  captureVideo: true,
  faceStats: false,
  loading: false,
  processedPhoto: "",
  faceSmile: false,
};

export default function store(state = initialState, action) {
  switch (action.type) {
    case USA: {
      console.log("reducer USA");
      return {
        ...state,
        country: USA,
        countryParams: USAParams,
      };
    }
    case UK: {
      console.log("reducer Uk");

      return {
        ...state,
        country: UK,
        countryParams: UKParams,
      };
    }
    case SET_PHOTO: {
      return {
        ...state,
        photo: action.params.image,
      };
    }
    case PROCESS_PHOTO: {
      return {
        ...state,
        processedPhoto: action.params.image,
      };
    }

    case SET_REQUIREMENT: {
      console.log("requirement reducer : " + action.params.req);
      return { ...state, requirement: action.params.req };
    }
    case CAMERA_REQ: {
      return {
        ...state,
        cameraReq: action.params.req,
      };
    }
    case FACE_STATS: {
      return {
        ...state,
        faceStats: action.params.req,
      };
    }
    case FACE_SMILE: {
      return {
        ...state,
        faceSmile: action.params.req,
      };
    }
    case LOADING: {
      return {
        ...state,
        loading: action.params.req,
      };
    }
    default:
      return state;
  }
}
