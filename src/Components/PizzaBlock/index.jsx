import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addItem, selectCart } from '../../redux/slices/cartSlice';

const typeNames = ['тонкое', 'традиционное'];

export default function PizzaBlock({
	id,
	title,
	imageUrl,
	sizes,
	types,
	prices,
}) {
	const [activeType, setActiveType] = useState(types[0]);
	const [activeSize, setActiveSize] = useState(sizes[0]);
	const dispatch = useDispatch();

	const { items } = useSelector(selectCart);
	const currentCount = items
		.filter((item) => item.id === id)
		.reduce((count, item) => {
			count += item.count;
			return count;
		}, 0);

	const handleChooseType = (i) => {
		setActiveType(i);
	};
	const handleChooseSize = (i) => {
		setActiveSize(i);
	};

	const currentItemPrice = prices.filter(
		(price) => price.size === activeSize
	)[0].price;

	const handleAddItem = () => {
		dispatch(
			addItem({
				id,
				title,
				imageUrl,
				size: activeSize,
				type: activeType,
				price: currentItemPrice,
				count: 1,
			})
		);
		console.log(activeSize);
		console.log(currentItemPrice);
	};
	return (
		<div className="pizza-block">
			<Link to={`/pizza/${id}`}>
				<img className="pizza-block__image" src={imageUrl} alt="Pizza" />
				<h4 className="pizza-block__title">{title}</h4>
			</Link>
			<div className="pizza-block__selector">
				<ul>
					{types &&
						types.map((typeId, i) => {
							return (
								<li
									key={i}
									onClick={() => handleChooseType(typeId)}
									className={activeType === typeId ? 'active' : ''}
								>
									{typeNames[typeId]}
								</li>
							);
						})}
				</ul>
				<ul>
					{sizes &&
						sizes.map((size, i) => {
							return (
								<li
									key={i}
									onClick={() => handleChooseSize(size)}
									className={activeSize === size ? 'active' : ''}
								>
									{size} см.
								</li>
							);
						})}
				</ul>
			</div>
			<div className="pizza-block__bottom">
				<div className="pizza-block__price">{currentItemPrice} ₽</div>
				<div
					className="button button--outline button--add"
					onClick={handleAddItem}
				>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
							fill="white"
						/>
					</svg>
					<span>Добавить</span>
					{currentCount > 0 ? <i>{currentCount}</i> : ''}
				</div>
			</div>
		</div>
	);
}
