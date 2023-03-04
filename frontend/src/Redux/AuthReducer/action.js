import * as Types from "./actionType";

export const signup = (payload) => (dispatch) => {
  fetch("http://localhost:8000/auth/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then(() => alert("Sigup Successful!"));
};

export const signin = (payload) => (dispatch) => {
  dispatch({ type: Types.SIGNIN_REQUEST });
  fetch("http://localhost:8000/auth/signin", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => dispatch({ type: Types.SIGNIN_SUCCES, payload: res }))
    .catch((err) => dispatch({ type: Types.SIGNIN_FAILUER, payload: err }));
};


export const signout = () => dispatch => {
  dispatch({type: Types.SIGNIN_FAILUER})
}


