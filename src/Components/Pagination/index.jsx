import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';

import styles from './Pagination.module.scss';

const Pagination = () => {
	const dispatch = useDispatch();
	const handlePageChange = (event) => {
		dispatch(setCurrentPage(event.selected + 1));
	};
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			onPageChange={handlePageChange}
			pageRangeDisplayed={4}
			pageCount={3}
			previousLabel="<"
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
