import React, { useState, useEffect } from 'react';

import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';

export default function Home() {
	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(true);
		fetch('https://6285265d3060bbd34745a43b.mockapi.io/items')
			.then((res) => res.json())
			.then((arr) => {
				setPizzas(arr);
				setLoading(false);
			});
	}, []);

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
				{/* {pizzas &&
							pizzas.map((pizza) => {
								return <PizzaBlock key={pizza.id} {...pizza} />;
							})} */}
			</div>
		</>
	);
}
