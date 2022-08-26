import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Item, SearchParams } from './types';

export const fetchPizzas = createAsyncThunk<Item[], SearchParams>(
	'pizzas/fetchPizzasStatus',
	async (params: SearchParams) => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get<Item[]>(
			`https://6285265d3060bbd34745a43b.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return data;
	}
);

export const getFilteredItemsCount = createAsyncThunk<number, SearchParams>(
	'pizzas/getFilteredItemsCountStatus',
	async (params: SearchParams) => {
		const { category, search } = params;
		const { data } = await axios.get<Item[]>(
			`https://6285265d3060bbd34745a43b.mockapi.io/items?${category}&${search}`
		);
		const totalCount = data.length;
		return totalCount;
	}
);
