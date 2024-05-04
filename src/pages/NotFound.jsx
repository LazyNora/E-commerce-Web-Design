import { Link } from "react-router-dom";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
	return (
		<>
			<Announcement />
			<Navbar />
			<main role="main" id="MainContent">
				<section className="section-notfound404">
					<div className="page404 | flex flex-col justify-center items-center h-full py-32 lg:py-48 text-center">
						<h1 className="page404-title text-3xl lg:text-6xl lg:leading-tight font-bold">
							404
						</h1>
						<p className="text-2xl lg:text-5xl lg:leading-tight font-light mb-8">
							Page Not Found!
						</p>
						<Link to="/" className="text-xl mt-2 text-blue-400">
							Go back to Home
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default NotFound;
