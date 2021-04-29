import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "./GlobalStyles";

import fitness from "../assets/video/fitness.mp4";

const Banner = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <div />
      <video
        src={fitness}
        autoplay="autoplay"
        muted //required or it won't autoplay in most browsers
        loop
      />
      <h1>YOUR WATCH, YOUR HEALTH</h1>
      <h2>We have the best brands in the market</h2>
      <button onClick={() => history.push("/items")}>shop now</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  overflow: hidden;
  position: relative;
  video {
    overflow: hidden;
    min-height: 100%;
    width: 100vw;
  }
  div {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(50, 50, 50, 0.3);
  }
  h1 {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
    color: white;
    width: fit-content;
    font-size: 50px;
    z-index: 3;
  }
  h2 {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%);
    color: white;
    font-size: 32px;
    z-index: 3;
    font-weight: normal;
  }
  button {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%);
    border: 2px solid ${COLORS.accent};
    border-radius: 15px;
    background: transparent;
    color: ${COLORS.accent};
    font-size: 48px;
    font-weight: 700;
    text-align: center;
    letter-spacing: 5px;
    padding: 8px 16px;
    cursor: pointer;
    z-index: 3;
  }
`;

export default Banner;
