import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMassage, getMassage } from "../Redux/AppReducer/action";

const Massage = ({ CurretChat, socket }) => {
  const dispatch = useDispatch();
  const dataMassage = useSelector((state) => state.appreducer.data.data);
  const [masg, setmasg] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentChat, setCurrentChat] = useState("");
  const [arr, setArr] = useState({});
  const scrollRef = useRef();
  console.log(socket)

  useEffect(() => {
    setCurrentUser(CurretChat?.currentUserId);
    setCurrentChat(CurretChat?._id);
  }, [CurretChat]);

  useEffect(() => {
    dispatch(
      getMassage({
        from: currentUser,
        to: currentChat,
      })
    );
  }, [currentChat]);

  // console.log(dataMassage);

  const hanleMoves = (e) => {
    console.log(e.key);

    if (e.key === "Enter" && currentChat) {
      const payload = {
        Massage: masg,
        from: currentUser,
        to: currentChat,
      };

      setmasg("");
      dispatch(addMassage(payload));
    }
  };

  // console.log(socket.current);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receieve", (msg) => {
        console.log("msg", msg);
        setArr({});
      });
    }
  }, [socket.current]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [dataMassage]);

  return (
    <Box>
      <Box height="10vh">
        {currentUser && (
          <Box fontSize="3rem" pl="2rem">
            {CurretChat?.username}
          </Box>
        )}
      </Box>

      {
        <Box
          height="70vh"
          style={{ overflowY: "scroll", border: "solid" }}
          ref={scrollRef}
        >
          {dataMassage &&
            dataMassage.length > 0 &&
            dataMassage.map((e) => {
              return (
                <Box
                  key={e._id}
                  border="1px solid black"
                  m="5px"
                  p="5px"
                  fontSize="1.4rem"
                  borderRadius="10px"
                  className={`${
                    currentUser === e.users[0] ? "recieved" : "sender"
                  }`}
                >
                  {e.Message.text}
                </Box>
              );
            })}
          {dataMassage && dataMassage.length == 0 && (
            <Box display="flex" justifyContent="center">
              {" "}
              <img
                style={{ width: "20rem" }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-a7MliySktGWnhzO9B2Ct5f72S2Dk57gquS1jBlCD&s"
                alt=""
              />
            </Box>
          )}
        </Box>
      }
      <Box height="10vh" border="1px solid green">
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          onKeyUp={(e) => hanleMoves(e)}
          onChange={(e) => setmasg(e.target.value)}
          value={masg}
        />
      </Box>
    </Box>
  );
};

export default Massage;
