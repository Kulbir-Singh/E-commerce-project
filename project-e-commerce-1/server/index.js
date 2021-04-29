"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const {
  getItems,
  getItemById,
  getCompanies,
  getCategories,
  changeItemQuantity,
  searchItem,
  getCompanyById,
  getRecommendations,
} = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/bacon", (req, res) => res.status(200).json("🥓"))

  .get("/items", getItems)
  .get("/items/:itemId", getItemById)
  .get(
    "/items/:itemId/:bodyLocation/:category/recommendations",
    getRecommendations
  )
  .get("/companies", getCompanies)
  .get("/companies/:companyId", getCompanyById)
  .get("/categories", getCategories)
  .put("/purchase", changeItemQuantity)
  .get("/searchItem/:searchItem", searchItem)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
