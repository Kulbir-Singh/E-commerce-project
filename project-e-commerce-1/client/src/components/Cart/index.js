import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import cartReducer, { getItemArray } from "../../reducers/cartReducer";
import { ModalContext } from "./context";
import CheckoutModal from "./CheckoutModal";

const Cart = () => {
  const [showModal, updateShowModal] = React.useState(false);
  const toggleModal = () => {
    updateShowModal((state) => !state);
  };

  const storeItems = useSelector((state) => {
    //console.log("state", state);
    return Object.values(state.cartReducer);
  });

  //total of items in cart
  const numOfItems = useSelector((state) => {
    let cartItems = Object.values(state.cartReducer);
    let numOfItems = 0;
    cartItems.forEach((item) => {
      numOfItems += item.quantity;
    });
    return numOfItems;
  });

  // total of products selected
  let total = 0;
  storeItems.forEach((item) => {
    total += Number(item.price.split("$")[1]) * item.quantity;
    return total;
  });

  return (
    <Wrapper>
      <Top>
        <h2>Shopping Cart</h2>
        <Items>{numOfItems} item(s)</Items>
      </Top>
      <Middle>
        {storeItems.map((item) => {
          //console.log(item);
          return (
            <CartItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              numInStock={item.numInStock}
              src={item.imageSrc}
            />
          );
        })}
      </Middle>
      <Bottom>
        <Total>
          <span>Total: </span>
          <strong>${total.toFixed(2)}</strong>
        </Total>
        <ModalContext.Provider
          value={{ showModal, toggleModal, total, storeItems }}
        >
          <Button onClick={toggleModal} showModal={showModal}>
            Proceed to checkout
          </Button>
          <CheckoutModal
            canShow={showModal}
            updateModalState={toggleModal}
          ></CheckoutModal>
        </ModalContext.Provider>
      </Bottom>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid black;
  grid-area: cart;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 30px;
  font-family: "Fredoka One", cursive;
`;
const Items = styled.span`
  margin-top: 15px;
`;
const Middle = styled.div`
  overflow: auto;
`;
const Bottom = styled.div`
  padding-bottom: 50px;
`;
const Total = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 15px;
`;
const Button = styled.button`
  visibility: ${({ showModal }) => (showModal ? "hidden" : "block")};
  cursor: pointer;
  border-radius: 15px;
  border: none;
  font-weight: 700;
  font-size: 16px;
  color: white;
  height: 40px;
  background-size: 300% 100%;
  background-image: linear-gradient(
    to right,
    #eb3941,
    #f15e64,
    #e14e53,
    #e2373f
  );
  box-shadow: 0 5px 15px rgba(242, 97, 103, 0.4);
  transition: all 0.5s ease-in-out;

  &:hover {
    background-position: 100% 0;
    transition: all 0.5s ease-in-out;
  }
`;
export default Cart;
