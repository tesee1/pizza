import { createSlice } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { RootState } from "../store";


export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const cartData = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: cartData.totalPrice,
  items: cartData.items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1, });
      }

      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);

      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    incrementItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    decrementItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count--;
      }
      
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
  },
});

export const { addItem, removeItem, clearItems, incrementItem, decrementItem } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export const selectCartItem = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id);

export default cartSlice.reducer;
