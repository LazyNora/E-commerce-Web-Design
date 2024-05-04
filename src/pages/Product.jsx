import { useParams } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductView from "../components/ProductView";
import { searchHandle } from "../searchProduct";

const Product = () => {
	const { handle } = useParams();
	const product = searchHandle(handle);
	if (!product) {
		// Route to /products page if product not found
		window.location.href = "/products";
	}

	return (
		<div>
			<Announcement />
			<Navbar />
			<main role="main" id="MainContent">
				<ProductView item={product} />
			</main>
			<Footer />
		</div>
	);
};

export default Product;
