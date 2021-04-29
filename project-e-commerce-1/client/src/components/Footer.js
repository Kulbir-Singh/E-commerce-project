import React from "react";
import styled from "styled-components";
import { COLORS } from "./GlobalStyles";
import { Link } from "react-router-dom";
import {
  IoStorefrontOutline,
  IoAtOutline,
  FiPhone,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoYoutube,
} from "react-icons/all";

const Footer = () => {
  return (
    <Wrapper>
      <Left>
        <Container>
          <Icon>
            <IoStorefrontOutline />
          </Icon>
          <div>
            <Span>1455 de Maisonneuve Blvd W, Montréal</Span>
          </div>
        </Container>
        <Container>
          <Icon>
            <FiPhone />
          </Icon>
          <div>
            <Span>1-877-543-2211</Span>
            <br></br>
            <Span>TTY: 1-888-866-9845</Span>
          </div>
        </Container>
        <Container>
          <Icon>
            <IoAtOutline />
          </Icon>
          <Span>info@smarthealth.ca</Span>
        </Container>
      </Left>
      <SocialMedia>
        <LinkTo to={"/"}>
          <IoLogoFacebook />
        </LinkTo>
        <LinkTo to={"/"}>
          <IoLogoTwitter />
        </LinkTo>
        <LinkTo to={"/"}>
          <IoLogoInstagram />
        </LinkTo>
        <LinkTo to={"/"}>
          <IoLogoYoutube />
        </LinkTo>
      </SocialMedia>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  grid-area: footer;
  height: 100%;
  background: black;
  display: flex;
  justify-content: space-between;
  color: white;
`;
const Left = styled.div`
  display: flex;
  width: 50%;
  margin-left: 30px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
`;
const Icon = styled.div`
  width: 50px;
  font-size: 1.5em;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  color: ${COLORS.accent};
`;
const Span = styled.span`
  font-size: 10px;
`;
const SocialMedia = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5em;
  width: 150px;
  margin-right: 30px;
`;
const LinkTo = styled(Link)`
  text-decoration: none;
  color: white;
  cursor: pointer;
`;
export default Footer;
