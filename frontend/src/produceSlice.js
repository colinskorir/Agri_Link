import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listings: [],
  loading: false,
};

const produceSlice = createSlice({
  name: 'produce',
  initialState,
  reducers: {
    setListings(state, action) {
      state.listings = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setListings, setLoading } = produceSlice.actions;
export default produceSlice.reducer;
