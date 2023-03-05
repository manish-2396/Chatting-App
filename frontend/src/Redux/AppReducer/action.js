import { getData } from "../../util/localStore";
import * as Types from "./actionType";


let token = getData("Auth")?.token

export const getMassage = (payload) => (dispatch) => {

  dispatch({ type: Types.GET_MASSAGE_REQUEST });
  fetch(`http://localhost:8000/chat/getChat`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": token
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => dispatch({ type: Types.GET_MASSAGE_SUCCUSS, payload: res }));
};

export const addMassage = (payload) => (dispatch) => {
  fetch(`http://localhost:8000/chat/addChat`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": token
    },
    body: JSON.stringify(payload),
  })
};
