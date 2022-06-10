import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
		setCategoryId(state, { payload }) {
			state.categoryId = payload;
		},
		setSortType(state, { payload }) {
			state.sort = payload;
		},
		setSearchValue(state, { payload }) {
			state.searchValue = payload;
		},
		setCurrentPage(state, { payload }) {
			state.currentPage = payload;
		},
		setFilters(state, { payload }) {
			state.currentPage = Number(payload.currentPage);
			state.categoryId = Number(payload.categoryId);
			state.sort.sortProperty = payload.sortProperty;
		},
	},
});

export const {
	setCategoryId,
	setSortType,
	setSearchValue,
	setCurrentPage,
	setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
