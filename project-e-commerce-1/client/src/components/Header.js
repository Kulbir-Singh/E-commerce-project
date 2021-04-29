import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { COLORS } from "./GlobalStyles";
import { BiShoppingBag } from "react-icons/bi";
import { IoWatch } from "react-icons/io5";
import { useSelector } from "react-redux";
import Search from "./Search";

const Header = ({ setCartOpen, cartOpen }) => {
  // this sets the total of items displaying next to the shopping cart
  const numOfItems = useSelector((state) => {
    // console.log("state in header", state.cartReducer);
    let cartItems = Object.values(state.cartReducer);
    // console.log("cart", cartItems);
    let numOfItems = 0;
    cartItems.forEach((item) => {
      numOfItems += item.quantity;
    });
    return numOfItems;
  });

  return (
    <Wrapper>
      <NavBar>
        <Logo>
          <IoWatch />
          <NavLinkTo exact to="/">
            <Title>
              <strong>SMART</strong>health
            </Title>
          </NavLinkTo>
        </Logo>
      </NavBar>
      <SearchBar />
      <ShoppingCart>
        <Button onClick={() => setCartOpen(!cartOpen)}>
          <BiShoppingBag />
        </Button>
        <CounterBadge>{numOfItems}</CounterBadge>
      </ShoppingCart>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  grid-area: header;
  background: black;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 25%;
`;
const NavLinkTo = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  color: white;

  &.active {
    color: ${COLORS.accent};
  }
`;
const Link = styled.span`
  font-size: 16px;
  margin-left: 10%;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 35px;
  color: ${COLORS.accent};
`;
const Title = styled.span`
  font-family: "Fredoka One", cursive;
  line-height: 120%;
  color: white;
`;
const ShoppingCart = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
const Button = styled.button`
  font-size: 25px;
  color: white;
  cursor: pointer;
  background: transparent;
  border: none;
  text-decoration: none;
  &:focus {
    outline: none;
    color: ${COLORS.accent};
  }
`;
const CounterBadge = styled.span`
  color: white;
  background: red;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  width: 20px;
  height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBar = styled(Search)`
  z-index: 5;
`;
export default Header;
