const { sendResponse, paginatedResults, getRandomSample } = require("./utils");

let items = require("./data/items.json");
const companies = require("./data/companies.json");
//GET all items
//GET items filtered by compenies and categories
// query looks like http://localhost:4000/items/filteredBy?categories=Lifestyle&companies=13334&companies=19787&page=1&limit=10
const getItems = (req, res) => {
  const categories = req.query.categories;
  const companies = req.query.companies;

  let filteredItems = items;
  if (categories) {
    filteredItems = filteredItems.filter((item) =>
      categories.includes(item.category)
    );
  }
  if (companies) {
    filteredItems = filteredItems.filter((item) =>
      companies.includes(item.companyId.toString())
    );
  }

  return sendResponse(res, 200, paginatedResults(req, filteredItems));
};

//GET item by id
const getItemById = (req, res) => {
  let id = req.params.itemId;

  let item = items.filter((item) => {
    return item._id === Number(id);
  });
  console.log(id, item);
  if (item.length > 0) return sendResponse(res, 200, item);
  else return sendResponse(res, 404, id, "item not found");
};

//GET recommendations for this item
const getRecommendations = (req, res) => {
  let id = req.params.itemId;
  let bodyLocation = req.params.bodyLocation;
  let category = req.params.category;
  let recommendations = items.filter((item) => {
    return (
      item._id.toString() !== id.toString() &&
      item.body_location === bodyLocation &&
      item.category === category
    );
  });

  let recommendationsSample = getRandomSample(recommendations, 15);
  return sendResponse(res, 200, recommendationsSample);
};

//GET all companies
const getCompanies = (req, res) => {
  return sendResponse(res, 200, companies);
};

//GET company by Id

const getCompanyById = (req, res) => {
  let id = req.params.companyId;
  let company = companies.filter((item) => {
    return item._id === Number(id);
  });
  return sendResponse(res, 200, company);
};

//GET all categories
const getCategories = (req, res) => {
  let categories = new Set();
  items.forEach((item) => categories.add(item.category));
  //converting Set object to array
  let categoryArray = [];
  categories.forEach((item) => categoryArray.push(item));
  return sendResponse(res, 200, categoryArray);
};

//PUT change item quantity
const changeItemQuantity = (req, res) => {
  const cartData = req.body;
  let updatedItems;

  //creating array with updated items
  updatedItems = items.map((item) => {
    //checking if item is in the cart
    let itemInCart = cartData.data.filter(
      (cartItem) => item._id === Number(cartItem._id)
    );

    let newItem;
    if (itemInCart.length > 0) {
      if (item.numInStock - Number(itemInCart[0].quantity) > 0) {
        newItem = {
          ...item,
          numInStock: item.numInStock - Number(itemInCart[0].quantity),
        };
      } else
        return sendResponse(
          res,
          404,
          cartData.data,
          "there is not enough " + item.name + " in stock!"
        );
    }

    if (newItem) return newItem;
    else return item;
  });
  items = [...updatedItems];

  return sendResponse(res, 200, cartData.data, "successfully purchased");
};

//GET all items that includes in there name searchItem
const searchItem = (req, res) => {
  let searchResult = [];
  let searchItem = req.params.searchItem;
  searchResult = items.filter((item) => {
    console.log(item.name, searchItem);
    return item.name.toLowerCase().includes(searchItem.toLowerCase());
  });
  return sendResponse(res, 200, searchResult);
};

module.exports = {
  getItems,
  getItemById,
  getCompanies,
  getCategories,
  changeItemQuantity,
  searchItem,
  getCompanyById,
  getRecommendations,
};
