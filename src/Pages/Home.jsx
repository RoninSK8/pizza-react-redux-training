import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Pagination from '../Components/Pagination';

export default function Home() {
	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setLoading] = useState(true);

	const { sort, categoryId, searchValue, currentPage } = useSelector(
		(state) => state.filterSliceReducer
	);

	useEffect(() => {
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';

		const fetchPizzas = async () => {
			setLoading(true);
			try {
				const res = await axios.get(
					`https://6285265d3060bbd34745a43b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
				);
				setPizzas(res.data);
			} catch (error) {
				console.log('ERROR', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPizzas();
	}, [sort, categoryId, searchValue, currentPage]);

	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
					: pizzas &&
					  pizzas.map((pizza) => {
							return <PizzaBlock key={pizza.id} {...pizza} />;
					  })}
			</div>
			<Pagination />
		</>
	);
}
