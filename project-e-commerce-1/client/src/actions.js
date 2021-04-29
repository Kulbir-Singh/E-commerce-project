//add item to cart
export const addItem = (item, quantity, numInStock) => ({
  type: "ADD_ITEM",
  quantity,
  numInStock,
  item,
});

//remove from cart
export const removeItem = (item) => ({
  type: "REMOVE_ITEM",
  item,
});

//increase the quantity by one
export const increase = (item) => ({
  type: "INCREMENT",
  item,
});

//decrease the quantity by one
export const decrease = (item) => ({
  type: "DECREMENT",
  item,
});
