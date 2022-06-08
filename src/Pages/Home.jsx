import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import Categories from '../Components/Categories';
import Sort, { sortTypes } from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Pagination from '../Components/Pagination';
import { setFilters } from '../redux/slices/filterSlice';

export default function Home() {
	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setLoading] = useState(true);

	const isMounted = useRef(false);
	const isSearch = useRef(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { sort, categoryId, searchValue, currentPage } = useSelector(
		(state) => state.filterSliceReducer
	);

	// Если есть параметры в строке - отправляет их в редакс
	useEffect(() => {
		console.log('сработал 1й');
		if (window.location.search) {
			console.log('сработало условие 1го');
			console.log(window.location.search);

			const params = qs.parse(window.location.search.substring(1));
			console.log(params);
			const sort = sortTypes.find(
				(sortType) => sortType.sortProperty === params.sortProperty
			);
			// console.log(sortTypes.find());

			dispatch(setFilters({ ...params, sort }));
			isSearch.current = true;
		}
	}, []);

	//
	useEffect(() => {
		// const category = categoryId > 0 ? `category=${categoryId}` : '';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';
		console.log('сработал 2й');
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
		console.log();
		if (!isSearch.current) {
			console.log('сработало условие 2го');
			fetchPizzas();
		}
		isSearch.current = false;
	}, [sort, categoryId, searchValue, currentPage]);

	// Отправляет параметры в строку если это не первый рендер
	useEffect(() => {
		console.log('сработал 3й');
		if (isMounted.current) {
			console.log('сработало условие 3го');
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [sort.sortProperty, categoryId, currentPage]);

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
