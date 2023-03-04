import { json } from "react-router";

export const postData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
