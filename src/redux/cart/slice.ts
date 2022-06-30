import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartSliceState, CartItemType, PizzaBuild } from './types';

const initialState: CartSliceState = {
	items: getCartFromLS(),
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItemType>) {
			const { payload } = action;
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
		removeItem(state, action: PayloadAction<CartItemType>) {
			const { payload } = action;
			const currentItem = state.items.find(
				(item) =>
					item.id === payload.id &&
					item.size === payload.size &&
					item.type === payload.type
			);
			if (currentItem) {
				currentItem.count -= 1;
			}
		},
		removeBuild(state, action: PayloadAction<PizzaBuild>) {
			const { payload } = action;
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

export const { addItem, removeItem, removeBuild, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
