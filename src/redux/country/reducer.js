import { USA, UK } from "./constant";
import { USAParams, UKParams, SET_PHOTO } from "./constant";
import { getCountryParams } from "./action";

const initialState = {
  country: USA,
  countryParams: {
    ...USAParams,
  },
  photo: "",
};

export default function store(state = initialState, action) {
  switch (action.type) {
    case USA: {
      return {
        ...state,
        country: USA,
        countryParams: USAParams,
      };
    }
    case UK: {
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
    default:
      return state;
  }
}
