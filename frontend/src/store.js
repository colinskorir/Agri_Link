import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import produceReducer from './produceSlice';
import orderReducer from './orderSlice';
import messageReducer from './messageSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    produce: produceReducer,
    orders: orderReducer,
    messages: messageReducer,
  },
});

export default store;
