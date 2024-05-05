import { Navigate, useParams } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductView from "../components/ProductView";
import { searchHandle } from "../searchProduct";
import { useEffect } from "react";

const Product = () => {
	const { handle } = useParams();
	const product = searchHandle(handle);

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
				<ProductView item={product} />
			</main>
			<Footer />
		</>
	);
};

export default Product;
