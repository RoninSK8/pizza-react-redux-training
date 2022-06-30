export type sortItem = {
	name: string;
	sortProperty: string;
};

export interface FilterSliceState {
	currentPage: number;
	categoryId: number;
	searchValue: string;
	sort: sortItem;
}
