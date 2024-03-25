import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="flex justify-center items-center h-screen text-center flex-col">
			<h1 className="text-6xl font-bold">404</h1>
			<p className="text-3xl">Page Not Found</p>
			<Link to="/" className="text-xl mt-4 text-blue-400">
				Go back to Home
			</Link>
		</div>
	);
};

export default NotFound;
