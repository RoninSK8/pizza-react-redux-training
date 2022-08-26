import { createSlice } from '@reduxjs/toolkit';
import { fetchPizzas, getFilteredItemsCount } from './asyncActions';
import { PizzaSliceState } from './types';

const initialState: PizzaSliceState = {
	items: [],
	status: 'loading',
	filteredItemsCount: 0,
};

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
			})
			.addCase(getFilteredItemsCount.fulfilled, (state, action) => {
				state.filteredItemsCount = action.payload;
			});
	},
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
