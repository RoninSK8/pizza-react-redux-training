import { configureStore } from '@reduxjs/toolkit';
import filterSliceReducer from '../redux/slices/filterSlice';

export const store = configureStore({
	reducer: { filterSliceReducer },
});
