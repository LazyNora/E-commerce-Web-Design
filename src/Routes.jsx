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
import Register from "./pages/Register.jsx";
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
				<Route path="/categories" element={<ProductList />} />
				<Route path="/categories/:category" element={<ProductList />} />
				<Route path="/colections" element={<ProductList />} />
				<Route path="/colections/:category" element={<ProductList />} />
				<Route path="/products" element={<ProductList />} />
				<Route path="/products/:handle" element={<Product />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default PageRoutes;
