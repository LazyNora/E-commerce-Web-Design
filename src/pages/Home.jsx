import React from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

const Home = () => {
	return (
		<div>
			<Announcement />
			<Navbar />
			<Carousel />
			<Categories />
			<Products />
			<Footer />
		</div>
	);
};

export default Home;
