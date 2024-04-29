import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const PageRoutes = () => {
	return (
		// <Router basename={`/${process.env.PUBLIC_URL}`}>
		<Router>
			<Routes>
				<Route exact path="" element={<Navigate to="/home" />} />
				<Route path="/home" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/products" element={<ProductList />} />
				<Route path="/products/:category" element={<ProductList />} />
				<Route path="/product" element={<Product />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default PageRoutes;
