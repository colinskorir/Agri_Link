import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  loading: false,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setOrders, setLoading } = orderSlice.actions;
export default orderSlice.reducer;
