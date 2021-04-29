import React, { useEffect, useState } from "react";
import { COLORS } from "./GlobalStyles";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../actions";
import { useParams } from "react-router-dom";
import { IoThermometer } from "react-icons/io5";
import Recommendations from "./Recommendations";

const ItemPage = () => {
  let numInStock;
  let itemAvailable;
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const stock = useSelector((state) => state.cartReducer[itemId]?.numInStock);
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [company, setCompany] = useState();
  const [itemAdded, setItemAdded] = useState(false);
  const [loadItem, setLoadItem] = useState(false);

  useEffect(() => {
    fetch(`/items/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data[0]);
        setLoadItem(!loadItem);
      });
  }, [itemId, itemAdded]);

  useEffect(() => {
    if (item) {
      fetch(`/companies/${item.companyId}`)
        .then((res) => res.json())
        .then((data) => {
          setCompany(data.data[0]);
        });
    }
  }, [loadItem]);

  //array for choosing quantity of items in stock
  let optionArray = [];
  if (item) {
    if (stock === undefined) numInStock = item.numInStock;
    else numInStock = stock;
    for (let i = 1; i <= numInStock; i++) {
      optionArray.push(i);
    }
    itemAvailable = optionArray.length === 0 ? false : true;
  }
  return (
    item && (
      <Wrapper>
        <ProductContainer>
          <h2> {item.name}</h2>
          <DetailsWrapper>
            {optionArray.length === 0 && (
              <OutOfStock available={itemAvailable}>Out of stock</OutOfStock>
            )}
            <Img src={item.imageSrc} />
            <Info>
              <div className="name"></div>
              <div className="price">{item.price}</div>
              <div>
                <strong>Category:</strong> {item.category}
              </div>
              <div>
                <strong>Body location:</strong> {item.body_location}
              </div>
              {company && (
                <>
                  <div>
                    <strong>Brand:</strong> {company.name}
                  </div>
                  <div>
                    More info about this brand <a href={company.url}>here.</a>
                  </div>
                </>
              )}
              <AddWrapper>
                <Quantity
                  value={quantity}
                  onChange={(ev) => {
                    setQuantity(ev.target.value);
                  }}
                >
                  {optionArray.length === 0 ? (
                    <option>0</option>
                  ) : (
                    optionArray.map((option) => {
                      return <option>{option}</option>;
                    })
                  )}
                </Quantity>
                <Button
                  available={itemAvailable}
                  disabled={!itemAvailable}
                  onClick={() => {
                    dispatch(addItem(item, Number(quantity), numInStock));
                    setQuantity(1);
                    setItemAdded(!itemAdded);
                  }}
                >
                  ADD TO CART
                </Button>
              </AddWrapper>
            </Info>
          </DetailsWrapper>
        </ProductContainer>
        {item && <Recommendations item={item} />}
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  width: 100%;
  grid-area: page;
  overflow: auto;
  padding-left: 20px;
  background: ${COLORS.grayBG};
  h2 {
    font-size: 20pt;
    height: 200px;
    margin: auto;
    padding-top: 50px;
    text-align: center;
    width: 70%;
  }
`;
const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const OutOfStock = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 60px;
  background-color: ${(props) => (props.available ? "#0a1682" : "lightgray")};
  color: white;
  font-weight: bold;
  position: absolute;
  text-align: center;
  font-size: 10pt;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 300px;
  height: 300px;
  margin-left: 100px;
  margin-right: 100px;
  border-radius: 10px;
`;

const DetailsWrapper = styled.div`
  display: flex;
  margin-bottom: 50px;
  position: relative;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1.5px solid ${COLORS.accent};
  line-height: 1.8;
  .price {
    font-size: 22pt;
    font-weight: bold;
    color: midnightblue;
    margin-bottom: 20px;
  }
  .name {
    font-size: 18pt;
    width: 400px;
  }

  text-align: center;
`;

const AddWrapper = styled.div`
  display: flex;
  margin-top: 150px;
  justify-content: center;
`;
const Input = styled.input`
  border-radius: 3px;
  box-shadow: 2px 6px 15px -4px rgba(0, 0, 0, 0.61);
  text-align: center;
  border: none;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin: 0px;
  width: 40px;
  height: 40px;
`;
const Button = styled.button`
  width: 150px;
  height: 40px;
  margin-left: 10px;
  background-color: ${(props) => (props.available ? "#fca311" : "lightgray")};
  color: white;
  border: none;
  border-radius: 4px;
  box-shadow: 2px 6px 15px -4px rgba(0, 0, 0, 0.61);
`;

const Quantity = styled.select``;

export default ItemPage;
