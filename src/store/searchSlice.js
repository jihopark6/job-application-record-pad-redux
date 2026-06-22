
// This slice is for managing the search state.
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: []
  },
  reducers: {
    setSearchQuery:(state, action) => {
      state.query = action.payload;
    }
  }
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;