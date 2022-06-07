import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	searchValue: '',
	sort: {
		name: 'популярности',
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
	},
});

export const { setCategoryId, setSortType, setSearchValue } =
	filterSlice.actions;
export default filterSlice.reducer;
