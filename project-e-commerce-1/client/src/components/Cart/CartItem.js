import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { removeItem, increase, decrease } from "../../actions";

const CartItem = ({ id, name, price, quantity, numInStock, src }) => {
  const dispatch = useDispatch();

  let total = 0;
  total += Number(price.split("$")[1]) * quantity;

  return (
    <Wrapper>
      <ItemContainer>
        <Img src={src} />
        <P>{name}</P>
      </ItemContainer>
      <Bottom>
        <QtyContainer>
          <Button
            disabled={quantity < 2}
            onClick={() => dispatch(decrease(id))}
          >
            -
          </Button>
          <Qty>{quantity}</Qty>
          <Button
            disabled={numInStock <= 0}
            onClick={() => dispatch(increase(id))}
          >
            +
          </Button>
        </QtyContainer>
        <Total>${total.toFixed(2)}</Total>
        <Button onClick={() => dispatch(removeItem(id))}>remove ❌</Button>
      </Bottom>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* border: 1px solid white; */
  border-radius: 8px;
  width: 95%;
  color: white;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  padding: 8px;
  font-size: 0.7em;
`;
const Img = styled.img`
  width: 60px;
  border-radius: 10px;
`;
const P = styled.p`
  margin-left: 20px;
`;
const Button = styled.button`
  border: none;
  color: white;
  cursor: pointer;
  background-color: transparent;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Total = styled.span`
  font-size: 0.9em;
  font-weight: 800;
`;
const QtyContainer = styled.div`
  display: flex;
  padding: 8px;
`;
const Qty = styled.div`
  background: white;
  font-weight: bold;
  min-width: 1.5em;
  font-size: 1rem;
  color: red;
  text-align: center;
`;
export default CartItem;
