import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		price: number;
		title: string;
	}>();
	const { id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		const fetchItem = async () => {
			try {
				const { data } = await axios.get(
					'https://6285265d3060bbd34745a43b.mockapi.io/items/' + id
				);
				setPizza(data);
				console.log(data);
			} catch (error) {
				console.log(error);
				navigate('/');
			}
		};

		fetchItem();
	}, []);

	if (!pizza) {
		return <>'Загрузка...'</>;
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} alt={`фото пицца ${pizza.title}`} />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price}</h4>
			<Link to="/">
				<button className="button button--outline button--add">
					<span>Назад</span>
				</button>
			</Link>
		</div>
	);
};

export default FullPizza;
