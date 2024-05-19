import { productsData } from "./productsData.min.js";
export function searchHandle(handle) {
	// There is only one product per handle
	const product = productsData.find((product) => product.handle === handle);
	return product;
}

export function getNewArrivals(start, end) {
	// Sort products by published_at and return the products that are within the range of start and end
	const newArrivals = productsData.sort(
		(a, b) => new Date(b.published_at) - new Date(a.published_at)
	);
	return newArrivals.slice(start, end);
}

export function getBestSellers(start, end) {
	// Get products by sale_top key and only return the products that are within the range of start and end
	// The smaller the sale_top value, the higher the product is in the best sellers list
	const bestSellers = productsData.sort((a, b) => a.sale_top - b.sale_top);
	return bestSellers.slice(start, end);
}

export function getComboAssembling(start, end) {
	// Get products that has tags "combo" and only return the products that are within the range of start and end
	const comboAssembling = productsData.filter((product) => product.tags.includes("combo"));
	return comboAssembling.slice(start, end);
}

export function getMQASupport(start, end) {
	// Get products that has tags "mqa" and only return the products that are within the range of start and end
	const mqaSupport = productsData.filter((product) => product.tags.includes("MQA"));
	return mqaSupport.slice(start, end);
}
