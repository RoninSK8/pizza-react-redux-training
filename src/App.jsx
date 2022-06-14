import './scss/app.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Cart from './Pages/Cart';
import PizzaPage from './Pages/PizzaPage';
import Layout from './Components/Layout';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="cart" element={<Cart />} />
				<Route path="pizza/:id" element={<PizzaPage />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
