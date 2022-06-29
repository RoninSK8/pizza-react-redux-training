import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type sortItem = {
	name: string;
	sortProperty: string;
};

// type Filter = {
// 	currentPage: number;
// 	categoryId: number;
// 	sortProperty: string;
// };

interface FilterSliceState {
	currentPage: number;
	categoryId: number;
	searchValue: string;
	sort: sortItem;
}

const initialState: FilterSliceState = {
	currentPage: 1,
	categoryId: 0,
	searchValue: '',
	sort: {
		name: 'популярности (DESC)',
		sortProperty: 'rating',
	},
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSortType(state, action: PayloadAction<sortItem>) {
			state.sort = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			const { payload } = action;
			state.currentPage = payload.currentPage;
			state.categoryId = payload.categoryId;
			state.sort = payload.sort;
		},
	},
});

export const selectFilters = (state: RootState) => state.filter;
export const selectActiveCategory = (state: RootState) =>
	state.filter.categoryId;
export const selectSort = (state: RootState) => state.filter.sort;

export const {
	setCategoryId,
	setSortType,
	setSearchValue,
	setCurrentPage,
	setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
