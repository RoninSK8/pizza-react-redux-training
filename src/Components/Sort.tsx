import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSort } from '../redux/filter/selectors';
import { setSortType } from '../redux/filter/slice';
import { sortItem } from '../redux/filter/types';

export const sortTypes: sortItem[] = [
	{ name: 'популярности ↑', sortProperty: '-rating' },
	{ name: 'популярности ↓', sortProperty: 'rating' },
	{ name: 'цене ↑', sortProperty: '-price' },
	{ name: 'цене ↓', sortProperty: 'price' },
	{ name: 'алфавиту ↑', sortProperty: '-title' },
	{ name: 'алфавиту ↓', sortProperty: 'title' },
];

const Sort: React.FC = () => {
	const [isActive, setActive] = useState(false);
	const sortRef = useRef<HTMLDivElement>(null);
	const sort = useSelector(selectSort);
	const dispatch = useDispatch();

	const handleChooseSort = (sort: sortItem) => {
		dispatch(setSortType(sort));
		setActive(false);
	};

	const handleSortPropertyChange = () => {
		const toggleSortOrder = (sort: sortItem) => {
			const currentSortName = sort.name;
			if (sort.sortProperty.includes('-')) {
				return {
					name: `${currentSortName.split(' ')[0]} ↓`,
					sortProperty: sort.sortProperty.replace('-', ''),
				};
			}
			return {
				name: `${currentSortName.split(' ')[0]} ↑`,
				sortProperty: `-${sort.sortProperty}`,
			};
		};
		const newSort = toggleSortOrder(sort);
		dispatch(setSortType({ ...newSort }));
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
				setActive(false);
			}
		};
		document.body.addEventListener('click', handleClickOutside);
		return () => document.body.removeEventListener('click', handleClickOutside);
	}, []);

	return (
		<div ref={sortRef} className="sort">
			<div className="sort__label">
				<svg
					onClick={handleSortPropertyChange}
					version="1.1"
					id="Capa_1"
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="20px"
					height="20px"
					viewBox="0 0 36.678 36.678"
				>
					<g>
						<path
							d="M29.696,20.076c0.088,0.16,0.08,0.354-0.021,0.51L19.395,36.449c-0.091,0.139-0.241,0.224-0.407,0.229
		c-0.004,0-0.008,0-0.015,0c-0.157,0-0.31-0.076-0.403-0.205L6.998,20.609c-0.11-0.15-0.127-0.354-0.041-0.521
		c0.085-0.168,0.257-0.272,0.444-0.272h21.855C29.443,19.814,29.609,19.914,29.696,20.076z M7.401,16.865h21.855
		c0.008,0,0.017,0,0.021,0c0.275,0,0.5-0.225,0.5-0.5c0-0.156-0.07-0.295-0.184-0.388L18.086,0.205
		C17.989,0.072,17.821,0.002,17.668,0c-0.165,0.005-0.315,0.09-0.406,0.229L6.982,16.094c-0.101,0.152-0.105,0.35-0.021,0.512
		C7.05,16.765,7.218,16.865,7.401,16.865z"
						/>
					</g>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setActive(!isActive)}>{sort.name}</span>
			</div>
			{isActive && (
				<div className="sort__popup">
					<ul>
						{sortTypes.map((sortType, i) => {
							return (
								<li
									key={i}
									onClick={() => handleChooseSort(sortType)}
									className={sort.name === sortType.name ? 'active' : ''}
								>
									{sortType.name}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Sort;
