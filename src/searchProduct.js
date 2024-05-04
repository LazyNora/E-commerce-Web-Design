import { productsData } from "./productsData";
export function searchHandle(handle) {
	// There is only one product per handle
	const product = productsData.find((product) => product.handle === handle);
	return product;
}
