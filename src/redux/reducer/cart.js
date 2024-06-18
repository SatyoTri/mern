const initialState = {
  cart: {},
  isLoading: false,
  error: null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM_SUCCESS':
      return { ...state, cart: action.payload, isLoading: false, error: null };
    case 'ADD_ITEM_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default cartReducer;