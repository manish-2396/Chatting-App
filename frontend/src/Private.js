import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Private = ({ children }) => {
  const data = useSelector((state) => state.authreducer);
  const navigate = useNavigate();


  useEffect(() => {
    if (!data.isAuth) {
      return navigate("/signin");
    }
  }, data);

  return children;
};

export default Private;
