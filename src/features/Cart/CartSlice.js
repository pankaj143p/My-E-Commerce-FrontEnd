import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './CartApi';
import { addToCart, fetchItemsByUserId } from './CartApi';

const initialState = {
  // value: 0,
  status: 'idle',
  items: [],
};

// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount) => {
//     const response = await fetchCount(amount);

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);

    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(incrementAsync.pending, (state) => {
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      // .addCase(incrementAsync.fulfilled, (state, action) => {
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.value += action.payload;
        state.items = action.payload;
      });
  },
});
export const { increment } = counterSlice.actions;
export const selectItems = (state) => state.cart.items;


// export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;