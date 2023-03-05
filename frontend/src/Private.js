import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Private = ({ children }) => {
  const data = useSelector((state) => state.authreducer);
  const navigate = useNavigate();

  if (data.isAuth) {
    return children;
  }

  return navigate("/signin");
};

export default Private;
