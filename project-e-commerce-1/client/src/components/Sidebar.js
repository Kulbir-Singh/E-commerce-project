import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "./GlobalStyles";

const Sidebar = ({
  setSelectedCompanies,
  setSelectedCategories,
  selectedCompanies,
  selectedCategories,
}) => {
  const [category, setCategory] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("/categories")
      .then((res) => res.json())
      .then((data) => setCategory(data.data));
    fetch("/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data.data));
  }, []);

  // This to generate query string if needed

  // useEffect(() => {
  //   let fetchUrl = "/searchItems?";
  //   let companyQueryString = "";
  // if (selectedCompanies.length > 0) {
  //   companyQueryString = "companies=";
  //   selectedCompanies.forEach((companyId, index) => {
  //     if (index < selectedCompanies.length - 1) {
  //       companyQueryString = companyQueryString + companyId + "+";
  //     } else {
  //       companyQueryString = companyQueryString + companyId;
  //     }
  //     //console.log(companyQueryString);
  //   });
  // }
  // const searchUrl = fetchUrl + companyQueryString;
  // console.log(searchUrl);
  // }, [selectedCompanies, selectedCategories]);
  // this will add a object to each company that shows if the company is selected or not
  // ex. if compnay is selected then it will return isChecked= true;

  let avaliableCompanies = companies.map((company) => {
    let check = Object.assign({}, company);
    check.isChecked = false;
    return check;
  });

  // this will sort the categories alphabetically
  let sortedCategories = category.sort((a, b) => {
    let CompanyA = a.toUpperCase();
    let CompanyB = b.toUpperCase();
    return CompanyA < CompanyB ? -1 : CompanyB > CompanyA ? 1 : 0;
  });
  // this will sort the companies alphabetically
  avaliableCompanies.sort((a, b) => {
    let CompanyA = a.name.toUpperCase();
    let CompanyB = b.name.toUpperCase();
    return CompanyA < CompanyB ? -1 : CompanyB > CompanyA ? 1 : 0;
  });

  console.log("these are the selected comapnies : ", selectedCompanies);
  console.log("these are the selected categories : ", selectedCategories);

  if (category && companies) {
    return (
      <Wrapper>
        {" "}
        <Link to="/items">
          <Filter>Filter</Filter>
        </Link>
        <h3>Categories</h3>
        <CategoriesInfo>
          {sortedCategories.map((category, index) => {
            return (
              <>
                <Categories>
                  <div>
                    <input
                      id={index}
                      name={index}
                      type="checkbox"
                      onClick={() => {
                        if (!selectedCategories.includes(category)) {
                          setSelectedCategories([
                            ...selectedCategories,
                            category,
                          ]);
                        } else {
                          let newCat = [...selectedCategories];
                          let targetIndex = newCat.indexOf(category);
                          newCat.splice(targetIndex, 1);
                          setSelectedCategories(newCat);
                        }
                      }}
                    />
                    <label for={index}>{category}</label>
                  </div>
                </Categories>
              </>
            );
          })}{" "}
        </CategoriesInfo>
        <h3>Companies</h3>{" "}
        <CompaniesInfo>
          {avaliableCompanies.map((company) => {
            if (company.name !== selectedCompanies) {
              return (
                <div>
                  <input
                    id={`${company._id}`}
                    name={`${company._id}`}
                    type="checkbox"
                    onClick={() => {
                      // this will check if the company already exist inside selectedCompanies
                      // if not then it will add the company to it
                      if (!selectedCompanies.includes(company._id)) {
                        setSelectedCompanies([
                          ...selectedCompanies,
                          company._id,
                        ]);
                      } else {
                        // using a buffer array to pass the values back to the original selected
                        let newArr = [...selectedCompanies];
                        let targetIndex = newArr.indexOf(company._id);
                        newArr.splice(targetIndex, 1);
                        console.log(newArr);
                        setSelectedCompanies(newArr);
                      }
                      company.isChecked = !company.isChecked;
                    }}
                  />
                  <label for={`${company._id}`}>{company.name}</label>
                </div>
                // />
              );
            }
          })}
        </CompaniesInfo>
      </Wrapper>
    );
  } else {
    return <Wrapper>loading</Wrapper>;
  }
};

const CategoriesInfo = styled.div`
  overflow: none;
`;

const Filter = styled.p`
  color: ${COLORS.accent};
  font-size: 20px;
  font-weight: 1000;
  text-decoration: none;
  font-size: 30px;
  text-align: center;
  padding-right: 10px;
  margin-bottom: -3px;
`;

const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  padding: 10px 0 0 10px;
  display: flex;
  flex-direction: column;
  grid-area: sidebar;
  background: ${COLORS.grayBG};
  h3 {
    margin: 8px 0 5px 0;
  }
`;
const CompaniesInfo = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
`;
const Categories = styled.div`
  display: flex;
  height: 14%;
  flex-direction: column;
`;
export default Sidebar;
