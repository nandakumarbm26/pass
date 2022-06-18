import { USA, UK, SET_COUNTRY, SET_REQUIREMENT, FACE_SMILE } from "./constant";
import {
  USAParams,
  UKParams,
  LOADING,
  FACE_STATS,
  SET_PHOTO,
  CAMERA_REQ,
  PROCESS_PHOTO,
  CAMERA_FACE,
  SET_PAGE,
  CAMERA_DIRECTION,
  SET_MODE,
} from "./constant";
import { getCountryParams } from "./action";

const initialState = {
  country: USA,
  countryParams: {
    ...USAParams,
  },
  cameraDirection: "user",
  requirement: "passport",
  photo: "",
  captureVideo: true,
  faceStats: false,
  loading: false,
  processedPhotoHD: "",
  processedPhotoSD: "",
  faceSmile: false,
  cameraFace: "user",
  page: 0,
  mode: "Upload",
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
    case SET_PAGE: {
      return {
        ...state,
        page: action.params.req,
      };
    }
    case SET_MODE: {
      return {
        ...state,
        mode: action.params.req,
      };
    }
    case PROCESS_PHOTO: {
      return {
        ...state,
        processedPhotoHD: action.params.image.hd,
        processedPhotoSD: action.params.image.sd,
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
    case CAMERA_DIRECTION: {
      return {
        ...state,
        cameraDirection: action.params.req,
      };
    }
    case CAMERA_FACE: {
      return {
        ...state,
        cameraFace: action.params.req,
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
