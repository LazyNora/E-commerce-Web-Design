import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import BetterChoice from "../components/BetterChoice";
import Guarantees from "../components/Guarantees";
import ProductsTab from "../components/ProductsTab";

const Home = () => {
	return (
		<>
			<Announcement />
			<Navbar />
			<main role="main" id="MainContent">
				<Carousel />
				<BetterChoice />
				<Categories />
				<ProductsTab />
				<Guarantees />
			</main>
			<Footer />
		</>
	);
};

export default Home;
