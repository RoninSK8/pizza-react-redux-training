import { configureStore } from '@reduxjs/toolkit';
import filterSliceReducer from '../redux/slices/filterSlice';
import cartSliceReducer from './slices/cartSlice';
import pizzaSliceReducer from './slices/pizzaSlice';

export const store = configureStore({
	reducer: { filterSliceReducer, cartSliceReducer, pizzaSliceReducer },
});
