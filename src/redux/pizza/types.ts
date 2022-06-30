export type SearchParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: string;
};

export type Item = {
	id: string;
	title: string;
	imageUrl: string;
	sizes: number[];
	types: number[];
	prices: { size: number; price: string }[];
};

export interface PizzaSliceState {
	items: Item[];
	status: 'loading' | 'success' | 'error';
}
