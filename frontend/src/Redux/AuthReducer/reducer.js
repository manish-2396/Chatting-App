import { getData, postData } from "../../util/localStore";
import * as Types from "./actionType";

const initialState = {
  isLoading: false,
  isError: false,
  isAuth: getData("Auth")?.isAuth || false,
  token: getData("Auth")?.token || null,
  username: getData("Auth")?.username || null,
  email: getData("Auth")?.email || null,
  _id: getData("Auth")?._id || null,
};

export const authreducer = (state = initialState, { type, payload }) => {
  
  switch (type) {
    case Types.SIGNIN_REQUEST: {
      return {
        isLoading: true,
        isError: false,
        isAuth: false,
        token: null,
      };
    }
    case Types.SIGNIN_SUCCES: {
      postData("Auth", payload);
      return {
        isLoading: false,
        isError: false,
        isAuth: true,
        token: payload.token,
        username: payload.username,
      };
    }
    case Types.SIGNIN_FAILUER: {
      return {
        isLoading: false,
        isError: true,
        isAuth: false,
        token: null,
      };
    }
   
    default:
      return state;
  }
};
