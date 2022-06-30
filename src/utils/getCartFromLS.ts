export const getCartFromLS = () => {
	const lsCartData = localStorage.getItem('cart');
	if (lsCartData) {
		return JSON.parse(lsCartData);
	} else {
		return [];
	}
};
