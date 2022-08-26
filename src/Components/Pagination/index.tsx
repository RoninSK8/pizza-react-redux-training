import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/filter/slice';
import { selectCurrentPage } from '../../redux/filter/selectors';
import { selectFilteredItemsCount } from '../../redux/pizza/selectors';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
	const totalItemsCount = useSelector(selectFilteredItemsCount);
	const [pageCount, setPagecount] = useState(1);
	useEffect(() => {
		const itemsCount = Math.ceil(totalItemsCount / 8);
		setPagecount(itemsCount);
	}, [totalItemsCount]);

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
			pageRangeDisplayed={pageCount}
			pageCount={pageCount}
			previousLabel="<"
		/>
	);
};

export default Pagination;
