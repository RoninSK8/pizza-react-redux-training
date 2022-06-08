import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
];

export default function Categories() {
	const activeCategory = useSelector(
		(state) => state.filterSliceReducer.categoryId
	);

	const dispatch = useDispatch();

	const onClickCategory = (index) => {
		dispatch(setCategoryId(index));
	};

	return (
		<div className="categories">
			<ul>
				{categories.map((categorie, i) => {
					return (
						<li
							key={i}
							onClick={() => onClickCategory(i)}
							className={activeCategory === i ? 'active' : ''}
						>
							{categorie}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
