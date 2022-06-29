import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type Item = {
	id: string;
	title: string;
	imageUrl: string;
	sizes: number[];
	types: number[];
	prices: { size: number; price: string }[];
};

interface PizzaSliceState {
	items: Item[];
	status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
	items: [],
	status: 'loading',
};

type SearchParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Item[], SearchParams>(
	'pizzas/fetchPizzasStatus',
	async (params: SearchParams) => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get<Item[]>(
			`https://6285265d3060bbd34745a43b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return data;
	}
);
const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, { payload }) {
			state.items = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = 'success';
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = 'error';
				state.items = [];
			});
	},
});

export const selectPizzas = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
