import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	sort: {
		name: 'популярности',
		property: 'asc',
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
			// console.log('payload', payload);
			state.sort.name = payload;
			// state.sort.property = property;
		},
	},
});

export const { setCategoryId, setSortType } = filterSlice.actions;
export default filterSlice.reducer;
