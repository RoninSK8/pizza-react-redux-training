import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/filter/slice';
import { selectCurrentPage } from '../../redux/filter/selectors';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
	const selectedPage = useSelector(selectCurrentPage);
	const dispatch = useDispatch();
	const handlePageChange = (idx: number) => {
		dispatch(setCurrentPage(idx));
	};
	return (
		<ReactPaginate
			forcePage={selectedPage - 1}
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
