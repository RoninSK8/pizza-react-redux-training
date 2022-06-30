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

export interface CartSliceState {
	items: CartItemType[];
}
