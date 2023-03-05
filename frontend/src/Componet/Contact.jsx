import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../Redux/AuthReducer/action";

const Contact = ({ currentUser, setCurrentChat }) => {
  const [allUser, setAllUser] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.contactreducer?.allConact.data);
  useEffect(() => {
    if (data) {
      setAllUser(data);
    }
  }, [data]);

  const handleMassge = (e) => {
    setCurrentChat(e);
  };

  const handleSignOut = () => {
    dispatch(signout());
    localStorage.clear();
  };

  return (
    <Box>
      <Box fontSize="3rem" pl="2rem">
        Contact
      </Box>
      <Box height="60vh">
        {allUser.length > 0 &&
          allUser.map((e) => {
            return (
              <Box
                key={e._id}
                display="flex"
                flexDirection="column"
                m="1rem"
                onClick={() =>
                  handleMassge({
                    ...e,
                    currentUser: currentUser.username,
                    currentUserId: currentUser._id,
                  })
                }
              >
                <Box
                  bgcolor="teal"
                  borderRadius="5px"
                  fontSize="2rem"
                  pl="2rem"
                >
                  {e.username}
                </Box>
              </Box>
            );
          })}
      </Box>
      <Box>
        <Box fontSize="2rem" pl="2rem">
          {currentUser.username}
          <Box>
            <Button onClick={handleSignOut} pl="2rem">
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
