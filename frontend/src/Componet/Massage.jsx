import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMassage, getMassage } from "../Redux/AppReducer/action";
import { v4 as uuidv4 } from "uuid";

const Massage = ({ CurretChat, socket }) => {
  const dispatch = useDispatch();
  const dataMassage = useSelector((state) => state.appreducer.data.data);
  const [masg, setmasg] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentChat, setCurrentChat] = useState("");
  const [arr, setArr] = useState({});
  const [massage, setMassage] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    if (dataMassage && dataMassage.length > 0) {
      setMassage(dataMassage);
    }
  }, [dataMassage]);

  useEffect(() => {
    setCurrentUser(CurretChat?.currentUserId);
    setCurrentChat(CurretChat?._id);
  }, [CurretChat]);

  useEffect(() => {
    const payload = {
      from: currentUser,
      to: currentChat,
    };

    dispatch(getMassage(payload));
  }, [currentChat]);

  const hanleMoves = (e) => {
    if (e.key === "Enter" && currentChat) {
      const payload = {
        Massage: masg,
        from: currentUser,
        to: currentChat,
      };
      setmasg("");
      dispatch(addMassage(payload));
      socket.current.emit("send-msg", payload);
      const msg = [...massage];
      msg.push({
        Message: {
          text: masg,
        },
        users: [currentUser, currentChat],
        sender: currentUser,
        _id: uuidv4(),
      });

      setMassage(msg);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receieve", (msg) => {
        let { Massage, from, to } = msg;
        setArr({
          Message: {
            text: Massage,
          },
          users: [from, to],
          sender: from,
          _id: uuidv4(),
        });
      });
    }
  }, [socket.current]);

  useEffect(() => {
    if (arr.sender) {
      let temp = [...massage, arr];
      setMassage(temp);
    }
  }, [arr]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [dataMassage]);

  return (
    <Box borderLeft="3px solid teal">
      <Box height="auto">
        {currentUser && (
          <Box fontSize="3rem" pl="2rem">
            {CurretChat?.username}
          </Box>
        )}
      </Box>

      {
        <Box
          height="70vh"
          style={{ overflowY: "scroll" }}
          ref={scrollRef}
          p="1rem"
        >
          {massage.map((e) => {
            return (
              <Box
                key={e._id}
                m="10px"
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
      <Box height="10vh" fontSize="1rem">
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
