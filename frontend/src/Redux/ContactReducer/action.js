import { getData } from "../../util/localStore";
import * as Types from "./actionType";

let token = getData("Auth")?.token

export const getContact = (id) => (dispatch) => {
    dispatch({ type: Types.GET_CONTACT_REQUEST });
   
    fetch(`http://localhost:8000/auth/getAllUsers/${id}` , {
        method: "GET",
        headers: {
            "content-type": "applications/json",
            "authorization": token
        }
    })
      .then((res) => res.json())
      .then((res) => {
          dispatch({type:Types.GET_CONTACT_SUCCESS , payload:res})
      });
  };