import React, { useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { setCurrentPage, setSearchValue } from '../../redux/filter/slice';

const Search: React.FC = () => {
	const [value, setValue] = useState('');
	const dispatch = useDispatch();
	const inputRef = useRef<HTMLInputElement>(null);

	const debouncedSearch = useCallback(
		debounce((value: string) => {
			dispatch(setCurrentPage(1));
			dispatch(setSearchValue(value.trim()));
		}, 250),
		[]
	);

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setValue(event.target.value);
			debouncedSearch(event.target.value);
		},
		[debouncedSearch]
	);

	const handleClear = () => {
		setValue('');
		dispatch(setSearchValue(''));
		inputRef?.current?.focus();
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				enableBackground="new 0 0 32 32"
				id="EditableLine"
				version="1.1"
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="14"
					cy="14"
					fill="none"
					id="XMLID_42_"
					r="9"
					stroke="#000000"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeMiterlimit="10"
					strokeWidth="2"
				/>
				<line
					fill="none"
					id="XMLID_44_"
					stroke="#000000"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeMiterlimit="10"
					strokeWidth="2"
					x1="27"
					x2="20.366"
					y1="27"
					y2="20.366"
				/>
			</svg>
			<input
				ref={inputRef}
				onChange={handleChange}
				value={value}
				className={styles.input}
				placeholder="Поиск пиццы..."
			/>
			<svg
				onClick={handleClear}
				className={styles.clearIcon}
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
			</svg>
		</div>
	);
};

export default Search;
