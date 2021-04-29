import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Banner from "./Banner";
import BrowsePage from "./BrowsePage";
import ItemPage from "./ItemPage";
import Cart from "./Cart";
import CheckoutModal from "./Cart/CheckoutModal";
import Footer from "./Footer";

function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Wrapper
          style={{
            gridTemplateColumns: cartOpen ? ".75fr 4fr 1fr" : ".75fr 5fr 0fr",
          }}
        >
          <Header setCartOpen={setCartOpen} cartOpen={cartOpen} />
          <Sidebar
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedCompanies={selectedCompanies}
            setSelectedCompanies={setSelectedCompanies}
          />
          <Route exact path="/">
            <Banner />
          </Route>
          <Route exact path="/items">
            <BrowsePage
              selectedCategories={selectedCategories}
              selectedCompanies={selectedCompanies}
            />
          </Route>
          <Route path="/items/:itemId">
            <ItemPage />
          </Route>
          {cartOpen && <Cart />}
          <CheckoutModal />
          <Footer />
        </Wrapper>
      </Router>
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 50px calc(100vh - 110px) 60px;
  grid-template-areas:
    "header header header"
    "sidebar page cart"
    "footer footer footer";
`;

export default App;
