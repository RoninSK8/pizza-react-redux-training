import { RootState } from '../store';

export const selectFilters = (state: RootState) => state.filter;
export const selectActiveCategory = (state: RootState) =>
	state.filter.categoryId;
export const selectSort = (state: RootState) => state.filter.sort;
