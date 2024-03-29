import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveCategory } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';

const categories = ['Все', 'Мясные', 'Сырные', 'Острые', 'Овощные', 'Особые'];

const Categories: React.FC = () => {
	const activeCategory = useSelector(selectActiveCategory);

	const dispatch = useDispatch();

	const onClickCategory = (index: number) => {
		dispatch(setCurrentPage(1));
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
};

export default Categories;
