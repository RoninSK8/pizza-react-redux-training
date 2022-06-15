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
			const currentItem = state.items.find(
				(item) =>
					item.id === payload.id &&
					item.size === payload.size &&
					item.type === payload.type
			);
			if (currentItem) {
				currentItem.count += 1;
			} else {
				state.items.push(payload);
			}
		},
		removeItem(state, { payload }) {
			const currentItem = state.items.find(
				(item) =>
					item.id === payload.id &&
					item.size === payload.size &&
					item.type === payload.type
			);
			if (currentItem.count > 1) {
				currentItem.count -= 1;
			} else {
				state.items = state.items.filter(
					(item) =>
						item.id !== payload.id ||
						item.size !== payload.size ||
						item.type !== payload.type
				);
			}
		},
		removeCategory(state, { payload }) {
			state.items = state.items.filter(
				(item) =>
					item.id !== payload.id ||
					item.size !== payload.size ||
					item.type !== payload.type
			);
		},
		clearCart(state) {
			state.items = [];
		},
	},
});

export const { addItem, removeItem, removeCategory, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
