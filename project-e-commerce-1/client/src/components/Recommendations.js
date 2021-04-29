import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { COLORS } from "./GlobalStyles";

const Recommendations = ({ item }) => {
  const history = useHistory();
  const [recommendations, setRecommendations] = useState([]);
  const [indicesArray, setIndicesArray] = useState([0, 1, 2, 3, 4]);
  useEffect(() => {
    fetch(
      `/items/${item._id}/${item.body_location}/${item.category}/recommendations/`
    ).then((res) =>
      res.json().then((data) => {
        setRecommendations(data.data);
      })
    );
  }, [item]);
  const handleBack = () => {
    if (recommendations.length > 5) {
      let newIndicesArray = [];
      indicesArray.map((index) => {
        if (index === 0) newIndicesArray.push(recommendations.length - 1);
        else newIndicesArray.push(index - 1);
      });
      setIndicesArray(newIndicesArray);
    }
  };
  const handleNext = () => {
    if (recommendations.length > 5) {
      let newIndicesArray = [];
      indicesArray.forEach((index) => {
        if (index === recommendations.length - 1) newIndicesArray.push(0);
        else newIndicesArray.push(index + 1);
      });
      setIndicesArray(newIndicesArray);
    }
  };

  return (
    recommendations.length > 0 && (
      <>
        <Title>You may also like:</Title>
        <Wrapper>
          <button
            disabled={recommendations.length <= 5}
            onClick={() => handleBack()}
          >
            {" "}
            &lt;{" "}
          </button>
          <ItemsWrapper>
            {recommendations
              .filter((item, index) => {
                return indicesArray.includes(index);
              })
              .map((item) => {
                return (
                  <ButtonItem
                    onClick={() => {
                      history.push(`/items/${item?._id}`);
                      setRecommendations([]);
                    }}
                  >
                    <Image src={item?.imageSrc} />
                    <Info>
                      <h3>{item?.name}</h3>
                    </Info>
                  </ButtonItem>
                );
              })}
          </ItemsWrapper>
          <button
            disabled={recommendations.length <= 5}
            onClick={() => handleNext()}
          >
            {" "}
            &gt;{" "}
          </button>
        </Wrapper>
      </>
    )
  );
};

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  background: ${COLORS.grayBG};
`;
const Title = styled.h3`
  margin-bottom: 20px;
  margin-left: 20px;
  color: midnightblue;
`;
const Wrapper = styled.div`
  width: 90%;
  height: 280px;
  border: 1px solid ${COLORS.accent};
  border-radius: 10px;
  box-shadow: 2px 2px 5px #ccc;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: auto auto 15px auto;
  background: ${COLORS.grayBG};
`;

const Image = styled.img`
  height: 100px;
  max-width: 100px;
  border-radius: 12px;
`;

const Info = styled.div`
  margin-left: 15px;

  h3 {
    font-size: 12px;
    font-weight: normal;
    width: 40%;
  }
  h4 {
    font-size: 10px;
    font-weight: normal;
    color: #777;
  }
`;

const ButtonItem = styled.button`
  /* background-color: white; */
  background: ${COLORS.grayBG};
  border: none;
  text-decoration: none;
  width: 200px;
  color: black;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-content: center;
`;
export default Recommendations;
