import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signup } from "../Redux/AuthReducer/action";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.authreducer);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (data.isAuth) {
      return navigate("/");
    }
  }, [data.isAuth]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(form));
    return navigate("/signin")
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" pt="20%">
      
      <Box width="20%" bgcolor="#fff" p="2rem" borderRadius="10px">
        <Box textAlign="center" fontSize="2rem">Sign up</Box>
        <form action="" onSubmit={handleSubmit}>
          <Box>
            <TextField
              type="text"
              label="User Name"
              variant="standard"
              name="username"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              type="text"
              label="Email Id"
              variant="standard"
              name="email"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              type="password"
              label="Password"
              variant="standard"
              name="password"
              onChange={handleChange}
            />
          </Box>
          <Box pt="10px">
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </Box>
        </form>
        <br/>
        <span onClick={() => navigate("/signin")}>aleady have a account?</span>
      </Box>
    </Box>
  );
};

export default Signup;
