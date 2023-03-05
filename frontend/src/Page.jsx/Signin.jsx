import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signin } from "../Redux/AuthReducer/action";

const Signin = () => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.authreducer);
  const navigate = useNavigate();

  useEffect(() => {
    if(data.isAuth){
      return navigate("/")
    }
  }, [data.isAuth])
  
 
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    dispatch(signin(form))

    return navigate("/signin")
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" pt="20%">
      <Box width="20%" bgcolor="#fff" p="2rem" borderRadius="10px">
      <Box textAlign="center" fontSize="2rem">Sign in</Box>
        <form action="" onSubmit={handleSubmit}>
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
            <Button variant="outlined" type="submit">Submit</Button>
          </Box>
        </form>
        <br/>
        <span onClick={() => navigate("/signup")}>don't have account</span>
      </Box>
    </Box>
  );
};

export default Signin;
