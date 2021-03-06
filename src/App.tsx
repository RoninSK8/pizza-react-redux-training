import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import Home from './Pages/Home';
import Layout from './Components/Layout';

const Cart = loadable(
	() => import(/* webpackChunkName: "Cart" */ './Pages/Cart')
);
const PizzaPage = loadable(
	() => import(/* webpackChunkName: "PizzaPage" */ './Pages/PizzaPage')
);
const NotFound = loadable(
	() => import(/* webpackChunkName: "NotFound" */ './Pages/NotFound')
);

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
