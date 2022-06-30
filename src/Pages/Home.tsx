import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../Components/Categories';
import Sort, { sortTypes } from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Pagination from '../Components/Pagination';
import { useAppDispatch } from '../redux/store';
import { selectFilters } from '../redux/filter/selectors';
import { setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectPizzas } from '../redux/pizza/selectors';

const Home: React.FC = () => {
	const { items, status } = useSelector(selectPizzas);

	const isMounted = useRef(false);
	const isSearch = useRef(false);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { sort, categoryId, searchValue, currentPage } =
		useSelector(selectFilters);

	const getPizzas = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';
		dispatch(
			fetchPizzas({
				category,
				sortBy,
				order,
				search,
				currentPage: String(),
			})
		);
	};

	// Если есть параметры в строке - отправляет их в редакс
	useEffect(() => {
		console.log('сработал 1й');
		if (window.location.search) {
			console.log('сработало условие 1го');
			console.log(window.location.search);

			const params = qs.parse(window.location.search.substring(1));
			const sort = sortTypes.find(
				(sortType) => sortType.sortProperty === params.sortProperty
			);
			dispatch(
				setFilters({
					currentPage: Number(params.currentPage),
					categoryId: Number(params.categoryId),
					searchValue: String(params.search),
					sort: sort || sortTypes[0],
				})
			);
			isSearch.current = true;
		}
	}, []);

	//
	useEffect(() => {
		getPizzas();
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
				{/* {status === 'loading'
					? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
					: items &&
					  items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)} */}

				{(status === 'loading' &&
					[...new Array(6)].map((_, i) => <Skeleton key={i} />)) ||
					(status === 'error' && (
						<div className="content__error-info">
							<h2>Произошла ошибка 😕</h2>
							<p>
								К сожалению, не удалось получить пиццы. Попробуйте повторить
								попытку позже.
							</p>
						</div>
					)) ||
					(status === 'success' &&
						items.map((pizza: any) => (
							<PizzaBlock key={pizza.id} {...pizza} />
						)))}
			</div>
			<Pagination />
		</>
	);
};

export default Home;
