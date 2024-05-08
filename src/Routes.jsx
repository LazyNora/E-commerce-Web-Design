import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound";

const PageRoutes = () => {
	return (
		// <Router basename={`/${process.env.PUBLIC_URL}`}>
		<Router>
			<Routes>
				<Route exact path="" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/collections" element={<ProductList />} />
				<Route
					path="/collections/:category"
					element={<ProductList />}
				/>
				<Route path="/products" element={<ProductList />} />
				<Route path="/products/:handle" element={<Products />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default PageRoutes;
