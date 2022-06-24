import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
	'pizzas/fetchPizzasStatus',
	async ({ sortBy, order, category, search, currentPage }) => {
		const { data } = await axios.get(
			`https://6285265d3060bbd34745a43b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return data;
	}
);

const initialState = {
	items: [],
	status: 'loading',
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, { payload }) {
			state.items = payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.status = 'loading';
			state.items = [];
		},
		[fetchPizzas.fulfilled]: (state, { payload }) => {
			state.items = payload;
			state.status = 'success';
		},
		[fetchPizzas.rejected]: (state, action) => {
			state.status = 'error';
			state.items = [];
		},
	},
});

export const selectPizzas = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
