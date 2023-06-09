import React from "react";
import styled from "styled-components";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Avatar } from "@mui/material";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap:10px;
  font-weght:500;
  color: ${({ theme }) => theme.text}
`


const Navbar = () => {
  const { currentUser } = useSelector(state => state.user)
  useSelector(state => console.log(state.user))
  return (
    <Container>
      <Wrapper>
        {currentUser ? (
          <User>
            <VideoCallOutlinedIcon></VideoCallOutlinedIcon>
            <Avatar />
            {currentUser.name}
          </User>
        ) : (
          <Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>)}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
