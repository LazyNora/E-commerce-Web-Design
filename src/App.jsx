import PageRoutes from "./Routes";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
	return (
		<div>
			<PageRoutes />
			<SpeedInsights />
		</div>
	);
};

export default App;
