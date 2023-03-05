import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Contact from "../Componet/Contact";
import Massage from "../Componet/Massage";
import { getContact } from "../Redux/ContactReducer/action";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const [CurretChat, setCurrentChat] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authreducer);
  
  useEffect(() => {
    if (currentUser._id) {
      dispatch(getContact(currentUser._id));
    }
  }, [currentUser._id]);

  useEffect(() => {
    if (CurretChat?.currentUserId) {
      socket.current = io("http://localhost:8000");
      socket.current.emit("add-user", CurretChat?.currentUserId);
    }
  }, [CurretChat?.currentUserId]);

  return (
    <Box display="flex" justifyContent="center">
      <Box
        display="flex"
        bgcolor="#fff"
        mt="2rem"
        className="box"
        borderRadius="20px"
      >
        <Box className="box1" height="90vh">
          <Contact currentUser={currentUser} setCurrentChat={setCurrentChat} />
        </Box>
        <br />
        <Box className="box2" height="90vh">
          <Massage CurretChat={CurretChat} socket={socket} />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
