import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/filter/slice';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
	const dispatch = useDispatch();
	const handlePageChange = (idx: number) => {
		dispatch(setCurrentPage(idx));
	};
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			onPageChange={(event) => handlePageChange(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			previousLabel="<"
		/>
	);
};

export default Pagination;
