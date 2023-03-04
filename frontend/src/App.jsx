import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import Chat from "./Page.jsx/Chat";
import Signup from "./Page.jsx/Signup";
import Signin from "./Page.jsx/Signin";
import { Box } from "@mui/material";

function App() {
  return (
    <Box className="App">
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Box>
  );
}

export default App;
