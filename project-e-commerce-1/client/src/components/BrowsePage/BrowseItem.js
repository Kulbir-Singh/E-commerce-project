import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const BrowseItem = ({ item, companies }) => {
  const history = useHistory();

  const { name, category, companyId, imageSrc, price, _id } = item;
  const company = companies.find((comp) => comp._id === companyId)?.name;

  return (
    <Wrapper onClick={() => history.push(`/items/${_id}`)}>
      <Image src={imageSrc} />
      <Info>
        <h3>{name}</h3>
        <h4>Brand: {company}</h4>
        <h4>Category: {category}</h4>
        <h4>Price: {price}</h4>
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 150px;
  border: 1px solid #fca311;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #ccc;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  overflow: auto;
`;

const Image = styled.img`
  height: 80%;
  max-width: 40%;
  border-radius: 8px;
`;

const Info = styled.div`
  margin-left: 15px;
  h3 {
    font-size: 14px;
    font-weight: normal;
  }
  h4 {
    font-size: 12px;
    font-weight: normal;
    color: #777;
  }
`;

export default BrowseItem;
