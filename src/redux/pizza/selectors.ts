import { RootState } from '../store';

export const selectPizzas = (state: RootState) => state.pizza;
export const selectFilteredItemsCount = (state: RootState) =>
	state.pizza.filteredItemsCount;
