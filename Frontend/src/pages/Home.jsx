import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from 'axios'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8800/api/video/randome')
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
  }, [])

  return (
    <Container>
      {videos.map((video) => {
        <Card />
      })}
    </Container>
  );
};

export default Home;
