import React from "react";
import styled from "styled-components";

import BrowseItem from "./BrowseItem";
import ItemSort from "./ItemSort";
import PageSelect from "./PageSelect";

const BrowsePage = ({ selectedCompanies, selectedCategories }) => {
  const [companies, setCompanies] = React.useState([]);
  const [page, setPage] = React.useState(1); //state for page selector at bottom of displayedItems
  const [displayedItems, setDisplayedItems] = React.useState([]); //products
  const [addFilter, setAddFilter] = React.useState(true); //i flip this state to trigger a useEffect in ItemSort instead of having two states for displayedItems (unsorted from BE and sorted)

  const getQueryString = (pageNum) => {
    let queryString = `/items?page=${pageNum}&limit=20&`;
    selectedCompanies.forEach((company) => {
      queryString += `companies=${company}&`;
    });
    selectedCategories.forEach((category) => {
      queryString += `categories=${category}&`;
    });
    return queryString.slice(0, -1);
  };

  const updateDisplayedItems = () => {
    fetch(getQueryString(page))
      .then((res) => res.json())
      .then(({ data }) => {
        setDisplayedItems(data);
      })
      .then(() => setAddFilter(!addFilter));
  };

  React.useEffect(() => {
    fetch("/companies")
      .then((res) => res.json())
      .then(({ data }) => setCompanies(data));
  }, []);

  React.useEffect(() => {
    updateDisplayedItems();
  }, [page]);

  React.useEffect(() => {
    setPage(1);
    updateDisplayedItems(); //if page goes from 1 -> 1, the above effect won't get triggered, so this line is needed. alternatively, have two page=1 states that you flip between
  }, [selectedCompanies, selectedCategories]);

  return (
    <Wrapper>
      <ItemList>
        <ItemSort
          addFilter={addFilter}
          setDisplayedItems={setDisplayedItems}
          companies={companies}
        />
        {displayedItems.map((item) => (
          <BrowseItem item={item} companies={companies} key={item._id} />
        ))}
        <PageSelect
          page={page}
          setPage={setPage}
          getQueryString={getQueryString}
          selectedCompanies={selectedCompanies}
          selectedCategories={selectedCategories}
        />
      </ItemList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  grid-area: page;
  overflow: scroll;
  background: #e5e5e5;
`;

const ItemList = styled.div`
  position: relative;
  width: 100%;
  padding: 50px 25px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(4, 1fr);
`;

export default BrowsePage;
