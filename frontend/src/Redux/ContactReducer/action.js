import * as Types from "./actionType";

export const getContact = (id) => (dispatch) => {
    dispatch({ type: Types.GET_CONTACT_REQUEST });
   
    fetch(`http://localhost:8000/auth/getAllUsers/${id}`)
      .then((res) => res.json())
      .then((res) => {
          dispatch({type:Types.GET_CONTACT_SUCCESS , payload:res})
      });
  };