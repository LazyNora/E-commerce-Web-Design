import { Navigate, useParams } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductView from "../components/ProductView";
import { searchHandle } from "../searchProduct";
import { useEffect } from "react";

const Product = () => {
	// Url: /product/:handle?variant=:variantId
	const { handle } = useParams();
	const product = searchHandle(handle);
	const variantId =
		new URLSearchParams(window.location.search).get("variant") || null;

	useEffect(() => {
		document.title = product
			? `${product.title} - Audio Oasis`
			: "Product not found - Audio Oasis";
	}, [product]);

	if (!product) {
		// Route to /products page if product not found
		return <Navigate to="/products" />;
	}

	return (
		<>
			<Announcement />
			<Navbar />
			<main role="main" id="MainContent" className="template-product">
				<ProductView item={product} variantId={variantId} />
			</main>
			<Footer />
		</>
	);
};

export default Product;
