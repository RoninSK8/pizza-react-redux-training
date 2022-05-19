import React, { useState } from 'react';

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
];

export default function Categories() {
	const [activeCategory, setActiveCategory] = useState(0);

	const onClickCategory = (index) => {
		setActiveCategory(index);
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
