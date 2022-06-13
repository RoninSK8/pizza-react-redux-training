import './scss/app.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Cart from './Pages/Cart';
import PizzaPage from './Pages/PizzaPage';

function App() {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/pizza/:id" element={<PizzaPage />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
