import { createSlice } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { PizzaSliceState } from './types';

const initialState: PizzaSliceState = {
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

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
