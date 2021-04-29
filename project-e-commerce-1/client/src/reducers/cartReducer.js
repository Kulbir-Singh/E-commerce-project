const initialState = {};

export default function cartReducer(state = initialState, action) {
  console.log("action", action);
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        [action.item._id]: {
          ...action.item,
          quantity: state[action.item._id]
            ? state[action.item._id].quantity + action.quantity
            : action.quantity,
          numInStock: state[action.item._id]
            ? state[action.item._id].numInStock - action.quantity
            : action.numInStock - action.quantity,
        },
      };
    }

    case "REMOVE_ITEM": {
      const stateCopy = { ...state };
      delete stateCopy[action.item];
      return { ...stateCopy };
    }

    case "INCREMENT": {
      return {
        ...state,
        [action.item]: {
          ...state[action.item],
          quantity: state[action.item].quantity + 1,
          numInStock: state[action.item].numInStock - 1,
        },
      };
    }

    case "DECREMENT": {
      return {
        ...state,
        [action.item]: {
          ...state[action.item],
          quantity: state[action.item].quantity - 1,
          numInStock: state[action.item].numInStock + 1,
        },
      };
    }

    default:
      return state;
  }
}

export const getItemArray = (state) => Object.values(state);
