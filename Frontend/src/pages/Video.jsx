import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Description = styled.p`
  font-size: 14px;
`;



const Video = () => {
  const { currentUser } = useSelector(state => state.user);
  const { currentVideo } = useSelector(state => state.video);

  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2]


  const [user, setUser] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`http://localhost:8800/api/video/find/${path}`)
        const userRes = await axios.get(`http://localhost:8800/api/users/find/${videoRes.data.userId}`)
        setUser(userRes.data)
        dispatch(fetchSuccess(videoRes.data))

      } catch (error) {

      }
    }

    fetchData()
  }, [path, dispatch])

  const handleLike = async () => {
    console.log(currentVideo._id)
    console.log('Hited')
    await axios.put(`http://localhost:8800/api/users/like/${currentVideo._id}`)
    dispatch(like(currentUser._id))
    
  }

  const handleDisLike = async () => {
    await axios.put(`http://localhost:8800/api/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id))
  }




  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="580"
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.videoViews} views • {currentVideo.createdAt}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDisLike}>
              {currentVideo.dislikes?.includes(currentUser._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <ChannelName>Posted By:{" "} {currentUser.name}</ChannelName>
            <ChannelDetail>
              <Description>DESCRIPTION:{" " + " "}
                {currentVideo.description}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id}/>
      </Content>
    </Container>
  );
};

export default Video;
