import { configureStore } from '@reduxjs/toolkit';
import filterSliceReducer from '../redux/slices/filterSlice';
import cartSliceReducer from './slices/cartSlice';

export const store = configureStore({
	reducer: { filterSliceReducer, cartSliceReducer },
});
