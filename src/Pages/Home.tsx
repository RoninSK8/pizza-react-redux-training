import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { sortTypes } from '../Components/Sort';
import { useAppDispatch } from '../redux/store';
import { selectFilters } from '../redux/filter/selectors';
import { setFilters } from '../redux/filter/slice';
import {
	fetchPizzas,
	getFilteredItemsCount,
} from '../redux/pizza/asyncActions';
import { selectPizzas } from '../redux/pizza/selectors';

import {
	Categories,
	Sort,
	PizzaBlock,
	Skeleton,
	Pagination,
} from '../Components';

const Home: React.FC = () => {
	const { items, status } = useSelector(selectPizzas);

	const isMounted = useRef(false);
	const isSearch = useRef(false);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const itemsPerPage = 8;

	const { sort, categoryId, searchValue, currentPage } =
		useSelector(selectFilters);

	// Если есть параметры в строке - отправляет их в редакс
	useEffect(() => {
		if (window.location.search) {
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
	}, [dispatch]);

	//
	useEffect(() => {
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
					currentPage: String(currentPage),
				})
			);
			dispatch(
				getFilteredItemsCount({
					category,
					sortBy,
					order,
					search,
					currentPage: String(currentPage),
				})
			);
		};
		getPizzas();
	}, [sort, categoryId, searchValue, currentPage, dispatch]);

	// Отправляет параметры в строку если это не первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [sort.sortProperty, categoryId, currentPage, navigate]);

	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Пиццы</h2>
			<div className="content__items">
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
						items
							.slice(0, itemsPerPage)
							.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />))}
			</div>
			<Pagination />
		</>
	);
};

export default Home;
