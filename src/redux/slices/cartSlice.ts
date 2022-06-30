import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type PizzaBuild = {
	id: string;
	size: number;
	type: number;
};

export type CartItemType = {
	id: string;
	title: string;
	imageUrl: string;
	size: number;
	type: number;
	price: number;
	count: number;
};

interface CartSliceState {
	totalCost: number;
	items: CartItemType[];
}

const initialState: CartSliceState = {
	totalCost: 0,
	items: [],
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

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, removeBuild, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
