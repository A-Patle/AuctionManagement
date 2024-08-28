let franchiseReducer = {
  updateFranchiseDetails: (state, action) => {
    state.details = action.payload;
  },
};

export default franchiseReducer;
