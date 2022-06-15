import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalCost: 0,
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, { payload }) {
			const existingItem = state.items.find(
				(item) =>
					item.id === payload.id &&
					item.size === payload.size &&
					item.type === payload.type
			);
			if (existingItem) {
				existingItem.count += 1;
			} else {
				state.items.push(payload);
			}
		},
	},
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
