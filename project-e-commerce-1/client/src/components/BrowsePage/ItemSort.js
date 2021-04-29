import React from "react";
import styled from "styled-components";

const ItemSort = ({ addFilter, setDisplayedItems, companies }) => {
  const [filter, setFilter] = React.useState("alphabetical");

  React.useEffect(() => {
    switch (filter) {
      case "alphabetical":
        setDisplayedItems((items) =>
          [].concat(items).sort((a, b) => (a.name > b.name ? 1 : -1))
        );
        break;
      case "company":
        setDisplayedItems((items) =>
          []
            .concat(items)
            .sort((a, b) =>
              companies.find((comp) => comp._id === a.companyId).name >
              companies.find((comp) => comp._id === b.companyId).name
                ? 1
                : -1
            )
        );
        break;
      case "category":
        setDisplayedItems((items) =>
          [].concat(items).sort((a, b) => (a.category > b.category ? 1 : -1))
        );
        break;
      case "price-lo-hi":
        setDisplayedItems((items) =>
          []
            .concat(items)
            .sort(
              (a, b) =>
                parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1))
            )
        );
        break;
      case "price-hi-lo":
        setDisplayedItems((items) =>
          []
            .concat(items)
            .sort(
              (a, b) =>
                parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1))
            )
        );
        break;
    }
  }, [filter, addFilter]);

  return (
    <Wrapper>
      <p>Sort: </p>
      <select
        value={filter ?? "alphabetical"}
        onChange={({ target }) => setFilter(target.value)}
      >
        <option value="alphabetical">Alphabetical</option>
        <option value="company">Brand</option>
        <option value="category">Category</option>
        <option value="price-lo-hi">Price: Low to High</option>
        <option value="price-hi-lo">Price: High to Low</option>
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  justify-content: space-between;
  width: 170px;
`;

export default ItemSort;
