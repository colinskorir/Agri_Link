import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  loading: false,
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setMessages, setLoading } = messageSlice.actions;
export default messageSlice.reducer;
