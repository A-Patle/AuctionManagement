let cartReducer = {
  //case reducers: cart/addItemToCart
  addItemToCart: (state, action) => {
    state.items.push({
      ...action.payload,
      quantity: 1,
      totalPrice: action.payload.auctionPrice,
    });
    state.totalItems += 1;
    state.totalPrice += action.payload.auctionPrice;
  },

  //case reducers: cart/removeItemFromCart
  removeItemFromCart: (state, action) => {
    const existingItem = state.items.find((item) => item.id === action.payload);
    if (existingItem) {
      state.totalItems -= existingItem.quantity;
      state.totalPrice -= existingItem.totalPrice;
      state.items = state.items.filter((item) => item.id !== action.payload);
    }
  },

  //case reducers: cart/emptyCart
  emptyCart: (state) => {
    state.items = [];
    state.totalItems = 0;
    state.totalPrice = 0;
  },
};
export default cartReducer;
