import React from "react";
import styled from "styled-components";

const PageSelect = ({
  page,
  setPage,
  getQueryString,
  selectedCompanies,
  selectedCategories,
}) => {
  const [nextPage, setNextPage] = React.useState(true);

  React.useEffect(() => {
    fetch(getQueryString(page + 1)) //checks ahead a page to see if there are any more items to show
      .then((res) => res.json())
      .then(({ data }) => {
        data.length === 0 ? setNextPage(false) : setNextPage(true);
      });
  }, [page, selectedCompanies, selectedCategories]);

  return (
    <Wrapper>
      <button
        onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
        disabled={page === 1}
      >
        &lt;
      </button>
      <h3>{page}</h3>
      <button onClick={() => setPage((prev) => prev + 1)} disabled={!nextPage}>
        &gt;
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: space-between;
  width: 120px;
`;

export default PageSelect;
